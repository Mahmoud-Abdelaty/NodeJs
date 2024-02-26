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

function remove(data) {
  const todos = JSON.parse(fs.readFileSync(FILE_PATH, "utf8"));
  const newTodos = todos.filter((todo) => todo.id !== parseInt(data.id));
  fs.writeFileSync(FILE_PATH, JSON.stringify(newTodos));
}

function edit(data) {
  const todos = JSON.parse(fs.readFileSync(FILE_PATH, "utf8"));

  const newTodos = todos.map((todo) => {
    if (todo.id === parseInt(data.id)) {
      return { ...todo, title: data.title, body: data.body };
    }
    return todo;
  });

  fs.writeFileSync(FILE_PATH, JSON.stringify(newTodos));
}

function list(data) {
  console.log(data.type);
  const todos = JSON.parse(fs.readFileSync(FILE_PATH, "utf8"));
  switch (data.type) {
    case "all":
      todos.map((todo) => console.log(todo));
      break;
    case "checked":
      let checkedEmpty = true;
      todos.map((todo) => {
        if (todo.checked) {
          console.log(todo);
          checkedEmpty = false;
        }
      });
      if (checkedEmpty) {
        console.log("No completed todos found");
      }
      break;
    case "unchecked":
      let uncheckedEmpty = true;
      todos.map((todo) => {
        if (!todo.checked) {
          console.log(todo);
          uncheckedEmpty = false;
        }
      });
      if (uncheckedEmpty) {
        console.log("No uncompleted todos found");
      }
      break;
    default:
      console.log(`Invalid type: ${data.type}`);
      break;
  }
}

function completed(data) {
  const todos = JSON.parse(fs.readFileSync(FILE_PATH, "utf8"));
  let emptyText_ = true;

  const updatedTodos = todos.map((e) => {
    if (e.id === parseInt(data.id)) {
      emptyText_ = false;
      return { ...e, checked: true };
    }
    return e;
  });
  fs.writeFileSync(FILE_PATH, JSON.stringify(updatedTodos));
  if (emptyText_) {
    console.log("Todo Not Found");
  }
}

function uncompleted(data) {
  const todos = JSON.parse(fs.readFileSync(FILE_PATH, "utf8"));
  let emptyText_ = true;

  const updatedTodos = todos.map((e) => {
    if (e.id === parseInt(data.id)) {
      emptyText_ = false;
      return { ...e, checked: false };
    }
    return e;
  });
  fs.writeFileSync(FILE_PATH, JSON.stringify(updatedTodos));
  if (emptyText_) {
    console.log("Todo Not Found");
  }
}

module.exports = {
  createDBFile: createDBFile,
  add: add,
  remove: remove,
  edit: edit,
  list: list,
  completed: completed,
  uncompleted: uncompleted,
};
