
import { Knex } from "knex"

const service = {
    getAdmins(knex: Knex) {
        return knex.from("admins")
            .select("*")
            .then((rows: AdminTypes[]) => {
                return rows
            })
    },
    getAdminByEmail(knex: Knex, email: string) {
        return knex.from("admins")
        .select("*")
        .where({ email: email })
        .then((rows: AdminTypes[]) => {
            return rows[0]
        })
    },
    getAdmin(knex: Knex, id: number) {
        return knex.from("admins")
            .select("*")
            .where({ id: id })
            .then((rows: AdminTypes[]) => {
                return rows[0]
            })
    },
    insertAdmin(knex: Knex, admin: AdminTypes, hash: string) {
        const { fName, lName, email} = admin
        const raw = `INSERT INTO admins(f_name, l_name, email, hash, created) VALUES('${fName}', '${lName}', '${email}', '${hash}', NOW())`
        return knex.raw(raw)
    }
}

module.exports = service