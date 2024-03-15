"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const laptopRouter_1 = __importDefault(require("./laptopRouter"));
const applicationRouter_1 = __importDefault(require("./applicationRouter"));
const adminRouter_1 = __importDefault(require("./adminRouter"));
const authRouter_1 = __importDefault(require("./authRouter"));
const router = (0, express_1.Router)();
router.use("/api/v1/laptops", laptopRouter_1.default);
router.use("/api/v1/applications", applicationRouter_1.default);
router.use("/api/v1/admins", adminRouter_1.default);
router.use("/api/v1/auth", authRouter_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map