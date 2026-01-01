import multer from "multer";
import { ApiError } from "../utils/ApiError.js";

// Set up storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter to allow only image files
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

// Multer upload instance
export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 },
});

// Error handling middleware specifically for multer
export const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    switch (err.code) {
      case "LIMIT_FILE_SIZE":
        return res
          .status(400)
          .json(new ApiError(400, "File too large. Maximum size is 20MB."));
      case "LIMIT_UNEXPECTED_FILE":
        return res
          .status(400)
          .json(
            new ApiError(
              400,
              "Invalid field name. Expected field name: 'image'."
            )
          );
      case "LIMIT_FILE_COUNT":
        return res
          .status(400)
          .json(new ApiError(400, "Too many files uploaded."));
      default:
        return res
          .status(400)
          .json(new ApiError(400, `Upload error: ${err.message}`));
    }
  } else if (err.message === "Only image files are allowed!") {
    return res
      .status(400)
      .json(
        new ApiError(
          400,
          "Invalid file type. Only JPEG, PNG, and WebP images are allowed."
        )
      );
  }

  next(err);
};
