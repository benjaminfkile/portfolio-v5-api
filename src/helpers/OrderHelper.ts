import { Knex } from "knex"

const service = {
    handleOrders(knex: Knex, tableName: string) {
        let query = ``
        return knex.from(tableName)
            .select(["order", "id"])
            .where({ deleted: null })
            .then((rows: { order: number, id: number }[]) => {
                const updatedOrders = this.updateOrders(rows)
                console.log(updatedOrders)
                for (let i = 0; i < updatedOrders.length; i++) {
                    query += `UPDATE ${tableName} SET "order" = ${updatedOrders[i].order} WHERE "id" = ${updatedOrders[i].id};`
                }
            }).then(() => {
                console.log(query)
                return knex.raw(query)
            })
    },
    updateOrders(objectsArray: { order: number, id: number }[]) {

        // Create a copy of the objects array
        const updatedObjectsArray = [...objectsArray]

        // Sort the array by order values in ascending order
        updatedObjectsArray.sort((a, b) => a.order - b.order)

        // Check if there are any duplicate orders
        let hasDuplicates = false
        for (let i = 0; i < updatedObjectsArray.length - 1; i++) {
            if (updatedObjectsArray[i].order === updatedObjectsArray[i + 1].order) {
                hasDuplicates = true
                break;
            }
        }

        // If there are no duplicates, return the original array
        if (!hasDuplicates) {
            return updatedObjectsArray
        }

        // If there are duplicates, update the order values and return the new array
        let currentOrder = 1
        let largestId = 0
        let largestIdIndex = 0
        for (let i = 0; i < updatedObjectsArray.length; i++) {
            if (updatedObjectsArray[i].order !== currentOrder) {
                updatedObjectsArray[i].order = currentOrder
            }

            if (updatedObjectsArray[i].id > largestId) {
                largestId = updatedObjectsArray[i].id
                largestIdIndex = i
            }

            currentOrder++
        }

        // Leave the object with the largest ID at its current position
        if (largestIdIndex !== updatedObjectsArray.length - 1) {
            const largestIdObject = updatedObjectsArray.splice(largestIdIndex, 1)
            updatedObjectsArray.push(largestIdObject[0])
        }

        return updatedObjectsArray


    }
}
module.exports = service