const mongoose = require("mongoose");
const USerSchema = new mongoose.Schema({
  userId: { type: Number, required: true, unique: true },
  firstName: { type: String, required: true, minLength: 3 },
  lastName: { type: String, required: true, minLength: 3 },
  email: {
    type: String,
    required: true,
    minLength: 10,
    unique: true,
    match: /.+@.+\..+/,
  },
  age: { type: Number, required: true },
});

const UserModel = mongoose.model("Users", USerSchema);

module.exports = UserModel;
