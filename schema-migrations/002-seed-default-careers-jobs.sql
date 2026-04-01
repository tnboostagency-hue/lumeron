-- Default openings (same copy as careers page fallbacks). Safe to re-run: skips existing ids.
-- wrangler d1 execute <DB_NAME> --remote --file=./schema-migrations/002-seed-default-careers-jobs.sql

INSERT OR IGNORE INTO jobs (id, title, department, location, type, description, published, sort_order, created_at, updated_at) VALUES
(
  'default-1',
  'AI & Machine Learning Engineer',
  'Artificial Intelligence',
  'Al Khobar, Saudi Arabia',
  'Full-time',
  'Design and deploy production-grade AI/ML systems including Arabic-native LLMs, computer vision pipelines, and industrial edge inference models. Work alongside multidisciplinary teams to deliver sovereign AI solutions aligned with Vision 2030.',
  1,
  100,
  '2024-06-01T00:00:00.000Z',
  '2024-06-01T00:00:00.000Z'
),
(
  'default-2',
  'Cybersecurity Analyst (SOC)',
  'Cybersecurity',
  'Al Khobar, Saudi Arabia',
  'Full-time',
  'Monitor, detect, and respond to threats across enterprise IT and OT environments in our 24/7 SOC. Apply SIEM, MDR/XDR, and threat intelligence platforms to protect critical national infrastructure aligned with NCA ECC frameworks.',
  1,
  90,
  '2024-06-01T00:00:00.000Z',
  '2024-06-01T00:00:00.000Z'
),
(
  'default-3',
  'Data Center Project Manager',
  'Digital Infrastructure',
  'Al Khobar, Saudi Arabia',
  'Full-time',
  'Lead end-to-end delivery of Tier IV data center projects from concept through Level 1–5 commissioning. Coordinate multidisciplinary engineering teams, manage CAPEX/OPEX budgets, and ensure compliance with Uptime Institute standards.',
  1,
  80,
  '2024-06-01T00:00:00.000Z',
  '2024-06-01T00:00:00.000Z'
);
