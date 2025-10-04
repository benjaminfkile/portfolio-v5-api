import express from "express"
import { S3Client, HeadObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3"
import mime from "mime-types"
import { Readable } from "stream"

const mediaRouter = express.Router()

// v3 S3 client uses region and IAM role creds automatically
const s3 = new S3Client({
  region: process.env.AWS_REGION
  // credentials are automatically picked up from IAM role in EC2/ECS,
  // so you don’t need to hardcode accessKeyId/secretAccessKey
})

mediaRouter.get("/", async (req, res) => {
  const key = req.query.key as string
  const range = req.headers.range
  const contentType = mime.lookup(key) || "application/octet-stream"

  if (!key) return res.status(400).send("Missing key")

  const bucket = process.env.S3_BUCKET_NAME!
  const params = { Bucket: bucket, Key: key }

  console.log(bucket)

  try {
    // Get object metadata (file size)
    const head = await s3.send(new HeadObjectCommand(params))
    const fileSize = head.ContentLength!

    if (range) {
      // Handle partial requests
      const [startStr, endStr] = range.replace(/bytes=/, "").split("-")
      const start = parseInt(startStr, 10)
      const end = endStr ? parseInt(endStr, 10) : fileSize - 1
      const chunkSize = end - start + 1

      const getObj = await s3.send(
        new GetObjectCommand({
          ...params,
          Range: `bytes=${start}-${end}`
        })
      )

      res.writeHead(206, {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize,
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": "*",
        "Cross-Origin-Resource-Policy": "cross-origin"
      })

      ;(getObj.Body as Readable).pipe(res)
    } else {
      // Full file
      const getObj = await s3.send(new GetObjectCommand(params))

      res.writeHead(200, {
        "Content-Length": fileSize,
        "Content-Type": contentType,
        "Accept-Ranges": "bytes",
        "Access-Control-Allow-Origin": "*",
        "Cross-Origin-Resource-Policy": "cross-origin"
      })

      ;(getObj.Body as Readable).pipe(res)
    }
  } catch (err) {
    console.error(err)
    res.status(500).send("Error streaming file")
  }
})

export default mediaRouter
