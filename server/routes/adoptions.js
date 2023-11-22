const express = require("express");
const router = express.Router();
const Adoption = require("../models/adoptions");

const adoptionsController = require("../controllers/adoptionsController");

router.post("/add-adoption", Adoption.uploadedImage.single('pet_image'), adoptionsController.addAdoption);
router.post("/get-adoptions", adoptionsController.getAdoptions);
router.post("/delete-adoption", adoptionsController.deleteAdoption);
// router.post("/add-activity", petsController.addActivity);
// router.post("/delete-activity", petsController.deleteActivity);

// router.get("/get-pet/:id", petsController.getSinglePet);



module.exports = router;
