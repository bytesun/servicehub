import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import {
  Bell,
  Briefcase,
  ChevronDown,
  FileText,
  LayoutDashboard,
  Menu,
  Shield,
  ShoppingBag,
  X,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useUnreadNotificationCount } from "../hooks/useBackend";
import UserAvatar from "./UserAvatar";

interface NavItem {
  label: string;
  href: string;
  show: boolean;
  icon?: React.ReactNode;
}

function Logo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-2.5 font-display font-bold text-xl text-foreground group"
      data-ocid="nav-logo"
    >
      <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-sm group-hover:shadow-md transition-smooth">
        <Briefcase className="w-4 h-4 text-primary-foreground" />
      </div>
      <span className="tracking-tight">ServiceHub</span>
    </Link>
  );
}

/** Skeleton shimmer shown while profile is loading */
function ProfileSkeleton() {
  return (
    <div className="flex items-center gap-2" aria-busy="true">
      <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
      <div className="w-24 h-3 rounded bg-muted animate-pulse" />
    </div>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const {
    user,
    isAuthenticated,
    isProvider,
    isClient,
    isLoading: authLoading,
    isFetched: authFetched,
    login,
    logout,
  } = useAuth();

  const { data: unreadCount = 0 } = useUnreadNotificationCount();

  const location = useLocation();
  const navigate = useNavigate();

  const navItems: NavItem[] = [
    {
      label: "Browse Services",
      href: "/services",
      show: true,
      icon: <ShoppingBag className="w-4 h-4" />,
    },
    {
      label: "My Services",
      href: "/dashboard",
      show: isProvider,
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      label: "My Quotes",
      href: "/client-dashboard",
      show: isClient,
      icon: <FileText className="w-4 h-4" />,
    },
    {
      label: "Invoices",
      href: "/invoices",
      show: !!(isClient || isProvider),
      icon: <FileText className="w-4 h-4" />,
    },
  ];

  const visibleItems = navItems.filter((n) => n.show);
  const isActive = (href: string) => location.pathname === href.split("#")[0];

  // Determine what to show in the auth area
  const showProfileSkeleton = isAuthenticated && (authLoading || !authFetched);
  const showUserInfo = isAuthenticated && authFetched && !!user;
  const showRegisterPrompt = isAuthenticated && authFetched && !user;
  const showLoginButton = !isAuthenticated;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className="bg-card border-b border-border shadow-subtle sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo />

            {/* Desktop nav */}
            <nav
              className="hidden md:flex items-center gap-0.5"
              aria-label="Main navigation"
            >
              {visibleItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  data-ocid={`nav-${item.label.toLowerCase().replace(/\s+/g, "-")}.link`}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Auth area */}
            <div className="hidden md:flex items-center gap-3">
              {showProfileSkeleton && <ProfileSkeleton />}

              {showUserInfo && (
                <div className="flex items-center gap-2">
                  {/* Bell notification icon */}
                  <button
                    type="button"
                    onClick={() => navigate({ to: "/notifications" })}
                    className="relative p-2 rounded-md hover:bg-muted/50 transition-smooth"
                    aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ""}`}
                    data-ocid="nav-notifications.button"
                  >
                    <Bell className="w-5 h-5 text-muted-foreground" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center leading-none">
                        {unreadCount > 9 ? "9+" : unreadCount}
                      </span>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      navigate({
                        to: "/profile/$userId",
                        params: { userId: String(user.id) },
                      })
                    }
                    className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-muted/50 transition-smooth"
                    data-ocid="nav-profile.button"
                    aria-label="View profile"
                  >
                    <UserAvatar name={user.displayName} size="sm" />
                    <span className="text-sm font-medium text-foreground max-w-[120px] truncate">
                      {user.displayName}
                    </span>
                    <ChevronDown className="w-3 h-3 text-muted-foreground" />
                  </button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={logout}
                    data-ocid="nav-logout.button"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Sign out
                  </Button>
                </div>
              )}

              {showRegisterPrompt && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Complete your profile
                  </span>
                  <Button
                    size="sm"
                    onClick={() => navigate({ to: "/auth/register" })}
                    data-ocid="nav-complete-profile.button"
                    className="button-primary"
                  >
                    Get started
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={logout}
                    data-ocid="nav-logout.button"
                    className="text-muted-foreground"
                  >
                    Sign out
                  </Button>
                </div>
              )}

              {showLoginButton && (
                <Button
                  onClick={login}
                  data-ocid="nav-login.button"
                  className="button-primary"
                >
                  Sign in
                </Button>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation menu"
              data-ocid="nav-hamburger.button"
            >
              {menuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-border bg-card px-4 pb-4">
            <nav className="flex flex-col gap-1 pt-3">
              {visibleItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setMenuOpen(false)}
                  data-ocid={`nav-mobile-${item.label.toLowerCase().replace(/\s+/g, "-")}.link`}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
              {/* Notifications link — only for signed-in users */}
              {showUserInfo && (
                <Link
                  to="/notifications"
                  onClick={() => setMenuOpen(false)}
                  data-ocid="nav-mobile-notifications.link"
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive("/notifications")
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <span className="relative inline-flex">
                    <Bell className="w-4 h-4" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1.5 w-3.5 h-3.5 rounded-full bg-destructive text-destructive-foreground text-[8px] font-bold flex items-center justify-center leading-none">
                        {unreadCount > 9 ? "9+" : unreadCount}
                      </span>
                    )}
                  </span>
                  Notifications
                  {unreadCount > 0 && (
                    <span className="ml-auto text-xs font-semibold text-destructive">
                      {unreadCount}
                    </span>
                  )}
                </Link>
              )}
            </nav>
            <Separator className="my-3" />
            <div className="flex items-center justify-between gap-2">
              {showProfileSkeleton && <ProfileSkeleton />}

              {showUserInfo && (
                <>
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <UserAvatar name={user.displayName} size="sm" />
                    <span className="text-sm font-medium truncate flex-1">
                      {user.displayName}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                    data-ocid="nav-logout-mobile.button"
                  >
                    Sign out
                  </Button>
                </>
              )}

              {showRegisterPrompt && (
                <Button
                  size="sm"
                  className="button-primary w-full"
                  onClick={() => {
                    navigate({ to: "/auth/register" });
                    setMenuOpen(false);
                  }}
                  data-ocid="nav-register-mobile.button"
                >
                  Complete profile
                </Button>
              )}

              {showLoginButton && (
                <Button
                  onClick={() => {
                    login();
                    setMenuOpen(false);
                  }}
                  className="button-primary w-full"
                  data-ocid="nav-login-mobile.button"
                >
                  Sign in
                </Button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* ── Main content ───────────────────────────────────────────────── */}
      <main className="flex-1 bg-background">{children}</main>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer className="bg-card border-t border-border mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Escrow trust banner */}
          <div className="bg-primary/5 border border-primary/15 rounded-xl p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-display font-semibold text-foreground text-sm">
                Secure payments with ServiceHub Escrow
              </p>
              <p className="text-sm text-muted-foreground mt-0.5">
                Your money is held safely and only released once you confirm the
                work is complete.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex flex-col gap-3">
              <Logo />
              <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
                A trusted marketplace connecting clients with skilled service
                providers.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 text-sm">
              <div className="flex flex-col gap-2 text-muted-foreground">
                <span className="font-semibold text-foreground text-xs uppercase tracking-wider">
                  Platform
                </span>
                <Link
                  to="/services"
                  className="hover:text-foreground transition-colors"
                >
                  Browse Services
                </Link>
                <Link
                  to="/auth/register"
                  className="hover:text-foreground transition-colors"
                >
                  Become a Provider
                </Link>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
            <span>
              © {new Date().getFullYear()} ServiceHub. All rights reserved.
            </span>
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Built with love using caffeine.ai
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
