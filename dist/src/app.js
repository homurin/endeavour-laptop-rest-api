"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const apiError_1 = require("./utils/apiError");
const errorController_1 = __importDefault(require("./controllers/errorController"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
if (process.env.NODE_ENV !== "production") {
    app.use((0, morgan_1.default)("dev"));
}
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(routes_1.default);
app.all("*", (req, res, next) => {
    next(new apiError_1.SendError("endpoint not found", 404));
});
app.use(errorController_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map