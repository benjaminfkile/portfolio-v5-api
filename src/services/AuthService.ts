import { Knex } from "knex"
import timeMachine from "../utils/TimeMachine"
const jwt = require("jsonwebtoken")

const service = {
    signToken(payload: { tokenType: string, admin: AdminTypes, created: string }) {
        return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: `${timeMachine.secondsTillMidnight()}s` })

    },
    async decodeToken(token: any) {
        return jwt.verify(token, process.env.TOKEN_SECRET)
    },
    getProtectedRoutes(knex: Knex) {
        return knex.from("protected_routes")
            .select("path")
    }
}

module.exports = service