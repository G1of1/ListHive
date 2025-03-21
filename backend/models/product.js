import mongoose from "mongoose";
// Creating the schema for products(docs in the collection).
const productSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
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
    },
    image: {
        type: String, 
        required: true
    },
    contactInfo: {
        number: {
            type: String
        },
        email: {
            type: String
        }
    }
}, {
    timestamps: true //createdAt, updatedAt timestamps are made
});

const Product = mongoose.model('Product', productSchema);

export default Product;