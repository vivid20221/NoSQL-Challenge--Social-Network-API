const { User } = require("../models")


module.exports = {
    getAllUsers: function (req, res) {
        User.find()
        .then(results => {
            res.json(results)
        })
    },
    getSingleUser: function () {

    },
    createUser: function (req, res) {
        User.create(req.body)
        .then(result => {
            res.json(result)
        })
    },
    deleteUser: function () {

    },
}