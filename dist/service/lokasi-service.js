"use strict";
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
// export class LokasiService {
//     static async create(data: any) {
//         try {
//             const newLokasi = await prisma.lokasi.create({
//                 data: {
//                     lokasiAcara: data.lokasiAcara,
//                 },
//             });
//             return newLokasi;
//         } catch (error) {
//             throw error;
//         }
//     }
//     static async getAll() {
//         try {
//             const lokasi = await prisma.lokasi.findMany();
//             return lokasi;
//         } catch (error) {
//             throw error;
//         }
//     }
//     static async update(id: number, data: any) {
//         try {
//             const updatedLokasi = await prisma.lokasi.update({
//                 where: { LokasiID: id },
//                 data: {
//                     lokasiAcara: data.lokasiAcara,
//                 },
//             });
//             return updatedLokasi;
//         } catch (error) {
//             throw error;
//         }
//     }
//     static async delete(id: number) {
//         try {
//             await prisma.lokasi.delete({
//                 where: { LokasiID: id },
//             });
//         } catch (error) {
//             throw error;
//         }
//     }
// }
