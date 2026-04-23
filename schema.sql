-- Cloudflare D1 schema for Lumeron (run: wrangler d1 execute lumeron --remote --file=./schema.sql)

CREATE TABLE IF NOT EXISTS jobs (
  id TEXT PRIMARY KEY NOT NULL,
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  location TEXT NOT NULL DEFAULT 'Al Khobar, Saudi Arabia',
  type TEXT NOT NULL DEFAULT 'Full-time',
  description TEXT NOT NULL,
  published INTEGER NOT NULL DEFAULT 1,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

-- Optional starter rows (same as /careers fallbacks): schema-migrations/002-seed-default-careers-jobs.sql

CREATE TABLE IF NOT EXISTS news_articles (
  id TEXT PRIMARY KEY NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  date TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  cover_image TEXT,
  published INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

-- Existing D1 databases created before cover_image: run once if the column is missing:
-- wrangler d1 execute lumeron --remote --command "ALTER TABLE news_articles ADD COLUMN cover_image TEXT;"

CREATE TABLE IF NOT EXISTS job_applications (
  id TEXT PRIMARY KEY NOT NULL,
  job_id TEXT,
  job_title TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  linkedin TEXT,
  cover_letter TEXT,
  theme_guide TEXT,
  cv_file_name TEXT,
  cv_mime_type TEXT,
  cv_object_key TEXT,
  cv_base64 TEXT,
  portfolio_image_file_name TEXT,
  portfolio_image_mime_type TEXT,
  portfolio_image_object_key TEXT,
  portfolio_image_base64 TEXT,
  created_at TEXT NOT NULL
);
