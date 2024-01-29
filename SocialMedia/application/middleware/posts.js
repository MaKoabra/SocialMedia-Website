var pathToFFMPEG = require('ffmpeg-static');
var exec = require('child_process').exec;
var db = require('../conf/database');


module.exports ={
    makeThumbnail: function (req, res, next) {
        if (!req.file) {
            next(new Error('File upload failed'));
        } else {
            try {
                var destinationOfThumbnail = `public/Thumbnails/Images/thumbnail-${req.file.filename.split(".")[0]}.png`;
                var thumbnailCommand = `${pathToFFMPEG} -ss 00:00:01 -i ${req.file.path} -y -s 200x200 -vframes 1 -f image2 ${destinationOfThumbnail}`;
                exec(thumbnailCommand);
                req.file.thumbnail = destinationOfThumbnail;
                next();
            } catch (error) {
                next(error);
            }
        }
    },
    getPostsForUserProfile: async function(req,res,next){
        console.log("running getPostsForUserProfile");
        var {id} = req.params;
        console.log(id);
        try {
             let [rows, _ ] = await db.query(
                `Select id, title, thmbnails from posts where fk_userID=?;`, [id]);

            res.locals.posts=rows;
            next();
                  
        } catch (error) {
            next(error);
        }

    },
    getPostById: async function(req,res,next){

        console.log("Running getPostByID");
        var {id} = req.params;
        try {
           
            console.log(id);

        let[rows, _ ] = await db.execute( 
          `SELECT  p.id, u.username, p.video, p.title, p.description, p.createdAt FROM posts p join users u on p.fk_userID = u.id where p.id = ?;`, [id]);


        const post = rows[0];

        if (typeof post.id === 'undefined') {
            throw new Error('id is undefined');
        }
        if (typeof post.description === 'undefined') {
            throw new Error('Description is undefined');
        }
        if (typeof post.username === 'undefined') {
            throw new Error('Description is undefined');
        }
        if (typeof post.title === 'undefined') {
            throw new Error('titlel is undefined');
        }
        if (typeof post.video=== 'undefined') {
            throw new Error('video is undefined');
        }
        
        if(!post){
            req.flash("error", `There was no post`);
            res.redirect("/");
        }else{
            res.locals.currentPost = post;
            next();
        }
    } 
        catch (error) {
            next(error);
        }
    },
    getCommentsForPostById: async function(req,res,next){
        console.log("Running getCommentsPostByID");
        var {id} = req.params;
        console.log(req.params);
        try {
           let[ rows , _ ] = await db.execute( 
          `SELECT c.text, c.createdAt, u.username
           FROM comments c
           JOIN users u
           ON c.fk_CommentauthorId=u.id
           WHERE c.fk_PostID = ?;`, [id]
           );
           
       
        res.locals.currentPost.comments = rows;
        next();
    } 
        catch (error) {
            next(error);
        }  
    },


    getRecentPosts: async function(req,res,next){
        console.log("running getRecentPosts");
        
        try {
             let [rows, _ ] = await db.query(
                `Select id, title, thmbnails from posts order by CreatedAt desc limit 4;`
            );
            res.locals.posts=rows;
            next();
                  
        } catch (error) {
            next(error);
        }
    }

};