import express, { Express, NextFunction, Request, Response } from "express"
const morgan = require("morgan")
const cors = require("cors")
const helmet = require("helmet")
const NODE_ENV = process.env.NODE_ENV
const app: Express = express()

const morganOption = (NODE_ENV === "production")
  ? "tiny"
  : "common"

app.use(morgan(morganOption))
app.use(cors())
app.use(helmet())

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, ts!")
})

app.use(function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.render('error', { error: err })
})

module.exports = app