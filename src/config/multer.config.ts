import multer from "multer";

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()} - ${file.originalname}`;
    cb(null, uniqueName);
  },
});

const multerConfig = { storage };

export default multerConfig;