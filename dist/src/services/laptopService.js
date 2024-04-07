"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.deleteOneLaptop = exports.updateOneLaptop = exports.createOneLaptop = exports.getOneLaptop = exports.getAllLaptop = exports.getRandomLaptop = void 0;
const Laptop = __importStar(require("../repository/laptopRepository"));
const uuid_1 = require("uuid");
const library_1 = require("@prisma/client/runtime/library");
const apiError_1 = require("../utils/apiError");
function getRandomLaptop() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const randomLaptops = yield Laptop.getRandom();
            return randomLaptops;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.getRandomLaptop = getRandomLaptop;
function getAllLaptop(options) {
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
                osEdition: true,
                cpu: {
                    select: {
                        name: true,
                        baseSpeed: true,
                        maxSpeed: true,
                    },
                },
                gpu: {
                    select: {
                        name: true,
                        maxSpeed: true,
                    },
                },
                windowsVersion: {
                    select: {
                        name: true,
                    },
                },
            };
            const laptopQuery = {};
            const pagination = { skip: 0, take: 30 };
            const orderBy = {};
            const totalCount = yield Laptop.count();
            if (options === null || options === void 0 ? void 0 : options.search) {
                laptopQuery.name = {
                    contains: options.search,
                    mode: "insensitive",
                };
            }
            if ((options === null || options === void 0 ? void 0 : options.sort_by) === "ram" && options.order_by) {
                orderBy.ram = options.order_by;
            }
            if ((options === null || options === void 0 ? void 0 : options.sort_by) === "price" && options.order_by) {
                orderBy.price = options.order_by;
            }
            if ((options === null || options === void 0 ? void 0 : options.sort_by) === "cpu_speed" && options.order_by) {
                orderBy.cpu = { maxSpeed: options.order_by };
            }
            if ((options === null || options === void 0 ? void 0 : options.sort_by) === "gpu_speed" && options.order_by) {
                orderBy.gpu = { maxSpeed: options.order_by };
            }
            if ((options === null || options === void 0 ? void 0 : options.sort_by) === "ssd_storage" && options.order_by) {
                orderBy.ssdStorage = options.order_by;
            }
            if ((options === null || options === void 0 ? void 0 : options.sort_by) === "created_at" && options.order_by) {
                orderBy.createdAt = options.order_by;
            }
            if ((options === null || options === void 0 ? void 0 : options.page) && (options === null || options === void 0 ? void 0 : options.size)) {
                pagination.take = Number(options.size);
                pagination.skip = (Number(options.page) - 1) * Number(options.size);
            }
            const data = yield Laptop.getAll(laptopsSelect, pagination, laptopQuery, orderBy);
            return {
                data,
                dataCount: data.length,
                totalCount,
            };
        }
        catch (err) {
            throw err;
        }
    });
}
exports.getAllLaptop = getAllLaptop;
function getOneLaptop(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield Laptop.getOne(id);
            return data;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.getOneLaptop = getOneLaptop;
function createOneLaptop(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const laptop = {
                id: (0, uuid_1.v4)(),
                admin: {
                    connect: {
                        id: data.adminId,
                    },
                },
                cpu: {
                    connect: {
                        id: data.cpuId,
                    },
                },
                gpu: {
                    connect: {
                        id: data.gpuId,
                    },
                },
                windowsVersion: {
                    connect: {
                        id: data.winId,
                    },
                },
                brand: {
                    connect: {
                        id: data.brandId,
                    },
                },
                thumbId: data.thumbId,
                videosId: data.videosId,
                thumb: data.thumb,
                videos: data.videos,
                name: data.name,
                hddStorage: Number(data.hddStorage),
                ssdStorage: Number(data.ssdStorage),
                ram: Number(data.ram),
                displayName: data.displayName,
                displayResolution: data.displayResolution,
                displaySize: Number(data.displaySize),
                gamingScore: Number(),
                workstationScore: Number(),
                refreshRate: Number(data.refreshRate),
                isNew: JSON.parse(String(data.isNew)) || true,
                suitableFor: data.suitableFor,
                osEdition: data.osEdition,
                price: Number(data.price),
                panelCode: Number(data.panelCode),
                weight: Number(data.weight),
                panelType: data.panelType,
            };
            if (data.galleries) {
                laptop.galleries = {
                    createMany: {
                        data: data.galleries,
                    },
                };
            }
            const createdLaptop = yield Laptop.createOne(laptop);
            return createdLaptop;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.createOneLaptop = createOneLaptop;
function updateOneLaptop(laptopId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const laptop = {
                admin: {
                    connect: {
                        id: data.adminId,
                    },
                },
                cpu: {
                    connect: {
                        id: data.cpuId,
                    },
                },
                gpu: {
                    connect: {
                        id: data.gpuId,
                    },
                },
                windowsVersion: {
                    connect: {
                        id: data.winId,
                    },
                },
                brand: {
                    connect: {
                        id: data.brandId,
                    },
                },
                thumbId: data.thumbId,
                videosId: data.videosId,
                thumb: data.thumb,
                videos: data.videos,
                name: data.name,
                hddStorage: Number(data.hddStorage),
                ssdStorage: Number(data.ssdStorage),
                ram: Number(data.ram),
                displayName: data.displayName,
                displayResolution: data.displayResolution,
                displaySize: Number(data.displaySize),
                gamingScore: Number(),
                workstationScore: Number(),
                refreshRate: Number(data.refreshRate),
                isNew: JSON.parse(String(data.isNew)) || true,
                suitableFor: data.suitableFor,
                osEdition: data.osEdition,
                price: Number(data.price),
                panelCode: Number(data.panelCode),
                weight: Number(data.weight),
                panelType: data.panelType,
            };
            if (data.galleries) {
                laptop.galleries = {
                    createMany: {
                        data: data.galleries,
                    },
                };
            }
            if (data.deleteGalleries) {
                laptop.galleries = {
                    deleteMany: {
                        id: {
                            in: data.deleteGalleries,
                        },
                    },
                };
            }
            const updatedLaptop = yield Laptop.updateOne(laptopId, laptop);
            return updatedLaptop;
        }
        catch (err) {
            const error = err;
            if (error instanceof library_1.PrismaClientValidationError) {
                throw new apiError_1.SendError(`${error.message}`, 400);
            }
            throw err;
        }
    });
}
exports.updateOneLaptop = updateOneLaptop;
function deleteOneLaptop(laptopId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield Laptop.deleteOne(laptopId);
        }
        catch (err) {
            throw err;
        }
    });
}
exports.deleteOneLaptop = deleteOneLaptop;
//# sourceMappingURL=laptopService.js.map