import { Router } from "express";
import { body } from "express-validator";
import { verifyJWT } from "../middleware/authMiddleware.js";
import { handleUploadError, upload } from "../middleware/uploadMiddleware.js";
import {
  createMockup,
  deleteMockup,
  getAllMockupsForLoggedInUser,
  getMockupData,
} from "../controllers/mockupController.js";
import { validate } from "../middleware/validateMiddleware.js";

const router = Router();

router.get("/:id", getMockupData);

router.use(verifyJWT);

router
  .route("/")
  .get(getAllMockupsForLoggedInUser)
  .post(
    upload.single("image"),
    handleUploadError,
    ...validate([body("title").trim().isLength({ min: 2, max: 100 })]),
    createMockup,
  );

router.route("/:id").delete(deleteMockup);

export default router;
