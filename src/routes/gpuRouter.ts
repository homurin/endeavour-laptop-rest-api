import { Router } from "express";
import * as gpuController from "@controllers/gpuController";
import { gpuIdCheck } from "../middlewares/idCheck";

const router = Router();

router.get("/", gpuController.getAllCpu);
router.get("/:id", gpuIdCheck, gpuController.getOneGpu);

export default router;
