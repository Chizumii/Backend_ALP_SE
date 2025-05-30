import express from "express"
import { UserController } from "../controller/user-controller"

export const apiRouter = express.Router()

apiRouter.post("/register", UserController.register);
apiRouter.post("/login", UserController.login);

