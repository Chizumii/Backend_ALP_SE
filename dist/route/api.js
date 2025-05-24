"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user-controller");
exports.apiRouter = express_1.default.Router();
exports.apiRouter.post("/api/register", user_controller_1.UserController.register);
exports.apiRouter.post("/api/login", user_controller_1.UserController.login);
