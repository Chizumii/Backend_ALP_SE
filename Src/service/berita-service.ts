import { prismaClient } from "../application/database";
import {
    CreateBerita,
    UpdateBerita,
    BeritaResponse,
    toBeritaResponse
} from "../model/berita-model";
import { Validation } from "../validation/validation";
import { BeritaValidation } from "../validation/berita-validation";
import { ResponseError } from "../error/response-error";

export class BeritaService {
    // Create a new berita
    static async create(request: CreateBerita): Promise<BeritaResponse> {
        // Validasi input
        const validatedData = Validation.validate(BeritaValidation.CREATE, request);

        // Simpan berita ke database
        const path = JSON.parse(JSON.stringify(validatedData.image)).path.replace(/\\/g, '/').replace('public/', '')
        const berita = await prismaClient.berita.create({
            data: {
                judul: validatedData.judul,
                caption: validatedData.caption,
                judul_berita: validatedData.judul_berita,
                image: path,
                UserId: validatedData.UserId,
            },
        });

        // Konversi ke BeritaResponse
        return toBeritaResponse(berita);
    }

    // Get all berita
    static async getAll(): Promise<BeritaResponse[]> {
        const beritaList = await prismaClient.berita.findMany({
            include: {
                User: true, // Menyertakan relasi dengan user jika diperlukan
            },
        });

        return beritaList.map(toBeritaResponse);
    }

    // Update berita by ID
    static async update(id: number, request: UpdateBerita): Promise<BeritaResponse | null> {
        if (!id || id <= 0) {
            throw new ResponseError(400, "Invalid ID format");
        }

        // Validasi input
        const validatedData = Validation.validate(BeritaValidation.UPDATE, request);
        const path = JSON.parse(JSON.stringify(validatedData.image)).path.replace(/\\/g, '/').replace('public/', '')
        const berita = await prismaClient.berita.update({
            where: { BeritaId: id },
            data: {
                judul: validatedData.judul,
                caption: validatedData.caption,
                judul_berita: validatedData.judul_berita,
                image: path,
                UserId: validatedData.UserId,
            },
        });

        if (!berita) {
            throw new ResponseError(404, "Berita not found");
        }

        return toBeritaResponse(berita);
    }

    static async getById(id: number): Promise<BeritaResponse | null> {
        if (!id || id <= 0) {
            throw new ResponseError(400, "Invalid ID format");
        }

        const berita = await prismaClient.berita.findUnique({
            where: { BeritaId: id },
            include: {
                User: true, // Menyertakan relasi dengan user jika diperlukan
            },
        });

        if (!berita) {
            throw new ResponseError(404, "Berita not found");
        }

        return toBeritaResponse(berita);
    }

    // Delete berita by ID
    static async delete(id: number): Promise<boolean> {
        if (!id || id <= 0) {
            throw new ResponseError(400, "Invalid ID format");
        }

        try {
            await prismaClient.berita.delete({
                where: { BeritaId: id },
            });
            return true;
        } catch (error) {
            if (error instanceof Error && "code" in error && error.code === "P2025") {
                throw new ResponseError(404, "Berita not found");
            }
            throw new ResponseError(500, "Internal server error");
        }
    }
}
