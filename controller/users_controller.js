
const User = require('../models/user');

module.exports.profile = function( req , res ){
    return res.render( 'user_profile' , {
        title: "Home",
        user: user
    });
}

//Render the Sign-Up page
module.exports.signUp = function( req , res ){
    return res.render( 'user_sign_up' , {
        title: "Codeial | Sign Up"
    });
}

//Render the Sign-In Page
module.exports.signIn = function( req , res ){
    return res.render( 'user_sign_in' , {
        title: "Codeial | Sign In"
    });
}

//Get Sign Up Data
module.exports.create = async function( req , res ){
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }

    try {
        const user = await User.findOne({email: req.body.email} );    

        if(!user){
            User.create(req.body); 
            return res.redirect('/users/sign-in');
        }else{
            return res.redirect('back');
        }
        
    } catch (error) {
        console.log('Error in finding User in Singing Up');
    }      

}

//Sign In and create a session for User
module.exports.createSession = function( req , res ){
    return res.redirect('/');
}