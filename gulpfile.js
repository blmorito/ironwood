const gulp = require('gulp')
const util = require('gulp-util')
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')
const concat = require('gulp-concat')
const extend = require('gulp-html-extend')
const del = require('del')
const babel = require('gulp-babel')
const reload = browserSync.reload
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');

const buildFolder = 'site';
const npmPath = "./node_modules";

gulp.task('build:scripts', () => gulp
    .src('./src/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(`${buildFolder}/js`))
    .pipe(reload({
        stream: true
    }))
    .on('error', util.log)
)

gulp.task('build:html', () => gulp
    .src('./src/html/*.html')
    .pipe(extend({
        annotations: true,
        verbose: false
    }))
    .pipe(gulp.dest(`${buildFolder}/`))
    .pipe(reload({
        stream: true
    }))
    .on('error', util.log)
)

gulp.task('build:styles', () => gulp
    .src('./src/scss/styles.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
        css: 'stylesheets',
        sass: 'src/sass'
    }))
    .pipe(autoprefixer({
        browsers: ['last 2 versions']
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(`${buildFolder}/css`))
    .pipe(reload({
        stream: true
    }))
    .on('error', util.log)
)

gulp.task('clean', (callback) => {
    del([buildFolder])
    callback()
})

gulp.task('make-list:html', () => gulp
    .src('./src/html/*.html')
    .pipe(require('gulp-filelist')('files.json'))
    .pipe(gulp.dest(`${buildFolder}/`))
    .pipe(reload({
        stream: true
    }))
    .on('error', util.log)
)

gulp.task('copy:plugins:js', () => gulp
    .src([
        `${npmPath}/jquery/dist/jquery.min.js`,
        `${npmPath}/bootstrap/dist/js/bootstrap.min.js`
    ])
    .pipe(gulp.dest(`${buildFolder}/js`))
    .pipe(reload({
        stream: true
    }))
    .on('error', util.log)
)
gulp.task('copy:plugins:css', () => gulp
    .src([

    ])
    .pipe(gulp.dest(`${buildFolder}/css`))
    .pipe(reload({
        stream: true
    }))
    .on('error', util.log)
)

gulp.task('copy:images', () => gulp
    .src('./src/img/**/*')
    .pipe(gulp.dest(`${buildFolder}/img/`))
    .pipe(reload({
        stream: true
    }))
    .on('error', util.log)
)
gulp.task('copy:videos', () => gulp
    .src('./src/videos/**/*')
    .pipe(gulp.dest(`${buildFolder}/videos/`))
    .pipe(reload({
        stream: true
    }))
    .on('error', util.log)
)
gulp.task('copy:fonts', () => gulp
    .src('./src/fonts/**/*')
    .pipe(gulp.dest(`${buildFolder}/fonts/`))
    .pipe(reload({
        stream: true
    }))
    .on('error', util.log)
)

// Builds site anew.
gulp.task('build', ['build:scripts', 'build:styles', 'build:html', 'copy:plugins:js', 'copy:plugins:css','copy:images','copy:videos', 'copy:fonts', 'make-list:html'], (callback) => {
    browserSync.reload();
    callback()
})

gulp.task('serve', ['build'], () => {
    browserSync.init({
        server: buildFolder,
        ghostMode: false, // Toggle to mirror clicks, reloads etc. (performance)
        // logFileChanges: true,
        // logLevel: 'debug',
        open: true, // Toggle to automatically open page when starting.
        single: true,
        startPath: '/browse.html'
    })

    // Watch site settings.
    gulp.watch('./src/html/**/*.html', ['build:html'])

    // Watch .scss files; changes are piped to browserSync.
    gulp.watch(['./src/scss/**/*.scss'], ['build:styles'])

    // Watch .js files.
    gulp.watch(['./src/js/**/*.js'], ['build:scripts'])

    //watch images & videos
    gulp.watch(['./src/img/**/*'], ['copy:images'])
    gulp.watch(['./src/videos/**/*'], ['copy:videos'])
})


/**********************
 * For Production (Remove sourcemaps + minify)
 **********************/
gulp.task('build:prod:scripts', () => gulp
    .src('./src/js/**/*.js')
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(concat('main.js'))
    .pipe(gulp.dest(`${buildFolder}/js`))
    .pipe(reload({
        stream: true
    }))
    .on('error', util.log)
)

gulp.task('build:prod:styles', () => gulp
    .src('./src/scss/styles.scss')
    .pipe(sass({
        css: 'stylesheets',
        sass: 'src/sass'
    }))
    .pipe(autoprefixer({
        browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest(`${buildFolder}/css`))
    .pipe(reload({
        stream: true
    }))
    .on('error', util.log)
)

gulp.task('build:prod', ['build:prod:scripts', 'build:prod:styles', 'build:html', 'copy:plugins:js', 'copy:plugins:css', 'copy:images','copy:videos', 'copy:fonts']);