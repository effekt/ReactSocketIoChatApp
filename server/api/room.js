const Room = require('../models/room');

module.exports = function(app){
    let endpoint = "/api/room";

    app.get(endpoint + "/get", function(req, res){
        Room.getRooms((rooms) => {
            res.json(rooms);
        });
    });

    app.get(endpoint + "/add/:room", function(req, res) {
        Room.addRoom(req.params.room, (r) => {
            res.json(r)
        });
    });
}