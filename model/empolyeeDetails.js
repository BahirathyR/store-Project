const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 0,
    maxlength: 50
  },
  employeeId: {
    type: String,
    required: true
  },
  userAccess: {
    type: String,
    required: true // manager, sales, 
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
    required: [true, 'Employee phone number required']
  }
});

const Employee = mongoose.model("Employee", employeeSchema);
exports.Employee = Employee;