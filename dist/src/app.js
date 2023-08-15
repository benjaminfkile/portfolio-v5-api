"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const NODE_ENV = process.env.NODE_ENV;
const app = (0, express_1.default)();
const streamRouter = require("./routers/streamRouter");
const contentRouter = require("./routers/ContentRouter");
const morganOption = (NODE_ENV === "production")
    ? "tiny"
    : "common";
app.use(morgan(morganOption));
app.use(cors());
app.use(helmet());
app.get("/", (req, res) => {
    res.send(":)");
});
app.use("/api/stream", streamRouter);
app.use("/api/portfolio-content", contentRouter);
app.use(function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500);
    res.render('error', { error: err });
});
module.exports = app;
