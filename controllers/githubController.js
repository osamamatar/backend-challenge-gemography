const fetchDataFromGithub = require("./githubDataFetch");

const getAllRepos = async (req, res) => {
  const { pureData } = await fetchDataFromGithub();
  res.json(pureData);
};

const getLanguageList = async (req, res) => {
  const { modifedData } = await fetchDataFromGithub();
  res.json(modifedData);
};

module.exports = { getAllRepos, getLanguageList };
