import { PrismaClient } from "@prisma/client";
import { TournamentValidation } from "../validation/tournament-validation";
import { ZodError } from "zod";

const prisma = new PrismaClient();

export class TournamentService {
    // Create a tournament
    static async createTournament(data: any) {
        try {
            // Validate the data using Zod
            const validatedData = TournamentValidation.CREATE.parse(data);

            // Save the tournament to the database
            // const path = JSON.parse(JSON.stringify(validatedData.image)).path.replace(/\\/g, '/').replace('public/', '')
            const newTournament = await prisma.tournament.create({
                data: {
                    nama_tournament: validatedData.nama_tournament,
                    description: validatedData.description,
                    image: validatedData.image,
                    tipe: validatedData.tipe,
                    biaya: validatedData.biaya,
                    LokasiID:parseInt(validatedData.LokasiID),
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
    static async updateTournament(id: number, data: any) {
        try {
            // Validate the data using Zod
            console.log(data)
            const validatedData = TournamentValidation.UPDATE.parse(data);

            // Update the tournament in the database
            const path = JSON.parse(JSON.stringify(validatedData.image)).path.replace(/\\/g, '/').replace('public/', '')
            const updatedTournament = await prisma.tournament.update({
                where: { TournamentID: id },
                data: {
                    nama_tournament: validatedData.nama_tournament,
                    description: validatedData.description,
                    image: validatedData.image,
                    tipe: validatedData.tipe,
                    biaya: validatedData.biaya,
                    LokasiID: parseInt(validatedData.LokasiID),
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
}
