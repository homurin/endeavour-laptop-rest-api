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
exports.deleteGallery = exports.bulkCreateGallery = exports.deleteOne = exports.updateOne = exports.createOne = exports.getOne = exports.getOneFullDesc = exports.count = exports.getAll = exports.getRandom = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function getRandom() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const laptopCount = yield prisma.laptop.count();
            const randomIndex = Math.floor(Math.random() * laptopCount);
            const randomLaptop = yield prisma.laptop.findMany({
                take: 10,
                skip: randomIndex,
                select: {
                    id: true,
                    name: true,
                    cpu: {
                        select: { name: true },
                    },
                    gpu: {
                        select: { name: true },
                    },
                    price: true,
                    videos: true,
                    thumb: true,
                    ram: true,
                    galleries: {
                        select: {
                            image: true,
                        },
                    },
                    ssdStorage: true,
                    hddStorage: true,
                    windowsVersion: {
                        select: {
                            name: true,
                        },
                    },
                },
            });
            return randomLaptop;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.getRandom = getRandom;
function getAll(field, pagination, option, orderBy) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const laptops = yield prisma.laptop.findMany({
                select: field,
                where: option,
                orderBy,
                skip: pagination.skip,
                take: pagination.take,
            });
            return laptops;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.getAll = getAll;
function count() {
    return __awaiter(this, void 0, void 0, function* () {
        const total = yield prisma.laptop.count();
        return total;
    });
}
exports.count = count;
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
                    osEdition: true,
                    refreshRate: true,
                    displayName: true,
                    panelType: true,
                    displayResolution: true,
                    displaySize: true,
                    panelCode: true,
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
            const createdLaptop = yield prisma.laptop.create({
                data,
                include: {
                    galleries: {
                        select: {
                            id: true,
                            image: true,
                            createdAt: true,
                            updatedAt: true,
                        },
                    },
                },
            });
            return createdLaptop;
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
            const updatedData = yield prisma.laptop.update({
                data,
                where: { id: laptopId },
                include: {
                    galleries: {
                        select: {
                            id: true,
                            image: true,
                            createdAt: true,
                            updatedAt: true,
                        },
                    },
                },
            });
            return updatedData;
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
function bulkCreateGallery(galleries) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield prisma.gallery.createMany({
                data: galleries,
            });
            return data;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.bulkCreateGallery = bulkCreateGallery;
function deleteGallery(galleryIds) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield prisma.gallery.deleteMany({ where: { id: { in: galleryIds } } });
        }
        catch (err) {
            throw err;
        }
    });
}
exports.deleteGallery = deleteGallery;
//# sourceMappingURL=laptopRepository.js.map