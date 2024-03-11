"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const HOST = process.env.HOST;
const PORT = process.env.PORT;
app_1.default.listen(PORT, () => {
    console.info(`server listening at http://${HOST}:${PORT}`);
});
//# sourceMappingURL=server.js.map