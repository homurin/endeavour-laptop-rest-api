"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendError = void 0;
class SendError extends Error {
    constructor(message, statuscode) {
        super(message);
        this.statusCode = statuscode;
        this.status = `${statuscode}`.startsWith("4") ? "failed" : "error";
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.SendError = SendError;
//# sourceMappingURL=apiError.js.map