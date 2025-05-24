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
exports.TeamService = void 0;
const client_1 = require("@prisma/client");
const team_validation_1 = require("../validation/team-validation");
const zod_1 = require("zod");
const prisma = new client_1.PrismaClient();
class TeamService {
    // Create a team
    static createTeam(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Validate the data using Zod
                const validatedData = team_validation_1.TeamValidation.CREATE.parse(data);
                // Save the team to the database
                const path = JSON.parse(JSON.stringify(validatedData.image)).path.replace(/\\/g, '/').replace('public/', '');
                const newTeam = yield prisma.team.create({
                    data: {
                        namatim: validatedData.namatim,
                        image: path
                    },
                });
                return newTeam;
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    throw new Error(`Validation Error: ${error.errors.map((e) => e.message).join(", ")}`);
                }
                throw error;
            }
        });
    }
    // Get all teams
    static listTeams() {
        return __awaiter(this, void 0, void 0, function* () {
            const teams = yield prisma.team.findMany();
            return teams;
        });
    }
    // Update a team
    static updateTeam(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Validate the data using Zod
                const validatedData = team_validation_1.TeamValidation.UPDATE.parse(data);
                // Update the team in the database
                const path = JSON.parse(JSON.stringify(validatedData.image)).path.replace(/\\/g, '/').replace('public/', '');
                const updatedTeam = yield prisma.team.update({
                    where: { TeamId: id },
                    data: {
                        namatim: validatedData.namatim,
                        image: path,
                    },
                });
                return updatedTeam;
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    throw new Error(`Validation Error: ${error.errors.map((e) => e.message).join(", ")}`);
                }
                throw error;
            }
        });
    }
    // Delete a team
    static deleteTeam(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedTeam = yield prisma.team.delete({
                where: { TeamId: id },
            });
            return deletedTeam;
        });
    }
}
exports.TeamService = TeamService;
