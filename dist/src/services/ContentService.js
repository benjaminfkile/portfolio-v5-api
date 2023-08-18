"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contentService = {
    getAbout(knex) {
        return knex.from("about")
            .select("*")
            .then((rows) => {
            return rows[0];
        });
    },
    getPortfolioItems(knex) {
        return knex.from("portfolio_items")
            .select("*")
            .orderBy("order", "asc")
            .then((rows) => {
            return rows;
        });
    },
    getSkillItems(knex) {
        return knex.raw(`
        SELECT si.*, ti.icon_source
        FROM skill_items si
        JOIN tech_icons ti ON si.icon_id = ti.icon_id
        ORDER BY si."order";
        `).then((rows) => {
            //@ts-ignore
            return rows.rows;
        });
    },
    getTimelineItems(knex) {
        return knex.from("timeline_items")
            .select("*")
            .orderBy("order", "asc")
            .then((rows) => {
            return rows;
        });
    }
};
module.exports = contentService;
