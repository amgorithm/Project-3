import multer from "multer";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "/uploads/"));
  },

  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const uploadFile = multer({ storage }).single("image");

export default uploadFile;
