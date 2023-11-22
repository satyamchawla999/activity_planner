const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },

    name: {
      type: String,
      require: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);





// const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const USER_PATH = path.join("/Users_Image");

// const userSchema = new mongoose.Schema(
//   {
//     studentEmail: {
//       type: String,
//       unique: true,
//       required: true,
//     },

//     rollNo: {
//       type: String,
//       unique: true,
//       require: true,
//     },

//     guardianEmail: {
//       type: String,
//       required: true,
//     },

//     phone: {
//       type: String,
//       required: true,
//     },

//     branch: {
//         type: String,
//         required: true,
//     },

//     name: {
//       type: String,
//       required: true,
//     },

//     imgUrl: {
//       type: String,
//       required: true,
//     },

//     foodData: {
//       type: Date,
//       default: Date.now
//     },

//     breakfast: {
//       type: Boolean,
//       default: false
//     },

//     lunch: {
//       type: Boolean,
//       default: false
//     },

//     dinner: {
//       type: Boolean,
//       default: false
//     }

//   },
//   {
//     timestamps: true,
//   }
// );

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", USER_PATH));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

userSchema.statics.uploadedImage = multer({storage: storage});

// userSchema.statics.userPath = USER_PATH;

const User = mongoose.model("User", userSchema);

module.exports = User;
