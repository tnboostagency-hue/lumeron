-- Store uploaded files in R2 and keep only object keys in D1.
ALTER TABLE job_applications ADD COLUMN cv_object_key TEXT;
ALTER TABLE job_applications ADD COLUMN portfolio_image_object_key TEXT;
