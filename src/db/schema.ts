import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

/** Published job openings (managed in admin, shown on /careers) */
export const jobs = sqliteTable("jobs", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  department: text("department").notNull(),
  location: text("location").notNull().default("Al Khobar, Saudi Arabia"),
  type: text("type").notNull().default("Full-time"),
  description: text("description").notNull(),
  /** 1 = visible on public site */
  published: integer("published", { mode: "boolean" }).notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

/** News articles (managed in admin, shown on /news) */
export const newsArticles = sqliteTable("news_articles", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  /** Display date YYYY-MM-DD */
  date: text("date").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull().default(""),
  /** Data URL (image/jpeg|png|webp) or null — shown on /news and in admin */
  coverImage: text("cover_image"),
  published: integer("published", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

/** Candidate applications (from /careers apply form) */
export const jobApplications = sqliteTable("job_applications", {
  id: text("id").primaryKey(),
  jobId: text("job_id"),
  jobTitle: text("job_title").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  linkedin: text("linkedin"),
  coverLetter: text("cover_letter"),
  /** Optional styling/theme notes submitted by candidate */
  themeGuide: text("theme_guide"),
  cvFileName: text("cv_file_name"),
  cvMimeType: text("cv_mime_type"),
  /** Preferred storage path in R2 */
  cvObjectKey: text("cv_object_key"),
  /** Base64; omit or null if no file */
  cvBase64: text("cv_base64"),
  /** Optional portfolio image attachment */
  portfolioImageFileName: text("portfolio_image_file_name"),
  portfolioImageMimeType: text("portfolio_image_mime_type"),
  /** Preferred storage path in R2 */
  portfolioImageObjectKey: text("portfolio_image_object_key"),
  /** Base64 image; omit or null if no image file */
  portfolioImageBase64: text("portfolio_image_base64"),
  createdAt: text("created_at").notNull(),
});

export type JobRow = typeof jobs.$inferSelect;
export type NewsArticleRow = typeof newsArticles.$inferSelect;
export type JobApplicationRow = typeof jobApplications.$inferSelect;
