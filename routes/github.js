const express = require("express");
const router = express.Router();
const {
  getAllRepos,
  getLanguageList,
} = require("../controllers/githubController");

router.get("/pure-repos-list", getAllRepos);

router.get("/lg-list", getLanguageList);

module.exports = router;
