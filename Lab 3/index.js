const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 8000;
const DB_URL = process.env.DB_URL || "mongodb://127.0.0.1:27017";

const server = express();
const todoRouter = require("./routes/todo");
const userRouter = require("./routes/user");
server.use(express.json());

// server.use("/todo", (req, res, next) => {
//   const logIn = false;
//   if (logIn) next();
//   else res.send("Please Login First");
// });
// server.use((req, res, next) => {
//   const logIn = false;
//   if (logIn) next();
//   else res.send("Please Login Firstttt");
// });

server.use("/todo", todoRouter);

server.use("/user", userRouter);

mongoose
  .connect(DB_URL, {})
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log("DB Connected");
  });

server.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Server listening on ${PORT}`);
});
