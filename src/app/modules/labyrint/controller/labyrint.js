
const _ = require('lodash');
const Labyrint = require('../../models/Labyrint');

const get = ({options}) => {
    return new Promise((resolve, reject) => {
        const id = options.params.id
        Labyrint.find({id: id},  { "playfield": 1,"_id": 0 }, function(err, foundLabyrint) {
            if (err) {
                return resolve({code: 400, message: "Unexpeted error occurred!", error: err});
            }
            const types = [];
            _.each(foundLabyrint[0].playfield, value => {
                types.push({
                    id: value._id,
                    type:value.type
                })
            })
            return resolve({data: types});   
        });
    });
};

const getAll = ({options}) => {
    return new Promise((resolve, reject) => {
        const id = options.params.id
        Labyrint.find({}, { "id": 1,"_id": 0 }, function(err, foundLabyrint) {
            if (err) {
                return resolve({code: 400, message: "Unexpeted error occurred!", error: err});
            }
            return resolve({data: foundLabyrint});   
        });
    });
};

const setType = ({options}) => {
    return new Promise((resolve, reject) => {
        const {id, type, x, y} = options.params;
        Labyrint.findOneAndUpdate({id:id}, { $push: { playfield: {x,y,type}  } }, function(error, result) {
            if (error) {
                return resolve({code: 400, message: "Unexpeted error occurred!", error});
            }
            return resolve({data: {}, message: `Successfully updated block `});  
        });
    });
};

const setStartEnd = ({options}) => {
    return new Promise((resolve, reject) => {
        const {id, status, x, y} = options.params;
        const updateObj = status == 'start' ? 
            {
                'start' : {
                    x:x, y: y
                }
            } :
            {
                'end' : {
                    x:x, y: y
                }
            }
        
        Labyrint.update({id:id}, updateObj, function(error, result) {
            if (error) {
                return resolve({code: 400, message: "Unexpeted error occurred!", error});
            }
            return resolve({data: {}, message: `Successfully update the ${status} coordination`});  
        });
    });
};

const create = ({body}) => {
    return new Promise((resolve, reject) => {
        const labyrint = new Labyrint(body);
        labyrint.labyrinth(body, (error, result) => {
            if(error){
                return resolve({code: 400, message: "Unexpeted error occurred!", error});
            }
            return resolve({data: result._id});
        })
    });
};

const solution = ({options}) => {
    return new Promise((resolve, reject) => {
        const {id} = options.params;
        Labyrint.find({id:id}, (error, result) => {
            if(error){
                return resolve({code: 400, message: "Unexpeted error occurred!", error: err});
            }
            //find the solution start to end//
            return resolve({data: result});
        })
    });
};


module.exports = {
    get,
    getAll,
    setType,
    setStartEnd,
    create,
    solution
};
