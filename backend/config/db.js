import mongoose from "mongoose";
//Database configuration
export const connectDB = async () => {

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongo Connected: ${conn.connection.host}`);
    }
    catch(error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); //1 means there was a failure 0 means success.
    }
}