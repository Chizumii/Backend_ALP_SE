import { PrismaClient } from "@prisma/client";
import { TeamValidation } from "../validation/team-validation";
import { ZodError } from "zod";

const prisma = new PrismaClient();

export class TeamService {
    // Create a team
    static async createTeam(data: any) {
        try {
            // Validate the data using Zod
            const validatedData = TeamValidation.CREATE.parse(data);

            // Save the team to the database
            const path = JSON.parse(JSON.stringify(validatedData.image)).path.replace(/\\/g, '/').replace('public/', '')
            const newTeam = await prisma.team.create({
                data: {
                    namatim: validatedData.namatim,
                    image: path
                },
            });

            return newTeam;
        } catch (error) {
            if (error instanceof ZodError) {
                throw new Error(`Validation Error: ${error.errors.map((e) => e.message).join(", ")}`);
            }
            throw error;
        }
    }

    // Get all teams
    static async listTeams() {
        const teams = await prisma.team.findMany();
        return teams;
    }

    // Update a team
    static async updateTeam(id: number, data: any) {
        try {
            // Validate the data using Zod
            const validatedData = TeamValidation.UPDATE.parse(data);

            // Update the team in the database
            const path = JSON.parse(JSON.stringify(validatedData.image)).path.replace(/\\/g, '/').replace('public/', '')
            const updatedTeam = await prisma.team.update({
                where: { TeamId: id },
                data: {
                    namatim: validatedData.namatim,
                    image: path,
                },
            });

            return updatedTeam;
        } catch (error) {
            if (error instanceof ZodError) {
                throw new Error(`Validation Error: ${error.errors.map((e) => e.message).join(", ")}`);
            }
            throw error;
        }
    }

    // Delete a team
    static async deleteTeam(id: number) {
        const deletedTeam = await prisma.team.delete({
            where: { TeamId: id },
        });

        return deletedTeam;
    }
}