//index.js
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connection = require('./db.js');
const cookieParser = require('cookie-parser');
const corsOptions = { 
    origin: '*',  
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true 
};
//app.use
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

//import routes
const imageRoutes = require('./routes/imageRoutes.js');
const usersRoutes = require('./routes/usersRoutes');
const articlesRoutes = require('./routes/articlesRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const continentRoutes = require('./routes/continentRoutes');

//db connection
connection();

app.use('/', continentRoutes);
app.use('/', articlesRoutes);
app.use('/', categoryRoutes);
app.use('/', imageRoutes);
app.use('/', usersRoutes);

//listen
app.listen(process.env.PORT || 3001, ()=>{
    console.log(`express app listening on port ${process.env.PORT}`);
});