const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  empId:{
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    minlength: 0,
    maxlength: 50,
    default: ""
  },
  lastName:{
    type: String,
    required: true,
    minlength: 0,
    maxlength: 50,
    default: ""
  },
  address: {
    type: String,
    required: true
  },
  pinNo: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
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
  confirmPassword:{
    required: true,
    type: String,
  },
  panNo:{
    type: String,
    required: true
  },
  dob:{
    type:Date,
    required: true
  },
  designation:{
    type:String,
    required: true
  },
  mobileNo: {
    type: String,
    unique: true,
    validate: {
      validator: function (v) {
        return /\w/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'Store phone number required']
  }
});

const Employee = mongoose.model("Employee", employeeSchema);
exports.Employee = Employee;