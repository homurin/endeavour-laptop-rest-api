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
exports.deleteOne = exports.updateOne = exports.createOne = exports.getOne = exports.getAll = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const cpus = yield prisma.windows.findMany({
            select: {
                id: true,
                name: true,
                version: true,
                buildNumber: true,
                releaseDate: true,
            },
        });
        return cpus;
    });
}
exports.getAll = getAll;
function getOne(cpuId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cpu = yield prisma.windows.findFirst({
                select: {
                    id: true,
                    name: true,
                    buildNumber: true,
                    releaseDate: true,
                    version: true,
                    createdAt: true,
                    updatedAt: true,
                    admin: {
                        select: {
                            fullName: true,
                        },
                    },
                },
                where: {
                    id: cpuId,
                },
            });
            return cpu;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.getOne = getOne;
function createOne(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cpu = yield prisma.cpu.create({
                data,
            });
            return cpu;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.createOne = createOne;
function updateOne(cpuId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cpu = yield prisma.cpu.update({
                data: data,
                where: { id: cpuId },
            });
            return cpu;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.updateOne = updateOne;
function deleteOne(cpuId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield prisma.laptop.deleteMany({ where: { cpuId } });
            yield prisma.cpu.delete({ where: { id: cpuId } });
        }
        catch (err) {
            throw err;
        }
    });
}
exports.deleteOne = deleteOne;
//# sourceMappingURL=windowsRepository.js.map