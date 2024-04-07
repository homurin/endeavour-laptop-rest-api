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
exports.deleteOne = exports.updateOne = exports.createOne = exports.getOne = exports.getOneMediaAttributes = exports.getAll = exports.getRandom = exports.count = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function count() {
    return __awaiter(this, void 0, void 0, function* () {
        const count = yield prisma.application.count();
        return count;
    });
}
exports.count = count;
function getRandom() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const appCount = yield prisma.application.count();
            const randomIndex = Math.floor(Math.random() * appCount);
            const randomApps = yield prisma.application.findMany({
                take: 10,
                skip: randomIndex,
                select: {
                    id: true,
                    name: true,
                    headerImage: true,
                    screenshots: true,
                    movies: true,
                    windows: true,
                    linux: true,
                    mac: true,
                    price: true,
                    description: true,
                },
            });
            return randomApps;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.getRandom = getRandom;
function getAll(fields, pagination, option, orderBy) {
    return __awaiter(this, void 0, void 0, function* () {
        const applications = yield prisma.application.findMany({
            select: fields,
            where: option,
            skip: pagination.skip,
            take: pagination.take,
            orderBy,
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
function getOne(applicationId, fields) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const application = yield prisma.application.findFirst({
                select: fields,
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
                include: {
                    admin: true,
                    minOs: true,
                },
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
                include: {
                    admin: true,
                    minOs: true,
                },
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