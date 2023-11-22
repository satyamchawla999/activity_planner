const express = require("express");
const router = express.Router();
const Pet = require("../models/pets");

const petsController = require("../controllers/petsController");

router.post("/add-pet", Pet.uploadedImage.single('pet_image'), petsController.addPet);
router.post("/get-pets", petsController.getPets);
router.post("/delete-pet", petsController.deletePet);
router.post("/add-activity", petsController.addActivity);
router.post("/delete-activity", petsController.deleteActivity);

router.get("/get-pet/:id", petsController.getSinglePet);



module.exports = router;
