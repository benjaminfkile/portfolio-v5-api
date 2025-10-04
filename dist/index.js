"use strict";
process.on("uncaughtException", function (err) {
    console.error(err);
    console.log("Node NOT Exiting...");
});
const dotenv = require("dotenv");
dotenv.config();
const app = require("./src/app");
const server = require("http").createServer({}, app);
const aws = require('aws-sdk');
const knex = require("knex");
const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESSKEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const db = knex({
    client: "pg",
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
    }
});
app.set("s3", s3);
app.set("db", db);
const PORT = process.env.PORT || 3002;
server.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
