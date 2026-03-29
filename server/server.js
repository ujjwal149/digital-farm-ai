import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config();

import animalRoutes from "./routes/animalRoutes.js"

const app = express();



//middleware
app.use(cors());
app.use(express.json());


app.use("/api/animals",animalRoutes);

//Test route
app.get("/",(req,res)=>{
    res.send("Backend is running")
});


//MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB connected"))
.catch((err)=> console.log(err));



//Start server
app.listen(5000,() => {
    console.log("Server running on port 5000")
});


