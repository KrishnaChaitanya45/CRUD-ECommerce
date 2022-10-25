const fs = require('fs');
const path = require('path');

const p = require('../utils/path');
const pathJoin = path.join(p,'data','product.json');
const getProductFromFile = (cb) =>{
    fs.readFile(pathJoin,(err,data)=>{ // reads the file if not found creates the file
        if(err){
            cb([]);  //here call back will be executed after the readFile so if an error occurs then there we get no products
        }
        else{
            cb(JSON.parse(data)); // if we have data in the file then we can get back from call back
        }
    });
}
const WriteProduct = (products) =>{
    fs.writeFile(pathJoin,JSON.stringify(products),(err)=>{
        console.log(err);
    });
}

module.exports = class Product{
    constructor(id,title,description,price,imageUrl){
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
    }

    AddProduct(){
        getProductFromFile(products =>{
            if(this.id){
                const existingId = products.findIndex(product=>product.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingId] = this;
               WriteProduct(updatedProducts);
                
            }
            else{
                this.id = Math.random().toString();
                products.push(this);
               WriteProduct(products);
                console.log(this + "This is me");
            }
        })
        
    }

    static deleteProductById(id){
        getProductFromFile(products=>{
            // const productToDelete = products.find(prod=>prod.id === id);
            const remainingProducts = products.filter(prod=>prod.id !== id);
            WriteProduct(remainingProducts);
        });
    }

    static fetchProducts(cb){
        getProductFromFile(cb);
    }
    static findProductById(id,cb){
        getProductFromFile(products=>{
            const product = products.find(prod=>prod.id === id);
            cb(product);
        })
    }
    
}