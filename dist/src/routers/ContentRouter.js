"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contentRouter = express_1.default.Router();
const contentService = require("../services/ContentService");
contentRouter
    .route("/")
    .get((req, res) => {
    try {
        let content = { about: "", portfolioItems: [], skillItems: [], timelineItems: [] };
        const db = req.app.get("db");
        contentService.getAbout(db).then((about) => {
            content.about = about.text;
        }).then(() => {
            contentService.getPortfolioItems(db)
                .then((portfolioItems) => {
                content.portfolioItems = portfolioItems;
            }).then(() => {
                contentService.getSkillItems(db)
                    .then((skillItems) => {
                    content.skillItems = skillItems;
                }).then(() => {
                    contentService.getTimelineItems(db)
                        .then((timelineItems) => {
                        content.timelineItems = timelineItems;
                        res.send({ content: content, error: null });
                    }).catch((err) => {
                        res.status(200).send(err);
                    });
                }).catch((err) => {
                    res.status(200).send(err);
                });
            }).catch((err) => {
                res.status(200).send(err);
            });
        }).catch((err) => {
            res.status(200).send(err);
        });
    }
    catch (error) {
        res.send({ content: null, error: error });
    }
});
module.exports = contentRouter;
