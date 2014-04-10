#!/usr/bin/env node

var transifex = require("../transifex"),
    path = require('path'),
    fs = require('fs'),
    mkpath = require('mkpath');

// write files by the given path and locale
function writeFile( relPath, strings, locale, callback ) {
  callback = callback || function(){};
  var absPath = path.join(dirName, relPath);
  mkpath(path.dirname(absPath), function( err ) {
    if ( err ) {
      return callback( err );
    }
    fs.writeFile(absPath, strings, { encoding: "utf-8" }, callback);
  });
}

function failed(err) {
  console.error(err);
  process.exit(1);
}

function importFromTransifex(options) {
// Retrieve all the data e.g. resource names, category names
transifex.resourcesSetMethod(projectName, function(error, data) {
  if ( error ) {
    failed(error);
  }

  // Retrieve all the supported languages
  transifex.projectInstanceMethods(projectName, function (error, languages) {
    if ( error ) {
      failed(error);
    }

    // We are going to iterate through all the languages first before calling the function
    var wait = languages.teams.length;

    // Check if there is more than one resource with the same category
    resources = data.filter(function(v) {
      if(v.categories !== null) {
        if(v.categories.indexOf(categoryName) !== -1) {
          return true;
        }
      }
    });

    if(!resources.length) {
      failed("Error: Please check your category name");
    }

    var i = resources.length - 1;
    resources.forEach(function(resource) {
      languages.teams.forEach(function(language) {

        transifex.statisticsMethods(projectName, resource.slug, language, function(err, data) {
          writeFile(path.join(language, "meta-" + resource.name + ".json"), JSON.stringify(data, null, 2), function( err ) {
            if (err) {
              throw new Error(err);
            }
          });
        });
        // Request the file for the specified locale then write the file
        transifex.translationInstanceMethod(projectName, resource.slug, language,
          function(err, fileContent, type) {
            var filename = path.join(language, resource.name + "." + type);
            wait--;
            // Write each file with the given filename and content.
            writeFile(filename, fileContent, function( err ) {
              if (err) {
                throw new Error(err);
              }
            });
            if(wait === 0) {
              i--;
              wait = languages.teams.length;
              if(i < 0) {
                console.log("Transifex: Download completed");
                process.exit(0);
              }
            }
        });
      });
    });
  });
});
};
function main() {
  var program = require('commander');
  program
    .option('-u, --credential <user:pass>', 'specify a Transifex username and password in the form username:password')
    .option('-p, --project <slug>', 'specify project slug')
    .option('-c, --category <name>', 'specify project category name')
    .option('-d, --dir <path>', 'locale dir for the downloaded files')
    .parse(process.argv);
  if (!program.credential) {
    failed("Bad Config - Please specify your Transifex's credential");
  } else {
    userAuth = program.credential;
  }
  if (!program.project) {
    failed("Bad Config - Please specify your project slug's name");
  } else {
    projectName = program.project;
  }
  if (!program.category) {
    failed("Bad Config - Please specify your project category's name");
  } else {
    categoryName = program.category;
  }
  if (!program.dir) {
    failed("Bad Config - Please specify the path for the downloaded files");
  } else {
    dirName = program.dir;
  }
  transifex.init({ credential: userAuth, project_slug: projectName });
  importFromTransifex(program);
}

if (!module.parent) {
  main();
}
