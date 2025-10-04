import express, { Request, Response } from "express";
import { getDb } from "../db/db";
import { IContentResponse } from "../interfaces";
import content from "../db/content";

const contentRouter = express.Router();

contentRouter.route("/").get(async (req: Request, res: Response) => {
  try {
    const db = getDb();

    const [about, portfolioItems, skillItems, timelineItems] =
      await Promise.all([
        content.getAbout(db),
        content.getPortfolioItems(db),
        content.getSkillItems(db),
        content.getTimelineItems(db),
      ]);

    const allContent: IContentResponse = {
      about,
      portfolioItems,
      skillItems,
      timelineItems,
    };

    res.status(200).json({ content: allContent, error: false });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ content: null, error: true, errorMsg: (error as Error).message });
  }
});

export default contentRouter;
