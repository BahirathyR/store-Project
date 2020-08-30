// @ts-check

const { Supplier } = require("../model/supplierDetails");
const { token } = require("../middleware/auth");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const data = await Supplier.findOne({ email, password });
  const _token = token(data["token"]);
  console.log("data", data);
  return res.status(200).json({
    status: 200,
    message: "Successfully logged in..",
    data,
    token: _token,
  });
};

exports.addSupplier = async (req, res) => {
  const body = req.body;
body.password = bcrypt.hashSync(body.password, 10);
  const obj = new Supplier(body);
  await obj.save();
  return res.status(200).json({
    status: 200,
    message: "Supplier successfully added..",
  });
};

exports.getSupplier = async (req, res) => {
  const data = await Supplier.find({});
  return res.status(200).json({
    status: 200,
    message: "Data suessfully fetched",
    data,
  });
};

exports.deleteSupplierById = async (req, res) => {
  const { _id } = req.params; //assume get 54fcb3890cba9c4234f5c925
  const data = await Supplier.deleteOne({ _id });
  console.log(data);
  return res.status(200).json({
    status: 200,
    message: "Successfully Deleted",
    deletedCount: data.deletedCount,
  });
};

exports.updateSupplier = async (req, res) => {
  const receiveData = req.body;
  console.log("receiveData", receiveData);
  console.log("recc", receiveData._id);
  const update = { $set: receiveData };
  const query = { _id: receiveData._id };
  const data = await Supplier.update(query, update);
  console.log("data", data);
  if (data.n > 0) {
    return res.status(200).json({
      status: 200,
      message: "Successfully Updated",
      updatedCount: data.n,
    });
  } else {
    return res.status(202).json({
      status: 202,
      message: "failed Update",
      updatedCount: data.n,
    });
  }
};
