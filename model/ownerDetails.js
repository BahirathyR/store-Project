// @ts-check
const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 0,
    maxlength: 50,
    default: ""
  },
  email: {
    required: true,
    type: String,
    unique: true
  },
  password: {
    required: true,
    type: String,
  },
  phone: {
    type: String,
    unique: true,
    validate: {
      validator: function (v) {
        return /\w/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'Owner phone number required']
  }
});

const Owner = mongoose.model("Owner", ownerSchema);
exports.Owner = Owner;