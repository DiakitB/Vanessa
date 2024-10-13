const asyncHandler = require("express-async-handler");

const Unit = require("../models/unitModel");

// create controllers for the following:getAllUnits, getUnit, createUnit_get, createUnit_post, updateUnit_get, updateUnit_post, deleteUnit

exports.getAllUnits = asyncHandler(async (req, res) => {
  const units = await Unit.find();
  res.render("units", { units: units });
});

exports.getUnit = asyncHandler(async (req, res) => {
  const unit = await Unit.findById(req.params.id);
  res.render("unit", { unit: unit });
});

exports.createUnit_get = asyncHandler(async (req, res) => {
  const units = await Unit.find();
  res.render("unitForm");
});

exports.createUnit_post = asyncHandler(async (req, res) => {
  console.log(req.body);
  const unit = new Unit({
    name: req.body.name,
  });
  await unit.save();
  res.redirect("/");
});

exports.updateUnit_get = asyncHandler(async (req, res) => {
  const unit = await Unit.findById(req.params.id);
  res.render("updateUnit", { unit: unit });
});

exports.updateUnit_post = asyncHandler(async (req, res) => {
  await Unit.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/units");
});

exports.deleteUnit = asyncHandler(async (req, res) => {
  await Unit.findByIdAndDelete(req.params.id);
  res.redirect("/units");
});
