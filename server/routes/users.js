const express = require("express");
const router = express.Router();
const User = require("../models/users");

const usersController = require("../controllers/usersController");


router.post("/sign-in", usersController.signIn);
router.post("/sign-up", usersController.signUp);

// router.post("/add-user",User.uploadedImage.single('user_image'), usersController.addUser);
// router.get("/get-users", usersController.getUsers);
// router.get("/get-user/:id", usersController.getSingleUser);
// router.post("/delete-user", usersController.deleteUser);
// router.post("/meal", usersController.userMeal);
// router.get("/get-feedbacks", usersController.getFeedbacks);


// router.post("/feedback",usersController.addFeedback);

module.exports = router;

// router.post("/add-user",User.uploadedImage.single('user_image'), usersController.addUser);
// router.post("/get-user/:id", usersController.getSingleUser);


// router.post(
//   "/update-profile",
//   User.uploadedImage.fields([
//     { name: "image1", maxCount: 1 },
//     { name: "image2", maxCount: 1 },
//   ]),
//   userController.updateProfile
// );

