import { Router } from "express";
import * as laptops from "@controllers/laptopController";
import { imagesVideos } from "@middlewares/multer";
import {
  updateUploadLaptopMedia,
  uploadLaptopMedia,
} from "../middlewares/imagekitUpload";
import { idCheck } from "../middlewares/laptopValidation";
import { authMe } from "../middlewares/authMe";

const router = Router();

router.get("/", laptops.getAllLaptop);
router.post(
  "/",
  authMe,
  imagesVideos.fields([
    { name: "thumb", maxCount: 1 },
    { name: "videos", maxCount: 1 },
    { name: "gallery" },
  ]),
  uploadLaptopMedia,
  laptops.createOneLaptop
);
router.get("/:id", laptops.getOneLaptop);
router.patch(
  "/:id",
  authMe,
  idCheck,
  imagesVideos.fields([
    { name: "thumb", maxCount: 1 },
    { name: "videos", maxCount: 1 },
    { name: "gallery" },
  ]),
  uploadLaptopMedia,
  updateUploadLaptopMedia,
  laptops.updateOneLaptop
);
router.delete("/:id", idCheck, laptops.deleteOneLaptop);

export default router;
