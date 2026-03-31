import mongoose from "mongoose";

const predictionSchema = new mongoose.Schema({
    animalId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Animal",
    },
    temperature:Number,
    healthStatus:String,
    aiStatus:String,
    riskScore:Number,
    createdAt:{
        type:Date,
        default:Date.now,
    },
});

export default mongoose.model("PredictionHistory",predictionSchema  );