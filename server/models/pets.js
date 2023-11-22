const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const PET_PATH = path.join("/Pets_image");

const petSchema = new mongoose.Schema(
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

    activity: [
      {
        type: Object,
      },
    ],
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

petSchema.statics.uploadedImage = multer({ storage: storage });

const PetModel = mongoose.model("Pet", petSchema);

module.exports = PetModel;
