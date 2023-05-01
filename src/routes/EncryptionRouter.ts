import express from "express"
const encryptionRouter = express.Router()
const encryptionService = require("../services/EncryptionService")
const jsonParser = express.json()

encryptionRouter
    .route("/generateHash")
    .post(jsonParser, (req, res) => {
        try {
            const { str } = req.body
            encryptionService.generateHash(str).then((hash: string) => {
                res.send(hash)
            }).catch((err: Error) => {
                res.status(400).send(err)
            })
        } catch (err) {
            res.status(400).send({ err: err })
        }
    })

module.exports = encryptionRouter