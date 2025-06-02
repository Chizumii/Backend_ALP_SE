import { PrismaClient, User } from "@prisma/client";
import { TournamentValidation } from "../validation/tournament-validation";
import { ZodError } from "zod";

const prisma = new PrismaClient();

export class TournamentService {
    // Create a tournament
    static async createTournament(data: any, user: User, file: Express.Multer.File) {
        try {
            // Validate the data using Zod
            const validatedData = TournamentValidation.CREATE.parse({
                ...data, // Spread existing data
                image: file.path // Use the path from the uploaded file
            });


            if(user.role == 'player'){
                return "Player not authorized to create a Tournament"
            }

            const relativeImagePath = `/images/${file.filename}`;

            // Save the tournament to the database
            // const path = JSON.parse(JSON.stringify(validatedData.image)).path.replace(/\\/g, '/').replace('public/', '')
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
    static async updateTournament(id: number, data: any, user: User, file: Express.Multer.File | null) {
        try {
            let updatedTournament

            if(user.role == 'player'){
                return "Player not authorized to create a Tournament"
            }

            if(file){
                const validatedData = TournamentValidation.UPDATE.parse({
                    ...data,
                    image: file.path
                });


                const relativeImagePath = `/images/${file.filename}`;
                updatedTournament = await prisma.tournament.update({
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

            }else{
                const validatedData = TournamentValidation.UPDATE.parse({
                    ...data
                });

                const prevTournament = await prisma.tournament.findFirst({
                    where: { TournamentID: id}
                })

                updatedTournament = await prisma.tournament.update({
                    where: { TournamentID: id },
                    data: {
                        nama_tournament: validatedData.nama_tournament,
                        description: validatedData.description,
                        image: prevTournament?.image,
                        tipe: validatedData.tipe,
                        biaya: validatedData.biaya,
                        lokasi: validatedData.lokasi,
                    },
                });
            }

            
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
