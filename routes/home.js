const express = require("express");
const router = express.Router();
const path = require("path");
const moment = require("moment");
const axios = require("axios");
router.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});
module.exports = router;
