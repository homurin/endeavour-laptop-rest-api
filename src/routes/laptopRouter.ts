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
    { name: "thumb" },
    { name: "videos" },
    { name: "gallery" },
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
    { name: "thumb" },
    { name: "videos" },
    { name: "gallery" },
  ]),
  uploadLaptopMediaValidation,
  updateUploadLaptopMedia,
  laptops.updateOneLaptop
);

router.delete("/:id", laptopIdCheck, laptops.deleteOneLaptop);

router.post("/recommendation", laptops.getRecommendation);

export default router;
