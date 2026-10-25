# Task Manager

A small full-stack example project for practising team collaboration on GitHub.
Five people each own one part (frontend, backend, database, tests/CI, and the team lead).

## Features

- List tasks
- Search tasks by title (as you type)
- Add a task
- Mark a task as done / not done
- Delete a task

## Project structure

```
task-manager/
├── frontend/              HTML + CSS + JS user interface        (Member B)
├── backend/               Node.js + Express REST API            (Member C)
│   ├── app.js
│   ├── server.js
│   ├── routes/tasks.js
│   └── models/Task.js     data access layer                     (Member D)
├── database/              schema.sql and seed.json              (Member D)
├── tests/                 API tests (Node built-in test runner) (Member E)
├── docs/                  API contract and team info            (Member A)
└── .github/               CI workflow, PR template, CODEOWNERS  (Members E / A)
```

## Run it locally

You need [Node.js 20+](https://nodejs.org) and Git.

```bash
# 1. Start the API (leave this terminal open)
cd backend
npm install
npm start            # http://localhost:3000

# 2. Open the UI
# Double-click frontend/index.html, or use the "Live Server" extension in VS Code
```

## Run the tests

```bash
cd backend
npm test
```

## API

See [docs/api.md](docs/api.md) for every endpoint, request and response.

## How we work

Read [TEAM_COMMANDS.md](TEAM_COMMANDS.md). In short:

1. Every task is a GitHub **Issue** assigned to one person.
2. Nobody pushes to `main`. Work happens on a **branch**, then a **Pull Request**.
3. Another teammate **reviews** the PR. Tests must pass.
4. **Squash and merge**, then everyone runs `git pull origin main`.
