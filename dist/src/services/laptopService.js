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
exports.updateOneLaptop = exports.createOneLaptop = exports.getOneLaptop = exports.getAllLaptop = void 0;
const Laptop = __importStar(require("../repository/laptopRepository"));
const uuid_1 = require("uuid");
function getAllLaptop() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield Laptop.getAll();
            return data;
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
function createOneLaptop(laptop, galleries) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // const laptopJson = JSON.parse(JSON.stringify(laptop));
            // console.info(laptopJson);
            const gallery = galleries;
            const data = Object.assign(Object.assign({}, laptop), { id: (0, uuid_1.v4)(), adminId: "5d1bee8e-b995-41c5-9fed-e4e537e6a8ab", ram: Number(laptop.ram), hddStorage: Number(laptop.hddStorage), ssdStorage: Number(laptop.hddStorage), displaySize: Number(laptop.displaySize), price: Number(laptop.price), weight: Number(laptop.weight), panelCode: Number(laptop.panelCode), refreshRate: Number(laptop.refreshRate), workstationScore: Number(laptop.workstationScore), gamingScore: Number(laptop.gamingScore), isNew: Boolean(JSON.parse(String(laptop.isNew))), galleries: {
                    createMany: {
                        data: gallery,
                    },
                } });
            const createdLaptop = yield Laptop.createOne(data);
            return createdLaptop;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.createOneLaptop = createOneLaptop;
function updateOneLaptop(laptopId, laptop, galleries) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedGalleries = galleries.map((gal) => {
                return Object.assign(Object.assign({}, gal), { updatedAt: new Date() });
            });
            const data = Object.assign(Object.assign({}, laptop), { adminId: "5d1bee8e-b995-41c5-9fed-e4e537e6a8ab", galleries: {
                    updateMany: {
                        data: updatedGalleries,
                        where: {
                            laptopId: laptopId,
                        },
                    },
                } });
            const createdLaptop = yield Laptop.updateOne(laptopId, data);
            return createdLaptop;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.updateOneLaptop = updateOneLaptop;
//# sourceMappingURL=laptopService.js.map