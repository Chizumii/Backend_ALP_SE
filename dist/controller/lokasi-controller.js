"use strict";
// import { Request, Response, NextFunction } from "express";
// import { LokasiService } from "../service/lokasi-service";
// export class LokasiController {
//     // Create a new lokasi
//     static async create(req: Request, res: Response, next: NextFunction) {
//         try {
//             const lokasiData = req.body;
//             const newLokasi = await LokasiService.create(lokasiData);
//             res.status(201).json({
//                 message: "Lokasi created successfully",
//                 data: newLokasi,
//             });
//         } catch (error) {
//             next(error);
//         }
//     }
//     // Get all lokasi
//     static async getAll(req: Request, res: Response, next: NextFunction) {
//         try {
//             const lokasi = await LokasiService.getAll();
//             res.status(200).json({
//                 message: "Lokasi retrieved successfully",
//                 data: lokasi,
//             });
//         } catch (error) {
//             next(error);
//         }
//     }
//     // Update a lokasi by ID
//     static async update(req: Request, res: Response, next: NextFunction) {
//         try {
//             const { id } = req.params;
//             const lokasiData = req.body;
//             const updatedLokasi = await LokasiService.update(parseInt(id, 10), lokasiData);
//             res.status(200).json({
//                 message: "Lokasi updated successfully",
//                 data: updatedLokasi,
//             });
//         } catch (error) {
//             next(error);
//         }
//     }
//     // Delete a lokasi by ID
//     static async delete(req: Request, res: Response, next: NextFunction) {
//         try {
//             const { id } = req.params;
//             await LokasiService.delete(parseInt(id, 10));
//             res.status(200).json({
//                 message: "Lokasi deleted successfully",
//             });
//         } catch (error) {
//             next(error);
//         }
//     }
// }
