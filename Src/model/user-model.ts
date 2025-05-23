import { User } from "@prisma/client";

export interface RegisterUserRequest {
    username: string;
    email: string;
    password: string;
    nama_depan: string;
    nama_belakang: string;
    nomor_telp: string;
    nicknamegame: string;
    TeamID: number;
}

export interface UserResponse {
    token? :String
    username: string;
    email: string;
    nama_depan: string;
    nama_belakang: string;
    nomor_telp: string;
    nicknamegame: string;
}

export interface UpdateUserRequest {
    nama_depan: string;
    nama_belakang: string;
    nomor_telp: string;
    nicknamegame: string;
}

export interface LoginUserRequest {
    email: string;
    password: string;
}

export function toUserResponse(prismaUser: User): UserResponse {
    return {
        token: prismaUser.Token?? "",
        username: prismaUser.username,
        email: prismaUser.email,
        nama_depan: prismaUser.nama_depan,
        nama_belakang: prismaUser.nama_belakang,
        nomor_telp: prismaUser.nomor_telp,
        nicknamegame: prismaUser.nicknamegame,
    };
}
