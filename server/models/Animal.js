import mongoose from "mongoose"

const animalSchema = new mongoose.Schema({
    type:String,
    healthStatus:String,
    temperature:Number,
},{timestamps:true});

export default  mongoose.model("Animal",animalSchema)