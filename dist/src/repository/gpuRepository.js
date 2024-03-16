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
Object.defineProperty(exports, "__esModule", { value: true });
exports.count = exports.getOne = exports.getAll = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function getAll(fields, query) {
    return __awaiter(this, void 0, void 0, function* () {
        const gpus = yield prisma.gpu.findMany({
            select: fields,
            where: query,
        });
        return gpus;
    });
}
exports.getAll = getAll;
function getOne(gpuId, fields) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const gpu = yield prisma.gpu.findFirst({
                select: fields,
                where: {
                    id: gpuId,
                },
            });
            return gpu;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.getOne = getOne;
function count() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const count = yield prisma.gpu.count();
            return count;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.count = count;
//# sourceMappingURL=gpuRepository.js.map