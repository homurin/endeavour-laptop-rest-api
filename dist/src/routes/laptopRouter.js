"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const laptops = __importStar(require("../controllers/laptopsController"));
const multer_1 = require("../middlewares/multer");
const multerValidation_1 = require("../middlewares/multerValidation");
const imagekitUpload_1 = require("../middlewares/imagekitUpload");
const laptopValidation_1 = require("../middlewares/laptopValidation");
const router = (0, express_1.Router)();
router.get("/", laptops.getAllLaptop);
router.post("/", multer_1.imagesVideos.fields([
    { name: "thumb", maxCount: 1 },
    { name: "videos", maxCount: 1 },
    { name: "gallery" },
]), multerValidation_1.laptopMulterValidation, imagekitUpload_1.uploadLaptopMedia, laptops.createOneLaptop);
router.get("/:id", laptops.getOneLaptop);
router.patch("/:id", laptopValidation_1.idCheck, multer_1.imagesVideos.fields([
    { name: "thumb", maxCount: 1 },
    { name: "videos", maxCount: 1 },
    { name: "gallery" },
]), multerValidation_1.laptopMulterValidation, imagekitUpload_1.uploadLaptopMedia, imagekitUpload_1.updateUploadLaptopMedia, laptops.updateOneLaptop);
router.delete("/:id", laptopValidation_1.idCheck, laptops.deleteOneLaptop);
exports.default = router;
//# sourceMappingURL=laptopRouter.js.map