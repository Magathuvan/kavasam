CREATE TABLE public.threat_flags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  feed text NOT NULL CHECK (feed IN ('kev','openphish')),
  indicator text NOT NULL CHECK (char_length(indicator) BETWEEN 1 AND 2048),
  reason text CHECK (reason IS NULL OR char_length(reason) <= 1000),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','confirmed','rejected')),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX threat_flags_indicator_idx ON public.threat_flags (feed, indicator);
GRANT INSERT ON public.threat_flags TO anon, authenticated;
GRANT ALL ON public.threat_flags TO service_role;
ALTER TABLE public.threat_flags ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can flag a false positive" ON public.threat_flags FOR INSERT TO anon, authenticated WITH CHECK (status = 'pending');

CREATE OR REPLACE FUNCTION public.threat_flag_counts(_feed text, _indicators text[])
RETURNS TABLE(indicator text, flags bigint, status text)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT f.indicator, count(*)::bigint,
    CASE WHEN bool_or(f.status = 'confirmed') THEN 'confirmed' WHEN bool_and(f.status = 'rejected') THEN 'rejected' ELSE 'pending' END
  FROM public.threat_flags f
  WHERE f.feed = _feed AND f.indicator = ANY(_indicators[1:200])
  GROUP BY f.indicator
$$;
GRANT EXECUTE ON FUNCTION public.threat_flag_counts(text, text[]) TO anon, authenticated;