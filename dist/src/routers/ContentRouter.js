"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("../db/db");
const content_1 = __importDefault(require("../db/content"));
const contentRouter = express_1.default.Router();
contentRouter.route("/").get(async (req, res) => {
    try {
        const db = (0, db_1.getDb)();
        const [about, portfolioItems, skillItems, timelineItems] = await Promise.all([
            content_1.default.getAbout(db),
            content_1.default.getPortfolioItems(db),
            content_1.default.getSkillItems(db),
            content_1.default.getTimelineItems(db),
        ]);
        const allContent = {
            about,
            portfolioItems,
            skillItems,
            timelineItems,
        };
        res.status(200).json({ content: allContent, error: false });
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ content: null, error: true, errorMsg: error.message });
    }
});
exports.default = contentRouter;
