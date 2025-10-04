import { Knex } from "knex"
import { IRawSQL, ITimelineItem } from "../interfaces"

const content = {
    getAbout(db: Knex) {
        return db.from("about")
            .select("*")
            .then((rows: string[]) => {
                return rows[0]
            })
    },
    getPortfolioItems(knex: Knex) {
        return knex.raw(`
        SELECT pi.title, pi.intro, pi.description, pi.file_name, pi.url, pi.repo, pi.media_type, pi.playback_rate, pi.transform_value, array_agg(ti.icon_source) AS icon_sources
        FROM portfolio_items pi
        JOIN tech_icons ti ON ti.icon_id = ANY(pi.tech_icons)
        GROUP BY pi.id      
        ORDER BY pi."order";         
        `).then((queryData: IRawSQL) => {
            return queryData.rows
        })
    },
    getSkillItems(knex: Knex) {
        return knex.raw(`
        SELECT si.*, ti.icon_source
        FROM skill_items si
        JOIN tech_icons ti ON si.icon_id = ti.icon_id
        ORDER BY si."order";
        `).then((queryData: IRawSQL) => {
            return queryData.rows
        })
    },
    getTimelineItems(knex: Knex) {
        return knex.from("timeline_items")
            .select("*")
            .orderBy("order", "asc")
            .then((rows: ITimelineItem[]) => {
                return rows
            })
    }
}
export default content