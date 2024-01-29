var express = require('express');
var router = express.Router();
var db = require('../conf/database');
const { response } = require('../app');
const bcrypt = require('bcrypt');
var {isLoggedIn, isMyProfile} = require("../middleware/auth");
var{getPostsForUserProfile}= require("../middleware/posts");
const UserError = require('../helpers/error/UserError');
const { usernameCheck, isUsernameUnique, passwordCheck, emailCheck, isEmailUnique } = require('../middleware/validation');
/* GET users listing. */


router.post('/register', usernameCheck, isUsernameUnique, passwordCheck, emailCheck, isEmailUnique, async function(req, res, next){
  var {username,email,password}=req.body;
  try {
    console.log(req.body);
    
   var hashedpassword = await bcrypt.hash(password,2);
    
    var[responseObject,fields]= await db.execute(`insert INTO users (username, email, password) value (?,?,?)`, [username,email,hashedpassword]);
    if(responseObject && responseObject.affectedRows==1){
      return res.redirect('/login')
    }
    
    console.log(req.body)
    res.end();

  } catch (error) {
    next(error);
  }
 
})

router.post('/Login', async function (req, res, next){
  const {username, password} = req.body;
 if(!username || !password){
  return res.redirect('/login');
 } else{
  var [rows, fields]=await db.execute(
    'select id,username,email,password from users where username=?', [username]
  );
  var user = rows[0];
  if (!user){
    return res.redirect("/login");
  } else {
    var passwordsMatched = await bcrypt.compare(password, user.password);
    if(passwordsMatched){
      req.session.user = {
        userId: user.id,
        email: user.email,
        username: user.username,

      };
      return res.redirect("/");
    } else {
      return res.redirect("/login");
    }
  }
 }
});


router.get("/Profile/:id(\\d+)",isLoggedIn, isMyProfile, getPostsForUserProfile, function (req, res){
  res.render("Profile");
})

router.post('/Logout', function(req,res,next){
  req.session.destroy(function(err){
    if(err){
      next(error);
    }
    return res.redirect('/');
  })
} )



module.exports = router;
