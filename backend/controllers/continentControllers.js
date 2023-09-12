const Continent = require("../models/continentModel.js");
const Category = require("../models/categoryModel.js");
const Article = require("../models/article.js")
const mongoose = require("mongoose");

//add
async function addContinent(req, res){
    const {title} = req.body;
    const query = await Continent.create({ title: title });
    return res.status(200).json({ message: 'Continent added successfully' });
}
//read
async function listContinent(req, res) {
  try {
      const continents = await Continent.find({})
          .populate({
              path: 'categories',
              populate: {
                  path: 'articles'
              }
          })
          .exec();

      return res.send(continents);
  } catch (error) {
      console.error('An error occurred:', error);
      return res.status(500).json({ message: 'Internal server error' });
  }
}

//delete
// async function deleteContinent(req, res) {
//     try {
//       const { title } = req.body;
  
//       const foundedContinent = await Continent.findOne({ title: title });
      
//       if (!foundedContinent) {
//         return res.status(404).json({ message: 'Continent not found' });
//       }
  
//       const categories = await Category.find({ _id: { $in: foundedContinent.categories } });
//       const categoryIds = categories.map(cat => cat._id);
  
//       const deletedArticle = await Article.deleteMany({ category: {$in: categoryIds}});
//       console.log(deletedArticle)
//       const deletedCategory = await Category.deleteMany({ _id: { $in: categoryIds } });
//       console.log(deletedCategory)
//       await Continent.findByIdAndDelete(foundedContinent._id);
  
//       return res.status(200).json({ message: 'Continent deleted successfully' });
//     } catch (error) {
//       console.error('An error occurred:', error);
//       return res.status(500).json({ message: 'Internal server error' });
//     }
//   }

async function deleteContinent(req, res) {
  try {
    const { title } = req.body;

    const foundedContinent = await Continent.findOne({ title: title }).populate('categories');
      
    if (!foundedContinent) {
      return res.status(404).json({ message: 'Continent not found' });
    }

    const categoryIds = foundedContinent.categories.map(cat => cat._id);

    const deletedArticle = await Article.deleteMany({ category: { $in: categoryIds } });

    const deletedCategory = await Category.deleteMany({ _id: { $in: categoryIds } });

    await Continent.findByIdAndDelete(foundedContinent._id);

    return res.status(200).json({ message: 'Continent deleted successfully' });
  } catch (error) {
    console.error('An error occurred:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

//update
async function updateContinent(req, res) {
  try {
    const { oldTitle, newTitle } = req.body;

    const updatedContinent = await Continent.findOneAndUpdate(
      { title: oldTitle }, // Find the continent with the old title
      { $set: { title: newTitle } }, // Set the new title
      { new: true } // Return the updated document
    );

    if (!updatedContinent) {
      return res.status(404).json({ message: 'Continent not found' });
    }

    return res.status(200).json({ message: 'Continent updated successfully' });
  } catch (error) {
    console.error('An error occurred:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

  
module.exports = {addContinent, deleteContinent, updateContinent, listContinent}