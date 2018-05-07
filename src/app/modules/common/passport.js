const jwt = require('jsonwebtoken');
const _ = require('lodash');
const User = require('../models/User');
const config = require('../../config');
const {secret} = config.get('jwt');
const {dashboard_path} = config.get('api');


const auth = (req, res, next) => {
    // check header or url parameters or post parameters for token
    const token = req.body.token || req.query.token ||
        req.headers.Authorization || req.get('Authorization');
    
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, secret, function(err, decoded) {
            if (err) {
                res.json({success: false, message: 'Failed to authenticate token.'});
            } else {
                // if everything is good, save to request for use in other routes
                req.user = decoded;
                next();
            }
        });
    } else {
        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
};

const getToken = (req, res) => {
    User.findOne({
        username: req.body.username
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
            res.json({success: false, message: 'Authentication failed. User not found.'});
        } else if (user) {
            // check if password matches
            user.comparePassword(req.body.password, function(err, isMatch) {
                if (isMatch && !err) {
                    // Create token if the password matched and no error was thrown
                    const reqUser = user.toObject();
                    delete reqUser.password;

                    const token = jwt.sign(reqUser, secret, {
                        expiresInMinutes: 1440 // expires in 24 hours
                    });
                    res.json({success: true, token: token});
                } else {
                    res.send({success: false,
                        message: 'Authentication failed. Passwords did not match.'});
                }
            });
        }
    });
};

module.exports = {
    getToken,
    auth,
};
