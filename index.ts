import dotenv from "dotenv";
import http from "http";
import { initDb } from "./src/db/db";
import { getAppSecrets } from "./src/secrets";
import { IAPISecrets } from "./src/interfaces";
import app from "./src/app";
import morgan from "morgan";
import { TNodeEnviromnent } from "./src/types";

dotenv.config();

process.on("uncaughtException", function (err) {
  console.error(err);
  console.log("Node NOT Exiting...");
});

async function start() {
  try {
    const secrets: IAPISecrets = await getAppSecrets();
    app.set("secrets", secrets);

    const environemt = secrets.node_env || ("local" as TNodeEnviromnent);

    const morganOption = environemt === "production" ? "tiny" : "common";
    app.use(morgan(morganOption));

    const port = parseInt(secrets.port) || 3002;
    const server = http.createServer({}, app);

    await initDb(secrets, environemt);

    process.on("SIGINT", () => {
      server?.close(() => {
        console.log("Server closed");
        process.exit(0);
      });
    });

    process.on("SIGTERM", () => {
      server?.close(() => {
        console.log("Server closed");
        process.exit(0);
      });
    });

    server.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();
