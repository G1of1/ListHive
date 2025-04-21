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
    coverImage: {
        type:String,
        required: true
    },
    images: [{
        type: String,
        required: true,
        default: []
    }],
    contactInfo: {
        number: {
            type: String
        },
        email: {
            type: String
        }
    },
    categories: [{
        type: String,
        default: []
    }]
}, {
    timestamps: true //createdAt, updatedAt timestamps are made
});

const Product = mongoose.model('Product', productSchema);

export default Product;