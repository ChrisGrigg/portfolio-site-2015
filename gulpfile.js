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
    connect = require("gulp-connect-multi")();



// check code quality
gulp.task("lint", function() {
    return gulp.src("js/**.js")
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

// strip debug statements, concatenate & minify js
gulp.task("scripts", function() {
    return gulp.src(["js/app.js", "js/*/*.js"])
        .pipe(stripDebug())
        .pipe(concat("site.js"))
        .pipe(rename({suffix: ".min"}))
        .pipe(uglify({mangle: false}))
        .pipe(gulp.dest("www/js"))
        .pipe(connect.reload());
});

// compile sass
gulp.task("sass", function() {
    return gulp.src("css/app.scss")
        .pipe(sass({outputStyle: "compressed"}))
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest("www/css"))
        .pipe(connect.reload());
});

// copy files to www directory
gulp.task("copy-index", function() {
    return gulp.src("index.html")
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest("www"))
        .pipe(connect.reload());
});
gulp.task("copy-templates", function() {
    return gulp.src("templates/**/*.html")
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest("www/templates"))
        .pipe(connect.reload());
});
gulp.task("copy-scripts", function() {
    return gulp.src("js/initialise.js")
        .pipe(gulp.dest("www/js"))
        .pipe(connect.reload());
});
gulp.task("copy-libs", function() {
    return gulp.src("libs/**")
        .pipe(newer("www/libs"))
        .pipe(gulp.dest("www/libs"))
        .pipe(connect.reload());
});
gulp.task("copy-assets", function() {
    return gulp.src("assets/imgs/**")
        .pipe(newer("www/assets/imgs"))
        .pipe(gulp.dest("www/assets/imgs"))
        .pipe(connect.reload());
});
gulp.task("copy-fonts", function() {
    return gulp.src("assets/fonts/**")
        .pipe(newer("www/assets/fonts"))
        .pipe(gulp.dest("www/assets/fonts"))
        .pipe(connect.reload());
});
gulp.task("copy-pdfs", function() {
    return gulp.src("assets/pdfs/**")
        .pipe(newer("www/assets/pdfs"))
        .pipe(gulp.dest("www/assets/pdfs"))
        .pipe(connect.reload());
});
gulp.task("copy-json", function() {
    return gulp.src("json/**")
        .pipe(newer("www/json"))
        .pipe(gulp.dest("www/json"))
        .pipe(connect.reload());
});
gulp.task("copy-favicon", function() {
    return gulp.src("favicon*.png")
        .pipe(newer("www"))
        .pipe(gulp.dest("www"));
});
gulp.task("copy", ["copy-index", "copy-templates", "copy-scripts", "copy-libs", "copy-assets", "copy-fonts", "copy-pdfs", "copy-json", "copy-favicon"]);
gulp.task("build", ["lint", "scripts", "sass", "copy"]);


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
    gulp.watch(["js/app.js", "js/*/*.js"], ["lint", "scripts"]);
    gulp.watch("css/**.scss", ["sass"]);
    gulp.watch("index.html", ["copy-index"]);
    gulp.watch("templates/**/*.html", ["copy-templates"]);
    gulp.watch("js/initialise.js", ["copy-scripts"]);
    gulp.watch("libs/**", ["copy-libs"]);
    gulp.watch("assets/imgs/**", ["copy-assets"]);
    gulp.watch("assets/fonts/**", ["copy-fonts"]);
    gulp.watch("assets/pds/**", ["copy-pdfs"]);
    gulp.watch("json/**", ["copy-json"]);
});


// Default Task
gulp.task("default", ["build", "connect", "watch"]);