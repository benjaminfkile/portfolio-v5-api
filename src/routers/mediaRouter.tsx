import express, { Request, Response } from "express"
import createAWSStream from "../stream/createAWSStream"
import path from "path"

const mediaRouter = express.Router()

mediaRouter.route("/").get(async (req: Request, res: Response) => {
  try {
    const key: any = req.query.key

    const ext = path.extname(key).toLowerCase()
    const contentTypeMap: Record<string, string> = {
      ".mp4": "video/mp4",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
      ".gif": "image/gif",
      ".webp": "image/webp"
    }
    const contentType = contentTypeMap[ext] || "application/octet-stream"

    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin")
    res.setHeader("Content-Type", contentType)
    res.setHeader("Accept-Ranges", "bytes")

    const stream = await createAWSStream(key)
    stream.pipe(res)
  } catch (err) {
    res.status(500).send({ error: "Failed to load media", details: err })
  }
})


module.exports = mediaRouter