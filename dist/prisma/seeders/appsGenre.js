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
const client_1 = require("@prisma/client");
const promises_1 = require("fs/promises");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const appsGenreBuffer = yield (0, promises_1.readFile)(__dirname + "/data/apps-genre.json");
            const appsGenre = JSON.parse(appsGenreBuffer.toString());
            yield prisma.genresOnApplications.createMany({
                data: appsGenre,
            });
            console.info("success seeding appsGenre");
        }
        catch (err) {
            console.error(err);
            throw new Error(err);
        }
    });
}
exports.default = main;
//# sourceMappingURL=appsGenre.js.map