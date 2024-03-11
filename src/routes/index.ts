import { Router } from "express";
import Laptops from "./laptopRouter";

const router = Router();

router.use("/api/v1/laptops", Laptops);

export default router;
