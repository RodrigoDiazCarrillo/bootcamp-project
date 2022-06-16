const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
   email: {
    required: true,
    type: String,
    unique: true
  },
  password: {
    required: true,
    type: String,
  },
  role: {
    type: Number,
    default: 1,
  },
});

module.exports = mongoose.model("login", loginSchema);
