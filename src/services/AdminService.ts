
import { Knex } from "knex"

const service = {
    getAdminByEmail(knex: Knex, email: string) {
        return knex.from("admin")
            .select("*")
            .where({ email: email })
            .then((rows: AdminTypes[]) => {
                return rows[0]
            })
    },
}

module.exports = service