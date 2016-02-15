var mergeTrees = require('broccoli-merge-trees')
var Funnel = require('broccoli-funnel')
var browserify = require('broccoli-fast-browserify')
var jade = require('broccoli-jade')
var stylus = require('broccoli-stylus-single')
var autoprefixer = require('broccoli-autoprefixer')
var assetRev = require('broccoli-asset-rev')
var watch = require('broccoli-watched-tree')
var clone = require('clone')
var t = require('t-component')
var es = require('app/translations/es.json')
var en = require('app/translations/en.json')

var doCompress = process.env.BROCCOLI_COMPRESS === 'true'
var doServe = process.env.BROCCOLI_SERVE === 'true'

var app = 'app'

var js = browserify(new Funnel(app, {include: ['js/**/*.js']}), {
  browserify: {
    debug: doServe
  },
  bundles: {
    'js/app.js': {
      transform: doCompress ? 'uglifyify' : undefined,
      entryPoints: ['js/index.js']
    }
  }
})

var css = stylus(
  [new Funnel(app, {include: ['css/**/*.styl']})],
  'css/index.styl',
  'css/app.css',
  {compress: doCompress}
)

t.en = en
t.es = es

function getDestinationPath(lang) {
  return function(relativePath) {
    if (lang === 'en') return relativePath
    return relativePath.replace('.jade', '_' + lang + '.jade')
  }
}

function translate(lang) {
  return function (str) {
    return t(str, {}, lang)
  }
}

var htmlEnglish = jade(new Funnel(app, {include: ['*.jade'], getDestinationPath: getDestinationPath('en')}), {
  pretty: !doCompress,
  data: {t: translate('en')}
})

var htmlSpanish = jade(new Funnel(app, {include: ['*.jade'], getDestinationPath: getDestinationPath('es')}), {
  pretty: !doCompress,
  data: {t: translate('es')}
})

var img = new Funnel(app, {include: ['img/**/*']})

var statics = new Funnel(app, {srcDir: 'statics'})

var readme = new Funnel('.', {files: ['README.md']})

var trees = [js, css, htmlEnglish, htmlSpanish, img, statics, readme]

if (doServe) trees.push(new Funnel(app, {
  include: ['layouts/*.jade', 'partials/*.jade']
}))

var tree = mergeTrees(trees, { overwrite: true })

tree = autoprefixer(tree)
tree = assetRev(tree)

module.exports = tree
