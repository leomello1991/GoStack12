"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppError = /** @class */ (function () {
    function AppError(message, statusCod) {
        if (statusCod === void 0) { statusCod = 400; }
        this.message = message;
        this.statusCode = statusCod;
    }
    return AppError;
}());
exports.default = AppError;
