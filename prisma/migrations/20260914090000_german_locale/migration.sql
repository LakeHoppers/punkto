ALTER TABLE "Summary" ADD COLUMN "headlineDe" TEXT, ADD COLUMN "bodyDe" TEXT, ADD COLUMN "whyItMattersDe" TEXT;
ALTER TABLE "UserPreference" ADD COLUMN "emailLocale" TEXT NOT NULL DEFAULT 'tr';
ALTER TABLE "UserPreference" ADD CONSTRAINT "UserPreference_emailLocale_check" CHECK ("emailLocale" IN ('tr', 'en', 'de'));
