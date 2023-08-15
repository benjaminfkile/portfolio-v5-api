process.on("uncaughtException", function (err) {
  console.error(err)
  console.log("Node NOT Exiting...")
})

const dotenv = require("dotenv")
dotenv.config()
const app = require("./src/app")
const server = require("http").createServer({}, app)
const io = require("socket.io").listen(server)
const aws = require('aws-sdk')
const ss = require("./src/services/SocketService")

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESSKEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

app.set("s3", s3)

app.set("io", io)

ss.init(io)

const bucket = "ben-kile-portfolio-bucket"

const PORT = process.env.PORT

server.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
})

