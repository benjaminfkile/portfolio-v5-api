import dayjs from "dayjs"
import express, { Request, Response } from "express"
import responseMessage from "../utils/ResponseMessage"
const adminService = require("../services/AdminService")
const encryptionService = require("../services/EncryptionService")
const authService = require("../services/AuthService")
const authRouter = express.Router()

authRouter
    .route("/getToken")
    .get((req: Request, res: Response) => {
        try {
            const knexInstance = req.app.get("db")
            const { email, secret } = req.body
            adminService.getAdminByEmail(knexInstance, email).then((admin: AdminTypes) => {
                if (admin) {
                    encryptionService.compareHash(secret, admin.hash).then((isValid: boolean) => {
                        if (isValid) {
                            let jwtProperties = admin
                            delete jwtProperties.hash
                            const responseData = { token: authService.signToken({ tokenType: "API token", admin: jwtProperties, created: dayjs().format() }) }
                            res.status(200).send(responseMessage(true, responseData, null))

                        } else {
                            res.status(401).send(responseMessage(false, null, "Invalid email or password"))
                        }
                    }).catch((err: Error) => {
                        res.status(400).send(responseMessage(false, null, err))
                    })
                } else {
                    res.status(400).send(responseMessage(false, null, "Invalid email or password"))
                }
            }).catch((err: Error) => {
                res.status(400).send(responseMessage(false, null, err))
            })
        } catch (err) {
            res.status(400).send(responseMessage(false, null, err))
        }
    })

module.exports = authRouter