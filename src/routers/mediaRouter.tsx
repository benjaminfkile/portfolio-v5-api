import express, { Request, Response } from "express"
import createAWSStream from "../stream/createAWSStream"
const mediaRouter = express.Router()

mediaRouter
  .route("/")
  .get(async (req: Request, res: Response) => {
    try {
      const key: any = req.query.key

      res.setHeader("Access-Control-Allow-Origin", "*")
      res.setHeader("Cross-Origin-Resource-Policy", "cross-origin")
      res.setHeader("Content-Type", "video/mp4")
      res.setHeader("Accept-Ranges", "bytes")

      const stream = await createAWSStream(key)
      stream.pipe(res)
    } catch (err) {
      res.status(500).send({ error: "Failed to load media", details: err })
    }
  })

module.exports = mediaRouter