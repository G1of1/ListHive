import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './config/db.js';
import productRoutes from "./routes/products.js";
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import cookieParser from 'cookie-parser';
import path from 'path';

//Loads the content of the .env file and makes them accessible
dotenv.config();

//Create the express application
const app = express(); 
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;
const __dirname = path.resolve();
app.use(express.json());
//Use the routes from the routes.js file
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/profile', userRoutes);

//In production mode use the static webpage
if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/my-react-app/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "my-react-app", "dist", "index.html"))
    });
}
app.listen(port, () => {
    connectDB(); //connection to that database
    console.log('Server started at http://localhost:' + port);
}); //When the app is started
