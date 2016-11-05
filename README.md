# RESTDocsEXT UI

UI for Spring REST Docs. Very much a work in progress. 

### Table of Contents

* [Build](#build)

------

<a name="build"></a>
## Build

* [Prerequisites](#prerequisites)
* [Build for Production](#prodBuild)
* [Build Zip Distribution](#zipDist)
* [View Development](#viewDev)

<a name="prerequisites"></a>
### Prerequisites

* [Angular CLI](https://github.com/angular/angular-cli) (version used - 1.0.0-beta.19)
* [Node 4 or higher, together with NPM 3 or higher](https://nodejs.org/en/)
* [Gulp](http://gulpjs.com/) (only required for building the zip distribution)

<a name="prodBuild"></a>
### Build for Production

This build will result in the production distribution files, located in the `/dist` folder.

```bash
ng build --prod
```

<a name="zipDist"></a>
### Build Zip Distribution

This build will result in a [production build](#buildProd), with all files zippped
in the `restdocsext-ui.zip`. Along with the zip, will be checksums of the zip.

Installation of Gulp is required.

```bash
gulp build:dist
```

<a name="viewProd"></a>

This will serve the application in development mode (take longer to load than with a production build).
A server will be started listening on `localhost:4200`. Navigating the URL should load the application.

```bash
ng serve
```


