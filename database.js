import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

const str= process.env.connectionStr;
const connectMongo= async() =>{
    try{
        await mongoose.connect(str);
        console.log('MongoDB connected successfully')
    }
    catch(error){
        console.error('Connection failed');
    }
};

export default connectMongo;