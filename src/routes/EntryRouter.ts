import express, { Request, Response } from "express"
import responseMessage from "../utils/ResponseMessage"
const entryRouter = express.Router()
const entryService = require("../services/EntryService")

entryRouter
    .route("/getEntryData")
    .get((req: Request, res: Response) => {
        const knexInstance = req.app.get("db")
        entryService.getEntryData(knexInstance).then((skills: SkillTypes[]) => {
            res.status(200).send(responseMessage(true, skills, null))
        }).catch((err: Error) => {
            res.status(200).send(responseMessage(false, null, err))
        })
    })

module.exports = entryRouter