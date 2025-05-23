import express from "express"
import { UserController } from "../controller/user-controller"

export const apiRouter = express.Router()
apiRouter.post("/api/register", UserController.register);
apiRouter.post("/api/login", UserController.login);

