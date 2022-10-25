const p = require('../utils/path');
const fs = require('fs');
const path= require('path');
const pathJoin = path.join(p,'data','cartData.json');

module.exports = class Cart{
   static addProductToCart(product,price){
    fs.readFile(pathJoin,(err,data)=>{
        let cart = { products:[],totalPrice:0};
        if(!err){
            cart = JSON.parse(data);
        }
  
        
        const existingProduct =cart.products.find(prod=>prod.products.id === product.id);
        const existingId =cart.products.findIndex(prod=>prod.products.id === product.id);
        let updatedProduct;
        if(existingProduct){
          
            updatedProduct = {...existingProduct};
            updatedProduct.qty = updatedProduct.qty + 1;
            cart.products = [...cart.products];
            cart.products[existingId] = updatedProduct;
            
            
        }
        else{
            updatedProduct = {products:product,qty:1};

            cart.products = [...cart.products,updatedProduct];
        
        }
       
        cart.totalPrice = cart.totalPrice + Number(updatedProduct.products.price);
      
        
            fs.writeFile(pathJoin,JSON.stringify(cart),(err)=>{
                console.log("Error Message "+err);
            })
    
    })
   }

   static deleteProductFromCart(id,price){
    fs.readFile(pathJoin,(err,data)=>{
        if(err){
       console.log("Error Message "+err);
       return;
        }
        const updatedCart = {...JSON.parse(data)};
       
        const Product = updatedCart.products.find(prod=>prod.products.id ==id);
       
        if(!Product){
            console.log("No product Found");
            return;
        }
        const productQuantity = Product.qty;
        updatedCart.products=  updatedCart.products.filter(prod=>prod.products.id !== id);
        updatedCart.totalPrice = Number(updatedCart.totalPrice) - Number(price*productQuantity);
        console.log(updatedCart.totalPrice)
        fs.writeFile(pathJoin,JSON.stringify(updatedCart),(err)=>{
            console.log("Error Message "+err);
        })
    })
   }

   static getCart(cb){
    fs.readFile(pathJoin,(err,data)=>{
      
        const cart = JSON.parse(data);
        if(err){
            console.log("Error Message "+err);
            cb(null);
        }
        else{
            cb(cart);
        }
    })
   }
}