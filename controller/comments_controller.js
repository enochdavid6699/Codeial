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

            if (req.xhr){
                // Similar for comments to fetch the user's id!
                comment = await comment.populate('user', 'name').execPopulate();
    
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post created!"
                });
            }

            //Giving flash message
            req.flash('success' , 'Comment Added Successfully');

            return res.redirect('/');
            
        }
    } catch (error) {

        //Giving flash message
        req.flash('error' , 'Error in Adding comment');

        console.log(error);
    }
}

module.exports.destroy = async function(req , res){

    try {
        let comment = await Comment.findById(req.params.id);

        //Store the id of the post the comment belonged to before deleting the comment
        let postId = comment.post;

        let postOwner = await Post.findById(postId);

        // console.log(req.user._id , '=======' ,postOwner.user.id);

        if(comment && (comment.user == req.user.id || req.user.id == postOwner.user._id)){

             // Delete the comment
            await Comment.deleteOne({ _id: comment._id });

            // Now delete the comment from the Post Array
            let post = await Post.findByIdAndUpdate(
            postId,
            { $pull: { comments: comment._id } },
            { new: true }
            );

            // send the comment id which was deleted back to the views
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }

            //Giving flash message
            req.flash('success' , 'Comment Deleted Successfully');
            
            return res.redirect('back');
            
        }else{
            return res.redirect('back');
        }

    } catch (error) {

        //Giving flash message
        req.flash('error' , 'Error in Deleting comment');

        console.log(error);
    }
}