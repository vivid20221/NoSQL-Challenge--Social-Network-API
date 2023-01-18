const { Schema, model } = require('mongoose');
const assignmentSchema = require('./Thought');

// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      max_length: 50,
    },
    email: {
      type: String,
      required: true,
      max_length: 50,
    },
    thoughts: {
      type: String,
      required: true,
      max_length: 50,
    },
    friends: [friendsCount],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Friends = model('friendsCount', friendsSchema);

module.exports = Friends;
