import { Knex } from "knex"

const service = {
    getAbout(knex: Knex) {
        return knex.from("about")
            .select("*")
            .then((rows: AboutTypes[]) => {
                return rows[0]
            })
    },
    updateAbout(knex: Knex, about: AboutTypes) {
        const { id, text, modified } = about
        return knex("about")
            .where({ id: id })
            .update({ text: text, modified: modified })
            .returning("*")
            .then((rows: AboutTypes[]) => {
                return rows[0]
            })
    }
}

module.exports = service