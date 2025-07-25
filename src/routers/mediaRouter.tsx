import express from "express"
import * as AWS from "aws-sdk"
import mime from "mime-types"

const mediaRouter = express.Router()
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

mediaRouter.get("/", async (req, res) => {
  const key = req.query.key as string
  const range = req.headers.range
  const contentType = mime.lookup(key) || "application/octet-stream"

  if (!key) return res.status(400).send("Missing key")

  const params: AWS.S3.GetObjectRequest = {
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: key
  }

  try {
    const head = await s3.headObject(params).promise()
    const fileSize = head.ContentLength!

    if (range) {
      const [startStr, endStr] = range.replace(/bytes=/, "").split("-")
      const start = parseInt(startStr, 10)
      const end = endStr ? parseInt(endStr, 10) : fileSize - 1
      const chunkSize = end - start + 1

      const stream = s3.getObject({
        ...params,
        Range: `bytes=${start}-${end}`
      }).createReadStream()

      res.writeHead(206, {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize,
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": "*",
        "Cross-Origin-Resource-Policy": "cross-origin"
      })

      stream.pipe(res)
    } else {
      const stream = s3.getObject(params).createReadStream()

      res.writeHead(200, {
        "Content-Length": fileSize,
        "Content-Type": contentType,
        "Accept-Ranges": "bytes",
        "Access-Control-Allow-Origin": "*",
        "Cross-Origin-Resource-Policy": "cross-origin"
      })

      stream.pipe(res)
    }
  } catch (err) {
    console.error(err)
    res.status(500).send("Error streaming file")
  }
})

module.exports = mediaRouter
