process.on("uncaughtException", function (err) {
  console.error(err)
  console.log("Node NOT Exiting...")
})

require("dotenv").config()
const knex = require("knex")
const PORT = process.env.PORT
const app = require("./src/app")
const server = require("http").createServer({}, app)
const io = require("socket.io").listen(server)
const ss = require("./src/services/SocketService")

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    // ssl: { rejectUnauthorized: false }
  }
})

app.set("db", db)

app.set("io", io)

ss.intit(io, db, app)

server.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
})