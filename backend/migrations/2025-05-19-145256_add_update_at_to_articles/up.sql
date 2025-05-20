-- Your SQL goes here
ALTER TABLE articles
ADD COLUMN updated_at TIMESTAMP NOT NULL DEFAULT NOW();
