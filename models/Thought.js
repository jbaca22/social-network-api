const moment = require('moment');
const { Schema, model } = require('mongoose');
var validate = require('mongoose-validator');

const Thought = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    username: {
      type: String,
      required: true,
    },
    toppings: [],
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'reaction'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

const Reaction = new Schema(
  {
    reactionID: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },

    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);


// get total count of comments and replies on retrieval
reactionSchema.virtual('reaction').get(function() {
  return this.reactions.reduce((total, reaction) => total + reaction.replies.length + 1, 0);
});

// create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// export the Pizza model
module.exports = Pizza;