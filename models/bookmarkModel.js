
const mongoose = require('mongoose');


const schema = mongoose.Schema;

const bookmarkSchema = new schema({

    bookmarked: { type: []},

});



module.exports = mongoose.model("Bookmark", bookmarkSchema);