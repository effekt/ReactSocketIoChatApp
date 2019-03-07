const mongoose = require('mongoose');
var Schema =   mongoose.Schema;

var messageSchema = new Schema({
    by: String,
    room: { type: mongoose.Types.ObjectId, ref: 'Room' },
    message: String,
    time: { type: Date, default: Date.now() }
});

messageSchema.statics.addMessage = function(msg, cb) {
    let m = this(msg);
    m.save(function(err, res) {
        cb(res);
    });
}

messageSchema.statics.getMessages = function(room, cb) {
    mongoose.model('Message')
    .find({room: room})
    .sort({time: 'asc'})
    .exec((err, res) => {
        cb(res);
    })
}

module.exports = mongoose.model('Message', messageSchema);