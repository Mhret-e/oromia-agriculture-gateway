export type Stat = { value: string; label: string };
export type Pillar = { icon: string; k: string; v: string };
export type Service = { icon: string; title: string; body: string };
export type Program = { image: string; tag: string; title: string; body: string };
export type NewsItem = { date: string; title: string; body: string };

export type SiteContent = {
  brand: { name: string; subtitle: string };
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
  };
  stats: Stat[];
  about: {
    label: string;
    title: string;
    paragraph1: string;
    paragraph2: string;
    pillars: Pillar[];
  };
  servicesSection: { label: string; title: string };
  services: Service[];
  programsSection: { label: string; title: string };
  programs: Program[];
  newsSection: { label: string; title: string };
  news: NewsItem[];
  contact: {
    label: string;
    title: string;
    intro: string;
    address: string;
    phone: string;
    email: string;
  };
  footer: { copyright: string; tagline: string };
};

export const defaultContent: SiteContent = {
  brand: { name: "Oromia", subtitle: "Agriculture Bureau" },
  hero: {
    eyebrow: "Biiroo Qonnaa Oromiyaa",
    titleLine1: "Growing Oromia,",
    titleLine2: "season after season.",
    subtitle:
      "The Oromia Agriculture Bureau works alongside millions of farming families to improve productivity, protect the land and connect harvests to markets.",
    primaryCta: "Farmer services",
    secondaryCta: "About the Bureau",
  },
  stats: [
    { value: "6.5M+", label: "Smallholder farm households" },
    { value: "21", label: "Administrative zones served" },
    { value: "12,400", label: "Development agents in the field" },
    { value: "38%", label: "of national crop output" },
  ],
  about: {
    label: "Who we are",
    title: "A bureau built around the farmer, not the office.",
    paragraph1:
      "From the coffee forests of Jimma to the wheat plains of Arsi and the pastoral lowlands of Borana, our mandate is the same: help every household farm better, earn more and keep the soil productive for the next generation.",
    paragraph2:
      "We coordinate extension services, input supply, irrigation development, livestock health and natural resource management across all zones and woredas of the region.",
    pillars: [
      { icon: "Sprout", k: "Productivity", v: "Better seed, better yields" },
      { icon: "Droplets", k: "Resilience", v: "Water for every season" },
      { icon: "Wheat", k: "Food security", v: "Surplus that stays local" },
      { icon: "BarChart3", k: "Markets", v: "Fair prices for producers" },
    ],
  },
  servicesSection: {
    label: "Farmer services",
    title: "Everything a farming household needs, in one place.",
  },
  services: [],
  programsSection: {
    label: "Flagship programs",
    title: "Work happening in the field right now.",
  },
  programs: [],
  newsSection: { label: "Newsroom", title: "Announcements & updates" },
  news: [],
  contact: {
    label: "Get in touch",
    title: "Reach the Bureau",
    intro:
      "Farmers, cooperatives, investors and partner organisations can contact the regional office or the nearest zonal agriculture department.",
    address: "Oromia Agriculture Bureau, Addis Ababa, Ethiopia",
    phone: "+251 11 000 0000",
    email: "info@oromiaagriculture.gov.et",
  },
  footer: {
    copyright: "© 2026 Oromia Agriculture Bureau. All rights reserved.",
    tagline: "Biiroo Qonnaa Oromiyaa · ኦሮሚያ ግብርና ቢሮ",
  },
};

export const iconNames = [
  "Sprout",
  "Droplets",
  "Tractor",
  "BookOpen",
  "ShieldCheck",
  "BarChart3",
  "Wheat",
] as const;

export const imageNames = ["coffee", "extension", "irrigation", "hero-fields"] as const;