const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const travelitemSchema = new Schema({
    items:{
        type:[],
    }
});

const Travelitems = mongoose.model('Travelitems', travelitemSchema);
module.exports = Travelitems;

