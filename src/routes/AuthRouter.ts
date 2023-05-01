import dayjs from "dayjs"
import express, { Request, Response } from "express"
const adminService = require("../services/AdminService")
const encryptionService = require("../services/EncryptionService")
const authService = require("../services/AuthService")
const authRouter = express.Router()

authRouter
    .route("/getToken")
    .post((req: Request, res: Response) => {
        try {
            const knexInstance = req.app.get("db")
            const { email, secret } = req.body.email ? req.body : req.query
            adminService.getAdminByEmail(knexInstance, email).then((admin: AdminTypes) => {
                encryptionService.compareHash(secret, admin.hash).then((isValid: boolean) => {
                    if (isValid) {
                        let jwtProperties = admin
                        delete jwtProperties.hash
                        res.send({ token: authService.signToken({ tokenType: "API token", admin: jwtProperties, created: dayjs().format() }) })
                    } else {
                        res.status(401).send({ message: "Invalid email or password" })
                    }
                }).catch((err: Error) => {
                    res.status(400).send(err)
                })
            }).catch((err: Error) => {
                res.status(400).send(err)
            })
        } catch (err) {
            res.status(400).send({ err: err })
        }
    })

module.exports = authRouter