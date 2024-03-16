import { Router } from "express";
import * as windowsController from "@controllers/windowsController";

const router = Router();

router.get("/", windowsController.getAllWindows);
router.get("/:id", windowsController.getOneWindows);

export default router;
