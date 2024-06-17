import mongoose from "mongoose";
import 'dotenv/config'; 

const URL =  process.env.MONGO_URI;
async function connectDB(){
    try {
        await mongoose.connect(`${URL}`);
        console.log("mongo db connected");
        
    } catch (error) {
        console.log("You got an error :" , error)
    }
}
export default connectDB;