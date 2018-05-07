const _ = require('lodash');
const User = require('../../models/User');
const {genarateToken, verifyToken} = require('../service/jwt');
const request = require('request');
const config = require('../../../config');
const bcrypt = require('bcrypt-nodejs');

const localSignIn = ({body, options}) => {
    return new Promise(resolve => {
        User.findOne({name: body.name}).
            then((user) => {
                if (!user) {
                    resolve({message: 'Wrong username ', code: 400});
                }
                if (!body.password) {
                    resolve({message: 'Please provide a password', code: 400});
                }
               
                if (user.comparePassword(body.password)) {
                    return (user);
                }
                resolve({message: 'Incorrect password', code: 400});
            }).
            then((userDetails) => {
                const user = userDetails;
                console.log(user)
                user.password = null;

                const token = genarateToken(user);
                resolve({status: true, message: 'Loggin Successfull', token: token, user});
            }).
            catch((err) => {
                resolve({status: false, message: err.message, data: err, code: 200});
            });
    });
};

module.exports = {
    localSignIn,
};
