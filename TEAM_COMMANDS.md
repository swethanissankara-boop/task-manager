# Team Commands: who runs what

A copy-paste guide for all 5 members of the team. Follow the sections in order.

> **How to use this project for practice.** The folder you received (`task-manager-complete`) is the finished
> example. In Round 1 each member copies **only their own files** from it into the shared repo, using the real
> Git workflow (branch, commit, push, Pull Request, review, merge). In a real project you would write those
> files yourself. The Git commands are exactly the same.
>
> The examples assume the finished example is extracted at `~/task-manager-complete`. Change that path if yours is
> somewhere else. On Windows, use **Git Bash** (installed with Git) so `cp`, `mkdir` and `curl` work.

---

## 0. Who does what

| Member | Role | Issue | Branch | Files they add |
|---|---|---|---|---|
| **A** | Team Lead | (reviews and merges) | pushes the skeleton to `main` once | `.gitignore`, `README.md`, `TEAM_COMMANDS.md`, `docs/`, `.github/pull_request_template.md`, `.github/CODEOWNERS` |
| **D** | Database | #3 Schema and Task model | `feature/database-schema-model` | `database/schema.sql`, `database/seed.json`, `backend/models/Task.js` |
| **C** | Backend | #2 REST API | `feature/backend-rest-api` | `backend/package.json`, `backend/app.js`, `backend/server.js`, `backend/routes/tasks.js` |
| **B** | Frontend | #1 Task list UI with search bar | `feature/frontend-task-ui` | `frontend/index.html`, `frontend/style.css`, `frontend/app.js` |
| **E** | Testing + CI | #4 Tests and CI | `feature/tests-and-ci` | `tests/tasks.test.js`, `.github/workflows/ci.yml` |

### Merge order: A, then D, C, B, E

- The routes (C) need the model (D), so **D merges first**.
- The frontend (B) needs the API (C) to show real data.
- The tests and CI (E) need everything else, so **E merges last**.

Members can all start working at the same time on their own branches. Only the **merging** follows this order.
While you wait for a teammate's merge, practice with the mock data or write your code. When their PR is merged, run
`git pull origin main`.

> Issues and Pull Requests share one number sequence. The 4 issues are #1 to #4, so the first PR will be #5.
> Write `Closes #3` (the **issue** number) in the PR description so the issue closes automatically on merge.

---

## 1. Member A (Team Lead)

### 1.1 Put the skeleton on GitHub

**On github.com:** New repository, name `task-manager`, **leave it empty** (do not add a README or .gitignore), click Create.

**Before committing**, open `.github/CODEOWNERS` and `docs/team.md` and replace the placeholder usernames with the
real GitHub usernames of the 5 members.

**On your computer:**

```bash
git config --global user.name "Your Name"
git config --global user.email "your-github-email@example.com"

mkdir task-manager
cd task-manager
git init

# Copy only the skeleton files from the finished example
cp ~/task-manager-complete/.gitignore .
cp ~/task-manager-complete/README.md .
cp ~/task-manager-complete/TEAM_COMMANDS.md .
cp -r ~/task-manager-complete/docs .
mkdir -p .github
cp ~/task-manager-complete/.github/pull_request_template.md .github/
cp ~/task-manager-complete/.github/CODEOWNERS .github/

git add .
git commit -m "chore: project skeleton, docs and PR template"
git branch -M main
git remote add origin https://github.com/<your-username>/task-manager.git
git push -u origin main
```

This is the **only** time anyone pushes straight to `main`. Protection is switched on right after.

### 1.2 Invite the team

github.com, repo, **Settings, Collaborators, Add people**: add B, C, D and E. Each person must accept the email invite.

### 1.3 Protect `main`

**Settings, Branches** (or **Rules, Rulesets**), add a rule for `main`:

- Require a pull request before merging
- Require **1** approval
- Block force pushes

Do **not** add "Require status checks" yet. Add it after E's CI is merged (see 1.5).

> On a free GitHub account, branch protection and rulesets may only be available for **public** repositories.
> For practice, make the repo public.

### 1.4 Create the issues

Use the **Issues** tab, or the GitHub CLI (`gh auth login` once, then run these). Create them **in this order** so the numbers are #1 to #4:

```bash
gh issue create --title "Build task list UI with search bar" --body "List, add, toggle, delete and search tasks. Follow docs/api.md." --assignee <B-username>
gh issue create --title "Build REST API for tasks" --body "Endpoints in docs/api.md, including GET /tasks?search=" --assignee <C-username>
gh issue create --title "Database schema and Task model" --body "schema.sql, seed.json and the Task model." --assignee <D-username>
gh issue create --title "API tests and CI" --body "Tests for every endpoint plus a GitHub Actions workflow." --assignee <E-username>
```

Optional: **Projects tab, New project, Board** and add the 4 issues to To Do / In Progress / Done.

### 1.5 Review and merge each PR (repeat for D, C, B, E in that order)

On github.com, open the PR, **Files changed** tab, comment on lines, then **Review changes, Approve** (or Request changes).

To test a teammate's branch on your computer before approving:

```bash
gh pr list                    # see open PRs and their numbers
gh pr checkout 5              # download that PR's branch (use the real number)
cd backend && npm install && npm test && cd ..
git switch main               # go back to main when done
```

Approve and merge (website: **Squash and merge**, **Delete branch**, or CLI):

```bash
gh pr review 5 --approve
gh pr merge 5 --squash --delete-branch
git switch main
git pull origin main
```

**After E's PR is merged:** Settings, Branches, edit the `main` rule, tick **Require status checks to pass**
and select the `test` check from the CI workflow. From now on a PR cannot be merged if the tests fail.

---

## 2. One-time setup for B, C, D and E

1. Accept the collaborator invite (the email, or `https://github.com/<lead-username>/task-manager/invitations`).
2. Install Git and Node.js 20+.
3. Run:

```bash
git config --global user.name "Your Name"
git config --global user.email "your-github-email@example.com"

git clone https://github.com/<lead-username>/task-manager.git
cd task-manager
```

When Git asks for a password, use a **Personal Access Token** (GitHub, Settings, Developer settings), or run `gh auth login`.

---

## 3. Member D (Database), issue #3

```bash
# 1. Latest main
git switch main
git pull origin main

# 2. Your branch
git switch -c feature/database-schema-model

# 3. Add your files
mkdir -p database backend/models
cp ~/task-manager-complete/database/schema.sql database/
cp ~/task-manager-complete/database/seed.json  database/
cp ~/task-manager-complete/backend/models/Task.js backend/models/

# 4. Check what changed
git status
git diff

# 5. Commit and push
git add database/ backend/models/
git commit -m "feat(database): add schema, seed data and Task model (#3)"
git push -u origin feature/database-schema-model

# 6. Open the Pull Request
gh pr create --title "feat(database): schema, seed data and Task model" --body "Closes #3" --reviewer <lead-username>
```

No GitHub CLI? Go to the repo on github.com, click **Compare & pull request**, write `Closes #3`, choose the lead as reviewer, click **Create pull request**.

---

## 4. Member C (Backend), issue #2

You can start now. Your routes `require('../models/Task')`, which is D's file, so you can **run** your code only after D's PR is merged. Until then, write and commit on your branch. After D merges, run `git pull origin main` (section 4, step 5) and test.

```bash
# 1. Latest main
git switch main
git pull origin main

# 2. Your branch
git switch -c feature/backend-rest-api

# 3. Add your files
mkdir -p backend/routes
cp ~/task-manager-complete/backend/package.json    backend/
cp ~/task-manager-complete/backend/app.js          backend/
cp ~/task-manager-complete/backend/server.js       backend/
cp ~/task-manager-complete/backend/routes/tasks.js backend/routes/

# 4. Commit and push
git add backend/
git commit -m "feat(backend): add REST API for tasks with search (#2)"
git push -u origin feature/backend-rest-api

# 5. When D's PR has been merged, bring D's files into your branch
git fetch origin
git merge origin/main

# 6. Run and test the API
cd backend
npm install
npm start                                   # leave this running, open a second terminal

# in the second terminal:
curl http://localhost:3000/tasks
curl "http://localhost:3000/tasks?search=milk"
curl -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d '{"title":"Test task"}'
curl -X PUT http://localhost:3000/tasks/1 -H "Content-Type: application/json" -d '{"done":true}'
curl -X DELETE http://localhost:3000/tasks/2
cd ..

# 7. "npm install" created backend/package-lock.json. Commit it, then open the Pull Request
#    (do this once D's changes are in main, so the reviewer can run it)
git add backend/package-lock.json
git commit -m "chore(backend): add package-lock.json (#2)"
git push
gh pr create --title "feat(backend): REST API for tasks with search" --body "Closes #2" --reviewer <lead-username>
```

> Do not commit `node_modules/`. The `.gitignore` already excludes it.

---

## 5. Member B (Frontend), issue #1

The backend does not need to be ready for you to start. Set `USE_MOCK = true` at the top of `frontend/app.js` to work on the search bar with fake data that follows `docs/api.md`. Set it back to `false` before you open your PR.

```bash
# 1. Latest main
git switch main
git pull origin main

# 2. Your branch
git switch -c feature/frontend-task-ui

# 3. Add your files
mkdir -p frontend
cp ~/task-manager-complete/frontend/index.html frontend/
cp ~/task-manager-complete/frontend/style.css  frontend/
cp ~/task-manager-complete/frontend/app.js     frontend/

# 4. Try it: open frontend/index.html in your browser (or VS Code "Live Server").
#    For real data, the backend must be running (needs D's and C's code merged into main):
#    git pull origin main  ->  cd backend && npm install && npm start

# 5. Commit in small steps
git add frontend/index.html frontend/style.css
git commit -m "feat(frontend): add page layout and styles (#1)"
git add frontend/app.js
git commit -m "feat(frontend): add task list, search, add, toggle and delete (#1)"

# 6. Push and open the Pull Request
git push -u origin feature/frontend-task-ui
gh pr create --title "feat(frontend): task list UI with search bar" --body "Closes #1" --reviewer <lead-username>
```

---

## 6. Member E (Testing + CI), issue #4

```bash
# 1. Latest main (needs D's and C's work merged so the tests have something to test)
git switch main
git pull origin main

# 2. Your branch
git switch -c feature/tests-and-ci

# 3. Add your files
mkdir -p tests .github/workflows
cp ~/task-manager-complete/tests/tasks.test.js    tests/
cp ~/task-manager-complete/.github/workflows/ci.yml .github/workflows/

# 4. Run the tests locally first
cd backend
npm install
npm test
cd ..

# 5. Commit and push
git add tests/ .github/workflows/
git commit -m "test: add API tests and GitHub Actions CI (#4)"
git push -u origin feature/tests-and-ci

# 6. Open the Pull Request. The CI workflow runs automatically on this very PR.
gh pr create --title "test: API tests and CI workflow" --body "Closes #4" --reviewer <lead-username>
```

On GitHub, the PR page shows a yellow dot, then a green tick (or a red cross) next to the **CI / test** check.
Click **Details** to read the log. If it fails, fix the code locally, `git add`, `git commit`, `git push`: the check re-runs.

---

## 7. When everything is merged: run the whole app (everyone)

```bash
git switch main
git pull origin main

cd backend
npm install
npm start          # API on http://localhost:3000
```

Then open `frontend/index.html` in the browser. Try search, add, tick and delete.

Tidy up your finished branch. After a **squash** merge, Git needs capital `-D` to delete the local branch:

```bash
git branch -D feature/your-branch-name
git fetch --prune
```

---

## 8. Round 2: add a new feature together (practice for a real project)

New feature: **filter tasks by status** (All / Done / Not done). Frontend and backend work **at the same time**, agreeing on the contract first.

**Step 1: Member A, create two issues:**

```bash
gh issue create --title "Status filter dropdown" --body "Dropdown: All / Done / Not done. Calls GET /tasks?done=true|false" --assignee <B-username>
gh issue create --title "Add done filter to GET /tasks" --body "Support ?done=true and ?done=false, combinable with ?search=" --assignee <C-username>
```

**Step 2: Member C (or A), update the contract first** in `docs/api.md` through a small PR:

```
GET /tasks?done=true        -> only completed tasks
GET /tasks?done=false       -> only tasks not done
GET /tasks?search=milk&done=true   -> both filters together
```

**Step 3: Member C (backend):**

```bash
git switch main && git pull origin main
git switch -c feature/backend-done-filter
# write the code (ask your AI: "Add a ?done=true|false filter to GET /tasks in routes/tasks.js and models/Task.js")
cd backend && npm test && cd ..
git add backend/
git commit -m "feat(backend): add done filter to GET /tasks (#<issue>)"
git push -u origin feature/backend-done-filter
gh pr create --title "feat(backend): done filter" --body "Closes #<issue>" --reviewer <lead-username>
```

**Step 4: Member B (frontend), at the same time:**

```bash
git switch main && git pull origin main
git switch -c feature/frontend-status-filter
# write the code (use the contract above, mock the data until the backend is merged)
git add frontend/
git commit -m "feat(frontend): add status filter dropdown (#<issue>)"
git push -u origin feature/frontend-status-filter
gh pr create --title "feat(frontend): status filter" --body "Closes #<issue>" --reviewer <lead-username>
```

**Step 5: Member E:** add tests for `?done=true` and `?done=false` on a branch `test/done-filter`, same commands as above.

**Step 6:** Merge in this order: contract, backend, frontend, tests. After each merge everyone runs `git pull origin main`.

---

## 9. Everyday cheat sheet

**Start every task**
```bash
git switch main
git pull origin main
git switch -c feature/short-name
```

**While working**
```bash
git status                      # what changed?
git diff                        # see the changes
git add <files>
git commit -m "feat: what you did (#issue)"
git push                        # first push of a branch: git push -u origin <branch>
```

**Teammates merged to `main` while you are still on your branch**
```bash
git fetch origin
git merge origin/main
```

**See what changed after a pull**
```bash
git log --oneline -10
git diff ORIG_HEAD HEAD --stat
```

**Unfinished work and you need to switch or pull**
```bash
git stash
git pull origin main
git stash pop
```

**Reviewer asked for changes**
```bash
# edit the files, then:
git add .
git commit -m "fix: address review comments"
git push                        # the PR updates automatically
```

**Merge conflict**
```bash
git merge origin/main           # Git says: CONFLICT in <file>
# open the file, keep the right code, delete the <<<<<<< ======= >>>>>>> lines
git add <file>
git commit -m "fix: resolve merge conflict"
git push
```

**Undo things safely**
```bash
git restore <file>              # throw away uncommitted changes in a file
git revert <commit-id>          # undo a commit by making a new one
```

**Never:** push to `main`, commit `.env` or passwords, use `git push --force` on a shared branch.
