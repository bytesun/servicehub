import { useActor, useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { UserProfile } from "../types";

export function useAuth() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;
  const actorReady = !!actor && !actorFetching;

  const profileQuery = useQuery<UserProfile | null>({
    queryKey: ["currentUserProfile"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getMyProfile();
    },
    // Only run once actor is confirmed ready AND user is authenticated
    enabled: actorReady && isAuthenticated,
    retry: false,
    // Stale time 0 so it re-fetches after login/logout
    staleTime: 0,
  });

  // isLoading: true while actor is initializing OR while profile query is in flight
  const isLoading = !actorReady || (isAuthenticated && profileQuery.isLoading);
  // isFetched: true once actor is ready AND profile query has completed (success or error)
  const isFetched = actorReady && (!isAuthenticated || profileQuery.isFetched);

  const user = profileQuery.data ?? null;
  const isProvider = user?.role === "provider";
  const isClient = user?.role === "client";

  const handleLogin = async () => {
    try {
      await login();
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error);
      if (msg.includes("already authenticated")) {
        await clear();
        setTimeout(() => login(), 300);
      } else {
        console.error("Login error:", error);
      }
    }
  };

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  return {
    user,
    isAuthenticated,
    isLoginSuccess: loginStatus === "success",
    isProvider,
    isClient,
    isLoading,
    isFetched,
    actorReady,
    login: handleLogin,
    logout: handleLogout,
  };
}
