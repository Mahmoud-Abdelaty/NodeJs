const express = require("express");
const router = express.Router();
const TodoModel = require("../models/todo");

// simple ex to middleware

// router.use((req, res, next) => {
//   const logIn = false;
//   if (logIn) next();
//   else res.send("Please Login");
// });

router.get("/id=:id", (req, res) => {
  const id = req.params.id;
  TodoModel.find({ todoId: id })
    .then((item) => {
      if (!item) {
        res.status(404).send({ error: "ُTodo Not Found :(" });
      } else {
        res.send(item);
      }
    })
    .catch((err) => {
      res.status(201).send({ error: "ُTodo Not Found :(" });
    });
});

router.get("/", async (req, res) => {
  try {
    const items = await TodoModel.find();
    res.send(items);
  } catch (err) {
    res.status(500).send({ error: "Todos Not Found :(" });
  }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

router.use(express.json()); //middleware

router.post("/", (req, res) => {
  const data = req.body;
  const todo = new TodoModel(data);
  todo
    .save()
    .then((todo) => {
      res.status(201).json(todo);
    })
    .catch((err) => {
      res.status(201).send({ error: "ُPlease Enter Correct Data :(" });
    });
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
router.put("/id=:id", (req, res) => {
  const id = req.params.id;
  const { status } = req.query;
  const newData = req.body;

  let updateData = {};

  if (status === "complete") {
    updateData = { checked: true, ...newData };
  } else if (status === "uncomplete") {
    updateData = { checked: false, ...newData };
  } else {
    updateData = { ...newData };
  }

  TodoModel.findOneAndUpdate({ todoId: id }, updateData, { new: true })
    .then((updatedTodo) => {
      if (updatedTodo) {
        res.send(updatedTodo);
      } else {
        res.status(404).send(`Todo with ID ${id} not found`);
      }
    })
    .catch((error) => {
      res.status(500).send({ error: "Error updating Todo" });
    });
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

router.delete("/id=:id", (req, res) => {
  const id = req.params.id;
  TodoModel.findOneAndDelete({ todoId: id })
    .then((removedTodo) => {
      const { title } = removedTodo;
      res.send(`Delete User of ID ${id}, ${title} `);
    })
    .catch((error) => {
      res.status(500).send({ error: "Error Deleting User" });
    });
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

module.exports = router;
