const { User } = require("../models")


module.exports = {
    getAllUsers: function (req, res) {
        User.find()
        .then(results => {
            res.json(results)
        })
    },


    
    getSingleUser(req, res) {
        User.findOne({_id: req.params.userId} )
        .select('-__v')
        .then(async (user) =>
        !user
        ? res.status(404).json({message: 'No user found'})
        : res.json({
            user,

        })
        )
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
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