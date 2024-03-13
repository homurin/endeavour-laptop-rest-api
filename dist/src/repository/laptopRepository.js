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
exports.deleteOne = exports.updateOne = exports.createOne = exports.getOne = exports.getOneFullDesc = exports.getAll = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const laptopsSelect = {
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
            };
            const laptops = yield prisma.laptop.findMany({ select: laptopsSelect });
            return laptops;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.getAll = getAll;
function getOneFullDesc(laptopId) {
    return __awaiter(this, void 0, void 0, function* () {
        const laptop = yield prisma.laptop.findFirst({
            where: { id: laptopId },
            include: { galleries: true },
        });
        return laptop;
    });
}
exports.getOneFullDesc = getOneFullDesc;
function getOne(laptopId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const laptop = yield prisma.laptop.findFirst({
                select: {
                    id: true,
                    name: true,
                    ram: true,
                    hddStorage: true,
                    ssdStorage: true,
                    price: true,
                    isNew: true,
                    refreshRate: true,
                    displayName: true,
                    panelType: true,
                    displayResolution: true,
                    displaySize: true,
                    panelCode: true,
                    gamingScore: true,
                    workstationScore: true,
                    suitableFor: true,
                    thumb: true,
                    videos: true,
                    weight: true,
                    createdAt: true,
                    brand: {
                        select: {
                            name: true,
                        },
                    },
                    cpu: {
                        select: {
                            id: true,
                            name: true,
                            baseSpeed: true,
                            maxSpeed: true,
                            cores: true,
                        },
                    },
                    gpu: {
                        select: {
                            name: true,
                            openGl: true,
                            directX: true,
                            baseSpeed: true,
                            maxSpeed: true,
                            memory: true,
                        },
                    },
                    windowsVersion: {
                        select: {
                            name: true,
                        },
                    },
                    galleries: {
                        select: {
                            image: true,
                        },
                    },
                },
                where: {
                    id: laptopId,
                },
            });
            return laptop;
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
            const laptop = yield prisma.laptop.create({ data });
            return laptop;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.createOne = createOne;
function updateOne(laptopId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const laptop = yield prisma.laptop.update({
                data: data,
                where: { id: laptopId },
            });
            return laptop;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.updateOne = updateOne;
function deleteOne(laptopId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield prisma.gallery.deleteMany({ where: { laptopId: laptopId } });
            yield prisma.laptop.delete({ where: { id: laptopId } });
        }
        catch (err) {
            throw err;
        }
    });
}
exports.deleteOne = deleteOne;
//# sourceMappingURL=laptopRepository.js.map