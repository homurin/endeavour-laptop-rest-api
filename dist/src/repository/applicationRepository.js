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
exports.deleteApplication = exports.updateApplication = exports.createApplication = exports.getOneApplication = exports.getAllApplication = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function getAllApplication() {
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
                categories: {
                    select: {
                        category: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
        });
        return applications;
    });
}
exports.getAllApplication = getAllApplication;
function getOneApplication(applicationId) {
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
                            name: true,
                        },
                    },
                    tags: {
                        select: {
                            tags: {
                                select: {
                                    name: true,
                                },
                            },
                        },
                    },
                    genres: {
                        select: {
                            genre: {
                                select: {
                                    name: true,
                                },
                            },
                        },
                    },
                    categories: {
                        select: {
                            category: {
                                select: {
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
            console.info(application);
            return application;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.getOneApplication = getOneApplication;
function createApplication(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const application = yield prisma.application.create({
                data: Object.assign({}, data),
            });
            return application;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.createApplication = createApplication;
function updateApplication(applicationId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const application = yield prisma.application.update({
                where: { id: applicationId },
                data: data,
            });
            console.info(application);
            return application;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.updateApplication = updateApplication;
function deleteApplication(applicationId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield prisma.application.delete({ where: { id: applicationId } });
        }
        catch (err) {
            throw err;
        }
    });
}
exports.deleteApplication = deleteApplication;
//# sourceMappingURL=applicationRepository.js.map