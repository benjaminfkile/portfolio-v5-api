import { Knex } from "knex"

const service = {
    getEntryData(knex: Knex) {
        let about: any
        let skills: any
        return knex("about")
            .select("text")
            .then((a) => {
                about = a[0]
                return knex("skills")
                    .select(["icon_source", "title", "text", "order"])
            })
            .then((s) => {
                skills = s
                return knex("timeline")
                    .select(["icon_source", "title", "text", "date"])
            })
            .then((t) => {
                return {
                    about: about,
                    skills: skills,
                    timeline: t
                }
            })
    }
}

module.exports = service