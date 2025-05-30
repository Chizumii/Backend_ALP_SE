import { User } from "@prisma/client";

export interface RegisterUserRequest {
    username: string;
    email: string;
    password: string;
    Idgame: number;
    TeamID?: number;
    role: string;
}

export interface UserResponse {
    token? :String
    username: string;
    email: string;
    Idgame: number;
    role: string;
    image?: String;
}

export interface UpdateUserRequest {
    username: string;
    Idgame: number;
    image: String;
}

export interface LoginUserRequest {
    email: string;
    password: string;
    image: String;
}

export function toUserResponse(prismaUser: User): UserResponse {
    return {
        token: prismaUser.Token?? "",
        username: prismaUser.username,
        email: prismaUser.email,
        Idgame: prismaUser.IdGame,
        role: prismaUser.role,
        image: prismaUser.image?? ""
    };
}
