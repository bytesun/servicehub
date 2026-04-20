import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle,
  FileText,
  Lock,
  ShieldCheck,
  Star,
} from "lucide-react";
import { motion } from "motion/react";
import ServiceCard from "../components/ServiceCard";
import { useAuth } from "../hooks/useAuth";
import { useListServices } from "../hooks/useBackend";
import { SERVICE_CATEGORIES } from "../types";

// ── Trust Pillars ─────────────────────────────────────────────────────────────
const TRUST_PILLARS = [
  {
    icon: <Lock className="w-6 h-6 text-primary" />,
    title: "Escrow Protection",
    description:
      "Your payment is held securely until you confirm the work is done. Zero financial risk.",
  },
  {
    icon: <CheckCircle className="w-6 h-6 text-primary" />,
    title: "Verified Reviews",
    description:
      "Only clients who completed a booking can leave ratings. Honest feedback you can trust.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-primary" />,
    title: "Dispute Resolution",
    description:
      "If something goes wrong, you can dispute the booking and we'll help resolve it fairly.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Browse Services",
    description:
      "Explore offerings by category and read verified provider profiles.",
  },
  {
    step: "02",
    title: "Request a Quote",
    description:
      "Describe your job, attach photos, and receive a detailed estimate.",
  },
  {
    step: "03",
    title: "Accept & Pay",
    description: "Approve an offer and pay securely through escrow.",
  },
  {
    step: "04",
    title: "Confirm & Review",
    description:
      "Release payment once done and leave a rating for the provider.",
  },
];

// ── Featured service skeleton ─────────────────────────────────────────────────
function ServiceCardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden shrink-0 w-72">
      <div className="h-1 w-full bg-muted" />
      <div className="p-5 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-6 w-6 rounded" />
        </div>
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="flex items-center justify-between pt-1 border-t border-border/60">
          <div className="space-y-1">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-5 w-20" />
          </div>
          <Skeleton className="h-8 w-28 rounded-md" />
        </div>
      </div>
    </div>
  );
}

// ── Featured Services horizontal scroll ──────────────────────────────────────
function FeaturedServices() {
  const navigate = useNavigate();
  const { actorReady } = useAuth();
  const { data: services, isLoading } = useListServices(null);
  const featured = services?.slice(0, 6) ?? [];
  const showSkeletons = isLoading || !actorReady;

  return (
    <section
      className="bg-background py-16"
      data-ocid="home.featured-services.section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground">
              Featured Services
            </h2>
            <p className="text-muted-foreground mt-1 text-sm">
              Latest offerings from providers on the platform
            </p>
          </div>
          <Link
            to="/services"
            className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            data-ocid="home.view-all-services.link"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div
          className="flex gap-5 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none" }}
          data-ocid="home.featured-services.list"
          aria-busy={showSkeletons}
        >
          {showSkeletons ? (
            Array.from({ length: 5 }, (_, i) => `sk-${i}`).map((key) => (
              <div key={key} className="snap-start shrink-0">
                <ServiceCardSkeleton />
              </div>
            ))
          ) : featured.length > 0 ? (
            featured.map((service, i) => (
              <motion.div
                key={String(service.id)}
                className="snap-start shrink-0 w-72"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: i * 0.07 }}
                data-ocid={`home.featured-services.item.${i + 1}`}
              >
                <ServiceCard
                  service={service}
                  onRequestQuote={() =>
                    navigate({
                      to: "/services/$id",
                      params: { id: String(service.id) },
                    })
                  }
                />
              </motion.div>
            ))
          ) : (
            <div
              className="flex items-center justify-center w-full py-12 text-muted-foreground text-sm"
              data-ocid="home.featured-services.empty_state"
            >
              No services listed yet — be the first to post one.
            </div>
          )}
        </div>

        <div className="flex justify-center mt-6 sm:hidden">
          <Button
            asChild
            variant="outline"
            className="border-primary/30 text-primary hover:bg-primary/5"
            data-ocid="home.view-all-mobile.button"
          >
            <Link to="/services">
              View all services <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

// ── Category Grid ─────────────────────────────────────────────────────────────
function CategoryGrid() {
  return (
    <section
      className="bg-muted/30 py-16 border-y border-border"
      data-ocid="home.categories.section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground">
            Browse by Category
          </h2>
          <p className="text-muted-foreground mt-2 text-sm">
            Find exactly what you need across every service type
          </p>
        </div>

        <div
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4"
          data-ocid="home.categories.list"
        >
          {SERVICE_CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.value}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
              data-ocid={`home.categories.item.${i + 1}`}
            >
              <Link
                to="/services"
                search={{ category: cat.value } as never}
                className="group flex flex-col items-center gap-3 p-5 rounded-xl bg-card border border-border hover:border-primary/40 hover:shadow-md transition-smooth cursor-pointer text-center"
                data-ocid={`home.category-${cat.value}.link`}
              >
                <span
                  className="text-3xl group-hover:scale-110 transition-transform duration-200"
                  aria-hidden="true"
                >
                  {cat.icon}
                </span>
                <div className="font-display font-semibold text-sm text-foreground">
                  {cat.label}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── How It Works ──────────────────────────────────────────────────────────────
function HowItWorks() {
  return (
    <section
      className="bg-background py-16"
      data-ocid="home.how-it-works.section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground">
            How ServiceHub works
          </h2>
          <p className="text-muted-foreground mt-2 text-sm max-w-md mx-auto leading-relaxed">
            From quote to invoice, get the job done in four easy steps.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {HOW_IT_WORKS.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              data-ocid={`home.step.${i + 1}`}
              className="flex flex-col items-start gap-3"
            >
              <span className="font-display font-bold text-5xl text-primary/20 leading-none tabular-nums">
                {item.step}
              </span>
              <div>
                <h3 className="font-display font-semibold text-base text-foreground mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Trust Section ─────────────────────────────────────────────────────────────
function TrustSection() {
  return (
    <section
      className="bg-muted/30 border-y border-border py-16"
      data-ocid="home.trust.section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground">
            Why choose ServiceHub?
          </h2>
          <p className="text-muted-foreground mt-2 text-sm">
            Built from the ground up with trust and protection in mind
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TRUST_PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              data-ocid={`home.trust.item.${i + 1}`}
            >
              <Card className="bg-card border border-border hover:shadow-md transition-smooth h-full">
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    {pillar.icon}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground text-base mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Invoice Feature Strip ─────────────────────────────────────────────────────
function InvoiceFeature() {
  return (
    <section className="bg-background py-14" data-ocid="home.invoice.section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-6 bg-card border border-border rounded-2xl p-8 shadow-subtle"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
            <FileText className="w-7 h-7 text-accent" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="font-display font-semibold text-lg text-foreground mb-1">
              Auto-generated invoices for every job
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Every completed booking produces a printable invoice — always
              available for your records, accessible to both clients and
              providers.
            </p>
          </div>
          <Link to="/auth/register" data-ocid="home.invoice-cta.button">
            <Button
              variant="outline"
              className="border-border shrink-0 hover:bg-muted/50"
            >
              Get started
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ── Bottom CTA ────────────────────────────────────────────────────────────────
function BottomCTA() {
  return (
    <section className="bg-primary py-16" data-ocid="home.cta.section">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-6">
        <motion.h2
          className="font-display font-bold text-3xl md:text-4xl text-primary-foreground"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Ready to get started?
        </motion.h2>
        <motion.p
          className="text-primary-foreground/80 text-base max-w-md leading-relaxed"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          Join clients and providers already using ServiceHub for stress-free,
          escrow-protected work.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-3"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Button
            asChild
            size="lg"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold px-8"
            data-ocid="home.cta-get-started.button"
          >
            <Link to="/services">
              Browse Services
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 font-semibold px-8"
            data-ocid="home.cta-become-provider.button"
          >
            <Link to="/auth/register">Become a Provider</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div data-ocid="home.page">
      {/* Hero */}
      <section
        className="relative overflow-hidden bg-card border-b border-border"
        data-ocid="home.hero"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% -10%, oklch(0.56 0.14 183 / 0.12) 0%, transparent 70%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Badge
                variant="outline"
                className="border-primary/30 text-primary bg-primary/5 px-3 py-1 text-xs font-semibold tracking-wide"
              >
                Secure Escrow Payments
              </Badge>
            </motion.div>

            <motion.h1
              className="font-display font-bold text-4xl md:text-6xl text-foreground leading-tight tracking-tight"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Find trusted professionals{" "}
              <span className="text-primary">for any job</span>
            </motion.h1>

            <motion.p
              className="text-lg text-muted-foreground max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              ServiceHub connects you with skilled providers across every
              category. Every payment is escrow-protected — you only pay when
              you're satisfied.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 pt-2"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button
                asChild
                size="lg"
                className="button-primary px-8 font-semibold text-base"
                data-ocid="hero.browse-services.button"
              >
                <Link to="/services">
                  Browse Services
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="px-8 font-semibold text-base border-border hover:bg-muted/50"
                data-ocid="hero.become-provider.button"
              >
                <Link to="/auth/register">Become a Provider</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <FeaturedServices />
      <CategoryGrid />
      <HowItWorks />
      <TrustSection />
      <InvoiceFeature />
      <BottomCTA />
    </div>
  );
}
