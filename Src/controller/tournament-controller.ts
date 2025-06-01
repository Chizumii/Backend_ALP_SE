import { Request, Response, NextFunction } from "express";
import { TournamentService } from "../service/tournament-service";
import { UserRequest } from "../type/user-request";

export class TournamentController {
    // Create a new tournament
    static async create(req: UserRequest, res: Response) {
        try {
            if (!req.file) {
               res.status(400).json({
                    message: "No image file uploaded."
                });
                return;
            }
            const tournament = await TournamentService.createTournament(req.body, req.user!, req.file);
            res.status(200).json({
                message: "Tournament created successfully",
                data: tournament,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Failed to create Tournament", error
            });
        }
    }

    // Get all tournaments
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const tournaments = await TournamentService.listTournaments();

            res.status(200).json({
                message: "Tournaments retrieved successfully",
                data: tournaments,
            });
        } catch (error) {
            next(error);
        }
    }

    // Update a tournament by ID
    static async update(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            if (!req.file) {
               res.status(400).json({
                    message: "No image file uploaded."
                });
                return;
            }
            const updatedTournament = await TournamentService.updateTournament(parseInt(id, 10), req.body, req.user!, req.file);

            res.status(200).json({
                message: "Tournament updated successfully",
                data: updatedTournament,
            });
        } catch (error) {
            next(error);
        }
    }

    // Delete a tournament by ID
    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await TournamentService.deleteTournament(parseInt(id, 10));

            res.status(200).json({
                message: "Tournament deleted successfully",
            });
        } catch (error) {
            next(error);
        }
    }

    static async listTournaments(req: Request, res: Response, next: NextFunction) {
        try {
            const tournaments = await TournamentService.listTournaments();

            res.status(200).json({
                message: "Tournaments retrieved successfully",
                data: tournaments,
            });
        } catch (error) {
            next(error);
        }
    }

     static async checkRegistrationStatus(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const { tournamentId } = req.params;
            const userId = req.user!.UserId;
            
            const isRegistered = await TournamentService.checkTeamRegistration(
                parseInt(tournamentId, 10), 
                userId
            );

            res.status(200).json({
                message: "Registration status retrieved successfully",
                data: {
                    isRegistered,
                    message: isRegistered ? "Team is already registered" : "Team is not registered"
                }
            });
        } catch (error) {
            next(error);
        }
    }

     static async registerTeam(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const { tournamentId } = req.params;
            const userId = req.user!.UserId;

            const registration = await TournamentService.registerTeamForTournament(
                parseInt(tournamentId, 10), 
                userId
            );

            res.status(200).json({
                message: "Team registered successfully",
                data: registration
            });
        } catch (error) {
            next(error);
        }
    }

    // ADD THIS NEW METHOD for registering specific team to tournament
    static async registerTeamWithId(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const { tournamentId, teamId } = req.params;
            const userId = req.user!.UserId;

            const registration = await TournamentService.registerSpecificTeamForTournament(
                parseInt(tournamentId, 10), 
                parseInt(teamId, 10),
                userId
            );

            res.status(200).json({
                message: "Team registered successfully",
                data: registration
            });
        } catch (error) {
            next(error);
        }
    }

    static async unregisterTeam(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const { tournamentId } = req.params;
            const userId = req.user!.UserId;

            await TournamentService.unregisterTeamFromTournament(
                parseInt(tournamentId, 10), 
                userId
            );

            res.status(200).json({
                message: "Team unregistered successfully"
            });
        } catch (error) {
            next(error);
        }
    }
}