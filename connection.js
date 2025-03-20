import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

let connection = {
    isConnected: 0
}

const connectDB = async () => {
    if(connection.isConnected == 1){
        console.log("Already connected to database");
        return
    }
    try {
        const db = await mongoose.connect(process.env.MONGO_URI,{
            dbName: "Kali"
        });
        connection.isConnected = db.connections[0].readyState
        console.log(connection.isConnected);
        
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('MongoDB Connection Error:', error.message);
        process.exit(1);
    }
};

export default connectDB;
