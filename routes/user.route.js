import express from "express";
import {
  register,
  login,
  updateProfile,
  filteredUser,
} from "../controllers/user.controller.js";
import { registerSchema } from "../zodSchema/registerSchema.zod.js";
import { loginSchema } from "../zodSchema/loginSchema.zod.js";
import { validate } from "../middlewares/validate.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { updateSchema } from "../zodSchema/updateSchema.zod.js";

const router = express.Router();

// router.get("/user");
router.route("/register").post(validate(registerSchema), register);
router.route("/login").post(validate(loginSchema), login);
router
  .route("/profile/update")
  .put(validate(updateSchema), isAuthenticated, updateProfile);
router.route("/").get(filteredUser); // When a request is made to /api/v1/user, any query parameters (?filterName=John) are automatically passed to the filteredUser function via req.query.

export default router;
