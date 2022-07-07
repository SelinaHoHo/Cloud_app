const express = require('express');
const router = express.Router();
var authen = require('../models/authenticate');
var getTable = require('../models/tabledisplay');
const { query } = require('express');
const url = require('url')
const deleteFunction = require('../models/deleteFunction')
const addFunction = require('../models/addFunction')


router.get('/',(req,res)=>{
    res.send('respond with a resource');
})

router.post('/', async function(req, res, next) {
    var auth = await authen(req.body.username, req.body.password);
    console.log("Check " + auth);
     if (auth==true) {
         // Target --> display product table for this user
         var tableString = await getTable(req.body.username);
         // console.table(tableString.fields)
         res.render('users', {
         title: "User page",
         message: "Welcome to ATN\n",
         table: tableString
        })
         }
     else {
         res.render('login', { message:"Incorrect Username and/or Password!"})
     }
 });

 router.post('/add', async function(req, res, next) {
    console.log(req.body)
    const queryObject = url.parse(req.url, true).query;
    var user = queryObject['user']
    await addFunction(req.body)
    var tableString = await getTable(user);
    res.render('users', {
        title: "User page",
        message: "Welcome to ATN\n",
        table: tableString
       })

 });

 router.get('/delete',async (req,res,next)=>{
    const queryObject = url.parse(req.url, true).query;
    var id = parseInt(queryObject['id'])
    var user = queryObject['user']
    var tableString = await getTable(user);
    res.render('users', {
        title: "User page",
        message: "Welcome to ATN\n",
        table: tableString
       })
})

module.exports  = router;