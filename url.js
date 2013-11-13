module.exports = function ( projectName ) {
  const BASE_URL = "https://www.transifex.com/api/2/";
  const BASEP_URL = BASE_URL + "project/";
  const projectUrl = BASEP_URL + projectName + "/";

  var API = {
    projectInstanceAPI: BASEP_URL + "<project_slug>/?details",
    projectResources: BASEP_URL + "<project_slug>/resources/",
    projectResource: BASEP_URL + "<project_slug>/resource/<resource_slug>/?details",
    projectResourceFile: BASEP_URL + "<project_slug>/resource/<resource_slug>/content/?file",
    languageSetURL: BASEP_URL + "<project_slug>/languages/",
    languageInstanceURL: BASEP_URL + "<project_slug>/language/<language_code>/?details",
    contributorForURL: BASEP_URL + "<project_slug>/language/<language_code>/<type>/",
    translationMethodURL: BASEP_URL + "<project_slug>/resource/<resource_slug>/translation/<language_code>/?file",
    statsMethodURL: BASEP_URL + "<project_slug>/resource/<resource_slug>/stats/<language_code>/",
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
