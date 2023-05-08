const Post = require('../models/post');

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