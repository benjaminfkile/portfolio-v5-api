import { Knex } from "knex"

const service = {
    getTimelineItems(knex: Knex) {
        return knex.from("timeline")
            .select("*")
            .where({ deleted: null })
            .then((rows: TimelineTypes[]) => {
                return rows
            })
    },
    updateTimelineItem(knex: Knex, timelineItem: TimelineTypes) {
        const { id, deleted, icon_source, title, text, date } = timelineItem
        return knex("timeline")
            .where({ id: id })
            .update({ deleted: deleted, icon_source: icon_source, title: title, text: text, date: date })
            .returning("*")
            .then((rows: TimelineTypes[]) => {
                return rows[0]
            })
    },
    postTimelineItem(knex: Knex, timelineItem: TimelineTypes) {
        return knex
            .insert(timelineItem)
            .into("timeline")
            .returning("*")
            .then(rows => {
                return rows[0]
            })
    }
}

module.exports = service