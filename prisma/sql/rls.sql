-- Row Level Security for multi-user isolation
-- Apply after schema push: psql $DATABASE_URL -f prisma/sql/rls.sql
-- Or: npx tsx prisma/apply-rls.ts
--
-- Context variables (set per transaction):
--   app.current_user_id  — internal User.id for user-facing requests
--   app.role             — 'service' for cron / Inngest / webhooks
--
-- FORCE ROW LEVEL SECURITY so the table owner (Neon role) cannot bypass policies.

-- ===========================================
-- Helper: drop policies if re-applying
-- ===========================================

DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN
    SELECT schemaname, tablename, policyname
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename IN (
        'User', 'UserJob', 'SearchConfig', 'UserProfile',
        'GeneratedEmail', 'Subscription', 'Job', 'ScrapeLog', 'SiteConfig'
      )
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I', r.policyname, r.schemaname, r.tablename);
  END LOOP;
END $$;

-- ===========================================
-- User
-- ===========================================

ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "User" FORCE ROW LEVEL SECURITY;

CREATE POLICY user_select_own ON "User"
  FOR SELECT
  USING (
    current_setting('app.role', true) = 'service'
    OR id = current_setting('app.current_user_id', true)
  );

CREATE POLICY user_update_own ON "User"
  FOR UPDATE
  USING (
    current_setting('app.role', true) = 'service'
    OR id = current_setting('app.current_user_id', true)
  )
  WITH CHECK (
    current_setting('app.role', true) = 'service'
    OR id = current_setting('app.current_user_id', true)
  );

CREATE POLICY user_insert_service ON "User"
  FOR INSERT
  WITH CHECK (
    current_setting('app.role', true) = 'service'
    OR id = current_setting('app.current_user_id', true)
  );

CREATE POLICY user_delete_service ON "User"
  FOR DELETE
  USING (current_setting('app.role', true) = 'service');

-- ===========================================
-- SearchConfig
-- ===========================================

ALTER TABLE "SearchConfig" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "SearchConfig" FORCE ROW LEVEL SECURITY;

CREATE POLICY search_config_all ON "SearchConfig"
  FOR ALL
  USING (
    current_setting('app.role', true) = 'service'
    OR "userId" = current_setting('app.current_user_id', true)
  )
  WITH CHECK (
    current_setting('app.role', true) = 'service'
    OR "userId" = current_setting('app.current_user_id', true)
  );

-- ===========================================
-- UserProfile
-- ===========================================

ALTER TABLE "UserProfile" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "UserProfile" FORCE ROW LEVEL SECURITY;

CREATE POLICY user_profile_all ON "UserProfile"
  FOR ALL
  USING (
    current_setting('app.role', true) = 'service'
    OR "userId" = current_setting('app.current_user_id', true)
  )
  WITH CHECK (
    current_setting('app.role', true) = 'service'
    OR "userId" = current_setting('app.current_user_id', true)
  );

-- ===========================================
-- UserJob
-- ===========================================

ALTER TABLE "UserJob" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "UserJob" FORCE ROW LEVEL SECURITY;

CREATE POLICY user_job_all ON "UserJob"
  FOR ALL
  USING (
    current_setting('app.role', true) = 'service'
    OR "userId" = current_setting('app.current_user_id', true)
  )
  WITH CHECK (
    current_setting('app.role', true) = 'service'
    OR "userId" = current_setting('app.current_user_id', true)
  );

-- ===========================================
-- GeneratedEmail
-- ===========================================

ALTER TABLE "GeneratedEmail" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "GeneratedEmail" FORCE ROW LEVEL SECURITY;

CREATE POLICY generated_email_all ON "GeneratedEmail"
  FOR ALL
  USING (
    current_setting('app.role', true) = 'service'
    OR "userId" = current_setting('app.current_user_id', true)
  )
  WITH CHECK (
    current_setting('app.role', true) = 'service'
    OR "userId" = current_setting('app.current_user_id', true)
  );

-- ===========================================
-- Subscription
-- ===========================================

ALTER TABLE "Subscription" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Subscription" FORCE ROW LEVEL SECURITY;

CREATE POLICY subscription_select_own ON "Subscription"
  FOR SELECT
  USING (
    current_setting('app.role', true) = 'service'
    OR "userId" = current_setting('app.current_user_id', true)
  );

CREATE POLICY subscription_write_service ON "Subscription"
  FOR ALL
  USING (current_setting('app.role', true) = 'service')
  WITH CHECK (current_setting('app.role', true) = 'service');

-- ===========================================
-- Job (shared catalog)
-- ===========================================

ALTER TABLE "Job" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Job" FORCE ROW LEVEL SECURITY;

-- Authenticated users can read the catalog when their user id is set
CREATE POLICY job_select_authenticated ON "Job"
  FOR SELECT
  USING (
    current_setting('app.role', true) = 'service'
    OR (
      current_setting('app.current_user_id', true) IS NOT NULL
      AND current_setting('app.current_user_id', true) <> ''
    )
  );

CREATE POLICY job_write_service ON "Job"
  FOR INSERT
  WITH CHECK (current_setting('app.role', true) = 'service');

CREATE POLICY job_update_service ON "Job"
  FOR UPDATE
  USING (current_setting('app.role', true) = 'service')
  WITH CHECK (current_setting('app.role', true) = 'service');

CREATE POLICY job_delete_service ON "Job"
  FOR DELETE
  USING (current_setting('app.role', true) = 'service');

-- ===========================================
-- ScrapeLog / SiteConfig (service only)
-- ===========================================

ALTER TABLE "ScrapeLog" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ScrapeLog" FORCE ROW LEVEL SECURITY;

CREATE POLICY scrape_log_service ON "ScrapeLog"
  FOR ALL
  USING (current_setting('app.role', true) = 'service')
  WITH CHECK (current_setting('app.role', true) = 'service');

ALTER TABLE "SiteConfig" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "SiteConfig" FORCE ROW LEVEL SECURITY;

CREATE POLICY site_config_service ON "SiteConfig"
  FOR ALL
  USING (current_setting('app.role', true) = 'service')
  WITH CHECK (current_setting('app.role', true) = 'service');
