'use strict'

var gulp        = require('gulp'),
    uglify      = require('gulp-uglify'),
    minify      = require('gulp-minify-css'),
    concat      = require('gulp-concat'),
    sass        = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    plumber     = require('gulp-plumber'),
    spritesmith = require('gulp.spritesmith'),
    neat        = require('node-neat').includePaths,
    svgSprite   = require('gulp-svg-sprite'),
    imagemin    = require('gulp-imagemin'),
    gzip        = require('gulp-gzip'),
    exec        = require('child_process').exec;

//////////////////////////////
// PATHS
//////////////////////////////
var path = {
  sassWatch: [
    'assets/scss/*.scss',
    'assets/scss/**/*.scss'
  ],
  sass_src_S: 'assets/scss/style.scss',
  sass_src_P: 'assets/scss/print.scss',
  sass_dest: 'dist/css',
  js_lint_src: [
      'dist/js/*.js'
  ],
  js_src : [
      'assets/js/*.js'
  ],
  js_dest : 'dist/js/'
};

//////////////////////////////
// BrowserSync
//////////////////////////////
gulp.task('browser-sync', ['sass'], function() {
    browserSync.init({
        injectChanges: true,
        proxy: "mmda_2016.l",
        notify: false
    });
});

gulp.task('bs-reload', function (){
    browserSync.reload();
});

gulp.task('drush-cr', function (cb) {
    exec('drush cr', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
})

//////////////////////////////
// JS Tasks
//////////////////////////////
gulp.task('js', function () {
    gulp.src(path.js_src)
        .on('error',console.log.bind(console))
        .pipe(uglify())
        .on('error',console.log.bind(console))
        .pipe(concat('main.js'))
        .on('error',console.log.bind(console))
        .pipe(gulp.dest('dist/js'))
        .on('error',console.log.bind(console));
});

//////////////////////////////
// SASS Tasks
//////////////////////////////
gulp.task('sass', function(){
    gulp.src(path.sass_src_S)
        .pipe(sass({
            includePaths: ['styles'].concat(neat)
        }))
        .on('error',console.log.bind(console))
        .pipe(autoprefixer({
          browsers: ['last 2 versions'],
          cascade: false
        }))
        .pipe(minify())
        .on('error',console.log.bind(console))
        .pipe(concat('style.css'))
        .on('error',console.log.bind(console))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({stream: true}))
        .on('error',console.log.bind(console));
    gulp.src(path.sass_src_P)
        .pipe(sass({
            includePaths: ['styles'].concat(neat)
        }))
        .on('error',console.log.bind(console))
        .pipe(minify())
        .on('error',console.log.bind(console))
        .pipe(concat('print.css'))
        .on('error',console.log.bind(console))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({stream: true}))
        .on('error',console.log.bind(console));
});

//////////////////////////////
// SPRITE Tasks
//////////////////////////////
gulp.task('sprite', function () {
  var spriteData = gulp.src('assets/img/sprite/*.png')
  .pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: '_sprite.scss',
    imgPath: '../img/sprite.png'
  })).on('error',console.log.bind(console));
  spriteData.img.pipe(gulp.dest('dist/img/')).on('error',console.log.bind(console));
  spriteData.css.pipe(gulp.dest('assets/scss/config/')).on('error',console.log.bind(console));
});

//////////////////////////////
// Images Task
//////////////////////////////
var allowedFiles = [
  'assets/img/*.png',
  'assets/img/*.jpg',
  'assets/img/*.jpeg',
  'assets/img/*.gif',
  'assets/img/*.svg',
  './*.svg'
];

gulp.task('images', function () {
  // Create not compressed version.
  var spriteData = gulp.src(allowedFiles)
  .pipe(gulp.dest('dist/img/')).on('error',console.log.bind(console));

  // Create compressed version.
  gulp.src(allowedFiles)
    .pipe(imagemin())
    .pipe(gzip())
    .pipe(gulp.dest('dist/img/')).on('error', console.log.bind(console));
});

//////////////////////////////
// Svg Sprite
//////////////////////////////
// Basic configuration example
var svg_sprite_config = {
  mode: {
    // css: { // Activate the «css» mode
    //   render: {
    //     scss: true // Activate CSS output (with default options)
    //   }
    // },
    symbol: true // Activate the «symbol» mode
  },
  transform: [{
    svgo: {
      plugins: [
        {
          removeAttrs: {
            attrs: 'fill'
          }
        }
      ]
    }
  }]
};

gulp.task('svg-sprite', function () {
  gulp.src('assets/svg/**/*.svg')
    .pipe(svgSprite(svg_sprite_config))
    .pipe(gulp.dest('dist/svg'));
});

//////////////////////////////
// Font Task
//////////////////////////////
gulp.task('fonts', function () {
    gulp.src(['assets/fonts/*']).pipe(gulp.dest('dist/css/webfonts'))
});

//////////////////////////////
// Font Task
//////////////////////////////
gulp.task('svg', function () {
    gulp.src(['assets/svg/*']).pipe(gulp.dest('dist/svg'))
});

//////////////////////////////
// Watch Tasks
//////////////////////////////
gulp.task('watch', ['browser-sync'], function () {
    gulp.watch(path.js_src, ['js']).on('error',console.log.bind(console));
    gulp.watch(path.sassWatch, ['sass']).on('error',console.log.bind(console));
    gulp.watch('assets/img/sprite/*.*', ['sprite']).on('error',console.log.bind(console));
    gulp.watch('assets/svg/**/*.svg', ['svg-sprite']).on('error',console.log.bind(console));
    gulp.watch('dist/js/*.*').on('change', browserSync.reload);
});

//////////////////////////////
//Default Tasks
//////////////////////////////
gulp.task('default', [
    'drush-cr',
    'sass',
    'js',
    'sprite',
    'images',
    'svg-sprite',
    'fonts',
    'svg',
    'watch'
]);

//////////////////////////////
/// BUILD TASK FOR JENKINS
//////////////////////////////
gulp.task('build', [
    'sass',
    'js',
    'sprite',
    'images',
    'svg-sprite',
    'fonts',
    'svg'
]);
