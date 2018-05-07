const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const _ = require('lodash');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id: {type: Schema.Types.ObjectId, default: mongoose.Types.ObjectId},  
    name: {type: String, required: true, unique: true}, 
    password: {type: String, required: true}
});

/**
 * @description Find user by name and password
 * @param {*} name, password 
 * @param {*} cb 
 */
UserSchema.statics.user = function({name, password}, cb) {
    this.find({name: name}, (err, foundUser) => {
        if (err) {
            return cb(err);
        }
        if (_.isEmpty(foundUser)) {
            cb('User not found', false);
        } else {
            if (foundUser.comparePassword(password)) {
               return cb(null, foundUser);
            }
            return cb('Invalid password', false);
        }
    });
};

/**
 * @description write user 
 * @param {*} name, password 
 * @param {*} cb 
 */
UserSchema.methods.createUser = function({name, password}, cb) {
    this.name = name;
    this.password = this.generateHash(password);
    this.save(function(err, result){
        console.log(err, result)
        if(err){
            return cb(err);
        }
        return cb(null, result);
    }); 
};

UserSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

const UserModal = mongoose.model('User', UserSchema);
module.exports = UserModal;
