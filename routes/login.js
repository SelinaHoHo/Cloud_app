const { query } = require('express');
const express = require('express');
const router  = express.Router();
var authen = require('../models/authenticate');
var getTable = require('../models/tabledisplay');

//login page
router.get('/', (req,res)=>{
    res.render('login', { message:"Please input your credential!"});
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
   



module.exports = router; 