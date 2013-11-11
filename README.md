node-transifex-client
=====================

Transifex API client for nodejs

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

The `getLangStats`

``` javascript
transifex.getLangStats(function(error, data){
	...
});
```

### projectLangDetails

The `projectLangDetails`

``` javascript
transifex.projectLangDetails(function(error, data){
	...
});
```
