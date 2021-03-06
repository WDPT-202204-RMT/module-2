const { Schema, model } = require('mongoose');

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, 'Username is required'],
      unique: true,
      // unique: true -> Ideally, should be unique, but its up to you
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true, // This is neing checked by Mongo !
      // String + @ + string + . + string
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'], // This is being checked by mongoose!
      lowercase: true,
      trim: true,
    },
    // This is the Hashed Password
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    profile_pic: {
      required: false,
      type: String,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model('User', userSchema);

module.exports = User;
