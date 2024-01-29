var express = require('express');
var router = express.Router();
var multer = require("multer");
var db = require ('../conf/database');
const {isLoggedIn} = require("../middleware/auth");
const {makeThumbnail,getPostById, getCommentsForPostById} = require('../middleware/posts');


const storage =multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "public/videos/uploads");
    },
    filename: function(req, file, cb){
        var fileExt = file.mimetype.split("/")[1];
        const uniqueSuffix = Date.now()+'-'+Math.round(Math.random() * 1E9)
        cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExt}`);
    },
});

const upload = multer({ storage: storage});

router.post("/create", isLoggedIn, upload.single("uploadVideo"), makeThumbnail, async function(req,res,next){
  console.log(req.file);
  console.log(req.body);
  var{title, description} = req.body;
  var {path, thumbnail} = req.file;
  var {userId} = req.session.user;

  try {    
    var [insertResult, _ ] = await db.execute(
        `INSERT INTO posts (title, description, video, thmbnails, fk_userID) VALUE (?,?,?,?,?);`,
         [title,description,path,thumbnail,userId]
    );
    if (insertResult && insertResult.affectedRows){
        req.flash("success", "Your post was created");
        return req.session.save(function(error){
            if(error) next(error);
            return res.redirect(`/`);
        })
    }else{
        next(new Error('Post could not be created'));
    }

  } catch (error) {
    next(error)
  }
});



router.get("/:id(\\d+)", getPostById, getCommentsForPostById, function(req,res){
    res.render("ViewPost");
  })
  
router.get("/search", async function(req,res,next){
    console.log(req.query);
   var {searchValue} = req.query;
   try {
    var[rows, _ ] = await db.execute(
       `SELECT id, title, thmbnails, concat_ws(' ', title, description) as haystack
        from posts having haystack like ?;`, [`%${searchValue}%`]
    );

    if(rows&&rows.length==0){
      return res.redirect('/');
    } else {
        res.locals.posts = rows;
        return res.render('index')
    }
   } catch (error) {
    next(error);
   }
  });



  router.post("/delete/:id", async function(req,res,next){
    console.log("running delete");
    var {id} =req.params;
    try {
      await db.query(
        `delete from comments where fk_postID=?;`,[id]
      );
      await db.query(
        `delete from posts where id=?;`,[id]
      );
      res.redirect(`/users/Profile/${req.session.user.userId}`)
    } catch (error) {
      next(error);
      
    }
  })

module.exports = router;
