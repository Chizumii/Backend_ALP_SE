"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
class UserValidation {
}
exports.UserValidation = UserValidation;
UserValidation.REGISTER = zod_1.z.object({
    username: zod_1.z.string().min(1).max(100),
    email: zod_1.z.string().email().min(1).max(150),
    password: zod_1.z.string().min(8).max(100), // Tambahkan batas minimal untuk keamananon
    Idgame: zod_1.z.number().positive(),
    role: zod_1.z.string().min(1).max(100),
    TeamID: zod_1.z.number().int().optional(), // Opsional karena tim mungkin belum dipilih
});
UserValidation.LOGIN = zod_1.z.object({
    email: zod_1.z.string().email().min(1).max(150),
    password: zod_1.z.string().min(8).max(100), // Tambahkan batas minimal untuk keamanan
});
UserValidation.UPDATE = zod_1.z.object({
    nama_depan: zod_1.z.string().min(1).max(100),
    nama_belakang: zod_1.z.string().min(1).max(100),
    nomor_telp: zod_1.z.string().min(10).max(15).regex(/^\d+$/, "Must be a valid phone number"), // Validasi nomor telepon
    nicknamegame: zod_1.z.string().min(1).max(100),
});
