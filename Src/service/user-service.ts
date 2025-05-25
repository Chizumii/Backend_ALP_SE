import { prismaClient } from "../application/database";
import { logger } from "../application/logging";
import { ResponseError } from "../error/response-error";
import {
    toUserResponse,
    RegisterUserRequest,
    UserResponse,
    LoginUserRequest,
    UpdateUserRequest,
} from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export class UserService {
    // Register user
    static async register(request: RegisterUserRequest): Promise<UserResponse> {
        // Validate request
        const registerRequest = Validation.validate(
            UserValidation.REGISTER,
            request
        );

        // Check if email already exists
        const emailExists = await prismaClient.user.findFirst({
            where: {
                email: registerRequest.email,
            },
        });

        if (emailExists) {
            throw new ResponseError(400, "Email already exists!");
        }

        // Encrypt password
        registerRequest.password = await bcrypt.hash(
            registerRequest.password,
            10
        );

        // Add user to the database
        const user = await prismaClient.user.create({
            data: {
                username: registerRequest.username,
                email: registerRequest.email,
                password: registerRequest.password,
                IdGame: registerRequest.Idgame,
                TeamID: registerRequest.TeamID,
                Token: uuidv4(),
                role: registerRequest.role
            },
        });

        // Convert user to UserResponse and return it
        return toUserResponse(user);
    }

    // Login user
    static async login(request: LoginUserRequest): Promise<UserResponse> {
        // Validate login request
        const loginRequest = Validation.validate(UserValidation.LOGIN, request);

        let user = await prismaClient.user.findFirst({
            where: {
                email: loginRequest.email,
            },
        });

        if (!user) {
            throw new ResponseError(400, "Invalid email or password!");
        }

        const passwordIsValid = await bcrypt.compare(
            loginRequest.password,
            user.password
        );

        if (!passwordIsValid) {
            throw new ResponseError(400, "Invalid email or password!");
        }

        user = await prismaClient.user.update({
            where: {
                UserId: user.UserId,
            },
            data: {
                Token: uuidv4(),
            },
        })

        const response = toUserResponse(user)

        
        // Return user response
        return response;
    }

    // Update user
    static async update(userId: string, request: UpdateUserRequest): Promise<UserResponse> {
        // Validate update request
        const updateRequest = Validation.validate(
            UserValidation.UPDATE,
            request
        );

        // Find existing user
        const user = await prismaClient.user.findUnique({
            where: {
                email: userId,
            },
        });

        if (!user) {
            throw new ResponseError(404, "User not found!");
        }

        // Update user data in the database
        const updatedUser = await prismaClient.user.update({
            where: {
                email: userId,
            },
            data: {
                username: updateRequest.username,
                IdGame: updateRequest.Idgame,
            },
        });

        // Convert updated user to UserResponse and return it
        return toUserResponse(updatedUser);
    }

    // Logout user (optional cleanup or session handling)
    static async logout(): Promise<string> {
        return "Logout Successful!";
    }
}
