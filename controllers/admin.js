const Product = require('../models/product');
exports.addProduct = (req,res,next)=>{
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const product = new Product(null,title,description,price,imageUrl);
    product.AddProduct();
    console.log('product added')
    return res.redirect('/admin/products');
} //we take all the data from the user and extract the data from request body to some constants and create a new product model and write it to our data file
exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      editing: false
    });
  };
//get request which redirects to a page containing input fields for taking inputs to create a product
exports.getEditProduct = (req,res,next)=>{
    const editMode = req.query.edit;
    const prodId = req.params.productId;

    if(!editMode){
        return res.redirect('/');
    }
    Product.findProductById(prodId,(product)=>{
        if(!product){
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product
          });
    });
} //pass edit = true in params from front-end and check whether it is true and if it is true redirect it to a separate page where we prefetch the product details in inputs and ask user to change
exports.postEditProduct = (req,res,next)=>{
    const prodId = req.body.productId;
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const updatedProduct = new Product(
        prodId,title,description,price,imageUrl
    );
    updatedProduct.AddProduct();
     res.redirect('/admin/products');
}// save a new product with the same id as above such that in our products model we have it in updated products

exports.getProducts = (req,res,next)=>{
    Product.fetchProducts(products=>{
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
          });
    });
}//fetch all the products from the data file

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.deleteProductById(prodId);
    res.redirect('/admin/products');
  };
  // delete the product from the id