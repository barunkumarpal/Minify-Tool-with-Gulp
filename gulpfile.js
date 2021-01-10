var gulp          = require('gulp'),  
      autoprefixer = require( 'gulp-autoprefixer' ),
      browserSync  = require( 'browser-sync' ).create(),
      reload  = browserSync.reload,      
      sass  = require( 'gulp-sass' ),
      concat  = require( 'gulp-concat' ),
      cleanCSS  = require( 'gulp-clean-css' ),
      sourcemaps  = require( 'gulp-sourcemaps' ),
      uglify  = require( 'gulp-uglify' ),
      imagemin  = require( 'gulp-imagemin' ),      
      changed = require( 'gulp-changed' ),
      lineec  = require( 'gulp-line-ending-corrector' ),
      htmlmin = require('gulp-htmlmin');
                      
      var jsroot = 'js/'
         // jsSrc = jsroot+'*.js'

      // var jsSrc = [
      //    jsroot + 'bootstrap.min.js',
      //    jsroot + 'jquery.min.js',   
      //    jsroot + 'scrolltop.js',   
      //    jsroot + 'custom.js'   
      // ];     

      // var cssroot = 'css/',
      //    cssSrc = [
      //       cssroot + 'style.css',
      //       cssroot + 'responsive.css',
      //       cssroot + 'bootstrap.min.css',   
      //             ];

      gulp.task('jsmin', function(){
      //   gulp.src('js/*.js')
        gulp.src(jsSrc)
        .pipe(concat('scripts-min.js'))
        .pipe(uglify())
        .pipe(lineec())
        .pipe(gulp.dest('minified/'));
     });
     
     gulp.task('cssmin', function(){
        gulp.src('css/*.css')
      //   gulp.src(cssSrc)
        .pipe(sourcemaps.init({loadMaps: true, largeFile: true}))
        .pipe(concat('style-min.css'))
      //   .pipe(cleanCSS())
        .pipe(cleanCSS({level: {
               1:{
                  removeWhitespace: true,
                  removeEmpty: true,
                  specialComments: 'all'
               }
            }
         }))
        .pipe(sourcemaps.write('./maps/'))
        .pipe(lineec())
        .pipe(gulp.dest('minified/'));
     });
     
     gulp.task('imgmin', function(){
      gulp.src('img/**')
      .pipe(changed('minified/images/'))
      .pipe( imagemin([
        imagemin.gifsicle({interlaced: true}),
        // imagemin.jpegtran({progressive: true}),
        imagemin.mozjpeg({quality: 60, progressive: true}),
        imagemin.optipng({optimizationLevel: 5})
      ]))
      .pipe( gulp.dest('minified/images/'));
   });
    

   gulp.task('htmlmin', () => {
      return gulp.src('html/*.html')
        .pipe(htmlmin({ collapseWhitespace: true, removeComments: true, minifyCSS: true, minifyJS: true }))
        .pipe(gulp.dest('minified/html/'));
    });