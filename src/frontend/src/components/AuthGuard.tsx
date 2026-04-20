import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import LoadingSpinner from "./LoadingSpinner";

interface AuthGuardProps {
  children: React.ReactNode;
  /** If true, redirects non-providers to /client-dashboard */
  requireProvider?: boolean;
  /** If true, redirects non-clients to /dashboard */
  requireClient?: boolean;
}

/**
 * Wraps a route in an authentication gate.
 * Shows a spinner until the actor is ready + profile is fetched.
 * Redirects unauthenticated users to /auth/register.
 * Redirects wrong-role users to their correct dashboard.
 */
export default function AuthGuard({
  children,
  requireProvider,
  requireClient,
}: AuthGuardProps) {
  const { isAuthenticated, isLoading, isFetched, isProvider, isClient } =
    useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading || !isFetched) return;

    if (!isAuthenticated) {
      navigate({ to: "/auth/register" });
      return;
    }

    if (requireProvider && !isProvider) {
      navigate({ to: "/client-dashboard" });
      return;
    }

    if (requireClient && !isClient) {
      navigate({ to: "/dashboard" });
      return;
    }
  }, [
    isLoading,
    isFetched,
    isAuthenticated,
    isProvider,
    isClient,
    requireProvider,
    requireClient,
    navigate,
  ]);

  // While actor/profile loading show a centered spinner
  if (isLoading || !isFetched) {
    return (
      <div
        className="flex justify-center items-center py-32"
        data-ocid="auth-guard.loading_state"
      >
        <LoadingSpinner size="lg" label="Loading your profile…" />
      </div>
    );
  }

  // After loading, if not authenticated, render nothing (redirect fires above)
  if (!isAuthenticated) return null;
  if (requireProvider && !isProvider) return null;
  if (requireClient && !isClient) return null;

  return <>{children}</>;
}
