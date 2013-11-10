var request = require("request"),
    expUrl = require("./url"),
    _ = require("lodash"),
    authHeader = "Basic " + new Buffer(url:pass).toString("base64"),
    slugs = [];

// request the project details based on the url provided
function projectRequest (url, callback) {
  request.get({
    url: url,
    headers: {"Authorization": authHeader}
  }, function(error, response, body) {
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

  projectRequest(expUrl.projectDetailsAPIUrl, function(err, projectData){
    if (err) {
      return callback(err);
    }
    try {
      projectData = JSON.parse(projectData);
    } catch (e) {
      return callback(e);
    }
    languages = projectData.teams;
    projectData.resources.forEach(function(data) {
      slugs.push(data.slug);
    });
    var wait = languages.length;
    languages.forEach(function(language) {
      var url = languageInfoURL + language + "/";
      projectRequest(url, function(err, data){
        if (err) {
          return callback(err);
        }
        try {
          data = JSON.parse(data);
          languagesInfo.push({
            locale: data.code,
            name: data.name
          });
        } catch (e) {
          return callback(e);
        }
        wait--;
        if (wait === 0) {
          projectObj.languages = languagesInfo;
          projectObj.slugs = slugs;
          callback(null, projectObj)
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
      var details = {},
          url = projectResourceUrl + slug + "/stats/";
      projectRequest(url, function(err, projectData){
        if (err) {
          return callback(err);
        }
        try {
          projectData = JSON.parse(projectData);
          details[slug] = projectData;
        } catch (e) {
          return callback(e);
        }
        _.extend(finalDetails, details)
        wait--;
        if ( wait === 0 ) {
          callback(null, finalDetails);
        }
      });
    });
  });
};

// return the number of contributors in each role and the total number
function getNumberOfContributors( callback ) {
  var contributorsDetails = [],
      numOfTranslators = 0,
      numOfReviewers = 0,
      numOfCoordinators = 0,
      totalNum = 0;

  projectRequest(languagesAPIUrl, function(err, projectDetails){
    if (err) {
      return callback(err);
    }
    try {
      projectDetails = JSON.parse(projectDetails);
    } catch (e) {
      return callback(e);
    }
    projectDetails.forEach(function(data) {
      numOfTranslators += data.translators.length;
      numOfReviewers += data.reviewers.length;
      numOfCoordinators += data.coordinators.length;
    });
    contributorsDetails.push({
      "component": "Contributors",
      "count": numOfTranslators + numOfReviewers + numOfCoordinators
    });
    contributorsDetails.push( {
      "component": "Translators",
      "count": numOfTranslators
    });
    contributorsDetails.push( {
      "component": "Reviewers",
      "count": numOfReviewers
    });
    contributorsDetails.push( {
      "component": "Coordinators",
      "count": numOfCoordinators
    });
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

function componentStats(component, callback) {
  var url = projectResourceUrl + component + "/stats/";
  projectRequest(url, function(err, data){
    if (err) {
      return callback(err);
    }
    try {
      data = JSON.parse(data);
    } catch (e) {
      return callback(e);
    }
    callback(null, data);
  });
};

function getLangCompStats(component, lang, callback) {
  projectDetails(function(error, data) {
    if (error) {
      return callback(error);
    }
    var arrOfLocale = [];
    data.languages.forEach(function(langCode) {
      arrOfLocale.push(langCode.locale);
    });
    if (data.slugs.indexOf(component) === -1) {
      return callback(Error("Error: Unknown component's name"));
    } else if (arrOfLocale.indexOf(lang) === -1) {
      return callback(Error("Error: Unknown locale's name"));
    }
    var url = projectResourceUrl + component + "/stats/" + lang + "/";
    projectRequest(url, function(err, langStat) {
      if (err) {
        return callback(err);
      }
      try {
        langStat = JSON.parse(langStat);
      } catch (e) {
        return callback(e);
      }
      callback(null, langStat);
    });
  });
};

function findLocale(locale, data) {
  for (var i = 0; i < data.languages.length; i++) {
    if (data.languages[i].locale === locale)
      return true;
  }
  return false;
}

function getLangStats(locale, callback) {
  projectDetails(function(error, data) {
    if (error) {
      return callback(error);
    }
    if (!findLocale(locale, data)) {
      return callback(Error("Error: Unknown locale's name"));
    }
    projectStats(function(error, data) {
      var details = {};
      if (error) {
        return callback(error);
      }
      Object.keys(data).forEach(function(resource) {
        details[resource] = data[resource][locale];
      });
      callback(null, details);
    });
  });
};

function projectLangDetails(locale, callback) {
  projectDetails(function(error, data) {
    if (error) {
      return callback(error);
    }
    if (!findLocale(locale, data)) {
      return callback(Error("Error: Unknown locale's name"));
    }
    var url = languageAPI + locale + "/?details"
    projectRequest(url, function(err, langDetails) {
      if (err) {
        return callback(err);
      }
      try {
        langDetails = JSON.parse(langDetails);
      } catch (e) {
        return callback(e);
      }
      langDetails.completed_percentage = Math.round(langDetails.translated_segments * 100 / langDetails.total_segments);
      callback(null, langDetails);
    });
  });
};

module.exports.numberOfContributors = getNumberOfContributors;
module.exports.projectStats = projectStats;
module.exports.getAllLanguages = getAllLanguages;
module.exports.componentStats = componentStats;
module.exports.getLangCompStats = getLangCompStats;
module.exports.getLangStats = getLangStats;
module.exports.projectLangDetails = projectLangDetails;
