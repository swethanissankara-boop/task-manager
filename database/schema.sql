-- Owner: Member D (Database)
-- Schema for when the team moves from the in-memory store to a real database (SQLite shown here).

CREATE TABLE IF NOT EXISTS tasks (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  title      TEXT    NOT NULL,
  done       INTEGER NOT NULL DEFAULT 0,          -- 0 = not done, 1 = done
  created_at TEXT    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_tasks_title ON tasks (title);
