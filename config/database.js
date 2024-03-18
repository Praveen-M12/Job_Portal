import mongoose from "mongoose";
// import { colors } from "colors";

const connectDB= async () =>{
    try {
        const conn =await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to mongo DB Database ${mongoose.connection.host}`.bgMagenta.white);
    } catch (error) {
        console.log(`MongoDB error ${error}`.bgWhite);
        
    }
}

export default connectDB;