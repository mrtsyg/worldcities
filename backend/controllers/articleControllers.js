const Article = require("../models/article.js");
const Category = require("../models/categoryModel.js");
const mongoose = require("mongoose");

async function findArticlesByName(req, res){
    const name = req.params.name;
    const query = await Article.find({name:name});
    if(query.length === 0){
        res.send("there is no plan for this city");
    }
    else{
        res.send(query);
    }  
}

async function findArticleByTitle(req, res){
    const title = req.params.title;
    const query = await Article.find({title:title});
    if(query.length === 0){
        res.send("there is no plan for this city");
    }
    else{
        res.send(query);
    }  
}

async function findAllArticles(req, res){
    const query = await Article.find();
    res.send(query);
}

async function addArticleToCategory(req, res){
    const {name, title, imageUrl, metin, isCard, categoryTitle} = req.body;

    const category = await Category.findOne({title: categoryTitle});
    
    
    const createdArticle = await Article.create({ name: name, 
        title: title, 
        imageUrl: imageUrl, 
        metin: metin,
        isCard: isCard,
        category: category._id
    });

    category.articles.push(createdArticle._id);
    await category.save();

    return res.status(200).json({ message: 'City added successfully' });
}

async function updateArticleToCategory(req, res){
    const {name, categoryTitle, newName, newTitle, newImageUrl, newMetin} = req.body;

    const category = await Category.findOne({title: categoryTitle});
    console.log(category);
    
    const updatedArticle = await Article.findOneAndUpdate({name: name},{ name: newName, 
        title: newTitle, 
        imageUrl: newImageUrl, 
        metin: newMetin,
        category: category._id
    },{
        new: true
    });

    const populatedArticleCategory = await Article.
    findOne({ name: updatedArticle.name }).
    populate('category');
    console.log(populatedArticleCategory);

    res.send(category);
}

async function printCategoryArticles(req, res){
    const name = req.params.categoryName;

    const category = await Category.findOne({title: name});


    const populatedCategoryArticles = await Category.
    findById(category._id).
    populate('articles');
    console.log(populatedCategoryArticles);

    res.send(populatedCategoryArticles.articles);
}

async function printAllCategoryArticles(req, res) {
    try {
        // const countryName = req.params.countryName;
        // console.log(countryName);
        const populatedCategories = await Category.find().populate('articles');
        if (populatedCategories.length === 0) {
            return res.status(404).send('Category not found');
        }

        res.send(populatedCategories);
    } catch (error) {
        res.status(500).send('Error fetching categories and articles');
    }
}

async function printArticle(req, res) {
    const name = req.params.cityname;
    const article = await Article.
    findOne({ name: name }).
    populate('category');
    res.send(article);
}

// async function deleteArticle(req, res) {
//     try {
//       const { imageUrl } = req.body;
//       const foundArticle = await Article.findOne({ imageUrl: imageUrl }).populate('category');
      
//       if (!foundArticle) {
//         // If article is not found, send an appropriate response
//         return res.status(404).send('Article not found.');
//       }
    
//       const categoryId = foundArticle.category;
//       const foundArticleId = foundArticle._id;
      
      
//       await Article.deleteOne({ _id: foundArticleId });

      
//       const foundCategory = await Category.findById(categoryId);
//       if (foundCategory) {
//         // Remove the deleted article from the category's articles array
//         foundCategory.articles.pull(foundArticleId);
//         await foundCategory.save();
//       }
      
//       res.send(foundCategory);
//     } catch (err) {
//       // Handle any errors that occurred during the process
//       console.error(err);
//       res.status(500).send('Server error.');
//     }
//   }
  
async function deleteArticle(req, res) {
    try {
      const { imageUrl } = req.body;
      const foundArticle = await Article.findOne({ imageUrl: imageUrl });
  
      if (!foundArticle) {
        return res.status(404).send('Article not found.');
      }
  
      const categoryId = foundArticle.category;
      const foundArticleId = foundArticle._id;
  
      await Article.deleteOne({ _id: foundArticleId });
  
      // Update the category's articles array using $pull
      await Category.updateOne({ _id: categoryId }, { $pull: { articles: foundArticleId } });
  
      res.send({ message: 'City deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error.');
    }
  }
  
  

module.exports = {
    findArticlesByName,
    findArticleByTitle,
    findAllArticles,
    addArticleToCategory,
    printArticle,
    printCategoryArticles,
    deleteArticle,
    printAllCategoryArticles,
    updateArticleToCategory
}