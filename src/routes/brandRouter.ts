import { Router } from "express";
import * as brandController from "@controllers/brandController";

const router = Router();

router.get("/", brandController.getAllBrand);

export default router;
