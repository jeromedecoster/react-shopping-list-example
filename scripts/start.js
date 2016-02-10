
const fs = require('fs')

//
// SERVER
//

const bs = require('browser-sync')

bs({
  server: 'public',
  ui: false,
  files: ['public/**', '!**/**DS_Store'],
  open: false,
  notify: false
})

//
// JS
//

const browserify = require('browserify')
const babelify = require('babelify')
const watchify = require('watchify')

const vendors = ['react', 'react-dom', 'uid']

if (vendors && vendors.length) {
  browserify()
  .require(vendors)
  .bundle()
  .pipe(fs.createWriteStream('public/vendors.js'))
}

var w = watchify(browserify('src/index.js'))
if (vendors && vendors.length) w.external(vendors)
w.transform(babelify, {presets: ['react']})
w.on('update', bundle)
bundle()

function bundle() {
  w
  .bundle()
  .pipe(fs.createWriteStream('public/bundle.js'))
}

//
// CSS
//

const chokidar = require('chokidar')
const postcss = require('postcss')

chokidar
.watch('src/index.css')
.on('add', css)
.on('change', css)

function css(file) {
  postcss()
  .process(fs.readFileSync(file, 'utf8'))
  .then(function(result) {
    fs.writeFileSync('public/bundle.css', result.css)
  })
}
