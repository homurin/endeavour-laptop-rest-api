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
exports.adminSeed = exports.admin = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const dotenv_1 = __importDefault(require("dotenv"));
const process_1 = __importDefault(require("process"));
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const adminConfig = () => {
    const saltRounds = Number(process_1.default.env.SALT_ROUNDS);
    const password = process_1.default.env.ADMIN_PASSWORD || "endeavours2024";
    const hashedPassword = bcrypt_1.default.hashSync(password, saltRounds);
    return {
        id: (0, uuid_1.v4)(),
        username: "endeavours",
        password: hashedPassword,
        fullName: "Endeavour Morse",
        email: "endeavours@endeavours.com",
    };
};
exports.admin = adminConfig();
const adminSeed = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.admin.create({ data: exports.admin });
        console.info("admin seeding success");
    }
    catch (err) {
        console.error(err);
        throw new Error("admin seeding failed");
    }
});
exports.adminSeed = adminSeed;
//# sourceMappingURL=admin.js.map