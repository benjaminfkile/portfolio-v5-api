import dotenv from "dotenv"
const app = require("./src/app")

dotenv.config()

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
})