import { Request, Response, NextFunction } from "express";
import { TeamService } from "../service/team-service";

export class TeamController {
    // Create a new team
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const teamData = req.body;
            const request = {
                ...teamData,
                image: req.file,
            }
            const newTeam = await TeamService.createTeam(request);

            res.status(201).json({
                message: "Team created successfully",
                data: newTeam,
            });
        } catch (error) {
            next(error);
        }
    }

    // Get all teams
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const teams = await TeamService.listTeams();

            res.status(200).json({
                message: "Teams retrieved successfully",
                data: teams,
            });
        } catch (error) {
            next(error);
        }
    }

    // Update a team by ID
    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const teamData = req.body;
            const request = {
                ...teamData,
                image: req.file,
            }
            const updatedTeam = await TeamService.updateTeam(parseInt(id, 10), request);

            res.status(200).json({
                message: "Team updated successfully",
                data: updatedTeam,
            });
        } catch (error) {
            next(error);
        }
    }

    // Delete a team by ID
    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await TeamService.deleteTeam(parseInt(id, 10));

            res.status(200).json({
                message: "Team deleted successfully",
            });
        } catch (error) {
            next(error);
        }
    }
}