const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const continentSchema = new Schema({
    title: { type: String, required: true },
    categories: [{type: Schema.Types.ObjectId,
      ref: 'Category'
    }]
});
  
const Continent = mongoose.model('Continent', continentSchema);
  
module.exports = Continent;