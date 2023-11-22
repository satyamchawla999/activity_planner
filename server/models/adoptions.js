const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const PET_PATH = path.join("/Pets_image");

const adoptionSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    imgUrl: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    age: {
      type: String,
      required: true,
    },

    breed: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      required: true,
    },

    number: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", PET_PATH));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

adoptionSchema.statics.uploadedImage = multer({ storage: storage });

const AdoptionModel = mongoose.model("Adoption", adoptionSchema);

module.exports = AdoptionModel;
