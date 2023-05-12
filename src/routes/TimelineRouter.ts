import express, { NextFunction, Request, Response } from "express"
import dayjs from "dayjs"
import responseMessage from "../utils/ResponseMessage"
const timelineRouter = express.Router()
const timelineService = require("../services/timelineService")

timelineRouter
    .route("/getTimelineItems")
    .get((req: Request, res: Response) => {
        const knexInstance = req.app.get("db")
        timelineService.getTimelineItems(knexInstance).then((timelineItems: TimelineTypes[]) => {
            res.status(200).send(responseMessage(true, timelineItems, null))
        }).catch((err: Error) => {
            res.status(200).send(responseMessage(false, null, err))
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
                res.status(200).send(responseMessage(true, updateTimelineItem, null))
            }).catch((err: Error) => {
                res.status(400).send(responseMessage(false, null, err))
            })
        } catch (err) {
            res.status(400).send(responseMessage(false, null, err))
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
                res.status(200).send(responseMessage(true, newTimelineItem, null))
            }).catch((err: Error) => {
                res.status(400).send(responseMessage(false, null, err))
            })
        } catch (err) {
            res.status(400).send(responseMessage(false, null, err))
        }
    })

module.exports = timelineRouter