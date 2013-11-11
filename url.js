var API = {
  languageCodeUrl: BASEP_URL + "language/",
  languageInfoURL: BASE_URL + "language/",
  languagesAPIUrl: projectUrl + "languages/",
  resourceAPIUrl: projectUrl + "resources/",
  projectResourceUrl: projectUrl + "resource/",
  projectDetailsAPIUrl: projectUrl + "?details",
  languageAPI: projectUrl + "language/"
};

module.exports = function ( projectName ) {
  const BASE_URL = "https://www.transifex.com/api/2/";
  const BASEP_URL = BASE_URL + "project/";
  const projectUrl = BASEP_URL + projectName + "/";

  return {
    API: API,

  };
};