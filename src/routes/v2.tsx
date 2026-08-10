import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Menu,
  X,
  Wheat,
  Sprout,
  Droplets,
  Tractor,
  BookOpen,
  ShieldCheck,
  BarChart3,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

import { VersionSwitch } from "@/components/version-switch";
import heroFields from "@/assets/hero-fields.jpg";
import coffee from "@/assets/coffee.jpg";
import extension from "@/assets/extension.jpg";
import irrigation from "@/assets/irrigation.jpg";

export const Route = createFileRoute("/v2")({
  head: () => ({
    meta: [
      { title: "Oromia Agriculture Bureau | Land, Water, Harvest" },
      {
        name: "description",
        content:
          "An editorial view of the Oromia Agriculture Bureau: extension, irrigation, input supply and livestock services for 6.5 million farming households.",
      },
      { property: "og:title", content: "Oromia Agriculture Bureau | Land, Water, Harvest" },
      {
        property: "og:description",
        content:
          "Extension, irrigation, input supply and livestock services for farming households across Oromia.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: V2,
});

const links = [
  { href: "#mandate", label: "Mandate" },
  { href: "#desk", label: "Service desk" },
  { href: "#field", label: "In the field" },
  { href: "#bulletin", label: "Bulletin" },
  { href: "#office", label: "Office" },
];

const services = [
  { icon: Sprout, no: "01", title: "Improved seed & inputs", body: "Registered suppliers, seasonal availability and fertilizer allocation per kebele." },
  { icon: Droplets, no: "02", title: "Irrigation development", body: "Scheme applications, water-user associations and watershed rehabilitation." },
  { icon: BookOpen, no: "03", title: "Extension & training", body: "Training centre schedules and crop calendars in Afaan Oromoo and Amharic." },
  { icon: Tractor, no: "04", title: "Mechanization access", body: "Shared machinery, tractor cooperatives and post-harvest equipment." },
  { icon: ShieldCheck, no: "05", title: "Plant & animal health", body: "Pest alerts, vaccination campaigns and veterinary clinic coverage." },
  { icon: BarChart3, no: "06", title: "Market information", body: "Weekly reference prices for grain, coffee and livestock." },
];

const field = [
  { image: coffee, tag: "Value chains", title: "Coffee & specialty crops", body: "Quality upgrading, washing station support and traceability for the region's flagship export." },
  { image: extension, tag: "Extension", title: "Digital farmer advisory", body: "Development agents deliver season-specific advice directly at the farm gate." },
  { image: irrigation, tag: "Water", title: "Irrigation & watershed", body: "Year-round production through community-managed schemes and soil conservation." },
];

const bulletin = [
  { date: "12 Aug 2026", zone: "Region-wide", title: "Meher season input distribution reaches 74% of target" },
  { date: "04 Aug 2026", zone: "Bale · Jimma", title: "New farmer training centres opened" },
  { date: "27 Jul 2026", zone: "Highlands", title: "Livestock vaccination campaign launched" },
  { date: "19 Jul 2026", zone: "Arsi", title: "Wheat cluster farming expands to 41 woredas" },
];

function V2() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-deep text-deep-foreground">
      <VersionSwitch />

      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-deep-foreground/12 bg-deep/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-accent text-accent-foreground">
              <Wheat className="h-5 w-5" />
            </span>
            <span className="font-display text-base font-semibold tracking-tight">
              Biiroo Qonnaa Oromiyaa
            </span>
          </a>
          <nav className="hidden items-center gap-7 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-xs font-semibold uppercase tracking-[0.14em] text-deep-foreground/70 transition-colors hover:text-accent"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {open && (
          <div className="border-t border-deep-foreground/12 px-6 py-3 md:hidden">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-2 text-sm font-medium text-deep-foreground/80"
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Split hero */}
      <section id="top" className="mx-auto grid max-w-6xl gap-10 px-6 pb-16 pt-14 lg:grid-cols-[1.05fr_1fr] lg:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
            Regional Government of Oromia
          </p>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.02] sm:text-6xl">
            Land, water and
            <span className="block italic text-accent">the year&apos;s harvest.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-deep-foreground/75">
            The Agriculture Bureau serves 6.5 million farming households across 21 zones —
            coordinating extension, inputs, irrigation and livestock health from the coffee
            forests of Jimma to the pastoral lowlands of Borana.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#desk"
              className="inline-flex items-center gap-2 rounded-sm bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground"
            >
              Service desk <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="#mandate"
              className="inline-flex items-center gap-2 rounded-sm border border-deep-foreground/25 px-6 py-3 text-sm font-semibold transition-colors hover:bg-deep-foreground/10"
            >
              Our mandate
            </a>
          </div>
        </div>

        <figure className="relative">
          <img
            src={heroFields}
            alt="Highland farmland in Oromia at golden hour"
            width={1920}
            height={1088}
            className="aspect-[4/5] w-full rounded-sm object-cover grayscale-[15%]"
          />
          <figcaption className="absolute bottom-0 left-0 right-0 bg-deep/80 px-5 py-3 text-xs uppercase tracking-[0.18em] text-deep-foreground/80 backdrop-blur">
            Meher season · highland wheat belt
          </figcaption>
        </figure>
      </section>

      {/* Ticker stats */}
      <section className="border-y border-deep-foreground/12">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-deep-foreground/12 px-6 md:grid-cols-4 md:divide-x">
          {[
            ["6.5M+", "Farm households"],
            ["21", "Zones served"],
            ["12,400", "Development agents"],
            ["38%", "of national crop output"],
          ].map(([v, l], i) => (
            <div key={l} className={"py-8 " + (i % 2 === 1 ? "pl-6" : "md:pl-6")}>
              <p className="font-display text-3xl font-semibold text-accent">{v}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-deep-foreground/60">
                {l}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Mandate */}
      <section id="mandate" className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-[220px_1fr]">
          <h2 className="font-display text-sm font-semibold uppercase tracking-[0.22em] text-accent">
            Mandate
          </h2>
          <div>
            <p className="font-display text-2xl leading-snug sm:text-3xl">
              Help every household farm better, earn more, and keep the soil productive for
              the next generation.
            </p>
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              {[
                ["Productivity", "Improved seed, agronomy and cluster farming raise yields per hectare."],
                ["Resilience", "Irrigation and watershed work reduce dependence on a single rainy season."],
                ["Food security", "Surplus that stays local, with strengthened storage and cooperative reserves."],
                ["Markets", "Transparent prices and stronger links between producers and buyers."],
              ].map(([k, v]) => (
                <div key={k} className="border-t border-deep-foreground/15 pt-5">
                  <p className="font-display text-lg font-semibold">{k}</p>
                  <p className="mt-2 text-sm leading-relaxed text-deep-foreground/70">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service desk — numbered list */}
      <section id="desk" className="bg-background py-20 text-foreground">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-4xl font-semibold sm:text-5xl">Service desk</h2>
            <p className="max-w-sm text-sm text-muted-foreground">
              Six services available at every zonal and woreda agriculture office.
            </p>
          </div>

          <div className="mt-12 border-t border-border">
            {services.map((s) => (
              <article
                key={s.title}
                className="group grid gap-3 border-b border-border py-7 transition-colors hover:bg-secondary/50 md:grid-cols-[70px_1fr_1fr] md:items-center md:gap-8 md:px-3"
              >
                <span className="font-display text-sm text-muted-foreground">{s.no}</span>
                <div className="flex items-center gap-4">
                  <s.icon className="h-5 w-5 shrink-0 text-primary" />
                  <h3 className="text-xl font-semibold">{s.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* In the field — zigzag */}
      <section id="field" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-display text-sm font-semibold uppercase tracking-[0.22em] text-accent">
          In the field
        </h2>
        <div className="mt-10 space-y-14">
          {field.map((p, i) => (
            <article
              key={p.title}
              className={
                "grid items-center gap-8 lg:grid-cols-2 " + (i % 2 ? "lg:[&>figure]:order-2" : "")
              }
            >
              <figure>
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  width={1200}
                  height={900}
                  className="aspect-[3/2] w-full rounded-sm object-cover"
                />
              </figure>
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  {p.tag}
                </span>
                <h3 className="mt-3 font-display text-3xl font-semibold">{p.title}</h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-deep-foreground/75">
                  {p.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Bulletin */}
      <section id="bulletin" className="bg-background py-20 text-foreground">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-4xl font-semibold sm:text-5xl">Bulletin</h2>
          <div className="mt-10 border-t border-border">
            {bulletin.map((n) => (
              <a
                key={n.title}
                href="#bulletin"
                className="grid items-baseline gap-1 border-b border-border py-6 transition-colors hover:bg-secondary/50 md:grid-cols-[130px_150px_1fr] md:gap-8 md:px-3"
              >
                <span className="text-sm text-muted-foreground">{n.date}</span>
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  {n.zone}
                </span>
                <span className="text-lg font-semibold">{n.title}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Office */}
      <section id="office" className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl font-semibold sm:text-5xl">Office</h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-deep-foreground/75">
              Farmers, cooperatives, investors and partner organisations can reach the regional
              office or the nearest zonal agriculture department.
            </p>
            <ul className="mt-8 space-y-4 text-sm text-deep-foreground/80">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-accent" /> Oromia Agriculture Bureau, Addis Ababa
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 text-accent" /> +251 11 000 0000
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 text-accent" /> info@oromiaagriculture.gov.et
              </li>
            </ul>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {[
              { label: "Full name", placeholder: "Maqaa guutuu" },
              { label: "Zone / Woreda", placeholder: "e.g. Arsi, Tiyo" },
              { label: "Email or phone", placeholder: "you@example.com" },
            ].map((f) => (
              <div key={f.label}>
                <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-deep-foreground/60">
                  {f.label}
                </label>
                <input
                  placeholder={f.placeholder}
                  className="mt-2 w-full border-b border-deep-foreground/25 bg-transparent py-2.5 text-sm outline-none placeholder:text-deep-foreground/35 focus:border-accent"
                />
              </div>
            ))}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-deep-foreground/60">
                Message
              </label>
              <textarea
                rows={4}
                placeholder="How can we help?"
                className="mt-2 w-full border-b border-deep-foreground/25 bg-transparent py-2.5 text-sm outline-none placeholder:text-deep-foreground/35 focus:border-accent"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-sm bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground"
            >
              Send message <ArrowUpRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </section>

      <footer className="border-t border-deep-foreground/12">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-3 px-6 py-8 pb-20 text-xs text-deep-foreground/55 sm:flex-row">
          <p>© 2026 Oromia Agriculture Bureau</p>
          <p>Biiroo Qonnaa Oromiyaa · ኦሮሚያ ግብርና ቢሮ</p>
        </div>
      </footer>
    </div>
  );
}