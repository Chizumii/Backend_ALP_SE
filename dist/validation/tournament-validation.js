"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TournamentValidation = void 0;
const zod_1 = require("zod");
class TournamentValidation {
}
exports.TournamentValidation = TournamentValidation;
TournamentValidation.CREATE = zod_1.z.object({
    nama_tournament: zod_1.z.string().min(1).max(100),
    description: zod_1.z.string().min(1).max(100),
    image: zod_1.z.string().min(1).max(100),
    tipe: zod_1.z.string().min(1).max(100),
    biaya: zod_1.z.string().min(1).max(100),
    lokasi: zod_1.z.string().min(1).max(100),
});
TournamentValidation.UPDATE = zod_1.z.object({
    nama_tournament: zod_1.z.string().min(1).max(100),
    description: zod_1.z.string().min(1).max(100),
    image: zod_1.z.string().min(1).max(100),
    tipe: zod_1.z.string().min(1).max(100),
    biaya: zod_1.z.string().min(1).max(100),
    lokasi: zod_1.z.string().min(1).max(100),
});
