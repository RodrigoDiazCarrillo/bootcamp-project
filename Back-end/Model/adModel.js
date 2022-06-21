const mongoose = require("mongoose");

const adSchema = new mongoose.Schema({
   user: {
    required: true,
    type: String,
    unique: true
  },
  category: {
    required: true,
    type: String,
  },
  title: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  image: {
    required: true,
    type: String,
  },
 
});

module.exports = mongoose.model("ad", adSchema);
