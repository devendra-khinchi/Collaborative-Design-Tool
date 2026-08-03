import { Router } from "express";
import { body } from "express-validator";
import { rateLimit } from "express-rate-limit";
import { loginUser, signupUser } from "../controllers/authController.js";
import { validate } from "../middleware/validateMiddleware.js";

const router = Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per `window` (here, per 15 minutes)
  message: {
    success: false,
    message:
      "Too many requests from this IP, please try again after 15 minutes",
  },
});

router.use(authLimiter);

router.post(
  "/signup",
  ...validate([
    body("name").trim().notEmpty(),
    body("email").trim().isEmail(),
    body("password").isLength({ min: 6 }),
  ]),
  signupUser,
);
router.post(
  "/login",
  ...validate([body("email").trim().isEmail(), body("password").notEmpty()]),
  loginUser,
);

export default router;
