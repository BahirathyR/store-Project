const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
    name: {
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
    GSTIN: {
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
    phone: {
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

const Supplier = mongoose.model("Supplier", supplierSchema);
exports.Supplier = Supplier;