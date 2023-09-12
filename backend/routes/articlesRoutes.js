const express = require('express');
const router = express.Router();
const { findArticlesByName, findArticleByTitle, findAllArticles, addArticleToCategory, printArticle, deleteArticle, printCategoryArticles, printAllCategoryArticles, updateArticleToCategory } = require('../controllers/articleControllers.js');
const auth = require('../auth.js');

router.get("/print-all-category-articles", printAllCategoryArticles);

router.get("/print-articles/:cityname", printArticle);

router.get("/print-category/:categoryName", printCategoryArticles);

router.get("/name/:name", findArticlesByName);

router.get("/title/:title", findArticleByTitle);

router.post("/add-article", auth, addArticleToCategory);

router.put("/update-article", auth, updateArticleToCategory);

router.delete("/delete-article", auth, deleteArticle);

router.get("/", findAllArticles);

module.exports = router;