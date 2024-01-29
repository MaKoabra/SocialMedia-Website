var express = require('express');
const {isLoggedIn} = require('../middleware/auth')
const {getRecentPosts}= require("../middleware/posts");
var router = express.Router();
var db = require('../conf/database');


/* GET home page. */
router.get('/',getRecentPosts, function(req, res, next) {
  res.render('index', { title: 'CSC 317 App', name:"Steven Brandt" });
});

router.get('/login',function(req,res){
  res.render('login', {title: 'login'})
})

router.get('/PostVideo', isLoggedIn, function(req,res){
  res.render('PostVideo', {title: 'Posts'})
})




router.get('/Registration',function(req,res){
  res.render('Registration')
})



module.exports = router;
