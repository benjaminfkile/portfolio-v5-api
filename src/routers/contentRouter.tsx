import express, { Request, Response } from "express"
const contentRouter = express.Router()
const contentService = require("../services/ContentService")

contentRouter
    .route("/")
    .get((req: Request, res: Response) => {
        try {
            let content: ContentResponseTypes = { about: "", portfolioItems: [], skillItems: [], timelineItems: [] }
            const db = req.app.get("db")
            contentService.getAbout(db).then((about: { id: number, text: string }) => {
                content.about = about.text
            }).then(() => {
                contentService.getPortfolioItems(db)
                    .then((portfolioItems: PortfolioItemTypes[]) => {
                        content.portfolioItems = portfolioItems
                    }).then(() => {
                        contentService.getSkillItems(db)
                            .then((skillItems: SkillItemTypes[]) => {
                                content.skillItems = skillItems
                            }).then(() => {
                                contentService.getTimelineItems(db)
                                    .then((timelineItems: TimelineItemTypes[]) => {
                                        content.timelineItems = timelineItems
                                        res.send({ content: content, error: false, errorMsg: {} })
                                    }).catch((error: Error) => {
                                        res.send({ content: null, error: true, errorMsg: error })
                                    })
                            }).catch((error: Error) => {
                                res.send({ content: null, error: true, errorMsg: error })
                            })
                    }).catch((error: Error) => {
                        res.send({ content: null, error: true, errorMsg: error })
                    })
            }).catch((error: Error) => {
                res.send({ content: null, error: true, errorMsg: error })
            })
        } catch (error) {
            res.send({ content: null, error: true, errorMsg: error })
        }
    })
module.exports = contentRouter