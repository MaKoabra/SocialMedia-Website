var express = require('express');
var router = express.Router();
var {isLoggedIn} = require('../middleware/auth');
var db = require('../conf/database');

router.post('/create', isLoggedIn, async function(req,res,next){
    var {userId,username} = req.session.user;
    var {postId, comment } = req.body;
    try {
        
        if (typeof userId === 'undefined') {
            throw new Error('userid is undefined');
        }
        if (typeof username === 'undefined') {
            throw new Error('username is undefined');
        }
        if (typeof comment=== 'undefined') {
            throw new Error('comment is undefined');
        }
        if (typeof postId === 'undefined') {
            throw new Error('postId is undefined');
        }
      
        
        var [rows, _ ] =  await db.execute(
            `insert into comments (text,fk_PostID,fk_CommentauthorId) value (?,?,?);`, [comment , postId, userId]
        );
        
        if (rows&&rows.affectedRows == 1) {
            return res.status(201).json({
                commentId:rows.insertId,
                username:username,
                commentText:comment,
        });
        } else {
            req.flash('error','Could not make comment');
            next();
        }


    } catch (error) {
        next(error);
    }
   

});

module.exports = router;
