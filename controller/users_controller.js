
module.exports.profile = function( req , res ){
    res.render( 'user_profile' , {
        title: "Home"
    });
}

//Render the Sign-Up page
module.exports.signUp = function( req , res ){
    res.render( 'user_sign_up' , {
        title: "Codeial | Sign Up"
    });
}

//Render the Sign-In Page
module.exports.signIn = function( req , res ){
    res.render( 'user_sign_in' , {
        title: "Codeial | Sign In"
    });
}

//Get Sign Up Data
module.exports.create = function( req , res ){
    //TODO Later
}

//Sign In and create a session for User
module.exports.createSession = function( req , res ){
    //TODO Later
}