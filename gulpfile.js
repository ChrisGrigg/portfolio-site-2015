var gulp = require("gulp");

// plugins
var concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename"),
    jshint = require("gulp-jshint"),
    stylish = require("jshint-stylish"),
    sass = require("gulp-sass"),
    stripDebug = require("gulp-strip-debug"),
    htmlmin = require("gulp-htmlmin"),
    newer = require("gulp-newer"),
    connect = require("gulp-connect-multi")(),
    rimraf = require("gulp-rimraf"),
    browserify = require("browserify"),
    source = require("vinyl-source-stream"),
    streamify = require("gulp-streamify"),
    gutil = require("gulp-util");

var paths = {
    all_js: "js/**.js",
    load_js: "js/load.js",
    js: [
        "js/app.js",
        "js/*/*.js"
    ],
    scss: "css/app.scss",
    html: [
        "index.html",
        "templates/**/*.html"
    ],
    libs: "js/load.js",
    libs_css: [
        "./bower_components/bootstrap/dist/css/bootstrap.min.css"
    ],
    json: "json/**",
    favicon: "favicon*.png",
    assets: [
        "assets/imgs/**",
        "assets/pdfs/**"
    ],
    fonts: [
        "assets/fonts/**",
        "./bower_components/bootstrap/fonts/**"
    ],
    root: __dirname,
    dest: "www",
    dest_js: "www/js",
    dest_css: "www/css",
    dest_assets: "www/assets",
    dest_fonts: "www/fonts"
};


// check code quality
gulp.task("lint", function() {
    gulp.src(paths.all_js)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

// strip debug statements, concatenate & minify js
gulp.task("scripts", function() {
    gulp.src(paths.js)
        .pipe(stripDebug())
        .pipe(concat("site.js"))
        .pipe(uglify({mangle: false}))
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest(paths.dest_js))
        .pipe(connect.reload());
});

// use browserify to load libraries and copy over as new file 'libs.min.js'
gulp.task("libs", function() {
    browserify(paths.libs)
        .bundle()
        .pipe(source("libs.js"))
        .pipe(streamify(uglify()))
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest(paths.dest_js));
});

// compile sass and copy over third party css
gulp.task("style", function() {
    gulp.src(paths.scss)
        .pipe(sass({outputStyle: "compressed"}))
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest(paths.dest_css))
        .pipe(connect.reload());

    gulp.src(paths.libs_css)
        .pipe(concat("libs.css"))
        .pipe(gulp.dest(paths.dest_css));
});

// minify html & copy over
gulp.task("html", function() {
    gulp.src(paths.html, {base: paths.root})
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(paths.dest))
        .pipe(connect.reload());
});

gulp.task("copy", function() {
    gulp.src([paths.json, paths.favicon], {base: paths.root})
        .pipe(newer(paths.dest))
        .pipe(gulp.dest(paths.dest))
        .pipe(connect.reload());
});

gulp.task("assets", function() {
    gulp.src(paths.assets, {base: "assets"})
        .pipe(newer(paths.dest_assets))
        .pipe(gulp.dest(paths.dest_assets))
        .pipe(connect.reload());
});

gulp.task("fonts", function() {
    gulp.src(paths.fonts)
        .pipe(gulp.dest(paths.dest_fonts));
});

gulp.task("build", ["lint", "scripts", "libs", "style", "html", "copy", "assets", "fonts"]);

gulp.task("connect", connect.server({
    root: ["www"],
    port: 1337,
    livereload: true,
    open: {
        browser: "chrome" // if not working OS X browser: "Google Chrome"
    }
}));

// watch for changes
gulp.task("watch", function() {
    gulp.watch(paths.js, ["lint", "scripts"]);
    gulp.watch(paths.scss, ["sass"]);
    gulp.watch(paths.html, ["html"]);
    gulp.watch([paths.json, paths.favicon], ["copy"]);
    gulp.watch(paths.assets, ["assets"]);
});

// empty destination directory
gulp.task("clean", function() {
    gulp.src(paths.dest)
        .pipe(rimraf());
});

// Default Task
gulp.task("default", ["build", "connect", "watch"]);