// Owner: Member D (Database)
// A simple in-memory store that loads its starting data from database/seed.json.
// Later you can replace the inside of these functions with SQLite / MongoDB / Postgres
// and the routes in routes/tasks.js will keep working, because the function names stay the same.
const fs = require('fs');
const path = require('path');

const SEED_FILE = path.join(__dirname, '..', '..', 'database', 'seed.json');

let tasks = [];
let nextId = 1;

// Reload the starting data (also used by tests to get a clean state)
function reset() {
  const seed = JSON.parse(fs.readFileSync(SEED_FILE, 'utf8'));
  tasks = seed.map((task) => ({ ...task }));
  nextId = tasks.reduce((max, task) => Math.max(max, task.id), 0) + 1;
}

function findAll(search) {
  if (!search) return tasks;
  const query = search.toLowerCase();
  return tasks.filter((task) => task.title.toLowerCase().includes(query));
}

function findById(id) {
  return tasks.find((task) => task.id === id);
}

function create(title) {
  const task = { id: nextId++, title, done: false };
  tasks.push(task);
  return task;
}

function update(id, changes) {
  const task = findById(id);
  if (!task) return null;
  if (changes.title !== undefined) task.title = changes.title;
  if (changes.done !== undefined) task.done = changes.done;
  return task;
}

function remove(id) {
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
}

reset();

module.exports = { reset, findAll, findById, create, update, remove };
