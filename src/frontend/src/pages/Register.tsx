import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import { AlertCircle, Briefcase, Shield, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { UserRole } from "../backend";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth } from "../hooks/useAuth";
import { useRegisterUser } from "../hooks/useBackend";

const ROLE_OPTIONS = [
  {
    value: UserRole.client,
    label: "I'm a Client",
    description: "Browse services, request quotes, and book professionals.",
    icon: Users,
  },
  {
    value: UserRole.provider,
    label: "I'm a Service Provider",
    description:
      "List your services, receive quote requests, and grow your business.",
    icon: Briefcase,
  },
];

export default function Register() {
  const navigate = useNavigate();
  const {
    isAuthenticated,
    isLoading,
    actorReady,
    isFetched,
    user,
    login,
    isProvider,
    isClient,
  } = useAuth();
  const registerUser = useRegisterUser();
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [role, setRole] = useState<UserRole>(UserRole.client);
  const [nameError, setNameError] = useState("");

  // Keep in loading state until actor is ready AND profile has been fetched
  // This prevents premature redirect or form render during initialization
  if (!actorReady || isLoading) {
    return (
      <div
        className="flex justify-center items-center py-32"
        data-ocid="register.loading_state"
      >
        <LoadingSpinner size="lg" label="Loading…" />
      </div>
    );
  }

  // If already registered, redirect to the appropriate dashboard
  if (isFetched && user) {
    if (isProvider) navigate({ to: "/dashboard" });
    else if (isClient) navigate({ to: "/client-dashboard" });
    return null;
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setNameError("");

    if (!displayName.trim()) {
      setNameError("Please enter your display name.");
      return;
    }

    try {
      await registerUser.mutateAsync({
        displayName: displayName.trim(),
        role,
        bio: bio.trim(),
      });
      toast.success("Welcome to ServiceHub!");
      navigate({
        to: role === UserRole.provider ? "/dashboard" : "/client-dashboard",
      });
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Registration failed. Please try again.";
      toast.error(msg);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-gradient-to-br from-muted/20 to-background">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
            <Shield className="w-7 h-7 text-primary" />
          </div>
          <h1 className="font-display font-bold text-3xl text-foreground mb-2">
            Join ServiceHub
          </h1>
          <p className="text-muted-foreground">
            Connect with trusted professionals or grow your service business.
          </p>
        </div>

        {!isAuthenticated ? (
          /* Step 1: Login */
          <Card>
            <CardContent className="p-8 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto">
                <Shield className="w-6 h-6 text-muted-foreground" />
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">
                  Login to get started
                </p>
                <p className="text-sm text-muted-foreground">
                  Use Internet Identity — no passwords, no email required.
                </p>
              </div>
              <Button
                onClick={login}
                className="button-primary w-full"
                size="lg"
                data-ocid="register.login_button"
              >
                Login with Internet Identity
              </Button>
            </CardContent>
          </Card>
        ) : (
          /* Step 2: Complete profile */
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="font-display text-xl">
                Complete Your Profile
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Tell us a bit about yourself to get started.
              </p>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleRegister}
                className="flex flex-col gap-5"
                noValidate
              >
                {/* Display Name */}
                <div>
                  <Label htmlFor="displayName">
                    Display Name{" "}
                    <span className="text-destructive" aria-hidden="true">
                      *
                    </span>
                  </Label>
                  <Input
                    id="displayName"
                    placeholder="Enter your full name"
                    value={displayName}
                    onChange={(e) => {
                      setDisplayName(e.target.value);
                      if (nameError) setNameError("");
                    }}
                    className="mt-1"
                    data-ocid="register.name_input"
                    required
                    aria-invalid={!!nameError}
                    aria-describedby={nameError ? "name-error" : undefined}
                  />
                  {nameError && (
                    <p
                      id="name-error"
                      className="text-xs text-destructive mt-1"
                      data-ocid="register.name_input.field_error"
                    >
                      {nameError}
                    </p>
                  )}
                </div>

                {/* Bio */}
                <div>
                  <Label htmlFor="bio">
                    Bio{" "}
                    <span className="text-muted-foreground text-xs font-normal">
                      (optional)
                    </span>
                  </Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell people about yourself or your business…"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={3}
                    className="mt-1 resize-none text-sm"
                    data-ocid="register.bio_input"
                  />
                </div>

                {/* Role Picker */}
                <div>
                  <Label className="mb-3 block">I want to…</Label>
                  <RadioGroup
                    value={role}
                    onValueChange={(v) => setRole(v as UserRole)}
                    className="flex flex-col gap-3"
                    data-ocid="register.role_selector"
                  >
                    {ROLE_OPTIONS.map((opt) => (
                      <label
                        key={opt.value}
                        htmlFor={`role-${opt.value}`}
                        className={`flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition-smooth ${
                          role === opt.value
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/40"
                        }`}
                        data-ocid={`register.role_option.${opt.value}`}
                      >
                        <RadioGroupItem
                          value={opt.value}
                          id={`role-${opt.value}`}
                          className="mt-0.5"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <opt.icon className="w-4 h-4 text-primary" />
                            <span className="font-medium text-foreground text-sm">
                              {opt.label}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {opt.description}
                          </p>
                        </div>
                      </label>
                    ))}
                  </RadioGroup>
                </div>

                {/* Error state */}
                {registerUser.isError && (
                  <div
                    className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm"
                    data-ocid="register.error_state"
                  >
                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>
                      {registerUser.error instanceof Error
                        ? registerUser.error.message
                        : "Registration failed. Please try again."}
                    </span>
                  </div>
                )}

                {/* Submit */}
                <Button
                  type="submit"
                  className="button-primary w-full"
                  size="lg"
                  disabled={registerUser.isPending || !displayName.trim()}
                  data-ocid="register.submit_button"
                >
                  {registerUser.isPending ? (
                    <span className="flex items-center gap-2">
                      <span
                        className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
                        aria-hidden="true"
                      />
                      Creating account…
                    </span>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
