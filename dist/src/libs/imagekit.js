"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulkIsValidImages = exports.isValidImages = exports.isValidVideos = exports.bulkDeleteFiles = exports.deleteOneFiles = exports.bulkUploadImage = exports.uploadVideos = exports.uploadImage = void 0;
const imagekit_1 = __importDefault(require("imagekit"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const multer_1 = require("multer");
dotenv_1.default.config();
const imagekit = new imagekit_1.default({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "",
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || "",
});
function uploadImage(image, folderPath) {
    return __awaiter(this, void 0, void 0, function* () {
        const filename = image.originalname;
        const extname = path_1.default.extname(filename);
        const uploadedImage = yield imagekit.upload({
            file: image.buffer,
            fileName: `IMG-${Date.now()}.${extname}`,
            folder: "endeavour-laptop/" + folderPath,
        });
        return {
            fileId: uploadedImage.fileId,
            url: uploadedImage.url,
        };
    });
}
exports.uploadImage = uploadImage;
function uploadVideos(videos, folderPath) {
    return __awaiter(this, void 0, void 0, function* () {
        const filename = videos.originalname;
        const extname = path_1.default.extname(filename);
        const uploadedVideos = yield imagekit.upload({
            file: videos.buffer,
            fileName: `MOV-${Date.now()}.${extname}`,
            folder: "endeavour-laptop/" + folderPath,
        });
        return {
            fileId: uploadedVideos.fileId,
            url: uploadedVideos.url,
        };
    });
}
exports.uploadVideos = uploadVideos;
function bulkUploadImage(images, folderPath) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = [];
        for (const image of images) {
            const filename = image.originalname;
            const extname = path_1.default.extname(filename);
            const uploadImage = yield imagekit.upload({
                file: image.buffer,
                fileName: `IMG-${Date.now()}.${extname}`,
                folder: "endeavour-laptop/" + folderPath,
            });
            data.push({
                fileId: uploadImage.fileId,
                url: uploadImage.url,
            });
        }
        return data;
    });
}
exports.bulkUploadImage = bulkUploadImage;
function deleteOneFiles(fileId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield imagekit.deleteFile(fileId);
    });
}
exports.deleteOneFiles = deleteOneFiles;
function bulkDeleteFiles(fileId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield imagekit.bulkDeleteFiles(fileId);
    });
}
exports.bulkDeleteFiles = bulkDeleteFiles;
function isValidVideos(videos) {
    return __awaiter(this, void 0, void 0, function* () {
        const allowedMimetype = [
            "video/3gp",
            "video/mp4",
            "video/MPEG-4",
            "video/mkv",
        ];
        const isAllowedMimetype = allowedMimetype.includes(videos.mimetype);
        if (!isAllowedMimetype) {
            throw new multer_1.MulterError("LIMIT_UNEXPECTED_FILE", videos.fieldname);
        }
        if (maxMbFileSize(videos.size, 25)) {
            throw new multer_1.MulterError("LIMIT_FILE_SIZE", videos.fieldname);
        }
        return true;
    });
}
exports.isValidVideos = isValidVideos;
function isValidImages(image) {
    return __awaiter(this, void 0, void 0, function* () {
        const allowedMimetype = ["image/png", "image/jpg", "image/jpeg"];
        const isAllowedImageMimetype = allowedMimetype.includes(image.mimetype);
        if (!isAllowedImageMimetype) {
            throw new multer_1.MulterError("LIMIT_UNEXPECTED_FILE", image.fieldname);
        }
        if (maxMbFileSize(image.size, 5)) {
            throw new multer_1.MulterError("LIMIT_FILE_SIZE", image.fieldname);
        }
        return true;
    });
}
exports.isValidImages = isValidImages;
function bulkIsValidImages(images) {
    return __awaiter(this, void 0, void 0, function* () {
        const allowedMimetype = ["image/png", "image/jpg", "image/jpeg"];
        for (const image of images) {
            const isAllowedImageMimetype = allowedMimetype.includes(image.mimetype);
            if (!isAllowedImageMimetype) {
                throw new multer_1.MulterError("LIMIT_UNEXPECTED_FILE", image.fieldname);
            }
            if (maxMbFileSize(image.size, 5)) {
                throw new multer_1.MulterError("LIMIT_FILE_SIZE", image.fieldname);
            }
        }
        return true;
    });
}
exports.bulkIsValidImages = bulkIsValidImages;
function maxMbFileSize(fileSize, maxMbSize) {
    return fileSize > 1000000 * maxMbSize;
}
//# sourceMappingURL=imagekit.js.map