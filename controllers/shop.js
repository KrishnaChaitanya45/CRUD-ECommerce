const Product = require('../models/product');
const Cart = require('../models/cart');
exports.getProducts = (req,res,next)=>{
    Product.fetchProducts(products => {
        res.render('shop/product-list', {
          prods: products,
          pageTitle: 'All Products',
          path: '/products'
        });
      });
};
exports.getIndex = (req,res,next)=>{
    Product.fetchProducts(products => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/'
          });
      });
};

exports.getProduct = (req,res,next)=>{
    const productId = req.params.productId;
    Product.findProductById(productId,product=>[
        res.render('shop/product-detail', {
            product: product,
            pageTitle: product.title,
            path: '/products'
          })
    ])
}
exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchProducts(products => {
      const cartProducts = [];
      for (product of products) {
     
        const cartProductData = cart.products.find(
          prod => prod.products.id === product.id
        );
        
        if (cartProductData) {
          cartProducts.push({ productData: cartProductData.products, qty: cartProductData.qty });
          
        }
      }
     
      
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartProducts,
        totalprice:cart.totalPrice
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findProductById(prodId, product => {
    Cart.addProductToCart(product, product.price);
  });
  res.redirect('/cart');
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  Product.findProductById(prodId, product => {
    Cart.deleteProductFromCart(prodId, product.price);
    res.redirect('/cart');
  });
};
