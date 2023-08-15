import express, { Request, Response } from "express"
import createAWSStream from "../streamClient"
const mediaRouter = express.Router()
const jsonParser = express.json()

mediaRouter
    .route("/")
    .get(jsonParser, async (req: Request, res: Response) => {
        try {
            const key: any = req.query.key
            const stream = await createAWSStream(key)
            stream.pipe(res)            
        } catch (err) {
            res.status(200).send({err: err})
        }
    })
module.exports = mediaRouter