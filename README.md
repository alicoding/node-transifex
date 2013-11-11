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

The `getAllLanguages`

``` javascript
transifex.getAllLanguages(function(error, data){
	...
});
```

### componentStats

The `componentStats`

``` javascript
transifex.componentStats(function(error, data){
	...
});
```

### getLangCompStats

The `getLangCompStats`

``` javascript
transifex.getLangCompStats(function(error, data){
	...
});
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
