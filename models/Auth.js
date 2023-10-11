
const { Schema, default: mongoose} = require("mongoose");

const AuthSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  },
}, {
  timestamps: true // Add createdAt and updatedAt fields
});

module.exports = mongoose.model('Auth', AuthSchema);
