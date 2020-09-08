const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

const UserSchema = new Schema(
    {
      // set custom id to avoid confusion with parent comment _id
      UserId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
      username: {
        type: String,
        unique: true,
        required: true,
        trim: true
      },
      email: {
        type: String,
        required: true,
        unique: true,
        validate: [validateEmail, 'Please type in an email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please type in a valid email address']
      },
      
      thoughts:[],

      friends: [],

      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
      }
    },
    {
      toJSON: {
        getters: true
      }
    }
);

FriendSchema.virtual('friendCount').get(function() {
    return this.replies.length;
});

const Friend = model('frnd', FriendSchema);

module.exports = Friend;