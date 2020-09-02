// @ts-check

const { Owner } = require("../model/ownerDetails");
const { token } = require('../middleware/auth');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const data = await Owner.findOne({ email, password });
     if(!data)
    return res.status(401).json({status:401,message:"authentication failed"})
    const _token = token(data['token']);
    console.log('data', data);
    return res.status(200).json({
        status: 200,
        message: "Successfully logged in..",
        data,
        token:_token
    });
}

exports.addOwner = async (req, res) => {
    const body = req.body;
    const customer = new Owner(body);
    await customer.save();
    return res.status(200).json({
        status: 200,
        message: "Customer successfully added.."
    });
}