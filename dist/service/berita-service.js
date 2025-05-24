"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeritaService = void 0;
const database_1 = require("../application/database");
const berita_model_1 = require("../model/berita-model");
const validation_1 = require("../validation/validation");
const berita_validation_1 = require("../validation/berita-validation");
const response_error_1 = require("../error/response-error");
class BeritaService {
    // Create a new berita
    static create(request) {
        return __awaiter(this, void 0, void 0, function* () {
            // Validasi input
            const validatedData = validation_1.Validation.validate(berita_validation_1.BeritaValidation.CREATE, request);
            // Simpan berita ke database
            const path = JSON.parse(JSON.stringify(validatedData.image)).path.replace(/\\/g, '/').replace('public/', '');
            const berita = yield database_1.prismaClient.berita.create({
                data: {
                    judul: validatedData.judul,
                    caption: validatedData.caption,
                    judul_berita: validatedData.judul_berita,
                    image: path,
                    UserId: validatedData.UserId,
                },
            });
            // Konversi ke BeritaResponse
            return (0, berita_model_1.toBeritaResponse)(berita);
        });
    }
    // Get all berita
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const beritaList = yield database_1.prismaClient.berita.findMany({
                include: {
                    User: true, // Menyertakan relasi dengan user jika diperlukan
                },
            });
            return beritaList.map(berita_model_1.toBeritaResponse);
        });
    }
    // Update berita by ID
    static update(id, request) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id || id <= 0) {
                throw new response_error_1.ResponseError(400, "Invalid ID format");
            }
            // Validasi input
            const validatedData = validation_1.Validation.validate(berita_validation_1.BeritaValidation.UPDATE, request);
            const path = JSON.parse(JSON.stringify(validatedData.image)).path.replace(/\\/g, '/').replace('public/', '');
            const berita = yield database_1.prismaClient.berita.update({
                where: { BeritaId: id },
                data: {
                    judul: validatedData.judul,
                    caption: validatedData.caption,
                    judul_berita: validatedData.judul_berita,
                    image: path,
                    UserId: validatedData.UserId,
                },
            });
            if (!berita) {
                throw new response_error_1.ResponseError(404, "Berita not found");
            }
            return (0, berita_model_1.toBeritaResponse)(berita);
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id || id <= 0) {
                throw new response_error_1.ResponseError(400, "Invalid ID format");
            }
            const berita = yield database_1.prismaClient.berita.findUnique({
                where: { BeritaId: id },
                include: {
                    User: true, // Menyertakan relasi dengan user jika diperlukan
                },
            });
            if (!berita) {
                throw new response_error_1.ResponseError(404, "Berita not found");
            }
            return (0, berita_model_1.toBeritaResponse)(berita);
        });
    }
    // Delete berita by ID
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id || id <= 0) {
                throw new response_error_1.ResponseError(400, "Invalid ID format");
            }
            try {
                yield database_1.prismaClient.berita.delete({
                    where: { BeritaId: id },
                });
                return true;
            }
            catch (error) {
                if (error instanceof Error && "code" in error && error.code === "P2025") {
                    throw new response_error_1.ResponseError(404, "Berita not found");
                }
                throw new response_error_1.ResponseError(500, "Internal server error");
            }
        });
    }
}
exports.BeritaService = BeritaService;
