-- This file should undo anything in `up.sql`
ALTER TABLE articles
DROP COLUMN updated_at;
