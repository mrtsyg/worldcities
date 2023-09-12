const express = require('express');
const router = express.Router();
const { findOneCategory, findAllCategory, updateCategory, deleteCategory, addCategoryToContinent, printContinentCategories, getAllContinentCategories } = require('../controllers/categoryControllers.js');
const auth = require('../auth.js');

// router.post("/Add-Category", addCategory);

router.post("/add-category-to-continent", auth, addCategoryToContinent);

router.delete("/delete-category", auth, deleteCategory);

router.get("/Find-Category/:title", findOneCategory);

router.get("/Find-Category", findAllCategory);

router.get("/get-continent-category/:continent", printContinentCategories);

router.get("/get-all-continent-categories", getAllContinentCategories);

router.put("/update-category", auth, updateCategory);

module.exports = router;