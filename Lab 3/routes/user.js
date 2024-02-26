const express = require("express");
const router = express.Router();
const UserModel = require("../models/user");

//simple ex to middleware

router.use((req, res, next) => {
  const logIn = true;
  if (logIn) next();
  else res.send("Please Login");
});

router.get("/id=:id", (req, res) => {
  const id = req.params.id;
  UserModel.find({ userId: id })
    .then((item) => {
      if (!item) {
        res.status(404).send({ error: "ُUser Not Found :(" });
      } else {
        res.send(item);
      }
    })
    .catch((err) => {
      res.status(201).send({ error: "ُUser Not Found :(" });
    });
});

router.get("/", async (req, res) => {
  try {
    const items = await UserModel.find();
    res.send(items);
  } catch (err) {
    res.status(500).send({ error: "ُUsers Not Found :(" });
  }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

router.use(express.json()); //middleware

router.post("/", (req, res) => {
  const data = req.body;
  const user = new UserModel(data);
  user
    .save()
    .then((usr) => {
      res.status(201).json(usr);
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

  UserModel.findOneAndUpdate(
    { userId: id },
    { status, ...newData },
    { new: true }
  )
    .then((updatedUser) => {
      if (updatedUser) {
        res.send(
          `Updated user: ${updatedUser.firstName} ${updatedUser.lastName}`
        );
      } else {
        res.status(404).send(`User with ID ${id} not found`);
      }
    })
    .catch((error) => {
      res.status(500).send({ error: "Error updating User" });
    });
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

router.delete("/id=:id", (req, res) => {
  const id = req.params.id;
  UserModel.findOneAndDelete({ userId: id })
    .then((removedUser) => {
      const { firstName } = removedUser;
      res.send(`Delete User of ID ${id}, ${firstName} `);
    })
    .catch((error) => {
      res.status(500).send({ error: "Error Deleting User" });
    });
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

module.exports = router;
