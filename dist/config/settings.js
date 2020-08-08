"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.secret = exports.successObj = exports.errorObj = void 0;
exports.errorObj = { error: true, type: "error", success: false };
exports.successObj = { error: false, type: "success", success: true };
exports.secret = process.env.SECRET_KEY || "asdfasdfasdfasdf";
