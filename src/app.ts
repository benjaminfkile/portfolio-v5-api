import express, { Express, NextFunction, Request, Response } from "express"
const NODE_ENV = process.env.NODE_ENV
const morgan = require("morgan")
const cors = require("cors")
const helmet = require("helmet")
const bodyParser = require("body-parser")
const app: Express = express()
const entryRouter = require("./routes/EntryRouter")
const aboutRouter = require("./routes/AboutRouter")
const timelineRouter = require("./routes/TimelineRouter")
const skillRouter = require("./routes/SkillRouter")
const portfolioRouter = require("./routes/PortfolioRouter")
const credentialsMiddleware = require("./middleware/CredentialsMiddleware")
const authRouter = require("./routes/AuthRouter")
const endpointSecurityRouter = require("./routes/EndpointSecurityRouter")
const encryptionRouter = require("./routes/EncryptionRouter")

const morganOption = (NODE_ENV === "production")
  ? "tiny"
  : "common"

app.use(morgan(morganOption))
app.use(cors())
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const checkCredentials = (req: Request, res: Response, next: NextFunction) => {
  credentialsMiddleware.verifyCredentials(req, res, next)
}

app.all("/*", checkCredentials, function (req, res, next) {
  next()
})

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("portfolio api")
})

app.use("/api/entry", entryRouter)
app.use("/api/about", aboutRouter)
app.use("/api/timeline", timelineRouter)
app.use("/api/skills", skillRouter)
app.use("/api/portfolio", portfolioRouter)
app.use("/api/auth", authRouter)
app.use("/api/endpointSecurity", endpointSecurityRouter)
app.use("/api/encryption", encryptionRouter)


process.on('uncaughtException', (err) => {
  console.error(err);
  console.log("Node NOT Exiting...");

})

module.exports = app