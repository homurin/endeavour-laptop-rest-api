import { Router } from "express";
import * as authController from "@controllers/authController";
import {
  checkRequiredLoginFields,
  checkRequiredUpdateField,
} from "../middlewares/authValidation";
import { adminIdCheck } from "../middlewares/idCheck";
import { authMe } from "../middlewares/authMe";

const router = Router();

router.get("/me", authMe, authController.checkToken);
router.post("/login", checkRequiredLoginFields, authController.login);
router.patch(
  "/",
  adminIdCheck,
  checkRequiredUpdateField,
  authController.updateProfile
);

export default router;
