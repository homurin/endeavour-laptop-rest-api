import { Router } from "express";
import * as authController from "@controllers/authController";
import { checkRequiredLoginFields } from "../middlewares/authValidation";

const router = Router();

router.post("/login", checkRequiredLoginFields, authController.login);

export default router;
