"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
const db_1 = require("./src/db/db");
const secrets_1 = require("./src/secrets");
const app_1 = __importDefault(require("./src/app"));
const morgan_1 = __importDefault(require("morgan"));
dotenv_1.default.config();
process.on("uncaughtException", function (err) {
    console.error(err);
    console.log("Node NOT Exiting...");
});
async function start() {
    var _a;
    try {
        const secrets = await (0, secrets_1.getAppSecrets)();
        app_1.default.set("secrets", secrets);
        console.log(secrets);
        const environemt = (((_a = process.env.NODE_ENVIRONMENT) === null || _a === void 0 ? void 0 : _a.trim()) ||
            secrets.node_env ||
            "local");
        const morganOption = environemt === "production" ? "tiny" : "common";
        app_1.default.use((0, morgan_1.default)(morganOption));
        const port = parseInt(secrets.port) || 3002;
        const server = http_1.default.createServer({}, app_1.default);
        await (0, db_1.initDb)(secrets, environemt);
        process.on("SIGINT", () => {
            server === null || server === void 0 ? void 0 : server.close(() => {
                console.log("Server closed");
                process.exit(0);
            });
        });
        process.on("SIGTERM", () => {
            server === null || server === void 0 ? void 0 : server.close(() => {
                console.log("Server closed");
                process.exit(0);
            });
        });
        server.listen(port, () => {
            console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
        });
    }
    catch (err) {
        console.error("Failed to start server:", err);
        process.exit(1);
    }
}
start();
