import multer from "multer";

// The disk storage engine gives you full control on storing files to disk
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/public/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({
  storage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      // upload only png and jpg format
      return cb(new Error("Please uplaod a image"));
    }
    cb(null, true);
  },
});
