import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './connection.js';
import User from './models/userModel.js';

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Root Route
app.get('/', (req, res) => {
    res.status(200).json({ message: "This is the root route" });
});

app.post('/api/users', async(req,res,next)=>{
    const userDetails = req.body;
    //console.log(userDetails);
    
    if(!userDetails.userName){
        return res.status(400).json({status: "failure", message: "Please enter user name"})
    }
    const newUser = new User(userDetails);
    console.log(newUser);
    
    try{
        await newUser.save();
        console.log("working");
        return res.status(201).json({status: "success", message: "User created successfully", userDetails: newUser})

    }catch(error){
        return res.status(500).json({status: "failure",message:"Internal Server Error", error: error})
    }
})


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
