const express = require('express');
const router = express.Router();
const { login, searchSomething } = require('../controllers/userControllers.js');

router.post("/login", login);

// router.post("/register", registerNewUser);

router.get("/search", searchSomething);

// router.get("/users", auth, findAllUsers);

module.exports = router;