import { Router } from "express";
import * as laptops from "@controllers/laptopsController";
import { imagesVideos } from "@middlewares/multer";
import { laptopMulterValidation } from "@middlewares/multerValidation";

const router = Router();

router.get("/", laptops.getAllLaptop);
router.post(
  "/",
  imagesVideos.fields([
    { name: "thumb", maxCount: 1 },
    { name: "videos", maxCount: 1 },
    { name: "gallery" },
  ]),
  laptopMulterValidation,
  laptops.createOneLaptop
);
router.get("/:id", laptops.getOneLaptop);
router.patch("/:id", laptops.updateOneLaptop);

export default router;
