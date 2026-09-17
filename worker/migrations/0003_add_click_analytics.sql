CREATE TABLE IF NOT EXISTS daily_clicks (
  utc_date TEXT NOT NULL,
  path TEXT NOT NULL,
  event TEXT NOT NULL,
  clicks INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (utc_date, path, event)
);

CREATE INDEX IF NOT EXISTS daily_clicks_date_idx ON daily_clicks (utc_date);
