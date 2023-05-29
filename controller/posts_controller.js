const Post = require('../models/post');
const Comment = require('../models/comment');
const { name } = require('ejs');

module.exports.create = async function(req , res){

    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        })

        if(req.xhr){
            // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
            // post = await post.populate('user', 'name').execPopulate();

            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post Created"
            })
        }

        //Giving flash message
        req.flash('success' , 'Post has been created');
    
        return res.redirect('back');

    } catch (error) {

        //Giving flash message
        req.flash('error' , 'Error in Adding Post');

        console.log(error);
        return res.redirect('back');
    }
}

//Deleting a Post
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

            if(req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post Deleted"
                })
            }

            //Giving flash message
            req.flash('success' , 'Post has been Deleted');

            return res.redirect('back');
        }else{
            req.flash('error', 'You cannot delete this post!');
            return res.redirect('back');
        }

    } catch (error) {

        //Giving flash message
        req.flash('error' , 'Error in Deleting Post');

        console.log(error);
        return res.redirect('back');
    }

}