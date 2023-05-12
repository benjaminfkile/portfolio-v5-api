import { Knex } from "knex"

const service = {
    getProtectedRoutes(knex: Knex) {
        return knex.from("protected_routes")
            .select("*")
            .then((rows: ProtectRouteTypes[]) => {
                return rows
            })
    },
    postProtectedRoute(knex: Knex, skill: ProtectRouteTypes) {
        const { path, created } = skill
        return knex("protected_routes")
            .insert({ path: path, created: created })
            .returning("*")
            .then((rows: ProtectRouteTypes[]) => {
                return rows[0]
            })
    },
    updateProtectedRoute(knex: Knex, skill: ProtectRouteTypes) {
        const { id, path, deleted } = skill
        return knex("protected_routes")
            .where({ id: id })
            .update({ path: path, deleted: deleted })
            .returning("*")
            .then((rows: ProtectRouteTypes[]) => {
                return rows[0]
            })
    }
}

module.exports = service