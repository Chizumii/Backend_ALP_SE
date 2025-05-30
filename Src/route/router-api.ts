// this router can only be accessed by authenticated people

import express from "express"
import { upload } from "../utils/storage"
import { UserController } from "../controller/user-controller"
import { authMiddleware } from "../middleware/auth-middleware"
import { BeritaController } from "../controller/berita-controller"
import { TournamentController } from "../controller/tournament-controller"
import { TeamController } from "../controller/team-controller"

export const router = express.Router()
router.use(authMiddleware)

router.post("/logout", UserController.logout)
router.put("/user", UserController.update);

router.post("/berita", upload.single('image'), BeritaController.create);
router.get("/berita", BeritaController.getAll);
router.get("/berita/:id", BeritaController.getById);
router.patch("/berita/:id", upload.single('image'), BeritaController.update);
router.delete("/berita/:id", BeritaController.delete);

router.post("/tournament", upload.single('image'),TournamentController.create);
router.get("/tournament", TournamentController.getAll);
router.put("/tournament/:id", upload.single('image'), TournamentController.update); 
router.delete("/tournament/:id", TournamentController.delete);

router.post("/team", upload.single('image'), TeamController.create);
router.get("/team", TeamController.getAll);
router.patch("/team/:id", upload.single('image'), TeamController.update); 
router.delete("/team/:id", TeamController.delete);

// router.post("/api/lokasi", LokasiController.create);
// router.get("/api/lokasi", LokasiController.getAll);
// router.patch("/api/lokasi/:id", LokasiController.update);
// router.delete("/api/lokasi/:id", LokasiController.delete);