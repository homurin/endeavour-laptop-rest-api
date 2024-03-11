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
exports.deleteCpu = exports.updateCpu = exports.createCpu = exports.getOnecpu = exports.getAllCpu = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function getAllCpu() {
    return __awaiter(this, void 0, void 0, function* () {
        const cpus = yield prisma.cpu.findMany({
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
        return cpus;
    });
}
exports.getAllCpu = getAllCpu;
function getOnecpu(cpuId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cpu = yield prisma.cpu.findFirst({
                select: {
                    id: true,
                    name: true,
                    price: true,
                    baseSpeed: true,
                    maxSpeed: true,
                    cores: true,
                    threads: true,
                    benchmark: true,
                    createdAt: true,
                    laptops: {
                        select: {
                            id: true,
                            name: true,
                            ram: true,
                            displayResolution: true,
                            panelType: true,
                            hddStorage: true,
                            ssdStorage: true,
                            price: true,
                            thumb: true,
                            cpu: {
                                select: {
                                    name: true,
                                    baseSpeed: true,
                                },
                            },
                            gpu: {
                                select: {
                                    name: true,
                                },
                            },
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
exports.getOnecpu = getOnecpu;
function createCpu(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cpu = yield prisma.cpu.create({
                data: Object.assign({}, data),
            });
            return cpu;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.createCpu = createCpu;
function updateCpu(cpuId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cpu = yield prisma.cpu.update({
                where: { id: cpuId },
                data: data,
            });
            return cpu;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.updateCpu = updateCpu;
function deleteCpu(cpuId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield prisma.cpu.delete({ where: { id: cpuId } });
        }
        catch (err) {
            throw err;
        }
    });
}
exports.deleteCpu = deleteCpu;
//# sourceMappingURL=cpuRepository.js.map