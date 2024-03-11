"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(error, req, res, next) {
    const err = error;
    err.statusCode = err.statusCode || 500;
    err.status = err.status;
    err.message = err.message;
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
}
exports.default = default_1;
//# sourceMappingURL=errorController.js.map