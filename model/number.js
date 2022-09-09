const mongoose = require("mongoose");

const numberSchema = mongoose.Schema({
  valid: Boolean,
  number: Number,
  local_format: Number,
  international_format: Number,
  country_prefix: Number,
  country_code: String,
  country_name: String,
  location: String,
  carrier: String,
  line_type: String,
});

module.exports = mongoose.model("detail", numberSchema);
