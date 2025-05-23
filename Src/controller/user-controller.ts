import { Request, Response, NextFunction } from "express";
import {
    LoginUserRequest,
    RegisterUserRequest,
    UpdateUserRequest,
    UserResponse,
} from "../model/user-model";
import { UserService } from "../service/user-service";

export class UserController {
    // Register user
    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const request: RegisterUserRequest = req.body as RegisterUserRequest;
            const response: UserResponse = await UserService.register(request);

            res.status(201).json({
                message: "User registered successfully",
                data: response,
            });
        } catch (error) {
            // Pass error to middleware
            next(error);
        }
    }

    // Login user
    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const request: LoginUserRequest = req.body as LoginUserRequest;
            const response: UserResponse = await UserService.login(request);

            res.status(200).json({
                message: "Login successful",
                data: response,
            });
        } catch (error) {
            // Pass error to middleware
            next(error);
        }
    }
    

    // Logout user
    static async logout(req: Request, res: Response, next: NextFunction) {
        try {
            // Perform logout operation (if needed)
            const response = await UserService.logout();

            res.status(200).json({
                message: response,
            });
        } catch (error) {
            // Pass error to middleware
            next(error);
        }
    }
    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const userId: string = req.params.id;
            const request: UpdateUserRequest = req.body as UpdateUserRequest;
            const response: UserResponse = await UserService.update(userId, request);

            res.status(200).json({
                message: "User updated successfully",
                data: response,
            });
        } catch (error) {
            // Pass error to middleware
            next(error);
        }
    }
    
}
