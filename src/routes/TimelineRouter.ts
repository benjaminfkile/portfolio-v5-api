import express, { NextFunction, Request, Response } from "express"
import dayjs from "dayjs"
import statusMessage from "../utils/StatusMsg"
const timelineRouter = express.Router()
const timelineService = require("../services/timelineService")

timelineRouter
    .route("/getTimelineItems")
    .get((req: Request, res: Response) => {
        const knexInstance = req.app.get("db")
        timelineService.getTimelineItems(knexInstance).then((timelineItems: TimelineTypes[]) => {
            res.status(200).send(statusMessage(true, timelineItems, null))
        }).catch((err: Error) => {
            res.status(200).send(statusMessage(false, null, err))
        })
    })

timelineRouter
    .route("/updateTimelineItem")
    .post((req: Request, res: Response) => {
        try {
            const knexInstance = req.app.get("db")
            const { id, deleted, icon_source, title, text, date } = req.body
            const modified = dayjs().format()
            const timelineItem = { id, deleted, modified, icon_source, title, text, date }
            timelineService.updateTimelineItem(knexInstance, timelineItem).then((updateTimelineItem: TimelineTypes) => {
                res.status(200).send(statusMessage(true, updateTimelineItem, null))
            }).catch((err: Error) => {
                res.status(200).send(statusMessage(false, null, err))
            })
        } catch (err) {
            res.status(200).send(statusMessage(false, null, err))
        }
    })

timelineRouter
    .route("/postTimelineItem")
    .post((req: Request, res: Response, next: NextFunction) => {
        try {
            const knexInstance = req.app.get("db")
            const { icon_source, title, text, date, order } = req.body
            const created = dayjs().format()
            const deleted = null
            const modified = null
            const timelineItem = { created, deleted, modified, icon_source, title, text, date, order }
            timelineService.postTimelineItem(knexInstance, timelineItem).then((newTimelineItem: TimelineTypes) => {
                res.status(200).send(statusMessage(true, newTimelineItem, null))
            }).catch((err: Error) => {
                res.status(200).send(statusMessage(false, null, err))
            })
        } catch (err) {
            console.log(err)
            res.status(200).send(statusMessage(false, null, err))
        }
    })

module.exports = timelineRouter