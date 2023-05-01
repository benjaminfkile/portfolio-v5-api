import express, { Request, Response } from "express"
import statusMessage from "../utils/StatusMsg"
const entryRouter = express.Router()
const entryService = require("../services/EntryService")

entryRouter
    .route("/getEntryData")
    .get((req: Request, res: Response) => {
        const knexInstance = req.app.get("db")
        entryService.getEntryData(knexInstance).then((skills: SkillTypes[]) => {
            res.status(200).send(statusMessage(true, skills, null))
        }).catch((err: Error) => {
            res.status(200).send(statusMessage(false, null, err))
        })
    })

module.exports = entryRouter