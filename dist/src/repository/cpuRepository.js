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
exports.getOne = exports.count = exports.getAll = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function getAll(fields, query) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cpus = yield prisma.cpu.findMany({
                select: fields,
                where: query,
            });
            return cpus;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.getAll = getAll;
function count() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const count = yield prisma.cpu.count();
            return count;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.count = count;
function getOne(cpuId, fields) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cpu = yield prisma.cpu.findFirst({
                select: fields,
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
//# sourceMappingURL=cpuRepository.js.map