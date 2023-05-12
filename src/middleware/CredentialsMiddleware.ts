import { Request, Response, NextFunction } from "express"
const authService = require("../services/AuthService")

const credentialsMiddleware = {
    verifyCredentials(req: Request, res: Response, next: NextFunction) {
        let isProtected = false
        const knexInstance = req.app.get("db")
        const bearerToken = req.headers.authorization ? req.headers.authorization.split("Bearer")[1].trim() : ""
        const queryPath = req.originalUrl
        let protectedPath = ""
        authService.getProtectedRoutes(knexInstance).then((routes: any) => {
            for (let i = 0; i < routes.length; i++) {
                if (queryPath.indexOf(routes[i].path) > -1) {
                    isProtected = true
                    protectedPath = routes[i].path
                }
            }
        }).then(() => {
            if (isProtected) {
                try {
                    authService.decodeToken(bearerToken).then((token: TokenTypes) => {
                        if (token) {
                            next()
                        } else {
                            res.status(401).send({ message: "Forbiden, invalid token" })
                        }
                    }).catch((err: Error) => {
                        console.log(err)
                        res.status(401).send({ message: "Forbiden, invalid token" })
                    })
                } catch (err) {
                    console.log(err)
                    res.status(400).send(err)
                }
            } else {
                next()
            }
        }).catch((err: Error) => {
            res.status(400).send(err)
        })
    }
}

module.exports = credentialsMiddleware