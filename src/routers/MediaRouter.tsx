import express, { Request, Response } from "express"
const mediaRouter = express.Router()
const mediaService = require("../services/MediaService")
const jsonParser = express.json()

mediaRouter
    .route("/")
    .get(jsonParser, async (req: Request, res: Response) => {
        try {
            const s3 = req.app.get("s3")
            const key = req.query.key
            mediaService.streamChunks(s3, key, null)
            res.status(200).send({ message: "streaming has started", err: null })
        } catch (err) {
            res.status(200).send({ message: "streaming error", err: err })
        }
    })
module.exports = mediaRouter