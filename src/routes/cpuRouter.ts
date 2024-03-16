import { Router } from "express";
import * as cpuController from "@controllers/cpuController";
import { cpuIdCheck } from "@middlewares/idCheck";

const router = Router();

router.get("/", cpuController.getAllCpu);
router.get("/:id", cpuIdCheck, cpuController.getAllCpu);

export default router;
