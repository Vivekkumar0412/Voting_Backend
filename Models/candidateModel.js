const mongoose = require("mongoose");

candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  party: {
    type: String,
    required: true,
  },
  votes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
        required: true,
      },
      votedAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  voteCount : {
    type : Number,
    default : 0
  }
});

candiateModel = mongoose.model('candiateModel',candidateSchema)
module.exports = candiateModel;
