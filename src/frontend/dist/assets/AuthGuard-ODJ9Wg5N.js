import { a as useAuth, u as useNavigate, r as reactExports, j as jsxRuntimeExports, k as LoadingSpinner } from "./index-BJQw-dZb.js";
function AuthGuard({
  children,
  requireProvider,
  requireClient
}) {
  const { isAuthenticated, isLoading, isFetched, isProvider, isClient } = useAuth();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
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
    navigate
  ]);
  if (isLoading || !isFetched) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex justify-center items-center py-32",
        "data-ocid": "auth-guard.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg", label: "Loading your profile…" })
      }
    );
  }
  if (!isAuthenticated) return null;
  if (requireProvider && !isProvider) return null;
  if (requireClient && !isClient) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children });
}
export {
  AuthGuard as A
};
