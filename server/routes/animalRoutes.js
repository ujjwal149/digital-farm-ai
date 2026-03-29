import express from "express";
import { 
  createAnimal, 
  getAnimals, 
  deleteAnimal 
} from "../controllers/animalController.js";

const router = express.Router();

router.post("/", createAnimal);
router.get("/", getAnimals);
router.delete("/:id", deleteAnimal); // ✅ DELETE route

export default router;