const express = require("express");
const PORT = process.env.PORT || 8000;

const { createDBFile, add, remove, edit, list } = require("./helpers");

const server = express();

server.get("/todo/id=:id", (req, res) => {
  const id = req.params.id;
  res.send(list("specific", id));
});

server.get("/todo", (req, res) => {
  const { status } = req.query;
  res.send(list(status));
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

server.use(express.json()); //middleware

server.post("/todo", (req, res) => {
  const data = req.body;
  console.log(data);
  add(data);
  res.status(201).send("Todo added successfully");
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

server.put("/todo/id=:id", (req, res) => {
  const id = req.params.id;
  const { status } = req.query;
  const data = req.body;
  edit(status, id, data);
  res.status(201).send(`Update Todo Status of Id ${id}`);
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

server.delete("/todo/id=:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  remove(id);
  res.send(`Delete Todo of ID ${id}`);
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

server.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Server listening on ${PORT}`);
});

createDBFile();
