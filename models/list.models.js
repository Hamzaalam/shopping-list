const mongoose = require("mongoose");

const AppSchema = mongoose.Schema({
  name: String,
  products: Array,
  created_at: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model("List", AppSchema);