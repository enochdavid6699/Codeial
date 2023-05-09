const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req , res){
 
    try {
        let post = await Post.findById(req.body.post);
        console.log("Post is printing" ,post);
        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                post: post,
                user: req.user._id
            });
            
            //Here we are directly pushing the comment to the Array of comments of a post
            post.comments.push(comment);
            post.save(); //Whenever we update something we need to save it
            return res.redirect('/');
            
        }
    } catch (error) {
        console.log(error);
    }
}