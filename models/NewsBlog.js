const mongoose = require("mongoose");

const NewsBlogSchema = new mongoose.Schema({
    title : String,
    content : String,
    description : String,
    image_url : String,
    link : String,
    category : [String],
});

const NewsBlog = mongoose.model("News", NewsBlogSchema);

module.exports = NewsBlog;