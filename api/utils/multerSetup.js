// setup multer storage for profile pic stroing of users

import multer, { diskStorage } from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/assets/images/users")); // store only user images in the directory
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname.replace(/\s+/g, "_"));
  },
});

const storage2 = diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/assets/images")); // store only product and other images in the directory
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname.replace(/\s+/g, "_"));
  },
});

// check for file type before uploading
const checkFileType = (file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|svg|webp|avif/;

  // check extension of uploaded file
  const extName = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  if (extName) {
    return cb(null, true);
  }
  return cb("error you can only upload images ! ");
};

const profileUpload = multer({
  storage: storage,
  limits: { fileSize: 1000000 * 10 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

const imagesUpload = multer({
  storage: storage2,
  limits: { fileSize: 1000000 * 10 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

export { profileUpload, imagesUpload };
