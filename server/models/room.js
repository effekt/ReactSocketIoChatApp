const mongoose = require('mongoose');
var Schema =   mongoose.Schema;

var roomSchema = new Schema({
    name: String
});

roomSchema.statics.addRoom = function(room, cb) {
    let r = this({name: room});
    r.save(function(err, res) {
        cb(res);
    });
}

roomSchema.statics.getRooms = function(cb) {
    mongoose.model('Room')
    .find({})
    .then((res) => {
        cb(res);
    });
}

module.exports = mongoose.model('Room', roomSchema);