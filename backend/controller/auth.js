import  User  from '../models/user.js';
import { generateTokenAndSetCookie } from '../lib/util/generateToken.js';
import bcrypt from 'bcryptjs';
export const register = async (req, res) => {
    try {
        const { username, password, email, fullName } = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            return res.status(400).json({error: "Invalid email format"});
        }
        const isExistingUser = await User.findOne({username});
        const isExistingEmail = await User.findOne({email});
        const passwordLength = password.length;

        if(isExistingUser) {
            return res.status(400).json({error: "User already exists"});
        }
        if(isExistingEmail) {
            return res.status(400).json({error: "Email already used"});
        }
        if(passwordLength < 6) {
            return res.status(400).json({error: "Password must be at least 6 characters"})
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newUser = new User({fullName, email, username, password: hashedPassword});

        if(newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();
            res.status(200).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                email: newUser.email,
                profilePic: newUser.profilePic
            });
        }
        else {
            res.status(400).json({error: "Invalid user data"})
        }
    } 
    catch (error) {
        res.status(500).json({error: `Internal Server Error: ${error.message}`});
    }
}
export const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({username});
        const isPass = await bcrypt.compare(password, user?.password || "");
        if(!user || !isPass) {
            return res.status(401).json({error: "Invalid credentials"});
        }
        generateTokenAndSetCookie(user._id, res);
        
        res.status(200).json({
            _id: user._id,
                fullName: user.fullName,
                username: user.username,
                email: user.email,
                profilePic: user.profilePic,
        });
    }
    catch(error) {
        res.status(500).json({error: `Internal Server Error: ${error.message}`});
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 0});
        res.status(200).json({message: "Logged out successfully"});
    }
    catch(error) {
        res.status(500).json({error: `Internal Server Error: ${error.message}`});
    }
}

export const getMe = async (req, res) => {
    try {
        const userID = req.user._id;
        const user = await User.findById(userID).select("-password");
        res.status(200).json(user);
      } catch (error) {
          res.status(500).json({error: `Internal Server Error: ${error.message}`});
      }
  
}