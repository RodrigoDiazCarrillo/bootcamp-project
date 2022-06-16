const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  first_name: {
    required: true,
    type: String,
  },
  last_name: {
    required: true,
    type: String,
  },
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
  points: {
    type: Number,
    default: 0,
  }
});

module.exports = mongoose.model("member", memberSchema);
