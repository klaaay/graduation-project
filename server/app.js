const express = require("express");
const fs = require("fs");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const config = require("config");
const app = express();
const connectDB = require("./config/db");

const SERVER_PORT = config.get("SERVER_PORT");
connectDB();

app.use(express.json({ extended: false }));
app.use(cors());
app.use(fileUpload());

app.use("/data", express.static("data"));

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/info", require("./routes/info"));
app.use("/api/upload", require("./routes/upload"));

app.listen(SERVER_PORT, () => {
  console.log(`app listened on ${SERVER_PORT}`);
});
