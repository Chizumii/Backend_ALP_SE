"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamValidation = void 0;
const zod_1 = require("zod");
class TeamValidation {
}
exports.TeamValidation = TeamValidation;
TeamValidation.CREATE = zod_1.z.object({
    namatim: zod_1.z.string().min(1).max(100),
    image: zod_1.z.object({
        fieldname: zod_1.z.string(),
        originalname: zod_1.z.string(),
        encoding: zod_1.z.string(),
        mimetype: zod_1.z.string(),
        filename: zod_1.z.string(),
        path: zod_1.z.string(),
        size: zod_1.z.number()
    }),
    teamID: zod_1.z.number().int().optional(),
});
TeamValidation.UPDATE = zod_1.z.object({
    namatim: zod_1.z.string().min(1).max(100),
    image: zod_1.z.object({
        fieldname: zod_1.z.string(),
        originalname: zod_1.z.string(),
        encoding: zod_1.z.string(),
        mimetype: zod_1.z.string(),
        filename: zod_1.z.string(),
        path: zod_1.z.string(),
        size: zod_1.z.number()
    }),
});
