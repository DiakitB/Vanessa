const mongoose = require("mongoose");

const schema = mongoose.Schema;

const ingredientSchema = new schema({
  name: { type: String, required: true },
});

module.exports = mongoose.model("Ingredient", ingredientSchema);
