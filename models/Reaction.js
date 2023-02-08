const { Schema, model } = require('mongoose');

// Schema to create a course model
const reactionSchema = new Schema(
  {
    reactionId: {
      type: String,
      required: true,
    },
    reactionBody: {
      type: Boolean,
      default: true,
    },
    username: {
      type: Date,
      default: Date.now(),
    },
    createdAt: {
      type: Date,
      // Sets a default value of 12 weeks from now
      default: () => new Date(+new Date() + 84 * 24 * 60 * 60 * 1000),
    },
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Freinds',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;
