import { z, ZodType } from "zod";

export class TournamentValidation {
    static readonly CREATE: ZodType = z.object({
        nama_tournament: z.string().min(1).max(100),
        description: z.string().min(1).max(100),
        image: z.string().min(1),
        tipe: z.string().min(1).max(100),
        biaya: z.preprocess(
            (a) => parseFloat(a as string), // Try to parse the string to a float
            z.number().positive()           // Then validate it as a positive number
        ),
        lokasi: z.string().min(1).max(100),
    });

    static readonly UPDATE: ZodType = z.object({
        nama_tournament: z.string().min(1).max(100),
        description: z.string().min(1).max(100),
        image: z.string().min(1),
        tipe: z.string().min(1).max(100),
        biaya: z.preprocess(
            (a) => parseFloat(a as string), // Try to parse the string to a float
            z.number().positive()           // Then validate it as a positive number
        ),
        lokasi: z.string().min(1).max(100),
    });
}