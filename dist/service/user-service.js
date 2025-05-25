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
exports.UserService = void 0;
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
const user_model_1 = require("../model/user-model");
const user_validation_1 = require("../validation/user-validation");
const validation_1 = require("../validation/validation");
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
class UserService {
    // Register user
    static register(request) {
        return __awaiter(this, void 0, void 0, function* () {
            // Validate request
            const registerRequest = validation_1.Validation.validate(user_validation_1.UserValidation.REGISTER, request);
            // Check if email already exists
            const emailExists = yield database_1.prismaClient.user.findFirst({
                where: {
                    email: registerRequest.email,
                },
            });
            if (emailExists) {
                throw new response_error_1.ResponseError(400, "Email already exists!");
            }
            // Encrypt password
            registerRequest.password = yield bcrypt_1.default.hash(registerRequest.password, 10);
            // Add user to the database
            const user = yield database_1.prismaClient.user.create({
                data: {
                    username: registerRequest.username,
                    email: registerRequest.email,
                    password: registerRequest.password,
                    IdGame: registerRequest.Idgame,
                    TeamID: registerRequest.TeamID,
                    Token: (0, uuid_1.v4)(),
                    role: registerRequest.role
                },
            });
            // Convert user to UserResponse and return it
            return (0, user_model_1.toUserResponse)(user);
        });
    }
    // Login user
    static login(request) {
        return __awaiter(this, void 0, void 0, function* () {
            // Validate login request
            const loginRequest = validation_1.Validation.validate(user_validation_1.UserValidation.LOGIN, request);
            let user = yield database_1.prismaClient.user.findFirst({
                where: {
                    email: loginRequest.email,
                },
            });
            if (!user) {
                throw new response_error_1.ResponseError(400, "Invalid email or password!");
            }
            const passwordIsValid = yield bcrypt_1.default.compare(loginRequest.password, user.password);
            if (!passwordIsValid) {
                throw new response_error_1.ResponseError(400, "Invalid email or password!");
            }
            user = yield database_1.prismaClient.user.update({
                where: {
                    UserId: user.UserId,
                },
                data: {
                    Token: (0, uuid_1.v4)(),
                },
            });
            const response = (0, user_model_1.toUserResponse)(user);
            // Return user response
            return response;
        });
    }
    // Update user
    static update(userId, request) {
        return __awaiter(this, void 0, void 0, function* () {
            // Validate update request
            const updateRequest = validation_1.Validation.validate(user_validation_1.UserValidation.UPDATE, request);
            // Find existing user
            const user = yield database_1.prismaClient.user.findUnique({
                where: {
                    email: userId,
                },
            });
            if (!user) {
                throw new response_error_1.ResponseError(404, "User not found!");
            }
            // Update user data in the database
            const updatedUser = yield database_1.prismaClient.user.update({
                where: {
                    email: userId,
                },
                data: {
                    username: updateRequest.username,
                    IdGame: updateRequest.Idgame,
                },
            });
            // Convert updated user to UserResponse and return it
            return (0, user_model_1.toUserResponse)(updatedUser);
        });
    }
    // Logout user (optional cleanup or session handling)
    static logout() {
        return __awaiter(this, void 0, void 0, function* () {
            return "Logout Successful!";
        });
    }
}
exports.UserService = UserService;
