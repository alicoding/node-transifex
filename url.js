const BASE_URL = "https://www.transifex.com/api/2/project/";
const API_URL = "https://www.transifex.com/api/2/";
const projectUrl = BASE_URL + "webmaker";

module.exports = {
	languagesAPIUrl: projectUrl + "/languages/",
  languageCodeUrl: BASE_URL + "/language/",
  resourceAPIUrl: projectUrl + "/resources/",
  projectResourceUrl: projectUrl + "/resource/",
  projectDetailsAPIUrl: projectUrl + "/?details",
  languageInfoURL: API_URL + "language/",
  languageAPI: projectUrl + "/language/"
};
