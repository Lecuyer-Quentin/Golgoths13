import mongoose from 'mongoose';
const { MONGO_URI } = process.env;

if (!MONGO_URI) {
  throw new Error('Please define the MONGO_URI environment variable inside .env.local');
}


export async function connectToDb(){
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
    }
}
