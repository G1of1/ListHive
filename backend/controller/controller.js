import Product from "../models/product.js";
import mongoose from "mongoose";
//API Routes
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json({success: true, data: products});
    }
    catch(error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({sucess : false, message: `Error in finding products: ${error.message}`});
    }
};

export const createProduct = async (req, res) => {
    const product = req.body; //user sends this data
    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({success: false, message: "Please provide all fields."}); //returns 400 status if product isn't found.
    }
    const newProduct = new Product(product); //new product
    
    try {
        await newProduct.save(); //Save new product to the database
        res.status(201).json({success: true, data: newProduct})
    }
    catch(error) {
        console.error(`Error in saving product: ${error.message}`);
        res.status(500).json({success: false, message: `Server Error: ${error.message}`});
    }
};

export const updateProduct = async(req, res) => {
    const { id } = req.params;

    const product = req.body;
    
    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({success : false, message : `Product ID is invalid`})
    }
    try{
       const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
       res.status(200).json({success: true, data: updatedProduct});
    }
    catch(error) {
        console.log(`Error in updating product: ${error.message}`);
        res.status(500).json({success: false, message: `Error in updating product: ${error.message}`});
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({success : false, message : `Product ID is invalid`})
    }

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product deleted."});
    }
    catch(error) {
        res.status(500).json({sucess: false, message: `Server Error: ${error.message}`});
    }
};


