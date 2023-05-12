import express, { Request, Response } from "express"
import dayjs from "dayjs"
import responseMessage from "../utils/ResponseMessage"
const skillRouter = express.Router()
const skillService = require("../services/SkillService")
const orderHelper = require("../helpers/OrderHelper")

skillRouter
    .route("/getSkills")
    .get((req: Request, res: Response) => {
        const knexInstance = req.app.get("db")
        skillService.getSkills(knexInstance).then((skills: SkillTypes[]) => {
            res.status(200).send(responseMessage(true, skills, null))
        }).catch((err: Error) => {
            res.status(200).send(responseMessage(false, null, err))
        })
    })

skillRouter
    .route("/postSkill")
    .post((req: Request, res: Response) => {
        try {
            const knexInstance = req.app.get("db")
            const { icon_source, title, text, order } = req.body
            const created = dayjs().format()
            const skill = { created, icon_source, title, text, order }
            skillService.postSkill(knexInstance, skill).then((newSkill: SkillTypes) => {
                if (newSkill) {
                    orderHelper.handleOrders(knexInstance, "skills").then(() => {
                        res.status(200).send(responseMessage(true, newSkill, null))
                    })
                } else {
                    res.status(400).send(responseMessage(false, null, "bad request"))
                }
            }).catch((err: Error) => {
                res.status(400).send(responseMessage(false, null, err))
            })
        } catch {
            res.status(400).send(responseMessage(false, null, "bad request"))
        }
    })

skillRouter
    .route("/updateSkill")
    .post((req: Request, res: Response) => {
        try {
            const knexInstance = req.app.get("db")
            const { id, deleted, icon_source, title, text } = req.body
            const modified = dayjs().format()
            const skill = { id, deleted, modified, icon_source, title, text }
            skillService.updateSkill(knexInstance, skill).then((updatedSkill: SkillTypes) => {
                if (updatedSkill) {
                    res.status(200).send(responseMessage(true, updatedSkill, null))
                } else {
                    res.status(400).send(responseMessage(false, null, "bad request"))
                }
            }).catch((err: Error) => {
                res.status(400).send(responseMessage(false, null, err))
            })
        } catch {
            res.status(400).send(responseMessage(false, null, "bad request"))
        }
    })


module.exports = skillRouter