"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toTournamentResponse = toTournamentResponse;
// Fungsi untuk konversi dari entitas Prisma ke respons
function toTournamentResponse(prismaTournament) {
    return {
        TournamentID: prismaTournament.TournamentID,
        nama_tournament: prismaTournament.nama_tournament,
        description: prismaTournament.description,
        image: prismaTournament.image,
        tipe: prismaTournament.tipe,
        biaya: prismaTournament.biaya,
        lokasi: prismaTournament.lokasi,
    };
}
