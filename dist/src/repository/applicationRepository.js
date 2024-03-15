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
exports.deleteOne = exports.updateOne = exports.createOne = exports.getOne = exports.getOneMediaAttributes = exports.getAll = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const applications = yield prisma.application.findMany({
            select: {
                id: true,
                name: true,
                headerImage: true,
                price: true,
                linux: true,
                mac: true,
                windows: true,
            },
        });
        return applications;
    });
}
exports.getAll = getAll;
function getOneMediaAttributes(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const application = yield prisma.application.findFirst({
                select: {
                    headerImageId: true,
                    headerImage: true,
                    screenshotsId: true,
                    screenshots: true,
                    moviesId: true,
                    movies: true,
                },
                where: { id },
            });
            return application;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.getOneMediaAttributes = getOneMediaAttributes;
function getOne(applicationId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const application = yield prisma.application.findFirst({
                select: {
                    id: true,
                    name: true,
                    price: true,
                    minCpuSpeed: true,
                    minCores: true,
                    minGpuBoostClock: true,
                    minGpuMemory: true,
                    minDirectX: true,
                    minOpenGl: true,
                    minRam: true,
                    minStorage: true,
                    link: true,
                    headerImage: true,
                    screenshots: true,
                    movies: true,
                    description: true,
                    developers: true,
                    publishers: true,
                    linux: true,
                    mac: true,
                    windows: true,
                    releaseDate: true,
                    website: true,
                    minOs: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    categories: {
                        select: {
                            category: {
                                select: {
                                    id: true,
                                    name: true,
                                },
                            },
                        },
                    },
                    genres: {
                        select: {
                            genre: {
                                select: {
                                    id: true,
                                    name: true,
                                },
                            },
                        },
                    },
                    tags: {
                        select: {
                            tag: {
                                select: {
                                    id: true,
                                    name: true,
                                },
                            },
                        },
                    },
                },
                where: {
                    id: applicationId,
                },
            });
            return application;
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
            const application = yield prisma.application.create({
                data,
            });
            return application;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.createOne = createOne;
function updateOne(applicationId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const application = yield prisma.application.update({
                where: { id: applicationId },
                data,
            });
            return application;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.updateOne = updateOne;
function deleteOne(appId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield prisma.application.delete({ where: { id: appId } });
        }
        catch (err) {
            throw err;
        }
    });
}
exports.deleteOne = deleteOne;
//# sourceMappingURL=applicationRepository.js.map