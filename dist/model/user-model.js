"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUserResponse = toUserResponse;
function toUserResponse(prismaUser) {
    var _a;
    return {
        token: (_a = prismaUser.Token) !== null && _a !== void 0 ? _a : "",
        username: prismaUser.username,
        email: prismaUser.email,
        nama_depan: prismaUser.nama_depan,
        nama_belakang: prismaUser.nama_belakang,
        nomor_telp: prismaUser.nomor_telp,
        nicknamegame: prismaUser.nicknamegame,
        role: prismaUser.role
    };
}
