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
exports.TournamentController = void 0;
const tournament_service_1 = require("../service/tournament-service");
class TournamentController {
    // Create a new tournament
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tournament = yield tournament_service_1.TournamentService.createTournament(req.body, req.user);
                res.status(200).json({
                    message: "Tournament created successfully",
                    data: tournament,
                });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({
                    message: "Filed to create Tournament", error
                });
            }
        });
    }
    // Get all tournaments
    static getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tournaments = yield tournament_service_1.TournamentService.listTournaments();
                res.status(200).json({
                    message: "Tournaments retrieved successfully",
                    data: tournaments,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    // Update a tournament by ID
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const tournamentData = req.body;
                const request = Object.assign(Object.assign({}, tournamentData), { image: req.file });
                const updatedTournament = yield tournament_service_1.TournamentService.updateTournament(parseInt(id, 10), request);
                res.status(200).json({
                    message: "Tournament updated successfully",
                    data: updatedTournament,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    // Delete a tournament by ID
    static delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield tournament_service_1.TournamentService.deleteTournament(parseInt(id, 10));
                res.status(200).json({
                    message: "Tournament deleted successfully",
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static listTournaments(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tournaments = yield tournament_service_1.TournamentService.listTournaments();
                res.status(200).json({
                    message: "Tournaments retrieved successfully",
                    data: tournaments,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.TournamentController = TournamentController;
