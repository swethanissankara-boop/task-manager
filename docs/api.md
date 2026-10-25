# API contract

Frontend (Member B) and backend (Member C) agree on this file.
**Change it only through a Pull Request that both B and C approve.**

Base URL (local): `http://localhost:3000`
All request and response bodies are JSON. Errors look like `{ "error": "message" }`.

## Task object

```json
{ "id": 1, "title": "Buy milk", "done": false }
```

## Endpoints

| Method | Path                    | Body                                   | Success                       | Errors                                                    |
|--------|-------------------------|----------------------------------------|-------------------------------|-----------------------------------------------------------|
| GET    | `/health`               | none                                   | `200` `{ "status": "ok" }`    |                                                           |
| GET    | `/tasks`                | none                                   | `200` array of tasks          |                                                           |
| GET    | `/tasks?search=milk`    | none                                   | `200` array of tasks whose title contains the text (case-insensitive); empty array if none | |
| GET    | `/tasks/:id`            | none                                   | `200` one task                | `404` unknown id                                          |
| POST   | `/tasks`                | `{ "title": "Buy milk" }`              | `201` the created task        | `400` missing or empty title                              |
| PUT    | `/tasks/:id`            | `{ "title": "...", "done": true }` (each field optional) | `200` the updated task | `400` empty title or `done` not true/false; `404` unknown id |
| DELETE | `/tasks/:id`            | none                                   | `204` no body                 | `404` unknown id                                          |

Invalid JSON in a request body returns `400` with `{ "error": "Invalid JSON body" }`.

## Examples

```bash
curl http://localhost:3000/tasks
curl "http://localhost:3000/tasks?search=milk"
curl -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d '{"title":"Test task"}'
curl -X PUT http://localhost:3000/tasks/1 -H "Content-Type: application/json" -d '{"done":true}'
curl -X DELETE http://localhost:3000/tasks/2
```
