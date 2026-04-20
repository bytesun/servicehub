import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import type { Principal } from "@icp-sdk/core/principal";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  Loader2,
  MessageSquare,
  Pencil,
  Star,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";
import ServiceCard from "../components/ServiceCard";
import StarRating from "../components/StarRating";
import UserAvatar from "../components/UserAvatar";
import { useAuth } from "../hooks/useAuth";
import {
  useListServices,
  useProviderRatings,
  useReplyRating,
  useUserProfile,
} from "../hooks/useBackend";
import { formatTimestamp } from "../types";
import type { RatingId, RatingView, UserId } from "../types";

function parsePrincipal(str: string): UserId {
  return str as unknown as Principal;
}

// ─── Rating Item ──────────────────────────────────────────────────────────────

function RatingItem({
  rating,
  isOwnProfile,
  index,
}: {
  rating: RatingView;
  isOwnProfile: boolean;
  index: number;
}) {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [localReply, setLocalReply] = useState<string | null>(null);
  const replyMutation = useReplyRating();

  const displayedReply = rating.providerReply ?? localReply;

  const handleSendReply = async () => {
    if (!replyText.trim()) return;
    try {
      await replyMutation.mutateAsync({
        ratingId: rating.id as RatingId,
        reply: replyText.trim(),
      });
      setLocalReply(replyText.trim());
      setShowReply(false);
      toast.success("Reply posted.");
    } catch {
      toast.error("Failed to post reply. Try again.");
    }
  };

  return (
    <div
      className="py-4 border-b border-border last:border-0 last:pb-0 space-y-2"
      data-ocid={`profile.rating.item.${index + 1}`}
    >
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <StarRating value={Number(rating.stars)} readonly size="sm" />
          <span className="text-xs text-muted-foreground">
            {formatTimestamp(rating.createdAt)}
          </span>
        </div>
        {isOwnProfile && !displayedReply && (
          <Button
            variant="outline"
            size="sm"
            className="text-xs h-7"
            onClick={() => setShowReply((v) => !v)}
            data-ocid={`profile.rating.reply_button.${index + 1}`}
          >
            <MessageSquare className="w-3 h-3 mr-1" />
            Reply
          </Button>
        )}
      </div>

      {rating.comment && (
        <p className="text-sm text-foreground leading-relaxed">
          {rating.comment}
        </p>
      )}

      {displayedReply && (
        <div className="mt-2 pl-3 border-l-2 border-primary/30">
          <p className="text-xs font-medium text-primary mb-0.5">
            Provider reply
          </p>
          <p className="text-sm text-muted-foreground">{displayedReply}</p>
        </div>
      )}

      {showReply && (
        <div className="space-y-2 mt-2">
          <Textarea
            placeholder="Write your response to this review…"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            rows={3}
            className="text-sm resize-none"
            data-ocid={`profile.rating.reply_input.${index + 1}`}
          />
          {replyMutation.isError && (
            <p className="text-xs text-destructive">
              Failed to send reply. Please try again.
            </p>
          )}
          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowReply(false)}
              data-ocid={`profile.rating.cancel_button.${index + 1}`}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSendReply}
              disabled={!replyText.trim() || replyMutation.isPending}
              data-ocid={`profile.rating.submit_button.${index + 1}`}
            >
              {replyMutation.isPending ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                "Send reply"
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Edit Profile Modal ───────────────────────────────────────────────────────

function EditProfileModal({
  currentName,
  currentBio,
  onClose,
}: {
  currentName: string;
  currentBio: string;
  onClose: () => void;
}) {
  const [name, setName] = useState(currentName);
  const [bio, setBio] = useState(currentBio);

  const handleSave = () => {
    if (!name.trim()) {
      toast.error("Name is required.");
      return;
    }
    toast.info("Profile updates will be available in a future release.");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/20 backdrop-blur-sm"
      data-ocid="profile.edit_dialog"
    >
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="font-display text-lg">Edit Profile</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={onClose}
            data-ocid="profile.edit_dialog.close_button"
          >
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="edit-name">Display Name</Label>
            <Input
              id="edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1"
              data-ocid="profile.edit_dialog.name_input"
            />
          </div>
          <div>
            <Label htmlFor="edit-bio">Bio</Label>
            <Textarea
              id="edit-bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell people about yourself…"
              rows={3}
              className="mt-1 resize-none text-sm"
              data-ocid="profile.edit_dialog.bio_input"
            />
          </div>
          <div className="flex gap-2 justify-end pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              data-ocid="profile.edit_dialog.cancel_button"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              className="button-primary"
              onClick={handleSave}
              data-ocid="profile.edit_dialog.save_button"
            >
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function UserProfilePage() {
  const { userId } = useParams({ from: "/profile/$userId" });
  const { user: currentUser, actorReady } = useAuth();
  const [showEditModal, setShowEditModal] = useState(false);

  const isOwnProfile = currentUser?.id?.toString() === userId;
  const principalId = parsePrincipal(userId);

  // Gate all data queries on actorReady to prevent premature "not found" states
  const {
    data: profile,
    isLoading: profileLoading,
    isError: profileError,
    isFetched: profileFetched,
  } = useUserProfile(actorReady ? principalId : null);

  const isProvider = profile?.role === "provider";

  const { data: ratings = [], isLoading: ratingsLoading } = useProviderRatings(
    isProvider && actorReady ? principalId : null,
  );

  const { data: allServices = [], isLoading: servicesLoading } =
    useListServices(null);
  const providerServices = allServices.filter(
    (s) => s.providerId.toString() === userId,
  );

  const avgRating =
    ratings.length > 0
      ? ratings.reduce((s, r) => s + Number(r.stars), 0) / ratings.length
      : 0;

  // Show loading spinner while actor is initialising OR query is in flight
  const isLoading = !actorReady || profileLoading;

  if (isLoading) {
    return (
      <div
        className="flex justify-center items-center py-32"
        data-ocid="profile.loading_state"
      >
        <LoadingSpinner size="lg" label="Loading profile…" />
      </div>
    );
  }

  // Handle actual network/unexpected errors — only after we know the actor is
  // ready and the query has completed.
  if (profileError) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <EmptyState
          icon="⚠️"
          title="Couldn't load profile"
          description="There was a problem loading this profile. Please try again."
          actionLabel="Browse Services"
          actionHref="/services"
        />
      </div>
    );
  }

  // Null result = user genuinely does not exist in the backend (only after
  // actorReady + query completed successfully).
  if (profileFetched && !profile) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <EmptyState
          icon="👤"
          title="User not found"
          description="This profile doesn't exist or may have been removed."
          actionLabel="Browse Services"
          actionHref="/services"
        />
      </div>
    );
  }

  // If somehow we get here without profile data, show loading
  if (!profile) {
    return (
      <div
        className="flex justify-center items-center py-32"
        data-ocid="profile.loading_state"
      >
        <LoadingSpinner size="lg" label="Loading profile…" />
      </div>
    );
  }

  return (
    <div
      className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6"
      data-ocid="profile.page"
    >
      {/* Back */}
      <button
        type="button"
        onClick={() => window.history.back()}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        data-ocid="profile.back_button"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Profile Card */}
      <Card data-ocid="profile.card">
        <CardContent className="p-8">
          <div className="flex items-start gap-6 flex-wrap sm:flex-nowrap">
            <UserAvatar name={profile.displayName} size="lg" />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="font-display font-bold text-2xl text-foreground">
                    {profile.displayName}
                  </h1>
                  <span className="provider-badge capitalize">
                    {profile.role}
                  </span>
                  {isOwnProfile && (
                    <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full">
                      You
                    </span>
                  )}
                </div>
                {isOwnProfile && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 shrink-0"
                    onClick={() => setShowEditModal(true)}
                    data-ocid="profile.edit_button"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    Edit Profile
                  </Button>
                )}
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap mb-3">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  Member since {formatTimestamp(profile.createdAt)}
                </div>
                {isProvider && ratings.length > 0 && (
                  <div className="flex items-center gap-1.5">
                    <StarRating value={avgRating} readonly size="sm" />
                    <span className="font-medium text-foreground">
                      {avgRating.toFixed(1)}
                    </span>
                    <span>
                      ({ratings.length} review{ratings.length !== 1 ? "s" : ""})
                    </span>
                  </div>
                )}
                {isProvider && (
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4" />
                    {providerServices.length} service
                    {providerServices.length !== 1 ? "s" : ""}
                  </div>
                )}
              </div>

              {profile.bio && (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {profile.bio}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Provider Services */}
      {isProvider && (
        <Card data-ocid="profile.services.card">
          <CardHeader>
            <CardTitle className="font-display text-lg flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary" />
              Services
              {providerServices.length > 0 && (
                <span className="text-sm font-normal text-muted-foreground">
                  ({providerServices.length})
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {servicesLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="space-y-3 rounded-xl border border-border p-4"
                  >
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-5 w-48" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-2/3" />
                    <Separator />
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-5 w-20" />
                      <Skeleton className="h-8 w-28" />
                    </div>
                  </div>
                ))}
              </div>
            ) : providerServices.length === 0 ? (
              <div
                className="py-10 text-center"
                data-ocid="profile.services.empty_state"
              >
                <p className="text-sm text-muted-foreground">
                  No active services listed yet.
                </p>
                {isOwnProfile && (
                  <Link to="/dashboard">
                    <Button size="sm" className="mt-3 button-primary">
                      Add a Service
                    </Button>
                  </Link>
                )}
              </div>
            ) : (
              <div
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                data-ocid="profile.services.list"
              >
                {providerServices.map((service, i) => (
                  <div
                    key={String(service.id)}
                    data-ocid={`profile.services.item.${i + 1}`}
                  >
                    <ServiceCard
                      service={service}
                      providerName={profile.displayName}
                      averageRating={avgRating}
                      ratingCount={ratings.length}
                    />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Reviews */}
      {isProvider && (
        <Card data-ocid="profile.reviews.card">
          <CardHeader>
            <CardTitle className="font-display text-lg flex items-center gap-2">
              <Star className="w-5 h-5 text-primary" />
              Reviews
              {ratings.length > 0 && (
                <span className="text-sm font-normal text-muted-foreground">
                  ({ratings.length})
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {ratingsLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="space-y-2 pb-4 border-b border-border last:border-0"
                  >
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                ))}
              </div>
            ) : ratings.length === 0 ? (
              <div
                className="py-10 flex flex-col items-center gap-3 text-center"
                data-ocid="profile.reviews.empty_state"
              >
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                  <Star className="w-6 h-6 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-sm">
                  No reviews yet. Completed bookings will appear here.
                </p>
              </div>
            ) : (
              <div className="flex flex-col" data-ocid="profile.reviews.list">
                {ratings.map((r, i) => (
                  <RatingItem
                    key={String(r.id)}
                    rating={r}
                    isOwnProfile={isOwnProfile}
                    index={i}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <EditProfileModal
          currentName={profile.displayName}
          currentBio={profile.bio}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
}
