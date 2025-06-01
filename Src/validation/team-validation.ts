import { z, ZodType } from "zod";

export class TeamValidation {
    static readonly CREATE: ZodType = z.object({
        namatim: z.string().min(1).max(100),
        image: z.object({
            fieldname: z.string(),
            originalname: z.string(),
            encoding: z.string(),
            mimetype: z.string(),
            filename: z.string(),
            path: z.string(),
            size: z.number()
        }),
    });
    static readonly UPDATE: ZodType = z.object({
        namatim: z.string().min(1).max(100),
        image: z.object({
            fieldname: z.string(),
            originalname: z.string(),
            encoding: z.string(),
            mimetype: z.string(),
            filename: z.string(),
            path: z.string(),
            size: z.number()
        }),
    });
}