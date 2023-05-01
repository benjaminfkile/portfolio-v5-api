import { Knex } from "knex"

const service = {
    getSkills(knex: Knex) {
        return knex.from("skills")
            .select("*")
            .then((rows: SkillTypes[]) => {
                return rows
            })
    },
    postSkill(knex: Knex, skill: SkillTypes) {
        const { created, icon_source, title, text, order } = skill
        return knex("skills")
            .insert({created: created, icon_source: icon_source, title: title, text: text, order: order})
            .returning("*")
            .then((rows: SkillTypes[]) => {
                return rows[0]
            })
    },
    updateSkill(knex: Knex, skill: SkillTypes) {
        const { id, deleted, icon_source, title, text } = skill
        return knex("skills")
            .where({ id: id })
            .update({ deleted: deleted, icon_source: icon_source, title: title, text: text })
            .returning("*")
            .then((rows: SkillTypes[]) => {
                return rows[0]
            })
    }
}

module.exports = service