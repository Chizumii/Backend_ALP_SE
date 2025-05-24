"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeritaValidation = void 0;
const zod_1 = require("zod");
class BeritaValidation {
}
exports.BeritaValidation = BeritaValidation;
// Validation schema for creating berita
BeritaValidation.CREATE = zod_1.z.object({
    judul: zod_1.z.string().min(1).max(100, "Judul should not exceed 100 characters"),
    caption: zod_1.z.string().min(1).max(100, "Caption should not exceed 100 characters"),
    judul_berita: zod_1.z.string().min(1).max(100, "Judul berita should not exceed 100 characters"),
    image: zod_1.z.object({
        fieldname: zod_1.z.string(),
        originalname: zod_1.z.string(),
        encoding: zod_1.z.string(),
        mimetype: zod_1.z.string(),
        filename: zod_1.z.string(),
        path: zod_1.z.string(),
        size: zod_1.z.number()
    }).optional(),
    UserId: zod_1.z.number().int("UserId must be an integer").positive("UserId must be positive"),
});
// Validation schema for updating berita (all fields optional)
BeritaValidation.UPDATE = zod_1.z.object({
    judul: zod_1.z.string().min(1).max(100, "Judul should not exceed 100 characters").optional(),
    caption: zod_1.z.string().min(1).max(100, "Caption should not exceed 100 characters").optional(),
    judul_berita: zod_1.z.string().min(1).max(100, "Judul berita should not exceed 100 characters").optional(),
    image: zod_1.z.object({
        fieldname: zod_1.z.string(),
        originalname: zod_1.z.string(),
        encoding: zod_1.z.string(),
        mimetype: zod_1.z.string(),
        filename: zod_1.z.string(),
        path: zod_1.z.string(),
        size: zod_1.z.number()
    }).optional(),
    UserId: zod_1.z.number().int("UserId must be an integer").positive("UserId must be positive").optional(),
});
