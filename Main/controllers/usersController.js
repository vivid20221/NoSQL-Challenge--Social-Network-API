const { ObjectId } = require('mongoose').Types;
const { users, Reaction } = require('../models');

// Aggregate function to get the number of userss overall
const headCount = async () =>
  users.aggregate()
    .count('usersCount')
    .then((numberOfuserss) => numberOfusers);

// Aggregate function for getting the overall grade using $avg
const grade = async (usersId) =>
  users.aggregate([
    // only include the given users by using $match
    { $match: { _id: ObjectId(usersId) } },
    {
      $unwind: '$assignments',
    },
    {
      $group: {
        _id: ObjectId(usersId),
        overallGrade: { $avg: '$assignments.score' },
      },
    },
  ]);

module.exports = {
  // Get all userss
  getuserss(req, res) {
    users.find()
      .then(async (userss) => {
        const usersObj = {
          userss,
          headCount: await headCount(),
        };
        return res.json(usersObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single users
  getSingleusers(req, res) {
    users.findOne({ _id: req.params.usersId })
      .select('-__v')
      .then(async (users) =>
        !users
          ? res.status(404).json({ message: 'No users with that ID' })
          : res.json({
              users,
              grade: await grade(req.params.usersId),
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new users
  createusers(req, res) {
    users.create(req.body)
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a users and remove them from the Reaction
  deleteusers(req, res) {
    users.findOneAndRemove({ _id: req.params.usersId })
      .then((users) =>
        !users
          ? res.status(404).json({ message: 'No such users exists' })
          : Reaction.findOneAndUpdate(
              { userss: req.params.usersId },
              { $pull: { userss: req.params.usersId } },
              { new: true }
            )
      )
      .then((Reaction) =>
        !Reaction
          ? res.status(404).json({
              message: 'users deleted, but no Reactions found',
            })
          : res.json({ message: 'users successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Add an assignment to a users
  addAssignment(req, res) {
    console.log('You are adding an assignment');
    console.log(req.body);
    users.findOneAndUpdate(
      { _id: req.params.usersId },
      { $addToSet: { assignments: req.body } },
      { runValidators: true, new: true }
    )
      .then((users) =>
        !users
          ? res
              .status(404)
              .json({ message: 'No users found with that ID :(' })
          : res.json(users)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove assignment from a users
  removeAssignment(req, res) {
    users.findOneAndUpdate(
      { _id: req.params.usersId },
      { $pull: { assignment: { assignmentId: req.params.assignmentId } } },
      { runValidators: true, new: true }
    )
      .then((users) =>
        !users
          ? res
              .status(404)
              .json({ message: 'No users found with that ID :(' })
          : res.json(users)
      )
      .catch((err) => res.status(500).json(err));
  },
};
