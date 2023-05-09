const Post = require('../models/post');

module.exports.home = async function( req , res ){

    try {
        let posts = await Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate:{
                path: 'user'
            }
        })
        return res.render('home', {
          title: "Home",
          posts: posts
        });
    } catch (err) {
        console.log(err);
        return res.redirect('back');
    }

}