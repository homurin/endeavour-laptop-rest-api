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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const admin_1 = require("./admin");
const brands_1 = __importDefault(require("./brands"));
const cpus_1 = __importDefault(require("./cpus"));
const gpus_1 = __importDefault(require("./gpus"));
const windows_1 = __importDefault(require("./windows"));
const laptops_1 = __importDefault(require("./laptops"));
const laptopsGallery_1 = __importDefault(require("./laptopsGallery"));
const steamGames_1 = __importDefault(require("./steamGames"));
const categories_1 = __importDefault(require("./categories"));
const genres_1 = __importDefault(require("./genres"));
const tags_1 = __importDefault(require("./tags"));
const appsCategory_1 = __importDefault(require("./appsCategory"));
const appsGenre_1 = __importDefault(require("./appsGenre"));
const appsTag_1 = __importDefault(require("./appsTag"));
const topApps_1 = __importDefault(require("./topApps"));
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, admin_1.adminSeed)();
            yield (0, brands_1.default)();
            yield (0, cpus_1.default)();
            yield (0, gpus_1.default)();
            yield (0, windows_1.default)();
            yield (0, laptops_1.default)();
            yield (0, laptopsGallery_1.default)();
            yield (0, topApps_1.default)();
            yield (0, steamGames_1.default)();
            yield (0, categories_1.default)();
            yield (0, genres_1.default)();
            yield (0, tags_1.default)();
            yield (0, appsCategory_1.default)();
            yield (0, appsGenre_1.default)();
            yield (0, appsTag_1.default)();
        }
        catch (err) {
            console.info(err);
        }
        finally {
            console.info("success seeding all data");
            yield prisma.$disconnect();
        }
    });
}
main();
//# sourceMappingURL=index.js.map