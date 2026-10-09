import multer from "multer";

const storage = multer.memoryStorage();
const allowedMimeTypes = ["image/jpeg", "image/webp", "image/png"];
const MAX_FILE_SIZE = 4 * 1024 * 1024;

const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter(_req, file, cb) {
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(
        new Error("Invalid file type. Only JPEG, PNG, and WEBP are allowed")
      );
    }
    cb(null, true);
  },
});
export default upload;
