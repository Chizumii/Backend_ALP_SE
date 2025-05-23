import { Berita } from "@prisma/client";

// Interface untuk representasi request pembuatan atau pembaruan berita
export interface CreateBerita {
    judul: string;
    caption: string;
    judul_berita: string;
    image?: Express.Multer.File;
    UserId: number; // Relasi ke pengguna
}

// Interface untuk representasi respons berita
export interface BeritaResponse {
    BeritaId: number;
    judul: string;
    caption: string;
    judul_berita: string;
    image: string;
    UserId: number;
}
export interface BeritaRequest {
    BeritaId: number;
    judul: string;
    caption: string;
    judul_berita: string;
    image: string;
    UserId: number;
}
export interface UpdateBerita {
    BeritaId: number;
    judul: string;
    caption: string;
    judul_berita: string;
    image?: Express.Multer.File;
    UserId: number;
}
export interface DeleteBerita {
    BeritaId: number;
    judul: string;
    caption: string;
    judul_berita: string;
    image: string;
    UserId: number;
}
export interface GetAllBerita {
    BeritaId: number;
    judul: string;
    caption: string;
    judul_berita: string;
    image: string;
    UserId: number;
}

// Fungsi untuk konversi dari entitas Prisma ke respons
export function toBeritaResponse(berita: Berita): BeritaResponse {
    return {
        BeritaId: berita.BeritaId,
        judul: berita.judul,
        caption: berita.caption,
        judul_berita: berita.judul_berita,
        image: berita.image,
        UserId: berita.UserId,
    };
}

