const Pet = require("../models/pets");

module.exports.addPet = async (req, res) => {
  console.log(req.file);
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    } else {
      const petData = req.body;
      const petImage = req.file.filename;
      console.log(petData);
      console.log(petImage);
      const newPet = await Pet.create({ ...petData, imgUrl: petImage });
      res.status(200).json({ message: "File uploaded successfully", newPet });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "No file uploaded" });
  }
};

module.exports.getPets = async (req, res) => {
  const { uid } = req.body;
  try {
    const pets = await Pet.find({ uid });
    if (!pets) {
      res.status(204).json({ message: "empty data", pets: [] });
    } else {
      res.status(200).json({ message: "fetched successfully", pets });
    }
  } catch (err) {
    return res.status(400).json({ message: "error in finding pets" });
  }
};

module.exports.deletePet = async (req, res) => {
  const { _id } = req.body;
  try {
    if (_id) {
      const pet = await Pet.findByIdAndDelete(_id);
      console.log(_id);

      res.status(200).json({ message: "deleted successfully!", pet });
    } else {
      res.status(204).json({ message: "error in deleting pet!" });
    }
  } catch (err) {
    return res.status(400).json({ message: "error in finding pet" });
  }
};

module.exports.getSinglePet = async (req, res) => {
  const { id } = req.params;
  try {
    const pet = await Pet.findById(id);
    if (!pet) {
      res.status(204).json({ message: "empty data", pet: {} });
    }
    res.status(200).json({ message: "fetched successfully", pet });
  } catch (err) {
    return res.status(400).json({ message: "error in finding pet" });
  }
};

module.exports.addActivity = async (req, res) => {
  const { _id, activity } = req.body;
  try {
    const pet = await Pet.findById(_id);
    if (!pet) {
      res.status(204).json({ message: "empty data", pet: {} });
    }
    pet.activity.push(activity);

    await pet.save();
    res.status(201).json({ message: "activity added" });
  } catch (err) {
    return res.status(400).json({ message: "error in finding pet" });
  }
};

module.exports.deleteActivity = async (req, res) => {
  const { _id, activityId } = req.body;
  try {
    const pet = await Pet.findById(_id);
    if (!pet) {
      res.status(204).json({ message: "empty data" });
    }
    pet.activity = pet.activity.filter(activity => activity.id !== activityId);

    await pet.save();
    res.status(200).json({ message: "activity deleted" });
  } catch (err) {
    return res.status(400).json({ message: "error in finding pet" });
  }
};
