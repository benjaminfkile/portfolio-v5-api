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
        return knex.from("skill_items")
            .select("*")
            .orderBy("order", "asc")
            .then((rows) => {
            return rows;
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
