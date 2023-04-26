module.exports.profile = function( req , res ){
    res.render( 'user_profile' , {
        title: "Home"
    });
}

module.exports.posts = function( req , res ){
    return res.end('<h1>Posts are here</h1>');
}