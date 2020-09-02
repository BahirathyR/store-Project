
const { Customer } = require("../model/customerDetails");
const { token } = require('../middleware/auth');
const bcrypt = require("bcrypt");


exports.login = async (req, res) => {
    const { email} = req.body;
    const data = await Customer.findOne({ email });
    console.log('data', data);
    if(!data && data===null){
    return res.status(401).json({status:401,message:"EmailId Invalid"})
    }
    const _token = token(data['token']);
    bcrypt.compare(req.body.password,data.password, function(err,result){
        console.log("password",result)
        console.log("datapassword",data.password)
        if(err){
         return res.status(400).json("Invalid password")
        }
else{
    return res.status(200).json({
        status: 200,
        message: "Successfully logged in..",
        data,
        token:_token
    });
}
    })
}

exports.addCustomer = async (req, res) => {
    console.log("add the customer")
    const body = req.body;
    const obj = new Customer(body);
    obj.save().then(function(result){
        console.log("hgghj")
        return res.status(200).json({
            status: 200,
            message: "Customer successfully added.."
        });
    }).catch(function(err){
        console.log("erorrrr",err)
        if(err.code===11000){
            return res.status(404).json({
                status: 404,
                message: err.errmsg
            });
        }
    })
    }

exports.getCustomer = async (req, res) => {
    const data = await Customer.find({});
    return res.status(200).json({
        status: 200,
        message: "Data suessfully fetched",
        data
    });
}
exports.getbyIDCustomer = async (req, res) => {
    const { _id } = req.params;
    const data = await Customer.find({_id});
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
    console.log("para")
    
    const receiveData = req.body;
    console.log("receiveData",receiveData)
    console.log("recc",receiveData._id)
    const update = { $set: receiveData };
    const query = { _id: receiveData._id };
    const data = await Customer.update(query, update);
    console.log('data', data);
    if(data.n>0){
        return res.status(200).json({
            status: 200,
            message: "Successfully Updated",
            updatedCount: data.n
        });
    }
    else{
        return res.status(202).json({
            status: 202,
            message: "failed Update",
            updatedCount: data.n
        });
    }

}
