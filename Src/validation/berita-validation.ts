import { z, ZodType } from "zod";

export class BeritaValidation {
    // Validation schema for creating berita
    static readonly CREATE: ZodType = z.object({
        judul: z.string().min(1).max(100, "Judul should not exceed 100 characters"),
        caption: z.string().min(1).max(100, "Caption should not exceed 100 characters"),
        judul_berita: z.string().min(1).max(100, "Judul berita should not exceed 100 characters"),
        image: z.object({
            fieldname: z.string(),
            originalname: z.string(),
            encoding: z.string(),
            mimetype: z.string(),
            filename: z.string(),
            path: z.string(),
            size: z.number()
        }).optional(),
        UserId: z.number().int("UserId must be an integer").positive("UserId must be positive"),
    });

    // Validation schema for updating berita (all fields optional)
    static readonly UPDATE: ZodType = z.object({
        judul: z.string().min(1).max(100, "Judul should not exceed 100 characters").optional(),
        caption: z.string().min(1).max(100, "Caption should not exceed 100 characters").optional(),
        judul_berita: z.string().min(1).max(100, "Judul berita should not exceed 100 characters").optional(),
        image: z.object({
            fieldname: z.string(),
            originalname: z.string(),
            encoding: z.string(),
            mimetype: z.string(),
            filename: z.string(),
            path: z.string(),
            size: z.number()
        }).optional(),
        UserId: z.number().int("UserId must be an integer").positive("UserId must be positive").optional(),
    });
}
