const express = require("express");
const winston = require("winston");
const config = require("config");
const moment = require("moment");
const morgan = require("morgan");
const app = express();

const github = require("./routes/github");
const home = require("./routes/home");

app.use(morgan("tiny"));
app.use("/github", github);
app.use("/", home);

const port = process.env.PORT || config.get("port");

app.listen(port, () => winston.info(`Listening on port ${port}...`));
