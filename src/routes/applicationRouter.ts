import { Router } from "express";
import * as apps from "@controllers/applicationController";
import { authMe } from "../middlewares/authMe";
import { imagesVideos } from "../middlewares/multer";
import { uploadAppMedia } from "../middlewares/imagekitUpload";
import { idCheck } from "../middlewares/applicationValidation";

const router = Router();

router.get("/", apps.getAllApp);
router.get("/:id", apps.getOneApp);
router.post(
  "/",
  authMe,
  imagesVideos.fields([
    { name: "headerImage", maxCount: 1 },
    { name: "screenshots", maxCount: 1 },
    { name: "movies", maxCount: 1 },
  ]),
  uploadAppMedia,
  apps.createOneApp
);
// router.patch(
//   "/:id",
//   authMe,
//   idCheck,
//   imagesVideos.fields([
//     { name: "thumb", maxCount: 1 },
//     { name: "videos", maxCount: 1 },
//     { name: "gallery" },
//   ])
// );

// router.delete("/:id", idCheck, laptops.deleteOneLaptop);

export default router;
