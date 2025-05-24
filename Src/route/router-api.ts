// this router can only be accessed by unauthenticated people

import express from "express"
import { upload } from "../utils/storage"
import { UserController } from "../controller/user-controller"
import { authMiddleware } from "../middleware/auth-middleware"
import { BeritaController } from "../controller/berita-controller"
import { TournamentController } from "../controller/tournament-controller"
import { TeamController } from "../controller/team-controller"

export const router = express.Router()
router.use(authMiddleware)

router.post("/api/logout", UserController.logout)
router.put("/api/user", UserController.update);

router.post("/api/berita", upload.single('image'), BeritaController.create);
router.get("/api/berita", BeritaController.getAll);
router.get("/api/berita/:id", BeritaController.getById);
router.patch("/api/berita/:id", upload.single('image'), BeritaController.update);
router.delete("/api/berita/:id", BeritaController.delete);

router.post("/api/tournament", upload.single('image'),TournamentController.create);
router.get("/api/tournament", TournamentController.getAll);
router.patch("/api/tournament/:id", upload.single('image'), TournamentController.update); 
router.delete("/api/tournament/:id", TournamentController.delete);

router.post("/api/team", upload.single('image'), TeamController.create);
router.get("/api/team", TeamController.getAll);
router.patch("/api/team/:id", upload.single('image'), TeamController.update); 
router.delete("/api/team/:id", TeamController.delete);

// router.post("/api/lokasi", LokasiController.create);
// router.get("/api/lokasi", LokasiController.getAll);
// router.patch("/api/lokasi/:id", LokasiController.update);
// router.delete("/api/lokasi/:id", LokasiController.delete);