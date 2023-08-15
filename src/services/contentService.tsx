import { Knex } from "knex"

const contentService = {
    getAbout(knex: Knex) {
        return knex.from("about")
            .select("*")
            .then((rows: string[]) => {
                return rows[0]
            })
    },
    getPortfolioItems(knex: Knex) {
        return knex.from("portfolio_items")
            .select("*")
            .orderBy("order", "asc")
            .then((rows: PortfolioItemTypes[]) => {
                return rows
            })
    },
    getSkillItems(knex: Knex) {
        return knex.from("skill_items")
            .select("*")
            .orderBy("order", "asc")
            .then((rows: SkillItemTypes[]) => {
                return rows
            })
    },
    getTimelineItems(knex: Knex) {
        return knex.from("timeline_items")
            .select("*")
            .orderBy("order", "asc")
            .then((rows: TimelineItemTypes[]) => {
                return rows
            })
    }
}
module.exports = contentService