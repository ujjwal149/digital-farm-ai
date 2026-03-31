import Animal from "../models/Animal.js";
import PredictionHistory from "../models/PredictionHistory.js";
import axios from "axios";



// CREATE ANIMAL

export const createAnimal = async (req, res) => {
  try {
    const animal = new Animal(req.body);
    const savedAnimal = await animal.save();

    //  Call AI after creation
    try {
      const aiRes = await axios.post("http://127.0.0.1:8000/predict", {
        temperature: savedAnimal.temperature,
        healthStatus: savedAnimal.healthStatus,
      });

      //  Save history
      await PredictionHistory.create({
        animalId: savedAnimal._id,
        temperature: savedAnimal.temperature,
        healthStatus: savedAnimal.healthStatus,
        aiStatus: aiRes.data.risk,
        riskScore: aiRes.data.score,
      });

    } catch (aiError) {
      console.log("AI Error (create):", aiError.message);
    }

    res.status(201).json(savedAnimal);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getHistory = async(_,res) => {
  try{
    const history = await  PredictionHistory.find().sort({createdAt:1});
    res.json(history);
  }catch(err){
    res.status(500).json({error:err.message});
  }
};


// GET ALL ANIMALS

export const getAnimals = async (req, res) => {
  try {
    const animals = await Animal.find();

    const enrichedAnimals = await Promise.all(
      animals.map(async (a) => {
        try {
          const aiRes = await axios.post("http://127.0.0.1:8000/predict", {
            temperature: a.temperature,
            healthStatus: a.healthStatus,
          });

          return {
            ...a._doc,
            aiStatus: aiRes.data.risk,
            riskScore: aiRes.data.score,
          };

        } catch (err) {
          return {
            ...a._doc,
            aiStatus: "AI Error",
            riskScore: 0,
          };
        }
      })
    );

    res.json(enrichedAnimals);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// DELETE ANIMAL

export const deleteAnimal = async (req, res) => {
  try {
    const deleted = await Animal.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Animal not found" });
    }

    res.json({ message: "Deleted successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};