import { Knex } from "knex"

const service = {
    getPortfolioItems(knex: Knex) {
        return knex.from("portfolio")
            .select("*")
            .then((rows: PortfolioTypes[]) => {
                return rows
            })
    },
    postPortfolioItem(knex: Knex, item: PortfolioTypes) {
        const { created, img_url, title, text, order } = item
        return knex("portfolio")
            .insert({ created: created, img_url: img_url, title: title, text: text, order: order })
            .returning("*")
            .then((rows: PortfolioTypes[]) => {
                return rows[0]
            })
    },
    updatePortfolioItem(knex: Knex, item: PortfolioTypes) {
        const { id, deleted, img_url, title, text, order } = item
        return knex("portfolio")
            .where({ id: id })
            .update({ deleted: deleted, img_url: img_url, title: title, text: text, order })
            .returning("*")
            .then((rows: PortfolioTypes[]) => {
                return rows[0]
            })
    }
}

module.exports = service