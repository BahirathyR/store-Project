// @ts-check

const express = require("express");
const router = express.Router();
const customer = require('../controllers/customer');
const employee = require('../controllers/employee');
const store = require('../controllers/store');
const supplier = require('../controllers/supplier');
const owner = require('../controllers/owner');
const { auth } = require('../middleware/auth');
const bcrypt = require("bcrypt");

/*****************  Owner api  *********************/
router.post('/ownerLogin', owner.login);

router.post('/addOwner', owner.addOwner);



/*****************  Store api  *********************/
router.post('/storeLogin', store.login);

router.post('/addStore', [auth], store.addStore);

router.get('/getStore', [auth], store.getStore);

router.post('/updateStoreById', [auth], store.updateStore)

router.delete('/deleteStoreById/:_id', [auth], store.deleteStoreById)


/*****************  customer api  *********************/
router.post('/customerLogin', customer.login);

router.post('/addCustomer', [auth], customer.addCustomer);

router.get('/getCustomer', [auth], customer.getCustomer);

router.post('/updateCustomerById', [auth], customer.updateCustomer);

router.delete('/deleteCustomerById/:_id', [auth], customer.deleteCustomerById);


/*****************  employee api  *********************/
router.post('/employeeLogin', employee.login);

router.post('/addEmployee', [auth], employee.addEmployee);

router.get('/getEmployee', [auth], employee.getEmployee);

router.post('/updateEmployeeById', [auth], employee.updateEmployee);

router.delete('/deleteEmployeeById/:_id', [auth], employee.deleteEmployeeById);


/*****************  supplier api  *********************/
router.post('/supplierLogin', supplier.login);

router.post('/addSupplier', [auth], supplier.addSupplier);

router.get('/getSupplier', [auth], supplier.getSupplier);

router.post('/updateSupplierById', [auth], supplier.updateSupplier);

router.delete('/deleteSupplierById/:_id', [auth], supplier.deleteSupplierById);

module.exports = router;
