
const User = require('../models/user');

//Profile Page
module.exports.profile = async function( req , res ){

    try {
        let user = await User.findById(req.params.id);

        return res.render( 'user_profile' , {
            title: "Home",
            profile_user: user
    });
        
    } catch (error) {
        console.log(error);
    }

}

//Profile Update
module.exports.update = async function(req , res){
    if(req.user.id == req.params.id){
        //This will update the users information
        let user = await User.findByIdAndUpdate(req.params.id , req.body);
        
        return res.redirect('back');
    }

    return res.status(401).send("Unauthorized");
}

//Render the Sign-Up page
module.exports.signUp = function( req , res ){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render( 'user_sign_up' , {
        title: "Codeial | Sign Up"
    });
}

//Render the Sign-In Page
module.exports.signIn = function( req , res ){
    
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

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

    req.flash('success' , 'Logged In Successfully');
    
    return res.redirect('/');
}
  

//Sign Out Function
module.exports.signOut = function(req , res){
    req.logout(function(err) {
        if (err) {
            // Handle error
        }

        req.flash('success' , 'You have logged out');

        // Redirect the user to the login page after logout
        return res.redirect('/');
    });
}
