import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI

export const connectDb = async function() {
   try {
    const conn = await mongoose.connect(MONGODB_URI)
    if(conn){
        console.log(`Database is connected at ${conn.connection.host}`)
    }
    
   } catch (error) {
    console.log(error)
   }

    
}