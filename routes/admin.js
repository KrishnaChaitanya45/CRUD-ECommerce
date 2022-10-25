const express = require('express');
const router = express.Router();
const adminControllers = require('../controllers/admin');

router.get('/add-product', adminControllers.getAddProduct);

// /admin/add-product => POST
router.post('/add-product', adminControllers.addProduct);

// /admin/products => GET
router.get('/products', adminControllers.getProducts);


router.get('/edit-product/:productId', adminControllers.getEditProduct);

router.post('/edit-product', adminControllers.postEditProduct);

router.post('/delete-product/:productId', adminControllers.postDeleteProduct);

module.exports = router;