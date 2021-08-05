const moment = require("moment");
const axios = require("axios");

const fetchDataFromGithub = async () => {
  const date = moment().subtract(100, "days").format("YYYY-MM-DD").toString();
  try {
    //fetching trending repos on github in last 100 day
    const result = await axios.get(
      `https://api.github.com/search/repositories?q=created:>${date}&sort=stars&per_page=100&order=desc`
    );
    const pureData = result.data.items;
    let modifedData = removeNullValues(pureData);
    modifedData = removeUnnecessaryFields(modifedData);
    let languages = getLanguages(modifedData);
    modifedData = clusterReposBasdOnLang(modifedData, languages);

    return { modifedData, pureData };
  } catch (err) {
    console.log(err);
  }
};
/**
 *
 * @param {*} repos
 * @param {*} languages
 * cluster fetched repos based on their language
 * @returns list (array)
 */
const clusterReposBasdOnLang = (repos, languages) => {
  let list = [];
  languages.map((lang) => {
    let reposList = [];
    reposList = repos.filter((ele) => {
      return ele.language === lang;
    });

    list.push({ name: lang, count: reposList.length, repos: reposList });
  });
  return list;
};

/**
 *
 * @param  repos(array)
 * get list of languages from all repos that fetched from github api
 * @returns array
 */
const getLanguages = (repos) => {
  const mySet = new Set();
  let newList = [];
  repos.map((ele) => {
    mySet.add(ele.language);
  });
  return Array.from(mySet);
};

/**
 *
 * @param  list (array)
 * removing repos that have null value in language field  in data that fetched from github api
 * @returns list (array)
 */
const removeNullValues = (list) => {
  let modifedList = [];
  modifedList = list.filter((element) => {
    return element.language != null;
  });
  return modifedList;
};

/**
 *
 * @param  list (array)
 * remove unnecessary fields in each repo fetched from github
 * @returns list (array)
 */
const removeUnnecessaryFields = (list) => {
  let modifedList = [];

  list.map((ele) => {
    modifedList.push({
      id: ele.id,
      name: ele.name,
      description: ele.description,
      language: ele.language,
      url: ele.url,
    });
  });
  return modifedList;
};

module.exports = fetchDataFromGithub;
