import dayjs from "dayjs"
import express, { Request, Response } from "express"
import statusMessage from "../utils/StatusMsg"
const aboutRouter = express.Router()
const aboutService = require("../services/AboutService")

aboutRouter
    .route("/getAbout")
    .get((req: Request, res: Response) => {
        const knexInstance = req.app.get("db")
        aboutService.getAbout(knexInstance).then((about: AboutTypes) => {
            res.status(200).send(statusMessage(true, about, null))
        }).catch((err: Error) => {
            res.status(200).send(statusMessage(false, null, err))
        })
    })

// aboutRouter
//     .route("/postAbout")
//     .post((req: Request, res: Response) => {
//         try {
//             const knexInstance = req.app.get("db")
//             const { text } = req.body
//             const created = dayjs().format()
//             const about = { text, created }
//             aboutService.postAbout(knexInstance, about).then((newAbout: AboutTypes) => {
//                 if (newAbout) {
//                     res.send(newAbout)
//                 } else {
//                     res.status(400).send("bad request")
//                 }
//             })
//         } catch {
//             res.status(400).send("bad request")
//         }
//     })

aboutRouter
    .route("/updateAbout")
    .post((req: Request, res: Response) => {
        try {
            const knexInstance = req.app.get("db")
            const { id, text } = req.body
            const modified = dayjs().format()
            const about = { id, text, modified }
            aboutService.updateAbout(knexInstance, about).then((updatedAbout: AboutTypes) => {
                res.status(200).send(statusMessage(true, updatedAbout, null))
            }).catch((err: Error) => {
                res.status(200).send(statusMessage(false, null, err))
            })
        } catch (err) {
            res.status(200).send(statusMessage(false, null, err))
        }
    })

module.exports = aboutRouter