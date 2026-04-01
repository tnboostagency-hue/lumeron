-- Run once on existing D1 DBs (ignore error if column already exists):
ALTER TABLE news_articles ADD COLUMN cover_image TEXT;
