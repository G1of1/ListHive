import mongoose from 'mongoose';
//User model
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
}, {
    timestamps: true //createdAt, updatedAt timestamps are made
});

const User = mongoose.model('User', userSchema);

export default User;