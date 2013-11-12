module.exports = function ( projectName ) {
  const BASE_URL = "https://www.transifex.com/api/2/";
  const BASEP_URL = BASE_URL + "project/";
  const projectUrl = BASEP_URL + projectName + "/";

  var API = {
    projectInstanceAPI: BASEP_URL + "project_slug/?details",
    txProjects: BASE_URL + "projects/",
    languageInfoURL: BASE_URL + "language/",
    allLanguages: BASE_URL + "languages/",
    languageCodeUrl: BASEP_URL + "language/",
    languagesAPIUrl: projectUrl + "languages/",
    resourceAPIUrl: projectUrl + "resources/",
    projectResourceUrl: projectUrl + "resource/",
    projectDetailsAPIUrl: projectUrl + "?details",
    languageAPI: projectUrl + "language/"
  };

  return {
    API: API
  };
};
