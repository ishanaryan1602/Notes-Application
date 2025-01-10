const express = require("express");
const { connectDB } = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const { router } = require("./routes/auth.route");
const userRouter = require("./routes/user.route");
const noteRouter = require("./routes/note.route");
const errorHandler = require("./middleware/errorHandler");
const path = require("path");
const cookieParser = require("cookie-parser");

dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(path.join(__dirname, "public")));
app.use(cookieParser());

connectDB();

// test route
app.get("/", (req, res) => {
  res.send("test route 1");
});
//api auth calls
app.use("/api/auth", router);
//api user calls
app.use("/api/user", userRouter);
//api note calls
app.use("/api/note", noteRouter);
//not found page
app.all("*", (req, res) => {
  res.status(404).json({ success: false, message: "Page not found" });
});
//for error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on : http://localhost:${PORT}`);
});
