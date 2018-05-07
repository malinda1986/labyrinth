const jsonwebtoken = require('jsonwebtoken');
const config = require('../../../config');
const {secret} = config.get('jwt');



const genarateToken = function(user) {
    const token = jsonwebtoken.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30),
        data: user
    }, secret);
    return token;
};


const verifyToken = function(token, cb) {
    jsonwebtoken.verify(token, secret, function(err, decode) {
        if (err) {
            return cb({success: false, message: 'Token no has expired'});
        }
        return cb({success: true, user: decode.data});
    });
};



module.exports = {
    genarateToken,
    verifyToken,
};
