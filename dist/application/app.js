"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_api_1 = require("../route/router-api");
const error_middleware_1 = require("../middleware/error-middleware");
const api_1 = require("../route/api");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.static("public"));
app.use(api_1.apiRouter);
app.use(router_api_1.router);
app.use(error_middleware_1.errorMiddleware);
exports.default = app;
