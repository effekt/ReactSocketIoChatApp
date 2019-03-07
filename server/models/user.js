const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

var userSchema = new Schema({
    name: String,
    pass: String,
    created: { type: Date, default: Date.now() }
});

userSchema.statics.login = function(user, cb) {
    let r = this(user);
    mongoose.model('User')
    .findOne({'name': { $regex: new RegExp('^' + r.name.toLowerCase() + '$', 'i') }} )
    .then((res) => {
        if (res) {
            bcrypt.compare(r.pass, res.pass, (err, valid) => {
                if (valid)
                    cb(res);
                else
                    cb(null);
            });
        } else {
            bcrypt.hash(r.pass, 10, (err, hash) => {
                r.pass = hash;
                r.save(function(err, res) {
                    cb(res);
                });
            });
        }
    });
}

userSchema.statics.getRooms = function(cb) {
    mongoose.model('User')
    .find({})
    .then((res) => {
        cb(res);
    });
}

module.exports = mongoose.model('User', userSchema);