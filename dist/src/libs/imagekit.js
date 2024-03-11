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
exports.bulkUploadImage = exports.uploadVideos = exports.uploadImage = void 0;
const imagekit_1 = __importDefault(require("imagekit"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const imagekit = new imagekit_1.default({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "",
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || "",
});
function uploadImage(image) {
    return __awaiter(this, void 0, void 0, function* () {
        const filename = image.originalname;
        const extname = path_1.default.extname(filename);
        const uploadedImage = yield imagekit.upload({
            file: image.buffer,
            fileName: `IMG-${Date.now()}.${extname}`,
        });
        return {
            fileId: uploadedImage.fileId,
            url: uploadedImage.url,
        };
    });
}
exports.uploadImage = uploadImage;
function uploadVideos(videos) {
    return __awaiter(this, void 0, void 0, function* () {
        const filename = videos.originalname;
        const extname = path_1.default.extname(filename);
        const uploadedVideos = yield imagekit.upload({
            file: videos.buffer,
            fileName: `IMG-${Date.now()}.${extname}`,
        });
        return {
            fileId: uploadedVideos.fileId,
            url: uploadedVideos.url,
        };
    });
}
exports.uploadVideos = uploadVideos;
function bulkUploadImage(images) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = [];
        for (const image of images) {
            const filename = image.originalname;
            const extname = path_1.default.extname(filename);
            const uploadImage = yield imagekit.upload({
                file: image.buffer,
                fileName: `IMG-${Date.now()}.${extname}`,
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
exports.default = imagekit;
//# sourceMappingURL=imagekit.js.map