const User = require("../models/users");

module.exports.signIn = async (req, res) => {
  const {email,password} = req.body;
  try {
    const user = await User.findOne({email});
    if(user && user.password === password) {
      res.status(201).json({ message: "Sign in successfull!",user:user});
    } else {
      res.status(204).json({ message: "no user found" });
    }
  } catch (err) {
    res.status(400).json({ message: "error in signing in" });
  }
};

module.exports.signUp = async (req, res) => {
  const {email} = req.body
  try {
    let user = await User.findOne({email});
    if(!user) {
      user = await User.create(req.body);
      res.status(201).json({ message: "User created successfully!" });
    } else {
      res.status(204).json({ message: "User already present" });
    }
  } catch (err) {
    res.status(400).json({ message: "error in creating user" });
  }
};

// module.exports.addUser = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     } else {
//       const userData = req.body;
//       const userImage = req.file.filename;
//       const newUser = await User.create({ ...userData, imgUrl: userImage });
//       res.status(200).json({ message: "File uploaded successfully", newUser });
//     }
//   } catch (err) {
//     return res.status(400).json({ message: "No file uploaded" });
//   }
// };

// module.exports.getSingleUser = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const user = await User.findById(id);
//     if (!user) {
//       res.status(204).json({ message: "empty data", users: [] });
//     }

//     const currentDateStr = new Date().toISOString().split("T")[0];
//     const userFoodDataStr = user.foodData.toISOString().split("T")[0];

//     if (currentDateStr !== userFoodDataStr) {
//       user.foodData = new Date();
//       user.breakfast = false;
//       user.lunch = false;
//       user.dinner = false;
//       await user.save();
//     }

//     res.status(200).json({ message: "fetched successfully", user });
//   } catch (err) {
//     return res.status(400).json({ message: "error in finding user" });
//   }
// };

// module.exports.getUsers = async (req, res) => {
//   try {
//     const users = await User.find();
//     if (!users) {
//       res.status(204).json({ message: "empty data", users: [] });
//     } else {
//       res.status(201).json({ message: "fetched successfully", users });
//     }
//   } catch (err) {
//     return res.status(400).json({ message: "error in finding users" });
//   }
// };

// module.exports.userMeal = async (req, res) => {
//   const { item, student } = req.body;

//   const emailContent = mealTemplate
//     .replace("[MEAL_TYPE]", item)
//     .replace("[STUDENT_NAME]", student.name)
//     .replace("[LINK]", `http://localhost:3000/feedback-form/${student._id}`)
//     .replace("[STUDENT_ROLLNO]", student.rollNo);

//   let details = {
//     from: "satyamchawla999@gmail.com",
//     to: [student.studentEmail, student.guardianEmail],
//     subject: `${item} Update and Feedback`,
//     html: emailContent,
//   };

//   try {
//     const user = await User.findById(student._id);
//     if (!user) {
//       res.status(204).json({ message: "empty data", users: [] });
//     }

//     if (item === "Breakfast") {
//       user.breakfast = true;
//       await user.save();
//     }

//     if (item === "Lunch") {
//       user.lunch = true;
//       await user.save();
//     }

//     if (item === "Dinner") {
//       user.dinner = true;
//       await user.save();
//     }

//     mailTransporter.sendMail(details, (err) => {
//       if (err) {
//         console.log(`Error sending ${item} email:`, err);
//       } else {
//         console.log(`${item} email sent to recipients:`, meal.recipients);
//       }
//     });

//     return res.status(200).json({ message: `${item} successfull`, user });
//   } catch (err) {
//     return res.status(400).json({ message: "error in finding users" });
//   }
// };

// module.exports.deleteUser = async (req, res) => {
//   const { _id } = req.body;
//   console.log(_id);
//   try {
//     if (_id) {
//       const user = await User.findByIdAndDelete(_id);
//       res.status(200).json({ message: "deleted successfully!", user });
//     } else {
//       res.status(204).json({ message: "error in deleting user!" });
//     }
//   } catch (err) {
//     return res.status(400).json({ message: "error in finding users" });
//   }
// };

// module.exports.addFeedback = async (req, res) => {
//   // console.log(req.body);
//   const { feedback, studentForm } = req.body;

//   try {
//     const data = {
//       feedback,
//       email:studentForm.studentEmail,
//       name:studentForm.name,
//       imgUrl:studentForm.imgUrl
//     }
//     const newFeedback = await FeedbackSchema.create(data);

//     if(newFeedback) {
//       res.status(200).json({ message: "submitted successfully!" });
//     } else {
//       res.status(204).json({ message: "error in submitted feedback!" });
//     }

//   } catch (err) {
//     console.log(err)
//     return res.status(400).json({ message: "error in finding users" });
//   }
// };

// module.exports.getFeedbacks = async (req, res) => {
//   try {
//     const feedbacks = await FeedbackSchema.find();
//     if (!feedbacks) {
//       res.status(204).json({ message: "empty data", feedbacks: [] });
//     } else {
//       res.status(201).json({ message: "fetched successfully", feedbacks });
//     }
//   } catch (err) {
//     return res.status(400).json({ message: "error in finding feedbacks" });
//   }
// };
