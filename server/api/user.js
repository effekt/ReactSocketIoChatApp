const User = require('../models/user');

module.exports = function(app){
    let endpoint = "/api/user";

    app.post(endpoint + "/login", function(req, res) {
        User.login(req.body, (r) => {
            res.json(r)
        });
    });
}