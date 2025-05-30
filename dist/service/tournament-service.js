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
exports.TournamentService = void 0;
const client_1 = require("@prisma/client");
const tournament_validation_1 = require("../validation/tournament-validation");
const zod_1 = require("zod");
const prisma = new client_1.PrismaClient();
class TournamentService {
    // Create a tournament
    static createTournament(data, user, file) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Validate the data using Zod
                const validatedData = tournament_validation_1.TournamentValidation.CREATE.parse(Object.assign(Object.assign({}, data), { image: file.path // Use the path from the uploaded file
                 }));
                if (user.role == 'player') {
                    return "Player not authorized to create a Tournament";
                }
                const relativeImagePath = `/uploads/${file.filename}`;
                // Save the tournament to the database
                // const path = JSON.parse(JSON.stringify(validatedData.image)).path.replace(/\\/g, '/').replace('public/', '')
                const newTournament = yield prisma.tournament.create({
                    data: {
                        nama_tournament: validatedData.nama_tournament,
                        description: validatedData.description,
                        image: relativeImagePath,
                        tipe: validatedData.tipe,
                        biaya: validatedData.biaya,
                        lokasi: validatedData.lokasi,
                        OwnerId: user.UserId
                    },
                });
                return newTournament;
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    throw new Error(`Validation Error: ${error.errors.map((e) => e.message).join(", ")}`);
                }
                throw error;
            }
        });
    }
    // Update a tournament
    static updateTournament(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Validate the data using Zod
                console.log(data);
                const validatedData = tournament_validation_1.TournamentValidation.UPDATE.parse(data);
                // Update the tournament in the database
                const path = JSON.parse(JSON.stringify(validatedData.image)).path.replace(/\\/g, '/').replace('public/', '');
                const updatedTournament = yield prisma.tournament.update({
                    where: { TournamentID: id },
                    data: {
                        nama_tournament: validatedData.nama_tournament,
                        description: validatedData.description,
                        image: validatedData.image,
                        tipe: validatedData.tipe,
                        biaya: validatedData.biaya,
                        lokasi: validatedData.lokasi,
                    },
                });
                return updatedTournament;
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    throw new Error(`Validation Error: ${error.errors.map((e) => e.message).join(", ")}`);
                }
                throw error;
            }
        });
    }
    // Delete a tournament
    static deleteTournament(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedTournament = yield prisma.tournament.delete({
                    where: { TournamentID: id },
                });
                return deletedTournament;
            }
            catch (error) {
                throw new Error("Failed to delete tournament");
            }
        });
    }
    // List all tournaments
    static listTournaments() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.tournament.findMany();
        });
    }
}
exports.TournamentService = TournamentService;
