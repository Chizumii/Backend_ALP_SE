import { z, ZodType } from "zod";

export class TournamentValidation {
    static readonly CREATE: ZodType = z.object({
        nama_tournament: z.string().min(1).max(100),
        description: z.string().min(1).max(100),
        image: z.string().min(1).max(100),
        tipe: z.string().min(1).max(100),
        biaya: z.string().min(1).max(100),
        LokasiID: z.number().int(),
    });

    static readonly UPDATE: ZodType = z.object({
        nama_tournament: z.string().min(1).max(100),
        description: z.string().min(1).max(100),
        image: z.string().min(1).max(100),
        tipe: z.string().min(1).max(100),
        biaya: z.string().min(1).max(100),
        LokasiID: z.string().min(1).max(100),
    });
}