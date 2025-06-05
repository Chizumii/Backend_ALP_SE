import { PrismaClient, User } from "@prisma/client";
import { TournamentValidation } from "../validation/tournament-validation";
import { ZodError } from "zod";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";

const prisma = new PrismaClient();

export class TournamentService {
    // Create a tournament
    static async createTournament(data: any, user: User, file: Express.Multer.File) {
        try {
            const validatedData = TournamentValidation.CREATE.parse({
                ...data,
                image: file.path
            });

            if(user.role == 'player'){
                return "Player not authorized to create a Tournament"
            }

            const relativeImagePath = `/images/${file.filename}`;

            const newTournament = await prisma.tournament.create({
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
        } catch (error) {
            if (error instanceof ZodError) {
                throw new Error(`Validation Error: ${error.errors.map((e) => e.message).join(", ")}`);
            }
            throw error;
        }
    }

    // Update a tournament
    static async updateTournament(id: number, data: any, user: User, file: Express.Multer.File) {
        try {
            const validatedData = TournamentValidation.UPDATE.parse({
                ...data,
                image: file.path
            });

            if(user.role == 'player'){
                return "Player not authorized to create a Tournament"
            }

            const relativeImagePath = `/images/${file.filename}`;
            const updatedTournament = await prisma.tournament.update({
                where: { TournamentID: id },
                data: {
                    nama_tournament: validatedData.nama_tournament,
                    description: validatedData.description,
                    image: relativeImagePath,
                    tipe: validatedData.tipe,
                    biaya: validatedData.biaya,
                    lokasi: validatedData.lokasi,
                },
            });

            return updatedTournament;
        } catch (error) {
            if (error instanceof ZodError) {
                throw new Error(`Validation Error: ${error.errors.map((e) => e.message).join(", ")}`);
            }
            throw error;
        }
    }

    // Delete a tournament
    static async deleteTournament(id: number) {
        try {
            const deletedTournament = await prisma.tournament.delete({
                where: { TournamentID: id },
            });

            return deletedTournament;
        } catch (error) {
            throw new Error("Failed to delete tournament");
        }
    }

    // List all tournaments
    static async listTournaments() {
        return await prisma.tournament.findMany();
    }

    static async checkTeamRegistration(tournamentId: number, userId: number): Promise<boolean> {
        // Get user's team
        const user = await prismaClient.user.findUnique({
            where: { UserId: userId },
            select: { TeamID: true }
        });

        if (!user || !user.TeamID) {
            throw new ResponseError(400, "User is not part of any team");
        }

        // Check if team is registered for tournament
        const registration = await prismaClient.teamTournament.findUnique({
            where: {
                TeamID_TournamentID: {
                    TeamID: user.TeamID,
                    TournamentID: tournamentId
                }
            }
        });

        return registration !== null;
    }

    static async registerTeamForTournament(tournamentId: number, userId: number) {
        // Get user's team
        const user = await prismaClient.user.findUnique({
            where: { UserId: userId },
            select: { TeamID: true }
        });

        if (!user || !user.TeamID) {
            throw new ResponseError(400, "User is not part of any team");
        }

        // Check if tournament exists
        const tournament = await prismaClient.tournament.findUnique({
            where: { TournamentID: tournamentId }
        });

        if (!tournament) {
            throw new ResponseError(404, "Tournament not found");
        }

        // Check if already registered
        const existingRegistration = await prismaClient.teamTournament.findUnique({
            where: {
                TeamID_TournamentID: {
                    TeamID: user.TeamID,
                    TournamentID: tournamentId
                }
            }
        });

        if (existingRegistration) {
            throw new ResponseError(400, "Team is already registered for this tournament");
        }

        // Register team
        const registration = await prismaClient.teamTournament.create({
            data: {
                TeamID: user.TeamID,
                TournamentID: tournamentId,
                date: new Date().toISOString(),
                result: "pending"
            }
        });

        return registration;
    }

    // ADD THIS NEW METHOD for registering specific team
    static async registerSpecificTeamForTournament(tournamentId: number, teamId: number, userId: number) {
        // Verify user has permission to register this team (optional, based on your business logic)
        const user = await prismaClient.user.findUnique({
            where: { UserId: userId },
            select: { TeamID: true, role: true }
        });

        if (!user) {
            throw new ResponseError(404, "User not found");
        }

        // Check if user can register this team (either their own team or if they're an admin)
        if (user.TeamID !== teamId && user.role !== 'admin') {
            throw new ResponseError(403, "You can only register your own team");
        }

        // Check if tournament exists
        const tournament = await prismaClient.tournament.findUnique({
            where: { TournamentID: tournamentId }
        });

        if (!tournament) {
            throw new ResponseError(404, "Tournament not found");
        }

        // Check if team exists
        const team = await prismaClient.team.findUnique({
            where: { TeamId: teamId }
        });

        if (!team) {
            throw new ResponseError(404, "Team not found");
        }

        // Check if already registered
        const existingRegistration = await prismaClient.teamTournament.findUnique({
            where: {
                TeamID_TournamentID: {
                    TeamID: teamId,
                    TournamentID: tournamentId
                }
            }
        });

        if (existingRegistration) {
            throw new ResponseError(400, "Team is already registered for this tournament");
        }

        // Register team
        const registration = await prismaClient.teamTournament.create({
            data: {
                TeamID: teamId,
                TournamentID: tournamentId,
                date: new Date().toISOString(),
                result: "pending"
            }
        });

        return registration;
    }

    static async unregisterTeamFromTournament(tournamentId: number, userId: number) {
        // Get user's team
        const user = await prismaClient.user.findUnique({
            where: { UserId: userId },
            select: { TeamID: true }
        });

        if (!user || !user.TeamID) {
            throw new ResponseError(400, "User is not part of any team");
        }

        // Check if registered
        const registration = await prismaClient.teamTournament.findUnique({
            where: {
                TeamID_TournamentID: {
                    TeamID: user.TeamID,
                    TournamentID: tournamentId
                }
            }
        });

        if (!registration) {
            throw new ResponseError(400, "Team is not registered for this tournament");
        }

        // Unregister team
        await prismaClient.teamTournament.delete({
            where: {
                TeamID_TournamentID: {
                    TeamID: user.TeamID,
                    TournamentID: tournamentId
                }
            }
        });
    }
}