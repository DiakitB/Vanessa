const mongoose = require("mongoose");

const schema = mongoose.Schema;

const recipeSchema = new schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  ingredients: {
    type: {},
    required: true,
  },
  category: { type: String, required: true },
  instructions: { type: String, required: true },
  servings: { type: Number, required: true },
});
recipeSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/kitchen/book/${this._id}`;
});

module.exports = mongoose.model("Recipe", recipeSchema);
