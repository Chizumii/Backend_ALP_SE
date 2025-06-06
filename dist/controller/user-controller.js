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
exports.UserController = void 0;
const user_service_1 = require("../service/user-service");
class UserController {
    // Register user
    static register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const response = yield user_service_1.UserService.register(request);
                res.status(201).json({
                    message: "User registered successfully",
                    data: response,
                });
            }
            catch (error) {
                // Pass error to middleware
                next(error);
            }
        });
    }
    // Login user
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const response = yield user_service_1.UserService.login(request);
                res.status(200).json({
                    message: "Login successful",
                    data: response,
                });
            }
            catch (error) {
                // Pass error to middleware
                next(error);
            }
        });
    }
    // Logout user
    static logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Perform logout operation (if needed)
                const response = yield user_service_1.UserService.logout();
                res.status(200).json({
                    message: response,
                });
            }
            catch (error) {
                // Pass error to middleware
                next(error);
            }
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const request = req.body;
                const response = yield user_service_1.UserService.update(userId, request);
                res.status(200).json({
                    message: "User updated successfully",
                    data: response,
                });
            }
            catch (error) {
                // Pass error to middleware
                next(error);
            }
        });
    }
}
exports.UserController = UserController;
