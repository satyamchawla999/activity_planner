const Adoption = require("../models/adoptions");

module.exports.addAdoption = async (req, res) => {
  console.log(req.file);
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    } else {
      const adoptionData = req.body;
      const petImage = req.file.filename;
      console.log('hello hello')
      const newAdoption = await Adoption.create({ ...adoptionData, imgUrl: petImage });
      console.log('hello')
      res.status(200).json({ message: "File uploaded successfully", newAdoption });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "No file uploaded" });
  }
};

module.exports.getAdoptions = async (req, res) => {
  const { uid } = req.body;
  try {
    const adoptions = await Adoption.find();
    if (!adoptions) {
      res.status(204).json({ message: "empty data", adoptions: [] });
    } else {
      res.status(200).json({ message: "fetched successfully", adoptions });
    }
  } catch (err) {
    return res.status(400).json({ message: "error in finding pets" });
  }
};

module.exports.deleteAdoption = async (req, res) => {
  const { _id } = req.body;
  try {
    if (_id) {
      const adoption = await Adoption.findByIdAndDelete(_id);
      console.log(_id);

      res.status(200).json({ message: "deleted successfully!", adoption });
    } else {
      res.status(204).json({ message: "error in deleting Adoption!" });
    }
  } catch (err) {
    return res.status(400).json({ message: "error in finding Adoption" });
  }
};

// module.exports.getSinglePet = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const pet = await Pet.findById(id);
//     if (!pet) {
//       res.status(204).json({ message: "empty data", pet: {} });
//     }
//     res.status(200).json({ message: "fetched successfully", pet });
//   } catch (err) {
//     return res.status(400).json({ message: "error in finding pet" });
//   }
// };

// module.exports.addActivity = async (req, res) => {
//   const { _id, activity } = req.body;
//   try {
//     const pet = await Pet.findById(_id);
//     if (!pet) {
//       res.status(204).json({ message: "empty data", pet: {} });
//     }
//     pet.activity.push(activity);

//     await pet.save();
//     res.status(201).json({ message: "activity added" });
//   } catch (err) {
//     return res.status(400).json({ message: "error in finding pet" });
//   }
// };

// module.exports.deleteActivity = async (req, res) => {
//   const { _id, activityId } = req.body;
//   try {
//     const pet = await Pet.findById(_id);
//     if (!pet) {
//       res.status(204).json({ message: "empty data" });
//     }
//     pet.activity = pet.activity.filter(activity => activity.id !== activityId);

//     await pet.save();
//     res.status(200).json({ message: "activity deleted" });
//   } catch (err) {
//     return res.status(400).json({ message: "error in finding pet" });
//   }
// };
