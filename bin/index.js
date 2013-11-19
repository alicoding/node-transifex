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

function importFromTransifex(options) {
// Retrieve all the data e.g. resource names, category names
transifex.resourcesSetMethod(projectName, function(error, data) {
  if ( error ) {
    console.error(error);
  }

  // Retrieve all the supported languages
  transifex.projectInstanceMethods(projectName, function (err, languages) {

    // We are going to iterate through all the languages first before calling the function
    var wait = languages.teams.length;

    // Check if there is more than one resource with the same category
    resources = data.filter(function(v) {
      return v.category === categoryName;
    });

    var i = resources.length - 1;
    resources.forEach(function(resource) {
      languages.teams.forEach(function(language) {

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
    .option('-c, --category <name>', 'specify project slug')
    .option('-d, --dir <path>', 'locale dir for the downloaded files')
    .parse(process.argv);
  if (!program.credential) {
    throw new Error("Bad Config - Please specify your Transifex's credential");
  } else {
    userAuth = program.credential;
  }
  if (!program.project) {
    throw new Error("Bad Config - Please specify your project slug's name");
  } else {
    projectName = program.project;
  }
  if (!program.category) {
    throw new Error("Bad Config - Please specify your project category's name");
  } else {
    categoryName = program.category;
  }
  if (!program.dir) {
    throw new Error("Bad Config - Please specify the path for the downloaded files");
  } else {
    dirName = program.dir;
  }
  transifex.init({ credential: userAuth, project_slug: projectName });
  importFromTransifex(program);
}

if (!module.parent) {
  main();
}