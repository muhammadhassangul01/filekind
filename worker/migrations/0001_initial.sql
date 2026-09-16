CREATE TABLE IF NOT EXISTS daily_page_views (
  utc_date TEXT NOT NULL,
  path TEXT NOT NULL,
  country TEXT NOT NULL,
  views INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (utc_date, path, country)
);

CREATE INDEX IF NOT EXISTS daily_page_views_date_idx ON daily_page_views (utc_date);
