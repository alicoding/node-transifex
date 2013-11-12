node-transifex
=====================

[Transifex](http://www.transifex.com) API client for nodejs

Install the node.js module using npm:

`$ npm install transifex`


Initialize the app with the `init()` with your credential and project name for the first time

``` javascript
var transifex = require("transifex");

transifex.init({
	project_slug: "projectName",
	credential: "user:pass" // In the same format
});
```

## API
The module exposes a number of useful functions, including:


### getNumberOfContributors

The `getNumberOfContributors` function return number of contributors in an array of objects.

``` javascript
transifex.getNumberOfContributors(function(error, data){
	...
});
```

Return the following **data**
```
[ { component: 'Contributors', count: 432 },
  { component: 'Translators', count: 310 },
  { component: 'Reviewers', count: 42 },
  { component: 'Coordinators', count: 80 } ]
```

### projectStats

The `projectStats` function return the status of the project in each ***slug*** in all the ***languages*** available.

``` javascript
transifex.projectStats(function(error, data){
	...
});
```

Return the following **data**

```
     nl:
      { reviewed_percentage: '0%',
        completed: '100%',
        untranslated_words: 0,
        last_commiter: 'Fjoerfoks',
        reviewed: 0,
        translated_entities: 108,
        translated_words: 874,
        last_update: '2013-10-30 13:03:12',
        untranslated_entities: 0 },
     'en@pirate':
      { reviewed_percentage: '0%',
        completed: '1%',
        untranslated_words: 872,
        last_commiter: 'r3v1',
        reviewed: 0,
        translated_entities: 2,
        translated_words: 2,
        last_update: '2013-10-23 21:53:27',
        untranslated_entities: 106 },
        ...
        ...
        ...
```

### getAllLanguages

The `getAllLanguages` function return all the languages in the project with the code and its name.

``` javascript
transifex.getAllLanguages(function(error, data){
	...
});
```

Return the following ***data***

```
[ { locale: 'ar', name: 'Arabic' },
  { locale: 'bn_IN', name: 'Bengali (India)' },
  { locale: 'cs', name: 'Czech' },
  { locale: 'el', name: 'Greek' },
  { locale: 'de', name: 'German' },
  { locale: 'en_GB', name: 'English (United Kingdom)' },
  { locale: 'es', name: 'Spanish' },
  { locale: 'eu', name: 'Basque' },
  { locale: 'fa', name: 'Persian' },
  { locale: 'fi', name: 'Finnish' },
  { locale: 'fr', name: 'French' },
  { locale: 'gl', name: 'Galician' },
  ...
  ...
  ...
  { locale: 'en@pirate', name: 'Pirate English' },
  count: 59 ]
```

### componentStats

The `componentStats` function return the status for all the language for the specific slug name.

``` javascript
transifex.componentStats("slug_name", function(error, data){
	...
});
```

Return the following ***data***

```
  mr:
   { reviewed_percentage: '0%',
     completed: '59%',
     untranslated_words: 84,
     last_commiter: 'suraj.kawade',
     reviewed: 0,
     translated_entities: 13,
     translated_words: 27,
     last_update: '2013-10-21 19:58:53',
     untranslated_entities: 9 },
  pl_PL:
   { reviewed_percentage: '0%',
     completed: '59%',
     untranslated_words: 62,
     last_commiter: 'RLisak',
     reviewed: 0,
     translated_entities: 13,
     translated_words: 49,
     last_update: '2013-11-07 14:49:37',
     untranslated_entities: 9 },
```

### getLangCompStats

The `getLangCompStats` function return the status for the given slug name and locale name.

``` javascript
transifex.getLangCompStats("slug_name", "th_TH", function(error, data){
	...
});
```

Return the following ***data***

```
{ reviewed_percentage: '100%',
  completed: '100%',
  untranslated_words: 0,
  last_commiter: 'aali',
  reviewed: 22,
  translated_entities: 22,
  translated_words: 111,
  last_update: '2013-10-18 19:20:19',
  untranslated_entities: 0 }
```

### getLangStats

The `getLangStats` function return the overall status for the given locale

``` javascript
transifex.getLangStats("es", function(error, data){
	...
});
```

Return the following ***data***

```
{ webmaker:
   { reviewed_percentage: '100%',
     completed: '100%',
     untranslated_words: 0,
     last_commiter: 'aali',
     reviewed: 472,
     translated_entities: 472,
     translated_words: 3859,
     last_update: '2013-11-05 16:43:56',
     untranslated_entities: 0 },
  goggles:
   { reviewed_percentage: '100%',
     completed: '100%',
     untranslated_words: 0,
     last_commiter: 'aali',
     reviewed: 729,
     translated_entities: 729,
     translated_words: 11043,
     last_update: '2013-11-05 16:41:30',
     untranslated_entities: 0 },
  thimble:
   { reviewed_percentage: '100%',
     completed: '100%',
     untranslated_words: 0,
     last_commiter: 'aali',
     reviewed: 194,
     translated_entities: 194,
     translated_words: 4035,
     last_update: '2013-11-05 16:46:11',
     untranslated_entities: 0 },
     ...
     ...
     ...
```

### projectLangDetails

The `projectLangDetails` function return full details on the project for the given locale

``` javascript
transifex.projectLangDetails("pt", function(error, data){
	...
});
```

Return the following ***data***

```
{ last_updated: '2013-11-05T16:46:11.852',
  coordinators: [ 'aali' ],
  reviewers: [ 'yokunzz' ],
  total_segments: 1814,
  untranslated_segments: 0,
  translated_segments: 1814,
  reviewed_segments: 1814,
  translators:
   [ 'jaideejung007',
     'KEEP_DARK',
	...
	...
	...
     'PatiphanPinkeaw',
     'splattr' ],
  translated_words: 21085,
  completed_percentage: 100 }
```

## Project API

### projectSetMethods

The `getAllTXprojects` function returns a list of (slug, name, description, source_language_code) for all projects the user has access to in JSON format. This method supports pagination through the options start and end.

``` javascript
projectSetMethods(options, function(err, data) {
  ...
});
```

Return all the projects in Transifex

or

``` javascript
projectSetMethods({ start: 1, end: 20 }, function(err, data) {
  ...
});
```

Return only the first 20 projects from the list.

### projectInstanceMethods

The `getAllTXprojects` function returns the fields slug, name, description and source_language_code for the project of the specified slug in JSON format includes the above fields as well as the following ones:

* long_description
* homepage
* feed
* created
* anyone_submit
* bug_tracker
* trans_instructions
* a list of tags
* outsource
* auto_join
* a list of the maintainers' username
* the username of the owner of the project
* a list of the resources of the project containing the fields slug and name.
* a list of language codes for the teams created for the project.
* fill_up_resources, a boolean to specify whether the system will fill up

``` javascript
projectInstanceMethods("transifex", function(err, data) {
  ...
});
```

### getAllTXlanguages

The `getAllTXlanguages` function provides info regarding all languages supported by Transifex.

``` javascript
getAllTXLanguages(function(err, data) {
  ...
});
```
Return the following ***data***


```
  ...
  ...
  { pluralequation: '(n > 1)',
    code: 'wa',
    name: 'Walloon',
    nplurals: 2 },
  { pluralequation: '(n != 1)',
    code: 'war',
    name: 'Wáray-Wáray',
    nplurals: 2 },
  { pluralequation: '(n==1) ? 0 : (n==2) ? 1 : (n != 8 && n != 11) ? 2 : 3',
    code: 'cy',
    name: 'Welsh',
    nplurals: 4 },
  { pluralequation: '(n==1) ? 0 : (n==2) ? 1 : (n != 8 && n != 11) ? 2 : 3',
    code: 'cy_GB',
    name: 'Welsh (United Kingdom)',
    nplurals: 4 },
  { pluralequation: '(n != 1)',
    code: 'fy',
    name: 'Western Frisian',
    nplurals: 2 },
  { pluralequation: '(n != 1)',
    code: 'fy_NL',
    name: 'Western Frisian (Netherlands)',
    nplurals: 2 },
  { pluralequation: '0', code: 'wo', name: 'Wolof', nplurals: 1 },
  { pluralequation: '0',
    code: 'wo_SN',
    name: 'Wolof (Senegal)',
    nplurals: 1 },
    ...
    ...
```

### languageNameFor

The `languageNameFor` functions provides info regarding a specific language supported by Transifex.

``` javascript
transifex.languageNameFor("th", function(err, data) {
  ...
});
```

Return the following ***data***

```
{ pluralequation: '0', code: 'th', name: 'Thai', nplurals: 1 }
```
