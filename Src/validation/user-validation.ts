import { z, ZodType } from "zod";

export class UserValidation {
    static readonly REGISTER: ZodType = z.object({
        username: z.string().min(1).max(100),
        email: z.string().email().min(1).max(150),
        password: z.string().min(8).max(100), // Tambahkan batas minimal untuk keamanan
        nama_depan: z.string().min(1).max(100),
        nama_belakang: z.string().min(1).max(100),
        nomor_telp: z.string().min(10).max(15).regex(/^\d+$/, "Must be a valid phone number"), // Validasi nomor telepon
        nicknamegame: z.string().min(1).max(100),
        TeamID: z.number().int().optional(), // Opsional karena tim mungkin belum dipilih
    });

    static readonly LOGIN: ZodType = z.object({
        email: z.string().email().min(1).max(150),
        password: z.string().min(8).max(100), // Tambahkan batas minimal untuk keamanan
    });

    static readonly UPDATE: ZodType = z.object({
        nama_depan: z.string().min(1).max(100),
        nama_belakang: z.string().min(1).max(100),
        nomor_telp: z.string().min(10).max(15).regex(/^\d+$/, "Must be a valid phone number"), // Validasi nomor telepon
        nicknamegame: z.string().min(1).max(100),
    });    
}
