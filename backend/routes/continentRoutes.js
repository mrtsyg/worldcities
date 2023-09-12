const express = require('express');
const router = express.Router();
const { addContinent, deleteContinent, updateContinent, listContinent} = require('../controllers/continentControllers.js');
const auth = require('../auth.js');

router.post("/add-continent", auth, addContinent);

router.delete("/delete-continent", auth, deleteContinent);

router.put("/update-continent", auth, updateContinent);

router.get("/list-continent", auth, listContinent);

module.exports = router;