const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  todoId: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  body: { type: String },
  checked: { type: Boolean, default: false },
  user: { type: mongoose.Types.ObjectId, ref: "Users" },
});

const TodoModel = mongoose.model("Todos", TodoSchema);

module.exports = TodoModel;
