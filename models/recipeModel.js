const mongoose = require("mongoose");

const schema = mongoose.Schema;

const recipeSchema = new schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  ingredients: {
    type: [],
   
  },

  instructions: { type: [], required: true },
  servings: { type: Number},
  
});
recipeSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/kitchen/recipe/${this._id}`;
});

module.exports = mongoose.model("Recipe", recipeSchema);
