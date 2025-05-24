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
exports.TeamController = void 0;
const team_service_1 = require("../service/team-service");
class TeamController {
    // Create a new team
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const teamData = req.body;
                const request = Object.assign(Object.assign({}, teamData), { image: req.file });
                const newTeam = yield team_service_1.TeamService.createTeam(request);
                res.status(201).json({
                    message: "Team created successfully",
                    data: newTeam,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    // Get all teams
    static getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const teams = yield team_service_1.TeamService.listTeams();
                res.status(200).json({
                    message: "Teams retrieved successfully",
                    data: teams,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    // Update a team by ID
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const teamData = req.body;
                const request = Object.assign(Object.assign({}, teamData), { image: req.file });
                const updatedTeam = yield team_service_1.TeamService.updateTeam(parseInt(id, 10), request);
                res.status(200).json({
                    message: "Team updated successfully",
                    data: updatedTeam,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    // Delete a team by ID
    static delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield team_service_1.TeamService.deleteTeam(parseInt(id, 10));
                res.status(200).json({
                    message: "Team deleted successfully",
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.TeamController = TeamController;
