const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const Category = require('./categoryModel');

const articleSchema = new Schema({
    name: String, 
    title: String, 
    imageUrl: String, 
    metin: String,
    isCard: Boolean,
    category: { type: Schema.Types.ObjectId,
                ref: 'Category'
    }
});
const Article = mongoose.model('Article', articleSchema);

module.exports = Article;