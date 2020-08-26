// @ts-check

const { Employee } = require("../model/empolyeeDetails");
const { token } = require('../middleware/auth');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const data = await Employee.findOne({ email, password });
    const _token = token(data['token']);
    console.log('data', data);
    return res.status(200).json({
        status: 200,
        message: "Successfully logged in..",
        data,
        token: _token
    });
}

exports.addEmployee = async (req, res) => {
    console.log('init addEmployee');
    const body = req.body;
    const obj = new Employee(body);
    await obj.save();
    return res.status(200).json({
        status: 200,
        message: "Employee successfully added.."
    });
}

exports.getEmployee = async (req, res) => {
    const data = await Employee.find({});
    return res.status(200).json({
        status: 200,
        message: "Data suessfully fetched",
        data
    });
}

exports.deleteEmployeeById = async (req, res) => {
    const { _id } = req.params; //assume get 54fcb3890cba9c4234f5c925
    const data = await Employee.deleteOne({ _id });
    console.log(data)
    return res.status(200).json({
        status: 200,
        message: "Successfully Deleted",
        deletedCount: data.deletedCount
    });
}

exports.updateEmployee = async (req, res) => {
    const params = req.params;
    const receiveData = JSON.parse(params.data)
    const update = { $set: receiveData };
    const query = { _id: receiveData._id };
    console.log('update', update);
    const data = await Employee.update(query, update);
    console.log('data', data);
    return res.status(200).json({
        status: 200,
        message: "Successfully Updated",
        updatedCount: data.n
    });
}
