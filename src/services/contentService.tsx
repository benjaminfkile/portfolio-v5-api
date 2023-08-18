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
        return knex.raw(`
        SELECT si.*, ti.icon_source
        FROM skill_items si
        JOIN tech_icons ti ON si.icon_id = ti.icon_id
        ORDER BY si."order";
        `).then((queryData: RawSQLTypes) => {
            return queryData.rows
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