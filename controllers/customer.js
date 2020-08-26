// @ts-check

const { Customer } = require("../model/customerDetails");
const { token } = require('../middleware/auth');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const data = await Customer.findOne({ email, password });
    const _token = token(data['token']);
    console.log('data', data);
    return res.status(200).json({
        status: 200,
        message: "Successfully logged in..",
        data,
        token:_token
    });
}

exports.addCustomer = async (req, res) => {
    const body = req.body;
    const customer = new Customer(body);
    await customer.save();
    return res.status(200).json({
        status: 200,
        message: "Customer successfully added.."
    });
}

exports.getCustomer = async (req, res) => {
    const data = await Customer.find({});
    return res.status(200).json({
        status: 200,
        message: "Data suessfully fetched",
        data
    });
}

exports.deleteCustomerById = async (req, res) => {
    const { _id } = req.params; //assume get 54fcb3890cba9c4234f5c925
    const data = await Customer.deleteOne({ _id });
    console.log(data)
    return res.status(200).json({
        status: 200,
        message: "Successfully Deleted",
        deletedCount: data.deletedCount
    });
}

exports.updateCustomer = async (req, res) => {
    const params = req.params;
    const receiveData = JSON.parse(params.data)
    const update = { $set: receiveData };
    const query = { _id: receiveData._id };
    const data = await Customer.update(query, update);
    console.log('data', data);
    return res.status(200).json({
        status: 200,
        message: "Successfully Updated",
        updatedCount: data.n
    });
}
