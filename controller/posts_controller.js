const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function(req , res){

    try {
        Post.create({
            content: req.body.content,
            user: req.user._id
        })
    
        return res.redirect('back');

    } catch (error) {
        console.log(error);
    }
}

module.exports.destroy = async function(req , res){

    try {
        let post = await Post.findById(req.params.id);   
        
        // .id is converting the objectid(._id) into string
        if(post && post.user == req.user.id){
            //Delete the post
            // post.remove();
            await post.deleteOne();

            //Delete the comments
            await Comment.deleteMany({post: req.params.id});
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }

    } catch (error) {
        console.log(error);
    }

}