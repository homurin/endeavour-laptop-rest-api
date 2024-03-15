import { Router } from "express";
import * as apps from "@controllers/applicationController";
import { authMe } from "../middlewares/authMe";
import { imagesVideos } from "../middlewares/multer";
import { uploadAppMedia } from "../middlewares/imagekitUpload";
import { appIdCheck } from "../middlewares/idCheck";
import { uploadAppMediaValidation } from "../middlewares/imagekitValidation";

const router = Router();

router.get("/", apps.getAllApp);
router.get("/:id", appIdCheck, apps.getOneApp);
router.post(
  "/",
  authMe,
  imagesVideos.fields([
    { name: "headerImage", maxCount: 1 },
    { name: "screenshots", maxCount: 1 },
    { name: "movies", maxCount: 1 },
  ]),
  uploadAppMediaValidation,
  uploadAppMedia,
  apps.createOneApp
);
router.patch(
  "/:id",
  authMe,
  appIdCheck,
  imagesVideos.fields([
    { name: "headerImage", maxCount: 1 },
    { name: "screenshots", maxCount: 1 },
    { name: "movies", maxCount: 1 },
  ]),
  uploadAppMediaValidation,
  uploadAppMedia,
  apps.updateOneApp
);

router.delete("/:id", appIdCheck, apps.deleteOneApp);

export default router;
