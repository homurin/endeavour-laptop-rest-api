import { Router } from "express";
import laptopRouter from "./laptopRouter";
import cpuRouter from "./cpuRouter";
import gpuRouter from "./gpuRouter";
import windowsRouter from "./windowsRouter";
import applicationRouter from "./applicationRouter";
import adminRouter from "./adminRouter";
import authRouter from "./authRouter";

const router = Router();

router.use("/api/v1/laptops", laptopRouter);
router.use("/api/v1/applications", applicationRouter);
router.use("/api/v1/cpus", cpuRouter);
router.use("/api/v1/gpus", gpuRouter);
router.use("/api/v1/windows", windowsRouter);
router.use("/api/v1/admins", adminRouter);
router.use("/api/v1/auth", authRouter);

export default router;
