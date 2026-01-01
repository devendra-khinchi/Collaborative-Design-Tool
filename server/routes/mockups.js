import { Router } from "express";
import { verifyJWT } from "../middleware/authMiddleware.js";
import { handleUploadError, upload } from "../middleware/uploadMiddleware.js";
import {
  createMockup,
  deleteMockup,
  getAllMockupsForLoggedInUser,
  getMockupData,
} from "../controllers/mockupController.js";

const router = Router();

router.get("/:id", getMockupData);

router.use(verifyJWT);

router
  .route("/")
  .get(getAllMockupsForLoggedInUser)
  .post(upload.single("image"), handleUploadError, createMockup);

router.route("/:id").delete(deleteMockup);

export default router;
