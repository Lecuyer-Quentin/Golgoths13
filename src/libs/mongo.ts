import mongoose from 'mongoose';
import { MongoClient, GridFSBucket } from 'mongodb';
declare global {
    var client : MongoClient | null;
    var bucket : GridFSBucket | null;
}

const { MONGO_URI } = process.env;
if (!MONGO_URI) {
  throw new Error('Please define the MONGO_URI environment variable inside .env.local');
}


export async function connectToDb(){
    if(mongoose.connections[0].readyState) return;
    try {
        await mongoose.connect(MONGO_URI as string), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useFindAndModify: false,
           // useCreateIndex: true,
        };
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
    }
}

export async function connectToDbGridFs(){

    if(global.client){
        return {client: global.client, bucket: global.bucket!};
    }
        const client = (global.client = new MongoClient(MONGO_URI! as string, {}));
        const bucket = (global.bucket = new GridFSBucket(client.db(), {
            bucketName: 'uploads',
        }));
        await global.client.connect();
        console.log("MongoDB connected");
        return {client: client!, bucket: bucket!};

}





