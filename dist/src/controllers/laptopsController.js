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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOneLaptop = exports.createOneLaptop = exports.getOneLaptop = exports.getAllLaptop = void 0;
const apiError_1 = require("../utils/apiError");
const laptopService = __importStar(require("../services/laptopService"));
const imagekit_1 = require("../libs/imagekit");
function getAllLaptop(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const laptops = yield laptopService.getAllLaptop();
            res.status(200).json({
                message: "success",
                laptops,
            });
        }
        catch (err) {
            next(new apiError_1.SendError("internal server error", 500));
        }
    });
}
exports.getAllLaptop = getAllLaptop;
function getOneLaptop(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            if (!id) {
                return next(new apiError_1.SendError("id cannot be null", 400));
            }
            const laptop = yield laptopService.getOneLaptop(id);
            if (!laptop) {
                return next(new apiError_1.SendError("laptop not found", 404));
            }
            res.status(200).json({
                message: "success",
                laptop,
            });
        }
        catch (err) {
            next(new apiError_1.SendError("internal server error", 500));
        }
    });
}
exports.getOneLaptop = getOneLaptop;
function createOneLaptop(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const laptop = req.body;
            console.info(req.files);
            const files = req.files;
            console.info("=====================================");
            const thumb = files["thumb"][0];
            if (!thumb) {
                laptop.thumb = "";
                laptop.thumbId = "";
            }
            const videos = files["videos"][0];
            let galleries = [];
            if (thumb) {
                const thumbData = yield (0, imagekit_1.uploadImage)(thumb);
                (laptop.thumbId = thumbData.fileId), (laptop.thumb = thumbData.url);
            }
            const gallery = files["gallery"];
            if (gallery) {
                const galleryData = yield (0, imagekit_1.bulkUploadImage)(gallery);
                galleries = galleryData.map((gal) => {
                    return {
                        id: gal.fileId,
                        image: gal.url,
                    };
                });
            }
            if (videos) {
                const videosData = yield (0, imagekit_1.uploadVideos)(videos);
                laptop.videosId = videosData.fileId;
                laptop.videos = videosData.url;
            }
            const createdLaptop = yield laptopService.createOneLaptop(laptop, galleries);
            res.status(201).json({
                message: "success",
                laptop: createdLaptop,
            });
        }
        catch (err) {
            console.info(err);
            next(new apiError_1.SendError("internal server error", 500));
        }
    });
}
exports.createOneLaptop = createOneLaptop;
function updateOneLaptop(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const laptopId = req.params.id;
            const laptop = req.body;
            const galleries = req.body.galleries;
            const createdLaptop = yield laptopService.updateOneLaptop(laptopId, laptop, galleries);
            res.status(201).json({
                message: "success",
                laptop: createdLaptop,
            });
        }
        catch (err) {
            console.info(err);
            next(new apiError_1.SendError("internal server error", 500));
        }
    });
}
exports.updateOneLaptop = updateOneLaptop;
//# sourceMappingURL=laptopsController.js.map