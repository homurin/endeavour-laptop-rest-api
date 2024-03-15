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
exports.deletegpu = exports.updategpu = exports.creategpu = exports.getOnegpu = exports.getAllgpu = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function getAllgpu() {
    return __awaiter(this, void 0, void 0, function* () {
        const gpus = yield prisma.gpu.findMany({
            select: {
                id: true,
                name: true,
                baseSpeed: true,
                maxSpeed: true,
                cores: true,
                price: true,
                benchmark: true,
            },
        });
        return gpus;
    });
}
exports.getAllgpu = getAllgpu;
function getOnegpu(gpuId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const gpu = yield prisma.gpu.findFirst({
                select: {
                    id: true,
                    name: true,
                    baseSpeed: true,
                    maxSpeed: true,
                    cores: true,
                    benchmark: true,
                    createdAt: true,
                    memory: true,
                    memorySpeed: true,
                    directX: true,
                    openGl: true,
                    price: true,
                },
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
exports.getOnegpu = getOnegpu;
function creategpu(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const gpu = yield prisma.gpu.create({
                data,
            });
            return gpu;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.creategpu = creategpu;
function updategpu(gpuId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const gpu = yield prisma.gpu.update({
                where: { id: gpuId },
                data,
            });
            return gpu;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.updategpu = updategpu;
function deletegpu(gpuId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield prisma.laptop.deleteMany({ where: { gpuId } });
            yield prisma.gpu.delete({ where: { id: gpuId } });
        }
        catch (err) {
            throw err;
        }
    });
}
exports.deletegpu = deletegpu;
//# sourceMappingURL=gpuRepository.js.map