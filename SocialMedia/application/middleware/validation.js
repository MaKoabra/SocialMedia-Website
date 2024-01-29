var db = require('../conf/database');
module.exports ={
usernameCheck: function(req,res,next){
    var{username}=req.body;
    if(username.length <3){
        req.flash("error","Username must be longer than 3 characters")
    }if(!/[A-Za-z]/.test(username.charAt(0))){
        req.flash("error","Username must be start with a Letter character")
    }if (username.length < 3 ||!/[a-zA-Z0-9]/.test(username)){
        req.flash("error","Username must have 3 or more Letter or Number characters")
    }if(req.session.flash.error){
        res.redirect('/Registration');
    } 
    else{
        next();
    }
},
passwordCheck: async function (req,res,next){
    var {password} = req.body;
    if (password.length < 8){
       req.flash("error","Password must have more than 8 characters.")
    }
    if(!/[0-9]/.test(password)){
        req.flash("error","Password must have a Number character inside.")
    }
    if (!/[A-Z]/.test(password)){
      req.flash("error","Passwords must have a Upper Case Letter character inside.")
    }
    if (!/[/*-+!@#$^&*]/.test(password)){
        req.flash("error","Passwords must have a Special character inside.")
    }
    if(req.session.flash.error){
        res.redirect('/Registration');
    } 
    else{
        next();
    }
},

emailCheck: async function(req,res,next){
var {email}= req.body;
if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
    req.flash("error","Username was not valid")
} if(req.session.flash.error){
    res.redirect('/Registration');
} else{
    next();
}


},

isUsernameUnique: async function(req,res,next){
    var {username} = req.body;
    var [rows, fields]= await db.execute(`select id from users where username=?`, [username]);
    if (rows && rows.length > 0){
      req.flash("error","Username has already been taken.")
      return res.redirect('/Registration');
    } else{
        next();
    }

},
isEmailUnique: async function(req,res,next){
    var {email}= req.body;
var [rows, fields]= await db.execute(`select id from users where email=?`, [email]);
if (rows && rows.length > 0){
  req.flash("error","Email has already been")
  return res.redirect('/Registration');
} else{
    next();
}
},
};