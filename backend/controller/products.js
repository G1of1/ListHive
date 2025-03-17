import Product from "../models/product.js";
import mongoose from "mongoose";
import User from '../models/user.js';
//API Routes
export const getAllProducts = async (req, res) => {
    try {  
        const products = await Product.find().sort({createdAt: -1}).populate({
            path: "user",
            select: "-password"
        }) //Get all products and sort by the most recent
        if(products.length === 0) {
            return res.status(200).json([])
        }
        res.status(200).json(products);
    }
    catch(error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({error: `Error in finding products: ${error.message}`});
    }
};

export const createProduct = async (req, res) => {
    const userID = req.user._id;
    const { name, price, overview, image} = req.body;
    try {
        const user = await User.findById(userID);

        if(!user) {
            return res.status(400).json({error: "User not found"});
        }
        if(!name || !price || !image) {
            return res.status(400).json({error: "Please provide all necessary fields."});
    }
    const newProduct = new Product({
        user: userID,
        name: name,
        price: price,
        overview: overview,
        image: image
    }); //new product
    
        await newProduct.save(); //Save new product to the database
        await User.updateOne({_id: userID}, {$push: {products: newProduct._id}}); //Updates the products the user has
        res.status(201).json(newProduct);
}
    catch(error) {
        console.error(`Error in saving product: ${error.message}`);
        res.status(500).json({error: `Server Error: ${error.message}`});
    }
};

export const updateProduct = async(req, res) => {
    
    try {
        const { id: productID } = req.params;
        const {name, price, overview, image } = req.body;
        const userID = req.user._id;
        if(!mongoose.Types.ObjectId.isValid(productID)) {
            return res.status(400).json({error : `Product ID is invalid`})
    }
        let product = await Product.findById(productID);
        if(!product) {
            return res.status(400).json({error: "Product not found"})
        }
        if(userID.toString() !== product.user._id.toString()) {
            return res.status(400).json({error: "You are not authorized to delete this."})
        }
        product.price = price || product.price;
        product.name = name || product.name;
        product.overview = overview || product.overview;
        product.image = image || product.image;

        product = await product.save();
        res.status(200).json(product);
    }
    catch(error) {
        console.log(`Error in updating product: ${error.message}`);
        res.status(500).json({error: `Error in updating product: ${error.message}`});
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id: productID } = req.params;
        const userID = req.user._id;
        if(!mongoose.Types.ObjectId.isValid(productID)) {
            return res.status(404).json({error : `Product ID is invalid`})
        }
        const product = await Product.findById(productID);
        if(!product) {
            return res.status(400).json({error: "Product not found"});
        }
        if(userID.toString() !== product.user._id.toString()) {
            return res.status(400).json({error: "You are not authorized to delete this product"})
        }

        await Product.findByIdAndDelete(productID);
        await User.updateOne({_id: userID}, {$pull: {products: productID}});
        res.status(200).json({message: "Product deleted."});
    }
    catch(error) {
        res.status(500).json({error: `Internal Server Error: ${error.message}`});
    }
};

export const getUserProducts = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if(!user) {
            return res.status(400).json({error: "User not found"})
        }
        const userProducts = user.products;

        let products = [];
        for(let i of userProducts) {
            const p = await Product.findById(i).populate({
                path: "user",
                select: "-password"
            });
            products.push(p);
        }
        res.status(200).json(products);
    }
    catch(error) {
        res.status(500).json({error: `Internal Server Error: ${error.message}`})
    }
}

export const getProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id).populate({
            path: 'user',
            select: '-password'
        });

        if(!product) {
            return res.status(400).json({error: "Product not found"});
        }
        res.status(200).json(product);
    }
    catch(error) {
        res.status(500).json({error: `Internal Server Error: ${error.message}`});
    }
}
