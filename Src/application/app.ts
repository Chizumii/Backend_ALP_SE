import express from "express"
import { router } from "../route/router-api"
import { errorMiddleware } from "../middleware/error-middleware"
import { apiRouter } from "../route/api"
import path from 'path';

const app = express()
const uploadsPath = path.join(__dirname, '..', '..', 'uploads', 'images');
console.log('DEBUG: Serving static files from:', uploadsPath); // Keep this log!
app.use('/uploads', express.static(uploadsPath));
app.use(express.json())
app.use(express.static("public"))
app.use('/api', apiRouter)
app.use('/api', router)
app.use(errorMiddleware)


export default app