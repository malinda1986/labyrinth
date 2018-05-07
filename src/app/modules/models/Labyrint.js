const mongoose = require('mongoose');
const _ = require('lodash');
const Schema = mongoose.Schema;

const LabyrintSchema = new Schema({
    id: {type: Schema.Types.ObjectId, default: mongoose.Types.ObjectId  },  
    owner: { type: Schema.Types.ObjectId, ref: 'user', required: true}, 
    playfield:[
        { 
            x : {type: Number, require: true}, 
            y : {type: Number, require: true}, 
            type: { type: String, 'enum': ['blocked', 'empty']} 
        } 
    ], 
    start:{
        x : {type: Number, require: true}, 
        y : {type: Number, require: true}, 
    }, 
    end:{ 
        x : {type: Number, require: true}, 
        y : {type: Number, require: true}, 
    }

});

/**
 * @description Find Labyrinth by user id
 * @param {*} userId 
 * @param {*} cb 
 */
LabyrintSchema.static.labyrinths = function(userId, cb) {
    this.find({owner: userId}, (err, foundLabyrinths) => {
        if (err) {
            return cb(err);
        }
        if (_.isEmpty(foundLabyrinths)) {
            cb(null, false);
        } else {
            cb(null, foundLabyrinths);
        }
    });
};

/**
 * @description write Labyrinth with user id
 * @param {*} userId 
 * @param {*} cb 
 */
LabyrintSchema.methods.labyrinth = function(data, cb) {
    this.save((err, savedLabyrinths) => {
        if (err) {
            return cb(err);
        }
        cb(null, savedLabyrinths);
    });
};


const LabyrintModal = mongoose.model('Labyrint', LabyrintSchema);
module.exports = LabyrintModal;
