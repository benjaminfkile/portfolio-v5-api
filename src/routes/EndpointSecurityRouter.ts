import dayjs from "dayjs"
import express, { Request, Response } from "express"
import responseMessage from "../utils/ResponseMessage"
const endpointSecurityRouter = express.Router()
const endpointSecurityService = require("../services/EndpointSecurityService")

endpointSecurityRouter
    .route("/getProtectedRoutes")
    .get((req: Request, res: Response) => {
        const knexInstance = req.app.get("db")
        endpointSecurityService.getProtectedRoutes(knexInstance).then((routes: ProtectRouteTypes) => {
            res.status(200).send(responseMessage(true, routes, null))
        }).catch((err: Error) => {
            res.status(200).send(responseMessage(false, null, err))
        })
    })

endpointSecurityRouter
    .route("/postProtectedRoute")
    .post((req: Request, res: Response) => {
        try {
            const knexInstance = req.app.get("db")
            const { path } = req.body
            const created = dayjs().format()
            const route = { path, created }
            endpointSecurityService.postProtectedRoute(knexInstance, route).then((newRoute: ProtectRouteTypes) => {
                if (newRoute) {
                    res.status(200).send(responseMessage(true, newRoute, null))
                } else {
                    res.status(400).send(responseMessage(false, null, "bad request"))
                }
            }).catch((err: Error) => {
                res.status(400).send(responseMessage(false, null, err))
            })
        } catch (err) {
            res.status(400).send(responseMessage(false, null, err))
        }
    })

endpointSecurityRouter
    .route("/updateProtectedRoute")
    .post((req: Request, res: Response) => {
        try {
            const knexInstance = req.app.get("db")
            const { id, path, deleted } = req.body
            const modified = dayjs().format()
            const route = { id, path, deleted, modified }
            endpointSecurityService.updateProtectedRoute(knexInstance, route).then((updatedRoute: ProtectRouteTypes) => {
                res.status(200).send(responseMessage(true, updatedRoute, null))
            }).catch((err: Error) => {
                res.status(400).send(responseMessage(false, null, err))
            })
        } catch (err) {
            res.status(400).send(responseMessage(false, null, err))
        }
    })

module.exports = endpointSecurityRouter