import Animal from "../models/Animal.js";

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
    res.json(animals);
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