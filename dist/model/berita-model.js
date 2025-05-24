"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toBeritaResponse = toBeritaResponse;
// Fungsi untuk konversi dari entitas Prisma ke respons
function toBeritaResponse(berita) {
    return {
        BeritaId: berita.BeritaId,
        judul: berita.judul,
        caption: berita.caption,
        judul_berita: berita.judul_berita,
        image: berita.image,
        UserId: berita.UserId,
    };
}
