import Product from "../models/product.js";
import User from "../models/user.js";
import bcryptjs from "bcryptjs";

export const getProfile = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({username}).select("-password").populate({
            path: "products",
            select: "name"
        });

        /*const products = user.products;
        let userProducts = [];
        for(let i of products) {
            const product = await Product.findById(i).populate({
                path: "user",
                select: "-password"
            })
        }
        */


        if(!user) {
            return res.status(400).json({error: "User not found"});
        }
        res.status(200).json(user);
    }
    catch(error) {
        res.status(500).json({error: `Internal Server Error: ${error.message}`});
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { username, currentPassword, newPassword, fullName, email } = req.body;
        const userID = req.user._id;
        let user = await User.findById(userID);

        if(!user) {
            return res.status(400).json({error: "User not found"})
        }
        if((!currentPassword && newPassword ) || (!newPassword && currentPassword)) {
            return res.status(400).json({error: "Please provide both current and new passwords"})
        }

        if(currentPassword && newPassword) {
            const isMatch = await bcryptjs.compare(currentPassword, user.password);
            if(!isMatch) {
               return res.status(400).json({error: "Current password is incorrect"});
            }
            if(currentPassword === newPassword) {
                return res.status(400).json({error: "New password must be a different password"});
            }
            if(newPassword.length < 6) {
               return res.status(400).json({error: "Password must be at least 6 characters"})
            }
            const salt = await bcryptjs.genSalt(10);
            user.password = await bcryptjs.hash(newPassword, salt);
        }
        user.fullName = fullName || user.fullName;
        user.email = email || user.email;
        user.username = username || user.username;

        user = await user.save();

        user.password = null;
        res.status(200).json(user);
    }
    catch(error) {
        res.status(500).json({error: `Internal Server Error: ${error.message}`});
    }
}