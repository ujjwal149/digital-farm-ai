import express from "express";
import { 
  createAnimal, 
  getAnimals, 
  deleteAnimal,
  getHistory
} from "../controllers/animalController.js";

const router = express.Router();

router.post("/", createAnimal);
router.get("/", getAnimals);
router.delete("/:id", deleteAnimal); //  DELETE route

//API for history
router.get("/history",getHistory);

export default router;