const fs = require("fs");
const FILE_PATH = process.env.FILE_PATH || "./db.json";

function createDBFile() {
  if (!fs.existsSync(FILE_PATH)) {
    fs.writeFileSync(FILE_PATH, JSON.stringify([]));
  }
}

function add(data) {
  const todos = JSON.parse(fs.readFileSync(FILE_PATH, "utf8"));

  const todo = {
    id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
    title: data.title,
    body: data.body,
    checked: false,
  };

  todos.push(todo);
  fs.writeFileSync(FILE_PATH, JSON.stringify(todos));
}

function remove(id) {
  const todos = JSON.parse(fs.readFileSync(FILE_PATH, "utf8"));
  const newTodos = todos.filter((todo) => todo.id !== parseInt(id));
  fs.writeFileSync(FILE_PATH, JSON.stringify(newTodos));
}

function list(type, id) {
  const todos = JSON.parse(fs.readFileSync(FILE_PATH, "utf8"));
  switch (type) {
    case "specific":
      return todos.find((todo) => todo.id === parseInt(id));
    case "complete":
      return todos.filter((todo) => todo.checked);
    case "uncomplete":
      return todos.filter((todo) => !todo.checked);
    default:
      return todos;
  }
}

function edit(type, id, data) {
  const todos = JSON.parse(fs.readFileSync(FILE_PATH, "utf8"));
  switch (type) {
    case "complete":
      const updatedTodos = todos.map((todo) => {
        if (todo.id === parseInt(id)) {
          return { ...todo, checked: true };
        }
        return todo;
      });
      fs.writeFileSync(FILE_PATH, JSON.stringify(updatedTodos));
      break;
    case "uncomplete":
      const updatedTodos_ = todos.map((todo) => {
        if (todo.id === parseInt(id)) {
          return { ...todo, checked: false };
        }
        return todo;
      });
      fs.writeFileSync(FILE_PATH, JSON.stringify(updatedTodos_));
      break;
    default:
      const newTodos = todos.map((todo) => {
        if (todo.id === parseInt(id)) {
          return { ...todo, title: data.title, body: data.body };
        }
        return todo;
      });
      fs.writeFileSync(FILE_PATH, JSON.stringify(newTodos));
      break;
  }
}

module.exports = {
  createDBFile: createDBFile,
  add: add,
  remove: remove,
  list: list,
  edit: edit,
};
