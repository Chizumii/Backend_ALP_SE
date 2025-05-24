import { Request, Response, NextFunction } from "express";
import { TournamentService } from "../service/tournament-service";
import { UserRequest } from "../type/user-request";

export class TournamentController {
    // Create a new tournament
    static async create(req: UserRequest, res: Response) {
        try {
            const tournament = await TournamentService.createTournament(req.body, req.user!);
            res.status(200).json({
                message: "Tournament created successfully",
                data: tournament,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Filed to create Tournament", error
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
    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const tournamentData = req.body;
            const request = {
                ...tournamentData,
                image: req.file,
            }
            const updatedTournament = await TournamentService.updateTournament(parseInt(id, 10), request);

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
}
