import express from "express"
import responseMessage from "../utils/ResponseMessage"
const encryptionRouter = express.Router()
const encryptionService = require("../services/EncryptionService")
const jsonParser = express.json()

encryptionRouter
    .route("/generateHash")
    .post(jsonParser, (req, res) => {
        try {
            const { str } = req.body
            encryptionService.generateHash(str).then((hash: string) => {
                res.status(200).send(responseMessage(true, hash, null))
            }).catch((err: Error) => {
                res.status(400).send(responseMessage(false, null, err))
            })
        } catch (err) {
            res.status(400).send(responseMessage(false, null, err))
        }
    })

module.exports = encryptionRouter