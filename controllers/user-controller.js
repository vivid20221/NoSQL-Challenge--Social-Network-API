const { User, Thought } = require("../models");


const userControllers = {
   async  getAllUsers(req, res) {
        try {
            const users = await User.find({}).select('-_V').
            populate("thoughts").populate("friends");
            res.status(200).json(users);
         } catch (err) {
          res.status(500).json(err);
        }
    },
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({_id: req.params.
                id}).select(
                    "-_V"
                    ).populate('thoughts')
                    .populate("friends");
                    if (!user) { 
                        res.status(404).json('NOT FOUND');
                        return;
                    }
                    res.status(200).json(user);
                } catch (err) {
                    res.status(500).json(err);
                }
            },
            async createUser(req, res) {
                try {
                    const newUser = await User.create(req.body)
                    res.status(200).json(newUser);

                } catch (err) { 
                    res.status(500).json(err);
            }
        },

        async updateUser(req, res) {
            try {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: req.params.id },
                    { $set: req.body },
                    { new: true }
                );
                    if(!updatedUser) {
                        res.status(404).json(' User NOT FOUND');
                    }
                        res.status(200).json(updatedUser);
                    } catch (err) {
                        res.status(500).json(err);
                    }
            },

        async deleteUser(req, res) {
            try {
                const deletedUser = await User.findOneandRemove({
                    _id: req.params.id,
                });
                if(!deletedUser) {
                    res.status(404).json(' User NOT FOUND');
                }
                    res.status(200).json(deletedUser);
                } catch (err) {
                    res.status(500).json(err);
                }
            },
        };

        module.exports = userControllers;