import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { Plus, Trash2, Save, LogOut, ArrowLeft } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import {
  getSiteContent,
  saveSiteContent,
  getMyAdminStatus,
  claimAdmin,
} from "@/lib/content.functions";
import {
  iconNames,
  imageNames,
  type SiteContent,
  type NewsItem,
  type Program,
  type Service,
  type Stat,
  type Pillar,
} from "@/lib/site-content";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Content admin | Oromia Agriculture Bureau" },
      {
        name: "description",
        content:
          "Edit every section of the Oromia Agriculture Bureau landing page: hero, statistics, services, programs, news and contact details.",
      },
      { property: "og:title", content: "Content admin | Oromia Agriculture Bureau" },
      {
        property: "og:description",
        content: "Internal editor for the Bureau's public website content.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  errorComponent: ({ error }) => (
    <div className="p-10 text-sm text-destructive">{error.message}</div>
  ),
  component: AdminPage,
});

const tabs = [
  "Brand",
  "Hero",
  "Stats",
  "About",
  "Services",
  "Programs",
  "News",
  "Contact",
] as const;
type Tab = (typeof tabs)[number];

function AdminPage() {
  const navigate = useNavigate();
  const load = useServerFn(getSiteContent);
  const save = useServerFn(saveSiteContent);
  const status = useServerFn(getMyAdminStatus);
  const claim = useServerFn(claimAdmin);

  const [content, setContent] = useState<SiteContent | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [tab, setTab] = useState<Tab>("Hero");
  const [status_, setStatus] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    void (async () => {
      const [c, s] = await Promise.all([load(), status()]);
      setContent(c);
      if (s.isAdmin) {
        setIsAdmin(true);
      } else {
        const claimed = await claim();
        setIsAdmin(claimed.isAdmin);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function patch(next: Partial<SiteContent>) {
    setContent((c) => (c ? { ...c, ...next } : c));
  }

  async function onSave() {
    if (!content) return;
    setSaving(true);
    setStatus(null);
    try {
      await save({ data: { content } });
      setStatus("Saved. The public page now shows your changes.");
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Could not save.");
    } finally {
      setSaving(false);
    }
  }

  async function onSignOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  if (!content || isAdmin === null) {
    return <div className="p-10 text-sm text-muted-foreground">Loading editor…</div>;
  }

  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-lg p-10">
        <h1 className="font-display text-2xl font-semibold">No access</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          This account is not an administrator. Ask an existing administrator to grant
          you access.
        </p>
        <button onClick={onSignOut} className="mt-6 text-sm underline">
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/40">
      <header className="sticky top-0 z-40 border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div>
            <h1 className="font-display text-xl font-semibold text-foreground">
              Website content editor
            </h1>
            <p className="text-xs text-muted-foreground">Landing page (V1)</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm"
            >
              <ArrowLeft className="h-4 w-4" /> View site
            </a>
            <button
              onClick={onSave}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60"
            >
              <Save className="h-4 w-4" /> {saving ? "Saving…" : "Save changes"}
            </button>
            <button
              onClick={onSignOut}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </div>
        {status_ && (
          <p className="mx-auto max-w-6xl px-6 pb-3 text-sm text-primary">{status_}</p>
        )}
      </header>

      <div className="mx-auto max-w-6xl px-6 py-8">
        <nav className="flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                tab === t
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </nav>

        <div className="mt-8 space-y-6">
          {tab === "Brand" && (
            <Card title="Brand & footer">
              <Text
                label="Brand name"
                value={content.brand.name}
                onChange={(v) => patch({ brand: { ...content.brand, name: v } })}
              />
              <Text
                label="Brand subtitle"
                value={content.brand.subtitle}
                onChange={(v) => patch({ brand: { ...content.brand, subtitle: v } })}
              />
              <Text
                label="Footer copyright"
                value={content.footer.copyright}
                onChange={(v) => patch({ footer: { ...content.footer, copyright: v } })}
              />
              <Text
                label="Footer tagline"
                value={content.footer.tagline}
                onChange={(v) => patch({ footer: { ...content.footer, tagline: v } })}
              />
            </Card>
          )}

          {tab === "Hero" && (
            <Card title="Hero section">
              {(
                [
                  ["eyebrow", "Eyebrow"],
                  ["titleLine1", "Headline line 1"],
                  ["titleLine2", "Headline line 2 (accent)"],
                  ["primaryCta", "Primary button"],
                  ["secondaryCta", "Secondary button"],
                ] as const
              ).map(([k, label]) => (
                <Text
                  key={k}
                  label={label}
                  value={content.hero[k]}
                  onChange={(v) => patch({ hero: { ...content.hero, [k]: v } })}
                />
              ))}
              <Area
                label="Subtitle"
                value={content.hero.subtitle}
                onChange={(v) => patch({ hero: { ...content.hero, subtitle: v } })}
              />
            </Card>
          )}

          {tab === "Stats" && (
            <ListEditor<Stat>
              title="Statistics band"
              items={content.stats}
              onChange={(stats) => patch({ stats })}
              blank={{ value: "", label: "" }}
              render={(item, update) => (
                <>
                  <Text label="Value" value={item.value} onChange={(v) => update({ value: v })} />
                  <Text label="Label" value={item.label} onChange={(v) => update({ label: v })} />
                </>
              )}
            />
          )}

          {tab === "About" && (
            <>
              <Card title="About section">
                <Text
                  label="Label"
                  value={content.about.label}
                  onChange={(v) => patch({ about: { ...content.about, label: v } })}
                />
                <Text
                  label="Title"
                  value={content.about.title}
                  onChange={(v) => patch({ about: { ...content.about, title: v } })}
                />
                <Area
                  label="Paragraph 1"
                  value={content.about.paragraph1}
                  onChange={(v) => patch({ about: { ...content.about, paragraph1: v } })}
                />
                <Area
                  label="Paragraph 2"
                  value={content.about.paragraph2}
                  onChange={(v) => patch({ about: { ...content.about, paragraph2: v } })}
                />
              </Card>
              <ListEditor<Pillar>
                title="About cards"
                items={content.about.pillars}
                onChange={(pillars) => patch({ about: { ...content.about, pillars } })}
                blank={{ icon: "Sprout", k: "", v: "" }}
                render={(item, update) => (
                  <>
                    <Select
                      label="Icon"
                      value={item.icon}
                      options={[...iconNames]}
                      onChange={(v) => update({ icon: v })}
                    />
                    <Text label="Title" value={item.k} onChange={(v) => update({ k: v })} />
                    <Text label="Caption" value={item.v} onChange={(v) => update({ v })} />
                  </>
                )}
              />
            </>
          )}

          {tab === "Services" && (
            <>
              <Card title="Services heading">
                <Text
                  label="Label"
                  value={content.servicesSection.label}
                  onChange={(v) =>
                    patch({ servicesSection: { ...content.servicesSection, label: v } })
                  }
                />
                <Text
                  label="Title"
                  value={content.servicesSection.title}
                  onChange={(v) =>
                    patch({ servicesSection: { ...content.servicesSection, title: v } })
                  }
                />
              </Card>
              <ListEditor<Service>
                title="Service cards"
                items={content.services}
                onChange={(services) => patch({ services })}
                blank={{ icon: "Sprout", title: "", body: "" }}
                render={(item, update) => (
                  <>
                    <Select
                      label="Icon"
                      value={item.icon}
                      options={[...iconNames]}
                      onChange={(v) => update({ icon: v })}
                    />
                    <Text label="Title" value={item.title} onChange={(v) => update({ title: v })} />
                    <Area label="Body" value={item.body} onChange={(v) => update({ body: v })} />
                  </>
                )}
              />
            </>
          )}

          {tab === "Programs" && (
            <>
              <Card title="Programs heading">
                <Text
                  label="Label"
                  value={content.programsSection.label}
                  onChange={(v) =>
                    patch({ programsSection: { ...content.programsSection, label: v } })
                  }
                />
                <Text
                  label="Title"
                  value={content.programsSection.title}
                  onChange={(v) =>
                    patch({ programsSection: { ...content.programsSection, title: v } })
                  }
                />
              </Card>
              <ListEditor<Program>
                title="Program cards"
                items={content.programs}
                onChange={(programs) => patch({ programs })}
                blank={{ image: "coffee", tag: "", title: "", body: "" }}
                render={(item, update) => (
                  <>
                    <Select
                      label="Image"
                      value={item.image}
                      options={[...imageNames]}
                      onChange={(v) => update({ image: v })}
                    />
                    <Text label="Tag" value={item.tag} onChange={(v) => update({ tag: v })} />
                    <Text label="Title" value={item.title} onChange={(v) => update({ title: v })} />
                    <Area label="Body" value={item.body} onChange={(v) => update({ body: v })} />
                  </>
                )}
              />
            </>
          )}

          {tab === "News" && (
            <>
              <Card title="News heading">
                <Text
                  label="Label"
                  value={content.newsSection.label}
                  onChange={(v) => patch({ newsSection: { ...content.newsSection, label: v } })}
                />
                <Text
                  label="Title"
                  value={content.newsSection.title}
                  onChange={(v) => patch({ newsSection: { ...content.newsSection, title: v } })}
                />
              </Card>
              <ListEditor<NewsItem>
                title="Announcements"
                items={content.news}
                onChange={(news) => patch({ news })}
                blank={{ date: "", title: "", body: "" }}
                render={(item, update) => (
                  <>
                    <Text label="Date" value={item.date} onChange={(v) => update({ date: v })} />
                    <Text label="Title" value={item.title} onChange={(v) => update({ title: v })} />
                    <Area label="Body" value={item.body} onChange={(v) => update({ body: v })} />
                  </>
                )}
              />
            </>
          )}

          {tab === "Contact" && (
            <Card title="Contact section">
              {(
                [
                  ["label", "Label"],
                  ["title", "Title"],
                  ["address", "Address"],
                  ["phone", "Phone"],
                  ["email", "Email"],
                ] as const
              ).map(([k, label]) => (
                <Text
                  key={k}
                  label={label}
                  value={content.contact[k]}
                  onChange={(v) => patch({ contact: { ...content.contact, [k]: v } })}
                />
              ))}
              <Area
                label="Intro"
                value={content.contact.intro}
                onChange={(v) => patch({ contact: { ...content.contact, intro: v } })}
              />
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <h2 className="font-display text-lg font-semibold text-foreground">{title}</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">{children}</div>
    </section>
  );
}

function Text({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring"
      />
    </div>
  );
}

function Area({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="md:col-span-2">
      <label className="block text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </label>
      <textarea
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring"
      />
    </div>
  );
}

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function ListEditor<T extends object>({
  title,
  items,
  onChange,
  blank,
  render,
}: {
  title: string;
  items: T[];
  onChange: (items: T[]) => void;
  blank: T;
  render: (item: T, update: (patch: Partial<T>) => void) => React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold text-foreground">{title}</h2>
        <button
          onClick={() => onChange([...items, { ...blank }])}
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm"
        >
          <Plus className="h-4 w-4" /> Add
        </button>
      </div>

      <div className="mt-5 space-y-5">
        {items.map((item, i) => (
          <div key={i} className="rounded-xl border border-border bg-background/60 p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Item {i + 1}
              </span>
              <button
                onClick={() => onChange(items.filter((_, j) => j !== i))}
                className="inline-flex items-center gap-1.5 text-xs text-destructive"
              >
                <Trash2 className="h-3.5 w-3.5" /> Remove
              </button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {render(item, (p) =>
                onChange(items.map((it, j) => (j === i ? { ...it, ...p } : it))),
              )}
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-sm text-muted-foreground">No items yet.</p>
        )}
      </div>
    </section>
  );
}