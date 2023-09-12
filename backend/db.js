const mongoose = require("mongoose");
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;
const cluster = process.env.DB_CLUSTER;

const connString = `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${database}`;

async function connection(){
    try{
     const conn = await mongoose.connect(connString, { useNewUrlParser: true, useUnifiedTopology: true });
     if(conn){console.log("success");}
    }
    catch(err){
     console.log(err);
    }
 }

module.exports = connection;