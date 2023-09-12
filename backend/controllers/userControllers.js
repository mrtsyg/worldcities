const User = require("../models/user.js");
const Article = require("../models/article.js");
const Continent = require("../models/continentModel.js");
const Category = require("../models/categoryModel.js");
const bcrypt = require('bcrypt');
// const joiUserSchema = require('../validation/userSchema.js');
const jwt = require('jsonwebtoken');
const axios = require('axios');

async function login(req, res){
    // User object containing user data
    const { email, password, recaptchaToken } = req.body;

        let existingUser;

        try {
            await axios.post(
                `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRETKEY}&response=${recaptchaToken}`
            ).then(existingUser = await User.findOne({email: email})).catch(err=>console.log(err));
        } catch (err) {
            console.log(err);
        }
    
        let isValidPassword = false;
        if(existingUser){
            try {
                isValidPassword = await bcrypt.compare(password, existingUser.password);
                if (isValidPassword) {
                    console.log("Password is correct");
                    const token = jwt.sign({
                                email: email,
                                password: existingUser.password
                                // "admin": true
                              }, process.env.JWT_SECRETKEY, { expiresIn: '24h' }); // Token expires in 1 hour
                              res.send({key: token});
                } else {
                    console.log("Password is incorrect");
                    res.send({incorrect: "incorrect password"});
                }
            } catch (error) {
                console.log("Error:", error);
            }
        }
        if(!existingUser){
            res.send({nouser: "there is no user"});
        }
}

// async function registerNewUser(req, res){

//     try{
//         const { error, value } = joiUserSchema.validate(req.body);
//         const { username, email, password } = value;
//         if (error) {
//             // If validation fails, return an error response with the validation details
//             return res.status(400).json({ error: error.details[0].message });
//         }
//         // Check if the user already exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(409).json({ message: 'Email is already registered' });
//         }
//         // Hash the password using bcrypt
//         const hashedPassword = await bcrypt.hash(password, 10);
        

//         // Create a new user in the database
//         async function createNewUser(){
//             await User.create({username: username, email: email, password: hashedPassword});
//         }
//         createNewUser();
//         res.status(201).json({ message: 'User registered successfully' });
//     }
//     catch(err){
//         console.error(err);
//         res.status(500).json({ message: 'An error occurred during registration' });
//     }
// }

// async function findAllUsers(req, res){
//     const query = await User.find();
//     res.send(query);
// }

async function searchSomething(req, res) {
    const { query } = req.query;
  
    try {
      const continentResults = await Continent.find({ title: { $regex: query, $options: 'i' } });
      const countryResults = await Category.find({ title: { $regex: query, $options: 'i' } });
      const cityResults = await Article.find({ title: { $regex: query, $options: 'i' } });
  
      const searchResults = {
        continents: continentResults,
        countries: countryResults,
        cities: cityResults
      };
  
      res.json(searchResults);
    } catch (error) {
      console.error('An error occurred:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
}
  

module.exports = {
    login,
    searchSomething
}