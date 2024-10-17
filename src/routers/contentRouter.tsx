import express, { Request, Response } from "express"
const contentRouter = express.Router()
const contentService = require("../services/ContentService")

contentRouter.route("/").get(async (req: Request, res: Response) => {
    try {
        let content: ContentResponseTypes = { about: "", portfolioItems: [], skillItems: [], timelineItems: [] }
        const db = req.app.get("db")

        const about = await contentService.getAbout(db)
        content.about = about.text

        const portfolioItems = await contentService.getPortfolioItems(db)
        content.portfolioItems = portfolioItems

        const skillItems = await contentService.getSkillItems(db)
        content.skillItems = skillItems

        const timelineItems = await contentService.getTimelineItems(db)
        content.timelineItems = timelineItems

        res.send({ content, error: false, errorMsg: {} })
    } catch (error) {
        res.send({ content: null, error: true, errorMsg: error })
    }
})

module.exports = contentRouter
