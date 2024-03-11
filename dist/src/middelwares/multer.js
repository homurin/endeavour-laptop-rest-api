"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const apiError_1 = require("../utils/apiError");
const storage = multer_1.default.memoryStorage();
function fileFilter(req, file, cb) {
    const allowedMimeType = [
        "image/png",
        "image/jpg",
        "image/jpeg",
        "video/3gp",
        "video/mp4",
        "video/MPEG-4",
        "video/mkv",
    ];
    const isAllowedMimeType = allowedMimeType.includes(file.mimetype);
    if (isAllowedMimeType) {
        return cb(null, true);
    }
    return cb(new apiError_1.SendError("invalid image extensions", 413));
}
exports.upload = (0, multer_1.default)({ storage, fileFilter });
//# sourceMappingURL=multer.js.map