import dayjs from "dayjs"
import express, { Request, Response } from "express"
import responseMessage from "../utils/ResponseMessage"
const aboutRouter = express.Router()
const aboutService = require("../services/AboutService")

aboutRouter
    .route("/getAbout")
    .get((req: Request, res: Response) => {
        const knexInstance = req.app.get("db")
        aboutService.getAbout(knexInstance).then((about: AboutTypes) => {
            res.status(200).send(responseMessage(true, about, null))
        }).catch((err: Error) => {
            res.status(200).send(responseMessage(false, null, err))
        })
    })

aboutRouter
    .route("/updateAbout")
    .post((req: Request, res: Response) => {
        try {
            const knexInstance = req.app.get("db")
            const { id, text } = req.body
            const modified = dayjs().format()
            const about = { id, text, modified }
            aboutService.updateAbout(knexInstance, about).then((updatedAbout: AboutTypes) => {
                res.status(200).send(responseMessage(true, updatedAbout, null))
            }).catch((err: Error) => {
                res.status(400).send(responseMessage(false, null, err))
            })
        } catch (err) {
            res.status(400).send(responseMessage(false, null, err))
        }
    })

module.exports = aboutRouter