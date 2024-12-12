const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const fileItemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
  payments:{
    type:[],
    default:[]

  },
 totalAmount:{
    type:Number,
    default:0
   
  },
paymentFrequency:{ type: String, enum:['weekly', 'biweekly', 'monthly', 'quarterly', 'annually'] },
 
});

fileItemSchema.virtual('url').get(function () {
    return `/file/subfiles/${this._id}`;
});
const File = mongoose.model('File', fileItemSchema);

module.exports = File;