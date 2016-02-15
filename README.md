DemocracyOS Site
================

Site that's beign served on [democracyos.org](http://democracyos.org). Uses [BroccoliJS](https://github.com/broccolijs/broccoli) for asset compilation.

This project has two branches, `master` has the assets builded to be served by GitHub Pages, and **you** should make all the changes on `development` and then deploy it to `master` with `npm run deploy`.

## Commands

`npm run build`: Builds the app for production to `/build` folder.
  * `/app/*.jade` => `{filename}.html` using translations on `/app/translations`.
  * `/statics/**/*` => `/build/**/*`.
  * `/app/js/index.js` => `/build/js/app.js` using [Browserify](http://browserify.org/).
  * `/app/css/index.styl` => `/build/css/app.css` using [Stylus](http://stylus-lang.com/).

`npm run serve`: Local server for development.

`npm run deploy`: Builds the site and commits it to `master` branch. So, it will be visible on `http://democracyos.org`
