const { Thought, User } = require('../models');

const thoughtControllers = {
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find({}).sort({
        createdAt: -1 });
        res.status(200).json(thoughts);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    async getOneThought(req, res) {
      try {
        const thought = await Thought.findOne({_id: req.
          params.id});
          if (!thought) {
            
            res.status(404).json(" NO thought found");
          return
          } 
          res.status(200).json(thought);
        } catch (err) {
          res.status(500).json(err);
      }

    },
    async createThought(req, res) {
      try {
        const newThought = await Thought.create(req.body);
        await User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: newThought._id } },
          { new: true }
        );
        res.status(200).json(newThought);
      } catch (err) {
        res.status(500).json(err);
      }
    },
      async updateThought(req, res) {
        try {
          const updatedThought = await Thought.findOneAndUpdate(
            {_id: req.params, id },
            {$set: req.body},
            {new: true}
          );
          if (!updatedThought) {
            res.status(404).json(" NO thought found");
          }
          res.status(200).json(updatedThought);
        } catch (err) {
          res.status(500).json(err);
      }
          
        },
        async deleteThought(req, res) { 
          try {
            const deletedThought = await Thought.findIneAndRemove(
              {
              _id: req.params.id,

            });
            if (!deletedThought) {
              res.status(404).json(" NO thought found");
            }
            res.status(200).json(deletedThought);
          } catch (err) {
            res.status(500).json(err);
        }

          },
          async addReaction(req, res) {
            try {
              const updatedThought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                {
                  $addToSet: {
                    reactions: req.body},

                  },
                  { new: true }
              );
              if (!updatedThought) {
                res.status(404).json(" NO thought found");
              }
              res.status(200).json(updatedThought);
            } catch (err) {
              res.status(500).json(err);
          }
  },
  async deleteReaction(req, res) {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        {
          $pull: {
            reactions: { reactionId: req.params.
              reactionId } },

          },
          { new: true }
      );
      if (!updatedThought) {
        res.status(404).json(" NO thought found");
      }
      res.status(200).json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
  }
},

  };

  module.exports = thoughtControllers;
      

