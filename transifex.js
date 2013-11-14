var request = require("request"),
    _ = require("lodash");

var projectSlug = "webmaker",
    userAuth,
    expUrl,
    authHeader,
    slugs = [],
    expUrl = require("./url")(projectSlug).API;

function init(options) {
  projectSlug = options.project_slug || "webmaker";
  userAuth = options.credential || {};
  authHeader = "Basic " + new Buffer(userAuth).toString("base64");
  expUrl = require("./url")(projectSlug).API;
};

// request the project details based on the url provided
function projectRequest(url, options, callback) {
  // Allow calling with or without options.
  if (typeof options === 'function') {
    callback = options;
    options = {};
  } else {
    callback = callback || function(){};
  }
  request.get({ url: url, qs: options, headers: { "Authorization": authHeader } },
    function(error, response, body) {
    if (error) {
      return callback(error);
    }
    if (response.statusCode !== 200) {
      return callback(Error(url + " returned " + response.statusCode));
    }
    callback(null, body);
  });
};

function projectDetails(callback) {
  var languages = [],
      projectObj = {},
      languagesInfo = [];

  projectInstanceMethods(projectSlug, function(err, projectData){
    if (err) {
      return callback(err);
    }
    languages = projectData.teams;
    projectData.resources.forEach(function(data) {
      slugs.push(data.slug);
    });
    var wait = languages.length;
    languages.forEach(function(language) {
      languageInstanceMethods(language, function(err, data) {
        if (err) {
          return callback(err);
        }
        languagesInfo.push({
          locale: data.code,
          name: data.name
        });
        wait--;
        if (wait === 0) {
          projectObj.languages = languagesInfo;
          projectObj.slugs = slugs;
          callback(null, projectObj);
        }
      });
    });
  });
};

function projectStats(callback) {
  projectDetails(function (error, data) {
    if (error) {
      return callback(error);
    }
    var wait = slugs.length,
        finalDetails = {};
    data.slugs.forEach(function (slug) {
      var details = {};
      statisticsMethods(projectSlug, slug, function(err, projectData){
        if (err) {
          return callback(err);
        }
        details[slug] = projectData;
        _.extend(finalDetails, details);
        wait--;
        if ( wait === 0 ) {
          callback(null, finalDetails);
        }
      });
    });
  });
};

// return the number of contributors in each role and the total number
function getNumberOfContributors(callback) {
  var contributorsDetails = [],
      numOfTranslators = 0,
      numOfReviewers = 0,
      numOfCoordinators = 0,
      totalNum = 0;

  languageSetMethod(projectSlug, function(err, projectDetails) {
    if (err) {
      return callback(err);
    }
    projectDetails.forEach(function(data) {
      numOfTranslators += data.translators.length;
      numOfReviewers += data.reviewers.length;
      numOfCoordinators += data.coordinators.length;
    });
    contributorsDetails = {
      "Contributors": numOfTranslators + numOfReviewers + numOfCoordinators,
      "Translators": numOfTranslators,
      "Reviewers": numOfReviewers,
      "Coordinators" :numOfCoordinators
    };
    callback( null, contributorsDetails );
  });
};

function getAllLanguages(callback) {
  projectDetails(function (error, data) {
    if (error) {
      return callback(error);
    }
    data.languages.count = data.languages.length;
    callback(null, data.languages);
  });
};

function languageStatisticsMethods(locale, callback) {
  resourcesSetMethod(projectSlug, function(error, projectData) {
    if (error) {
      return callback(error);
    }
    var details = {},
    wait = projectData.length;

    _.findKey(projectData, function(resource) {
      statisticsMethods(projectSlug, resource.slug, locale, function(err, data) {
        details[resource.slug] = data;
        wait--;
        if ( wait === 0 ) {
          callback(null, details);
        }
      });
    });
  });
};


/*
* PROJECT APIs
*/

function projectSetMethods(options, callback) {
  projectRequest(expUrl.txProjects, options, function(err, projects) {
    if (err) {
      return callback(err);
    }
    try {
      projects = JSON.parse(projects);
    } catch (e) {
      return callback(e);
    }
    callback(null, projects);
  });
};

function projectInstanceMethods(project_slug, callback) {
  project_slug = project_slug || projectSlug || "webmaker";
  var url = expUrl.projectInstanceAPI.replace("<project_slug>", project_slug);
  projectRequest(url, function(err, project) {
    if (err) {
      return callback(err);
    }
    try {
      project = JSON.parse(project);
    } catch (e) {
      return callback(e);
    }
    callback(null, project);
  });
};

/*
* END PROJECT APIs
*/


/*
* RESOURCE API
*/

function resourcesSetMethod(project_slug, callback) {
  project_slug = project_slug || projectSlug || "webmaker";
  var url = expUrl.projectResources.replace("<project_slug>", project_slug);
  projectRequest(url, function(err, resources) {
    if (err) {
      return callback(err);
    }
    try {
      resources = JSON.parse(resources);
    } catch (e) {
      return callback(e);
    }
    callback(null, resources);
  });
};

function resourcesInstanceMethods(project_slug, resource_slug, bool, callback) {
  // Allow calling with or without options.
  if (typeof bool === 'function') {
    callback = bool;
    options = true;
  } else {
    callback = callback || function(){};
  }
  project_slug = project_slug || projectSlug || "webmaker";
  resource_slug = resource_slug || projectSlug || "webmaker";
  var url = expUrl.projectResource.replace("<project_slug>", project_slug)
  .replace("<resource_slug>", resource_slug);
  if (!bool) {
    url = url.substr(0, url.lastIndexOf("/"))
  }
  projectRequest(url, function(err, resource) {
    if (err) {
      return callback(err);
    }
    try {
      resource = JSON.parse(resource);
    } catch (e) {
      return callback(e);
    }
    callback(null, resource);
  });
};

function sourceLanguageMethods(project_slug, resource_slug, callback) {
  project_slug = project_slug || projectSlug || "webmaker";
  resource_slug = resource_slug || projectSlug || "webmaker";
  var url = expUrl.projectResourceFile.replace("<project_slug>", project_slug)
  .replace("<resource_slug>", resource_slug);
  projectRequest(url, function(err, fileContent) {
    if (err) {
      return callback(err);
    }
    try {
      fileContent = JSON.parse(fileContent);
    } catch (e) {
      return callback(e);
    }
    callback(null, fileContent);
  });
};

/*
* END RESOURCE API
*/

/*
* LANGUAGE API
*/

function languageSetMethod(project_slug, callback) {
  project_slug = project_slug || projectSlug || "webmaker";
  var url = expUrl.languageSetURL.replace("<project_slug>", project_slug);
  projectRequest(url, function(err, languages) {
    if (err) {
      return callback(err);
    }
    try {
      languages = JSON.parse(languages);
    } catch (e) {
      return callback(e);
    }
    callback(null, languages);
  });
};

function languageInstanceMethod(project_slug, language_code, bool, callback) {
  // Allow calling with or without options.
  if (typeof bool === 'function') {
    callback = bool;
    bool = true;
  } else {
    callback = callback || function(){};
  }
  project_slug = project_slug || projectSlug || "webmaker";
  var url = expUrl.languageInstanceURL.replace("<project_slug>", project_slug)
  .replace("<language_code>", language_code);
  if (!bool) {
    url = url.substr(0, url.lastIndexOf("/"))
  }
  projectRequest(url, function(err, language) {
    if (err) {
      return callback(err);
    }
    try {
      language = JSON.parse(language);
    } catch (e) {
      return callback(e);
    }
    if(bool) {
      language.completed_percentage = Math.round(language.translated_segments * 100 / language.total_segments);
    }
    callback(null, language);
  });
};

function contributorListFor(project_slug, language_code, type, callback) {
  if(["coordinators", "reviewers", "translators"].indexOf(type) === -1) {
    return callback(Error('Please specify the type of the contributor : "coordinators", "reviewers" or "translators"'));
  }
  project_slug = project_slug || projectSlug || "webmaker";
  var url = expUrl.contributorForURL.replace("<project_slug>", project_slug)
  .replace("<language_code>", language_code).replace("<type>", type);
  projectRequest(url, function(err, list) {
    if (err) {
      return callback(err);
    }
    try {
      list = JSON.parse(list);
    } catch (e) {
      return callback(e);
    }
    callback(null, list);
  });
};

/*
* END LANGUAGE API
*/


/*
* TRANSLATIONS API
*/

function translationInstanceMethod(project_slug, resource_slug, language_code, type, callback) {
  // Allow calling with or without options.
  if (typeof type === 'function') {
    callback = type;
    type = {};
  } else {
    callback = callback || function(){};
  }
  project_slug = project_slug || projectSlug || "webmaker";
  var url = expUrl.translationMethodURL.replace("<project_slug>", project_slug)
  .replace("<resource_slug>", resource_slug).replace("<language_code>", language_code);
  projectRequest(url, type, function(err, content) {
    if (err) {
      return callback(err);
    }
    try {
      content = JSON.parse(content);
    } catch (e) {
      return callback(e);
    }
    callback(null, content);
  });
};

/*
* END TRANSLATIONS API
*/


/*
* STATISTICS API
*/

function statisticsMethods(project_slug, resource_slug, language_code, callback) {
  // Allow calling with or without options.
  if (typeof language_code === 'function') {
    callback = language_code;
    language_code = "";
  } else {
    callback = callback || function(){};
  }
  project_slug = project_slug || projectSlug || "webmaker";
  var url = expUrl.statsMethodURL.replace("<project_slug>", project_slug)
  .replace("<resource_slug>", resource_slug).replace("<language_code>", language_code);
  if (!language_code) {
    url = url.substr(0, url.lastIndexOf("/"))
  }
  projectRequest(url, function(err, stats) {
    if (err) {
      return callback(err);
    }
    try {
      stats = JSON.parse(stats);
    } catch (e) {
      return callback(e);
    }
    callback(null, stats);
  });
};

/*
* END STATISTICS API
*/


/*
* LANGUAGE INFO API
*/

function languageInstanceMethods(language_code, callback) {
  var url = expUrl.languageURL.replace("<language_code>", language_code);
  projectRequest(url, function(err, language) {
    if (err) {
      return callback(err);
    }
    try {
      language = JSON.parse(language);
    } catch (e) {
      return callback(e);
    }
    callback(null, language);
  });
};

function languageSetMethods(callback) {
  projectRequest(expUrl.languagesURL, function(err, languages) {
    if (err) {
      return callback(err);
    }
    try {
      languages = JSON.parse(languages);
    } catch (e) {
      return callback(e);
    }
    callback(null, languages);
  });
};

/*
* END LANGUAGE INFO API
*/

module.exports.init = init;
module.exports.projectSetMethods = projectSetMethods;
module.exports.projectInstanceMethods = projectInstanceMethods;
module.exports.resourcesSetMethod = resourcesSetMethod;
module.exports.resourcesInstanceMethods = resourcesInstanceMethods;
module.exports.sourceLanguageMethods = sourceLanguageMethods;
module.exports.languageSetMethod = languageSetMethod;
module.exports.languageInstanceMethod = languageInstanceMethod;
module.exports.contributorListFor = contributorListFor;
module.exports.translationInstanceMethod = translationInstanceMethod;
module.exports.statisticsMethods = statisticsMethods;
module.exports.languageInstanceMethods = languageInstanceMethods;
module.exports.languageSetMethods = languageSetMethods;
module.exports.languageStatisticsMethods = languageStatisticsMethods;

module.exports.getNumberOfContributors = getNumberOfContributors;
module.exports.projectStats = projectStats;
module.exports.getAllLanguages = getAllLanguages;
