//Entry point to node project

const express = require('express');   //referenced and because its contained the node module
const Sequelize = require('sequelize');  //refernced and because its contained in the node module 

const app = express();  //this a variable reference to express so we can create a server and routes

const port = 8001; //reference to a port number that project will be run on 

 //no need to reference sqlite3 because sequelize will import it automaticly 


 app.listen(port, () => {
   console.log("Running server on port " + port); //this is code to create a new express server and prints out message when it successfly connects.
 })



 //connects sequelize to database  vvvv   
 // vvvvv  expects the name of db, username, password, 4th parameter is an optional object we can use to assign db values
 const connection =  new Sequelize('db', "user", "pass", {       
  host: 'localhost', //hostname
  dialect: 'sqlite',  //tells sequelize which sql database were using
  storage: 'db.sqlite', // path where we want database file to exist, can be named anything aslong as it references .sqlite
  operatorAliases: false //prevent us from recieving warnings inside of our console.
 })       
 
 
 // ^^^ variable reference which will store a sequelize instance, this is a constructor function and intelisense will tell us what sequelize expects

const User = connection.define("User", {
  name: Sequelize.STRING,
  bio: Sequelize.TEXT
})



connection  //test out sql instance
    .sync({
      logging: console.log
    })  //chain sync onto connection  //this will force open database

    .then(() => {   // now add the create method with same attributes that have been declared above. 
          User.create({
            name: 'Joe',
            bio: 'New bio entry'
  
          })
  
    })
    .then(() => {
        console.log('Connection to database established sucessfully')  //log messageses upon successful or attempted connection v  ^
    })
    .catch(err => {
      console.error('Unable to connect to the database', err)
    })

 // test that server is running by npm start