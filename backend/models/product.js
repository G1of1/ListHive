import mongoose from "mongoose";
// Creating the schema for products(docs in the collection).
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    overview: {
        type: String,
        required: true
    },
    image: {
        type: String, 
        required: true
    },
}, {
    timestamps: true //createdAt, updatedAt timestamps are made
});

const Product = mongoose.model('Product', productSchema);

export default Product;