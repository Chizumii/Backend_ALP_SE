import express from "express"
import { router } from "../route/router-api"
import { errorMiddleware } from "../middleware/error-middleware"
import { apiRouter } from "../route/api"

const app = express()
app.use(express.json())
app.use(express.static("public"))
app.use(router)
app.use(apiRouter)
app.use(errorMiddleware)

export default app