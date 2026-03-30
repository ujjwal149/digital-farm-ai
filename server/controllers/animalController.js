import Animal from "../models/Animal.js";
import axios from "axios";


// CREATE
export const createAnimal = async (req, res) => {
  try {
    const animal = new Animal(req.body);
    const saved = await animal.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ
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

// DELETE 
export const deleteAnimal = async (req, res) => {
  try {
    await Animal.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

