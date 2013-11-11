node-transifex-client
=====================

Transifex API client for nodejs

Install the node.js module using npm:

`$ npm install transifex`

`var transifex = require("transifex");

Initialize the app with the `init()` with your credential and project name for the first time

``` javascript
transifex.init({
	project_slug: "projectName",
	credential: "user:pass" // In the same format
});
```

## API
The module exposes a number of useful functions, including:


### getNumberOfContributors

The `getNumberOfContributors`

``` javascript
transifex.getNumberOfContributors(function(error, data){
	...
});
```

### projectStats

The `projectStats`

``` javascript
transifex.projectStats(function(error, data){
	...
});
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
