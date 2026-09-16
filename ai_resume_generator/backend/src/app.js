const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}))


app.use(express.json())
app.use(cookieParser())




const authRouter = require("./routes/auth.route")
const interViewRouter = require("./routes/interview.route")
app.use("/api/auth", authRouter)
app.use("/api/interview", interViewRouter)

module.exports = app