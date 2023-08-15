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
const createAWSStream_1 = __importDefault(require("../stream/createAWSStream"));
const streamRouter = express_1.default.Router();
streamRouter
    .route("/")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const key = req.query.key;
        const stream = yield (0, createAWSStream_1.default)(key);
        stream.pipe(res);
    }
    catch (err) {
        res.status(200).send({ err: err });
    }
}));
module.exports = streamRouter;
