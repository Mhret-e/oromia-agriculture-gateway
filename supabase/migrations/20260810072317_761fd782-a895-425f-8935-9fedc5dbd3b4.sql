CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own roles"
ON public.user_roles FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Lets the very first signed-in user become the administrator.
CREATE OR REPLACE FUNCTION public.claim_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  uid uuid := auth.uid();
BEGIN
  IF uid IS NULL THEN
    RETURN false;
  END IF;
  IF EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    RETURN public.has_role(uid, 'admin');
  END IF;
  INSERT INTO public.user_roles (user_id, role) VALUES (uid, 'admin')
  ON CONFLICT DO NOTHING;
  RETURN true;
END;
$$;

GRANT EXECUTE ON FUNCTION public.claim_admin() TO authenticated;

CREATE TABLE public.site_content (
  id text PRIMARY KEY,
  data jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.site_content TO anon;
GRANT SELECT, INSERT, UPDATE ON public.site_content TO authenticated;
GRANT ALL ON public.site_content TO service_role;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read site content"
ON public.site_content FOR SELECT TO anon, authenticated
USING (true);

CREATE POLICY "Admins can insert site content"
ON public.site_content FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update site content"
ON public.site_content FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

INSERT INTO public.site_content (id, data) VALUES ('v1', '{
  "brand": {"name": "Oromia", "subtitle": "Agriculture Bureau"},
  "hero": {
    "eyebrow": "Biiroo Qonnaa Oromiyaa",
    "titleLine1": "Growing Oromia,",
    "titleLine2": "season after season.",
    "subtitle": "The Oromia Agriculture Bureau works alongside millions of farming families to improve productivity, protect the land and connect harvests to markets.",
    "primaryCta": "Farmer services",
    "secondaryCta": "About the Bureau"
  },
  "stats": [
    {"value": "6.5M+", "label": "Smallholder farm households"},
    {"value": "21", "label": "Administrative zones served"},
    {"value": "12,400", "label": "Development agents in the field"},
    {"value": "38%", "label": "of national crop output"}
  ],
  "about": {
    "label": "Who we are",
    "title": "A bureau built around the farmer, not the office.",
    "paragraph1": "From the coffee forests of Jimma to the wheat plains of Arsi and the pastoral lowlands of Borana, our mandate is the same: help every household farm better, earn more and keep the soil productive for the next generation.",
    "paragraph2": "We coordinate extension services, input supply, irrigation development, livestock health and natural resource management across all zones and woredas of the region.",
    "pillars": [
      {"icon": "Sprout", "k": "Productivity", "v": "Better seed, better yields"},
      {"icon": "Droplets", "k": "Resilience", "v": "Water for every season"},
      {"icon": "Wheat", "k": "Food security", "v": "Surplus that stays local"},
      {"icon": "BarChart3", "k": "Markets", "v": "Fair prices for producers"}
    ]
  },
  "servicesSection": {"label": "Farmer services", "title": "Everything a farming household needs, in one place."},
  "services": [
    {"icon": "Sprout", "title": "Improved seed & inputs", "body": "Locate registered suppliers, check seasonal input availability and request fertilizer allocations for your kebele."},
    {"icon": "Droplets", "title": "Irrigation development", "body": "Small-scale irrigation scheme applications, water-user association support and watershed rehabilitation."},
    {"icon": "BookOpen", "title": "Extension & training", "body": "Farmer training centre schedules, crop calendars and practical guidance in Afaan Oromoo and Amharic."},
    {"icon": "Tractor", "title": "Mechanization access", "body": "Register for shared machinery services, tractor cooperatives and post-harvest handling equipment."},
    {"icon": "ShieldCheck", "title": "Plant & animal health", "body": "Pest and disease alerts, vaccination campaigns and veterinary clinic coverage across the zones."},
    {"icon": "BarChart3", "title": "Market information", "body": "Weekly reference prices for grain, coffee and livestock at major regional market centres."}
  ],
  "programsSection": {"label": "Flagship programs", "title": "Work happening in the field right now."},
  "programs": [
    {"image": "coffee", "tag": "Value chains", "title": "Coffee & specialty crops", "body": "Quality upgrading, washing station support and traceability for Oromia''s flagship export crop."},
    {"image": "extension", "tag": "Extension", "title": "Digital farmer advisory", "body": "Development agents equipped with tablets deliver season-specific advice directly to farm gates."},
    {"image": "irrigation", "tag": "Water", "title": "Irrigation & watershed", "body": "Expanding year-round production through community-managed schemes and soil conservation."}
  ],
  "newsSection": {"label": "Newsroom", "title": "Announcements & updates"},
  "news": [
    {"date": "12 Aug 2026", "title": "Meher season input distribution reaches 74% of target", "body": "Fertilizer and improved seed have been delivered to cooperative unions in 18 of 21 zones."},
    {"date": "04 Aug 2026", "title": "New farmer training centres opened in Bale and Jimma", "body": "Twelve centres begin operation with demonstration plots and practical field schools."},
    {"date": "27 Jul 2026", "title": "Livestock vaccination campaign launched", "body": "A regional campaign targets foot-and-mouth disease ahead of the highland grazing season."}
  ],
  "contact": {
    "label": "Get in touch",
    "title": "Reach the Bureau",
    "intro": "Farmers, cooperatives, investors and partner organisations can contact the regional office or the nearest zonal agriculture department.",
    "address": "Oromia Agriculture Bureau, Addis Ababa, Ethiopia",
    "phone": "+251 11 000 0000",
    "email": "info@oromiaagriculture.gov.et"
  },
  "footer": {"copyright": "© 2026 Oromia Agriculture Bureau. All rights reserved.", "tagline": "Biiroo Qonnaa Oromiyaa · ኦሮሚያ ግብርና ቢሮ"}
}'::jsonb);