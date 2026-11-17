DROP TABLE IF EXISTS daily_page_views;
DROP TABLE IF EXISTS daily_clicks;
DROP TABLE IF EXISTS admin_sessions;
DROP TABLE IF EXISTS analytics_events;

CREATE TABLE analytics_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  visitor_id TEXT NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('page_view', 'click', 'time')),
  path TEXT NOT NULL,
  event_name TEXT,
  duration_seconds REAL,
  country TEXT NOT NULL,
  city TEXT NOT NULL,
  created_at INTEGER NOT NULL
);

CREATE INDEX analytics_events_created_idx ON analytics_events (created_at);
CREATE INDEX analytics_events_type_created_idx ON analytics_events (event_type, created_at);
CREATE INDEX analytics_events_visitor_idx ON analytics_events (visitor_id, created_at);

CREATE TABLE admin_sessions (
  token_hash TEXT PRIMARY KEY,
  expires_at INTEGER NOT NULL
);
