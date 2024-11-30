const asyncHandler = require("express-async-handler");
const Ingredient = require("../models/ingredientModel");

// create controllers for the following:getAllIngredients, getIngredient, createIngredient_get, createIngredient_post, updateIngredient_get, updateIngredient_post, deleteIngredient

exports.getAllIngredients = asyncHandler(async (req, res) => {
  const ingredients = await Ingredient.find();
  console.log("THIS IS THE INGREDIENTS");

  res.render("ingredient", { ingredients: ingredients });
});

exports.getIngredient = asyncHandler(async (req, res) => {
  const ingredient = await Ingredient.findById(req.params.id);
  res.render("ingredient", { ingredient: ingredient });
});

exports.createIngredient_get = asyncHandler(async (req, res) => {
  const ingredient = await Ingredient.find();
  res.render("ingredientForm");
});

exports.createIngredient_post = asyncHandler(async (req, res) => {
  console.log(req.body);
  await Ingredient.create(req.body);
  res.redirect("/kitchen/createIngredient");
});

exports.updateIngredient_get = asyncHandler(async (req, res) => {
  const ingredient = await Ingredient.findById(req.params.id);
  res.render("updateIngredient", { ingredient: ingredient });
});

exports.updateIngredient_post = asyncHandler(async (req, res) => {
  await Ingredient.findByIdAndUpdate(req.params.id, req.body);
  const ingredient = new Ingredient({
    name: req.body.name,
  });
  await ingredient.save();
  res.redirect("/ingredients");
});

exports.deleteIngredient = asyncHandler(async (req, res) => {
  await Ingredient.findByIdAndDelete(req.params.id);
  res.redirect("/ingredients");
});
