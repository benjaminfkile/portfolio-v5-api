"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contentRouter = express_1.default.Router();
const contentService = require("../services/ContentService");
contentRouter.route("/").get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let content = { about: "", portfolioItems: [], skillItems: [], timelineItems: [] };
        const db = req.app.get("db");
        const about = yield contentService.getAbout(db);
        content.about = about.text;
        const portfolioItems = yield contentService.getPortfolioItems(db);
        content.portfolioItems = portfolioItems;
        const skillItems = yield contentService.getSkillItems(db);
        content.skillItems = skillItems;
        const timelineItems = yield contentService.getTimelineItems(db);
        content.timelineItems = timelineItems;
        res.send({ content, error: false, errorMsg: {} });
    }
    catch (error) {
        res.send({ content: null, error: true, errorMsg: error });
    }
}));
module.exports = contentRouter;
