import { Router } from "express";
import * as laptops from "@controllers/laptopController";
import { imagesVideos } from "@middlewares/multer";
import {
  updateUploadLaptopMedia,
  uploadLaptopMedia,
} from "../middlewares/imagekitUpload";
import { laptopIdCheck } from "../middlewares/idCheck";
import { authMe } from "../middlewares/authMe";
import { uploadLaptopMediaValidation } from "../middlewares/imagekitValidation";

const router = Router();

router.get("/", laptops.getAllLaptop);

router.post(
  "/",
  authMe,
  imagesVideos.fields([
    { name: "thumb", maxCount: 1 },
    { name: "videos", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
  ]),
  uploadLaptopMediaValidation,
  uploadLaptopMedia,
  laptops.createOneLaptop
);
router.get("/:id", laptops.getOneLaptop);

router.patch(
  "/:id",
  authMe,
  laptopIdCheck,
  imagesVideos.fields([
    { name: "thumb", maxCount: 1 },
    { name: "videos", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
  ]),
  uploadLaptopMediaValidation,
  updateUploadLaptopMedia,
  laptops.updateOneLaptop
);

router.delete("/:id", laptopIdCheck, laptops.deleteOneLaptop);

export default router;
