
const _ = require('lodash');
const User = require('../../models/User');

const get = ({options, body}) => {
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
                resolve({status: true, token: token, user: user});
            }).
            catch((err) => {
                resolve({status: false, message: err.message, data: err, code: 200});
            });
    });
};

const all = ({options}) => {
    return new Promise((resolve, reject) => {
        User.find({}, function(err, foundUsers) {
            if (err) {
                return resolve({code: 400, message: "Unexpeted error occurred!", error: err});
            }
            return resolve({data: foundUsers});   
        });
    });
};

const create = ({body}) => {
    return new Promise((resolve, reject) => {
        const user = new User();
        user.createUser(body, (error, result) => {
            if(error){
                return resolve({code: 400, message: "Unexpeted error occurred!", error: error});
            }
            return resolve({data: result});
        })
    });
};


module.exports = {
    get,
    create,
    all
};
