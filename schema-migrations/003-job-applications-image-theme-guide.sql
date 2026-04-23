-- Add image + theme guide fields for career applications
ALTER TABLE job_applications ADD COLUMN theme_guide TEXT;
ALTER TABLE job_applications ADD COLUMN portfolio_image_file_name TEXT;
ALTER TABLE job_applications ADD COLUMN portfolio_image_mime_type TEXT;
ALTER TABLE job_applications ADD COLUMN portfolio_image_base64 TEXT;
