
/// create controllers for getAllItems, getOneItem, create_getItem, create_postItem, deleteItem, updateItem, viewItem
const asyncHandler = require('express-async-handler');
const Travelitems = require('../models/travelitemModel');

const testing = require("../scripts/compute");




exports.getAllItems = asyncHandler(async (req, res) => {
    const questions = await Travelitems.find();
   
    const [items] = questions;
 

   const item = items.items;
  console.log(item);
   
    res.render('travelitems', { item });
});
// create a function will show one item out of time when clicked


exports.getOneItem = asyncHandler(async (req, res) => {
    const item = await Travelitems.findById(req.params.id);
    res.render('travelitems', { item });
}); 

exports.create_getItem = asyncHandler(async (req, res) => {
    res.render('travelForm', { title: 'CREATE ITEM' });
});


exports.create_postItem = asyncHandler(async (req, res) => {
    const item = await Travelitems.findOne({ name: req.body.title });
    if (item) {
        res.render('travelForm', { title: 'CREATE ITEM', errors: 'Item name already exists' });
    } else {
        const newItem = new Travelitem(req.body);
        await newItem.save();
        res.redirect('/travel/items');
    }
});

exports.deleteItem = asyncHandler(async (req, res) => {
    await Travelitems.findByIdAndDelete(req.params.id);
    res.redirect('/travel/items');
});

exports.updateItem = asyncHandler(async (req, res) => {
    const item = await Travelitems.findById(req.params.id);
    res.render('travelForm', { title: 'UPDATE ITEM', item });
});


/// Testing a new function

// app.set('view engine', 'pug');
// app.locals.someFunction = input => input * 5;
// // or
// import {someOtherFunction} from "packageOrFile";
// app.locals.someOtherFunction = someOtherFunction;
// In your pug you then can do

// span= someFunction(10)
// span= someOtherFunction(123)

