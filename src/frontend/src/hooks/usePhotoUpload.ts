import { loadConfig } from "@caffeineai/core-infrastructure";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { StorageClient } from "@caffeineai/object-storage";
import { HttpAgent } from "@icp-sdk/core/agent";
import { useCallback, useState } from "react";

const MAX_PHOTOS = 5;
const MAX_FILE_SIZE_MB = 10;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export interface PhotoAttachment {
  /** Local file for preview */
  file: File;
  /** Object URL for `<img>` preview */
  previewUrl: string;
  /** Uploaded CDN URL (set after upload completes) */
  uploadedUrl?: string;
  /** Upload progress 0-100 */
  progress: number;
  /** Whether upload is in progress */
  uploading: boolean;
  /** Upload error message if any */
  error?: string;
}

/** Create a StorageClient using the app's config and an optional identity */
async function createStorageClient(
  identity?: ReturnType<typeof useInternetIdentity>["identity"],
) {
  const config = await loadConfig();
  const agent = new HttpAgent({
    host: config.backend_host,
    ...(identity ? { identity } : {}),
  });
  if (config.backend_host?.includes("localhost")) {
    await agent.fetchRootKey().catch(() => {});
  }
  return new StorageClient(
    config.bucket_name ?? "default-bucket",
    config.storage_gateway_url ?? "https://blob.caffeine.ai",
    config.backend_canister_id,
    config.project_id ?? "0000000-0000-0000-0000-00000000000",
    agent,
  );
}

export function usePhotoUpload() {
  const { identity } = useInternetIdentity();
  const [photos, setPhotos] = useState<PhotoAttachment[]>([]);

  const addPhotos = useCallback(
    (files: FileList | File[]) => {
      const fileArray = Array.from(files);
      const remaining = MAX_PHOTOS - photos.length;
      if (remaining <= 0) return;

      const toAdd = fileArray.slice(0, remaining).filter((f) => {
        if (!ACCEPTED_TYPES.includes(f.type)) return false;
        if (f.size > MAX_FILE_SIZE_MB * 1024 * 1024) return false;
        return true;
      });

      const newPhotos: PhotoAttachment[] = toAdd.map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
        progress: 0,
        uploading: false,
      }));

      setPhotos((prev) => [...prev, ...newPhotos]);
    },
    [photos.length],
  );

  const removePhoto = useCallback((index: number) => {
    setPhotos((prev) => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].previewUrl);
      updated.splice(index, 1);
      return updated;
    });
  }, []);

  /** Upload all pending photos and return their CDN URLs */
  const uploadAll = useCallback(async (): Promise<string[]> => {
    const pending = photos.filter((p) => !p.uploadedUrl && !p.error);
    if (pending.length === 0) {
      return photos.filter((p) => p.uploadedUrl).map((p) => p.uploadedUrl!);
    }

    let storageClient: StorageClient;
    try {
      storageClient = await createStorageClient(identity ?? undefined);
    } catch {
      throw new Error("Failed to initialize storage client");
    }

    // Upload each pending photo
    await Promise.all(
      photos.map(async (photo, idx) => {
        if (photo.uploadedUrl || photo.error) return;

        setPhotos((prev) => {
          const next = [...prev];
          next[idx] = { ...next[idx], uploading: true, error: undefined };
          return next;
        });

        try {
          const bytes = new Uint8Array(await photo.file.arrayBuffer());
          const { hash } = await storageClient.putFile(bytes, (progress) => {
            setPhotos((prev) => {
              const next = [...prev];
              next[idx] = { ...next[idx], progress };
              return next;
            });
          });
          const url = await storageClient.getDirectURL(hash);

          setPhotos((prev) => {
            const next = [...prev];
            next[idx] = {
              ...next[idx],
              uploading: false,
              progress: 100,
              uploadedUrl: url,
            };
            return next;
          });
        } catch (err) {
          const message = err instanceof Error ? err.message : "Upload failed";
          setPhotos((prev) => {
            const next = [...prev];
            next[idx] = { ...next[idx], uploading: false, error: message };
            return next;
          });
        }
      }),
    );

    // Return URLs (re-read from state after all uploads settle)
    return new Promise((resolve) => {
      setPhotos((prev) => {
        const urls = prev
          .filter((p) => p.uploadedUrl)
          .map((p) => p.uploadedUrl!);
        resolve(urls);
        return prev;
      });
    });
  }, [photos, identity]);

  const isUploading = photos.some((p) => p.uploading);
  const hasErrors = photos.some((p) => p.error);
  const canAddMore = photos.length < MAX_PHOTOS;

  return {
    photos,
    addPhotos,
    removePhoto,
    uploadAll,
    isUploading,
    hasErrors,
    canAddMore,
    maxPhotos: MAX_PHOTOS,
  };
}
