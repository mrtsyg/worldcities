const Category = require("../models/categoryModel.js");
const Continent = require("../models/continentModel.js");
const Article = require("../models/article.js");
const mongoose = require("mongoose");

// async function addCategory(req, res){
//     const {title} = req.body;
//     const query = await Category.create({ title: title });
//     res.send(query);
// }

async function findOneCategory(req, res){
    const query = await Category.findOne({ title: req.params.title });
    res.send(query);
}

async function findAllCategory(req, res){
    const query = await Category.find();
    res.send(query);
}

// async function updateCategory(req, res){
//     const {newTitle, title} = req.body;
//     const query = await Category.findOneAndUpdate({ title: title }, {title: newTitle});
//     res.send(query);
// }
// async function deleteCategory(req, res){
//     const {title} = req.body;
//     const query = await Category.findOneAndDelete({ title: title });
//     res.send(query);
// }

//delete
async function deleteCategory(req, res) {
    try {
      const { title } = req.body;
      const foundCategory = await Category.findOne({ title: title }).populate('continent','articles');
      
      if (!foundCategory) {
        // If article is not found, send an appropriate response
        return res.status(404).send('Category not found.');
      }

      const continentId = foundCategory.continent;
      const foundCategoryId = foundCategory._id;

      await Article.deleteMany({category: foundCategoryId});

      await Category.deleteOne({ _id: foundCategoryId });
      
      const foundContinent = await Continent.findById(continentId);
      if (foundContinent) {
        // Remove the deleted article from the category's articles array
        foundContinent.categories.pull(foundCategoryId);

        await foundContinent.save();
      }
      return res.status(200).json({ message: 'Category deleted successfully' });
    } catch (err) {
      // Handle any errors that occurred during the process
      console.error(err);
      res.status(500).send('Server error.');
    }
  }

//update
async function updateCategory(req, res){
  const {title, newCategoryImage} = req.body;

  const categoryToUpdate = await Category.findOne({title: title});
  const updatedCategory = await Category.findByIdAndUpdate(categoryToUpdate._id, {title: title, categoryImage: newCategoryImage});

  return res.status(200).json({ message: 'Category updated successfully' });
}

//add
async function addCategoryToContinent(req, res){
    const {title, continentTitle, categoryImage} = req.body;

    const continent = await Continent.findOne({title: continentTitle});
    
    const createdCategory = await Category.create({ title: title, categoryImage: categoryImage, continent: continent._id});

    continent.categories.push(createdCategory._id);
    await continent.save();

    return res.status(200).json({ message: 'Category added successfully' });
}

//read
async function printContinentCategories(req, res){
    const continentName = req.params.continent;

    const continent = await Continent.findOne({title: continentName});

    const populatedContinentCategory = await Continent.
    findById(continent._id).
    populate('categories');

    res.send(populatedContinentCategory.categories);
}

async function getAllContinentCategories(req, res){
    try {
        const populatedContinents = await Continent.find().populate('categories');
        
        if (populatedContinents.length === 0) {
            return res.status(404).send('Continent not found');
        }

        res.send(populatedContinents);
    } catch (error) {
        res.status(500).send('Error');
    }
}

module.exports = { findOneCategory, findAllCategory, updateCategory, deleteCategory, addCategoryToContinent, printContinentCategories, getAllContinentCategories, updateCategory}