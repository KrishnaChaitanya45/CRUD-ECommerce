const express = require('express');
const Router = express.Router();
const shopController = require('../controllers/shop');

Router.get('/', shopController.getIndex);

Router.get('/products', shopController.getProducts);

Router.get('/products/:productId', shopController.getProduct);

Router.get('/cart', shopController.getCart);

Router.post('/cart', shopController.postCart);

Router.post('/cart-delete-item/', shopController.postCartDeleteProduct);

// Router.get('/orders', shopController.getOrders);

// Router.get('/checkout', shopController.getCheckout);





module.exports = Router;