const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const Article = require('./article');

const categorySchema = new Schema({
    title: { type: String, required: true },
    categoryImage: { type: String, required: true },
    continent: {type: Schema.Types.ObjectId,
      ref: 'Continent'},
    articles: [{type: Schema.Types.ObjectId,
      ref: 'Article'
    }]
});
  
const Category = mongoose.model('Category', categorySchema);
  
module.exports = Category;