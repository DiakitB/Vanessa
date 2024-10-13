const mongoose = require("mongoose");

const schema = mongoose.Schema;

const unitSchema = new schema({
  name: { type: String, required: true },
});

module.exports = mongoose.model("Unit", unitSchema);
