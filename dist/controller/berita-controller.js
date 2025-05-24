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
exports.BeritaController = void 0;
const berita_service_1 = require("../service/berita-service");
const response_error_1 = require("../error/response-error");
class BeritaController {
    // Create a new berita
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = req.file;
            try {
                const request = {
                    judul: req.body.judul,
                    caption: req.body.caption,
                    judul_berita: req.body.judul_berita,
                    image: file,
                    UserId: parseInt(req.body.UserId),
                };
                const berita = yield berita_service_1.BeritaService.create(request);
                res.status(201).json({
                    status: "success",
                    data: berita,
                });
            }
            catch (error) {
                console.error("Error creating berita:", error);
                if (error instanceof response_error_1.ResponseError) {
                    res.status(error.status).json({
                        status: "error",
                        message: error.message,
                    });
                }
                else {
                    res.status(500).json({
                        status: "error",
                        message: "Internal server error",
                    });
                }
            }
        });
    }
    // Get all berita
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const beritaList = yield berita_service_1.BeritaService.getAll();
                res.status(200).json({
                    status: "success",
                    data: beritaList,
                });
            }
            catch (error) {
                res.status(500).json({
                    status: "error",
                    message: "Internal server error",
                });
            }
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const beritaId = parseInt(req.params.id, 10);
                const request = {
                    judul: req.body.judul,
                    caption: req.body.caption,
                    judul_berita: req.body.judul_berita,
                    image: req.file,
                    UserId: parseInt(req.body.UserId),
                };
                const updated = yield berita_service_1.BeritaService.update(beritaId, request);
                if (!updated) {
                    res.status(404).json({
                        status: "error",
                        message: "Berita not found",
                    });
                    return;
                }
                res.status(200).json({
                    status: "success",
                    data: updated,
                });
            }
            catch (error) {
                console.error("Error updating berita:", error);
                if (error instanceof response_error_1.ResponseError) {
                    res.status(error.status).json({
                        status: "error",
                        message: error.message,
                    });
                }
                else {
                    res.status(500).json({
                        status: "error",
                        message: "Internal server error",
                    });
                }
            }
        });
    }
    // Get berita by ID
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const beritaId = parseInt(req.params.id, 10);
                if (isNaN(beritaId)) {
                    res.status(400).json({
                        status: "error",
                        message: "Invalid ID format",
                    });
                    return;
                }
                const berita = yield berita_service_1.BeritaService.getById(beritaId);
                if (!berita) {
                    res.status(404).json({
                        status: "error",
                        message: "Berita not found",
                    });
                    return;
                }
                res.status(200).json({
                    status: "success",
                    data: berita,
                });
            }
            catch (error) {
                res.status(500).json({
                    status: "error",
                    message: "Internal server error",
                });
            }
        });
    }
    // Delete berita by ID
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const beritaId = parseInt(req.params.id, 10);
                if (isNaN(beritaId)) {
                    res.status(400).json({
                        status: "error",
                        message: "Invalid ID format",
                    });
                    return;
                }
                const deleted = yield berita_service_1.BeritaService.delete(beritaId);
                if (!deleted) {
                    res.status(404).json({
                        status: "error",
                        message: "Berita not found",
                    });
                    return;
                }
                res.status(200).json({
                    status: "success",
                    message: "Berita deleted successfully",
                });
            }
            catch (error) {
                res.status(500).json({
                    status: "error",
                    message: "Internal server error",
                });
            }
        });
    }
}
exports.BeritaController = BeritaController;
