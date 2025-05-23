import app from "./application/app";
import { logger } from "./application/logging";

app.get("/", (_, res) => {
    res.status(200).send({
        status: 200,
        message: "OK",
    });
});

app.listen(3000, () => {
    logger.info("Listening on http://localhost:3000")
});