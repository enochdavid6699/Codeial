const User = require('../../../models/user');

const jwt = require('jsonwebtoken'); // Add this line to import the jwt module

module.exports.createSession = async function (req, res) {

    try {

        let user = await User.findOne({ email: req.body.email });

        if (!user || user.password != req.body.password) {
            return res.json(422 , {
                message: "Invalid Username and Password"
            });
        }

        return res.json(200 , {
            message: "Signed in, here is your token, please keep it safe",
            data: {
                token: jwt.sign(user.toJSON(), 'codeial' , {expiresIn: '100000'})
            }
        });

    } catch (error) {
        console.log(error);
        return res.json(500 , {
            message: "Internal Server Error"
        });
    }
}