const { Schema, Types } = require('mongoose');
const moment = require("moment");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: function (date) {
        return moment(date).format("MM-DD-YYYY")
      }
    },
    username: {
      type: Number,
      required: true,
      default: () => Math.floor(Math.random() * (100 - 70 + 1) + 70),
    },
    reactions: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = reactionCount;
