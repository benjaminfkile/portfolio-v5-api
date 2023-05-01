import express, { Request, Response } from "express"
import dayjs from "dayjs"
const skillRouter = express.Router()
const skillService = require("../services/SkillService")

skillRouter
    .route("/getSkills")
    .get((req: Request, res: Response) => {
        const knexInstance = req.app.get("db")
        skillService.getSkills(knexInstance).then((skills: SkillTypes[]) => {
            res.send(skills)
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
                    res.send(newSkill)
                } else {
                    res.status(400).send("bad request")
                }
            })
        } catch {
            res.status(400).send("bad request")
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
                    res.send(updatedSkill)
                } else {
                    res.status(400).send("bad request")
                }
            })
        } catch {
            res.status(400).send("bad request")
        }
    })


module.exports = skillRouter