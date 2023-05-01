import express, { NextFunction, Request, Response } from "express"
import dayjs from "dayjs"
import statusMessage from "../utils/StatusMsg"
const portfolioRouter = express.Router()
const portfolioService = require("../services/portfolioService")

portfolioRouter
    .route("/getPortfolioItems")
    .get((req: Request, res: Response) => {
        const knexInstance = req.app.get("db")
        portfolioService.getPortfolioItems(knexInstance).then((portfolioItems: PortfolioTypes[]) => {
            res.status(200).send(statusMessage(true, portfolioItems, null))
        }).catch((err: Error) => {
            res.status(200).send(statusMessage(false, null, err))
        })
    })

portfolioRouter
    .route("/updatePortfolioItem")
    .post((req: Request, res: Response) => {
        try {
            const knexInstance = req.app.get("db")
            const { id, deleted, img_url, title, text, order } = req.body
            const modified = dayjs().format()
            const portfolioItem = { id, deleted, modified, img_url, title, text, order }
            portfolioService.updatePortfolioItem(knexInstance, portfolioItem).then((updatedPortfolioItem: PortfolioTypes) => {
                res.status(200).send(statusMessage(true, updatedPortfolioItem, null))
            }).catch((err: Error) => {
                res.status(200).send(statusMessage(false, null, err))
            })
        } catch (err) {
            res.status(200).send(statusMessage(false, null, err))
        }
    })

portfolioRouter
    .route("/postPortfolioItem")
    .post((req: Request, res: Response) => {
        try {
            const knexInstance = req.app.get("db")
            const { img_url, title, text, order } = req.body
            const created = dayjs().format()
            const deleted = null
            const modified = null
            const portfolioItem = { created, deleted, modified, img_url, title, text, order }
            portfolioService.postPortfolioItem(knexInstance, portfolioItem).then((newPortfolioItem: PortfolioTypes) => {
                res.status(200).send(statusMessage(true, newPortfolioItem, null))
            }).catch((err: Error) => {
                res.status(200).send(statusMessage(false, null, err))
            })
        } catch (err) {
            console.log(err)
            res.status(200).send(statusMessage(false, null, err))
        }
    })

module.exports = portfolioRouter