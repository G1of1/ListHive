import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true,
    },
    fullName: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: ""
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        deafult: []
    }]
});

const User = mongoose.model('User', userSchema);

export default User;