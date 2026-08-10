import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Sprout,
  Droplets,
  Tractor,
  BookOpen,
  ShieldCheck,
  BarChart3,
  MapPin,
  Phone,
  Mail,
  Wheat,
} from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { VersionSwitch } from "@/components/version-switch";
import { getSiteContent } from "@/lib/content.functions";
import { defaultContent, type SiteContent } from "@/lib/site-content";
import heroFields from "@/assets/hero-fields.jpg";
import coffee from "@/assets/coffee.jpg";
import extension from "@/assets/extension.jpg";
import irrigation from "@/assets/irrigation.jpg";

const iconMap: Record<string, typeof Sprout> = {
  Sprout,
  Droplets,
  Tractor,
  BookOpen,
  ShieldCheck,
  BarChart3,
  Wheat,
};

const imageMap: Record<string, string> = {
  coffee,
  extension,
  irrigation,
  "hero-fields": heroFields,
};

export const Route = createFileRoute("/")({
  loader: () => getSiteContent(),
  errorComponent: ({ error }) => (
    <div className="p-10 text-sm text-destructive">{error.message}</div>
  ),
  notFoundComponent: () => <div className="p-10 text-sm">Page not found.</div>,
  head: () => ({
    meta: [
      { title: "Oromia Agriculture Bureau | Growing Oromia Together" },
      {
        name: "description",
        content:
          "Official portal of the Oromia Agriculture Bureau: farmer services, extension programs, input supply, irrigation and livestock development across Oromia.",
      },
      { property: "og:title", content: "Oromia Agriculture Bureau | Growing Oromia Together" },
      {
        property: "og:description",
        content:
          "Farmer services, extension programs, input supply and irrigation development across the Oromia region.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const c: SiteContent = (Route.useLoaderData() as SiteContent | undefined) ?? defaultContent;
  const { stats, services, programs, news } = c;

  return (
    <div id="top" className="min-h-screen bg-background">
      <VersionSwitch />
      <SiteHeader />

      {/* Hero */}
      <section className="relative isolate min-h-[92vh] overflow-hidden">
        <img
          src={heroFields}
          alt="Farmer walking through highland fields in Oromia at golden hour"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />

        <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-end px-6 pb-20 pt-40">
          <p className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-deep-foreground/25 bg-deep/40 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-deep-foreground/90 backdrop-blur">
            {c.hero.eyebrow}
          </p>
          <h1 className="max-w-4xl font-display text-5xl font-semibold leading-[1.05] text-deep-foreground sm:text-6xl lg:text-7xl">
            {c.hero.titleLine1}
            <span className="block text-accent">{c.hero.titleLine2}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-deep-foreground/85">
            {c.hero.subtitle}
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground shadow-soft transition-transform hover:-translate-y-0.5"
            >
              {c.hero.primaryCta} <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-2 rounded-full border border-deep-foreground/35 px-7 py-3.5 text-sm font-semibold text-deep-foreground transition-colors hover:bg-deep-foreground/10"
            >
              {c.hero.secondaryCta}
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 px-6 py-14 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="px-2">
              <p className="font-display text-4xl font-semibold text-primary lg:text-5xl">
                {s.value}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionLabel>{c.about.label}</SectionLabel>
            <h2 className="mt-4 text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
              {c.about.title}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              {c.about.paragraph1}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {c.about.paragraph2}
            </p>
            <div className="mt-8 h-1 w-40 rule-accent rounded-full" />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {c.about.pillars.map((p) => {
              const Icon = iconMap[p.icon] ?? Sprout;
              return (
                <div
                  key={p.k}
                  className="rounded-2xl border border-border bg-card p-6 shadow-soft"
                >
                  <Icon className="h-7 w-7 text-primary" />
                  <p className="mt-4 font-display text-lg font-semibold text-foreground">
                    {p.k}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{p.v}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="bg-secondary/60 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionLabel>{c.servicesSection.label}</SectionLabel>
          <h2 className="mt-4 max-w-2xl text-4xl font-semibold text-foreground sm:text-5xl">
            {c.servicesSection.title}
          </h2>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => {
              const Icon = iconMap[s.icon] ?? Sprout;
              return (
                <article
                  key={s.title}
                  className="group rounded-2xl border border-border bg-card p-8 transition-all hover:-translate-y-1 hover:shadow-soft"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 text-xl font-semibold text-foreground">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {s.body}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="mx-auto max-w-7xl px-6 py-24">
        <SectionLabel>{c.programsSection.label}</SectionLabel>
        <h2 className="mt-4 max-w-2xl text-4xl font-semibold text-foreground sm:text-5xl">
          {c.programsSection.title}
        </h2>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {programs.map((p) => (
            <article key={p.title} className="overflow-hidden rounded-3xl bg-card shadow-soft">
              <img
                src={imageMap[p.image] ?? coffee}
                alt={p.title}
                loading="lazy"
                width={1200}
                height={900}
                className="h-60 w-full object-cover"
              />
              <div className="p-7">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-foreground/70">
                  {p.tag}
                </span>
                <h3 className="mt-3 text-2xl font-semibold text-foreground">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* News */}
      <section id="news" className="bg-deep py-24 text-deep-foreground">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                {c.newsSection.label}
              </p>
              <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">
                {c.newsSection.title}
              </h2>
            </div>
            <a
              href="#news"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
            >
              All announcements <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-12 divide-y divide-deep-foreground/15 border-y border-deep-foreground/15">
            {news.map((n) => (
              <article
                key={n.title}
                className="grid gap-3 py-8 transition-colors hover:bg-deep-foreground/5 md:grid-cols-[160px_1fr]"
              >
                <p className="text-sm text-deep-foreground/60">{n.date}</p>
                <div>
                  <h3 className="text-xl font-semibold">{n.title}</h3>
                  <p className="mt-2 max-w-3xl text-sm text-deep-foreground/70">{n.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <SectionLabel>{c.contact.label}</SectionLabel>
            <h2 className="mt-4 text-4xl font-semibold text-foreground sm:text-5xl">
              {c.contact.title}
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
              {c.contact.intro}
            </p>

            <ul className="mt-10 space-y-5 text-sm">
              <li className="flex items-start gap-4">
                <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                <span className="text-muted-foreground">{c.contact.address}</span>
              </li>
              <li className="flex items-start gap-4">
                <Phone className="mt-0.5 h-5 w-5 text-primary" />
                <span className="text-muted-foreground">{c.contact.phone}</span>
              </li>
              <li className="flex items-start gap-4">
                <Mail className="mt-0.5 h-5 w-5 text-primary" />
                <span className="text-muted-foreground">{c.contact.email}</span>
              </li>
            </ul>
          </div>

          <form
            className="rounded-3xl border border-border bg-card p-8 shadow-soft"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full name" placeholder="Maqaa guutuu" />
              <Field label="Zone / Woreda" placeholder="e.g. Arsi, Tiyo" />
            </div>
            <div className="mt-5">
              <Field label="Email or phone" placeholder="you@example.com" />
            </div>
            <div className="mt-5">
              <label className="block text-sm font-medium text-foreground">Message</label>
              <textarea
                rows={5}
                placeholder="How can we help?"
                className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring"
              />
            </div>
            <button
              type="submit"
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Send message <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </section>

      <footer className="border-t border-border bg-card">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-muted-foreground sm:flex-row">
          <p>{c.footer.copyright}</p>
          <p>{c.footer.tagline}</p>
        </div>
      </footer>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
      {children}
    </p>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground">{label}</label>
      <input
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring"
      />
    </div>
  );
}
