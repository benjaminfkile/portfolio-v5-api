"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const contentRouter_1 = __importDefault(require("./routers/contentRouter"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("common"));
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.get("/", (req, res) => {
    res.send("portfolio-api");
});
app.use("/api/portfolio-content", contentRouter_1.default);
app.use(function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500);
    res.render("error", { error: err });
});
exports.default = app;
