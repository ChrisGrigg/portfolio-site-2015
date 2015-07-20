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
    rimraf = require("gulp-rimraf");

var paths = {
    all_js: "js/**.js",
    js: ["js/app.js", "js/*/*.js"],
    scss: "css/app.scss",
    html: ["index.html", "templates/**/*.html"],
    init: "js/initialise.js",
    libs: "libs/**",
    json: "json/**",
    favicon: "favicon*.png",
    assets: ["assets/imgs/**", "assets/fonts/**", "assets/pdfs/**"],
    root: __dirname,
    dest: "www",
    dest_js: "www/js",
    dest_css: "www/css",
    dest_assets: "www/assets"
};


// check code quality
gulp.task("lint", function() {
    return gulp.src(paths.all_js)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

// strip debug statements, concatenate & minify js
gulp.task("scripts", function() {
    return gulp.src(paths.js)
        .pipe(stripDebug())
        .pipe(concat("site.js"))
        .pipe(uglify({mangle: false}))
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest(paths.dest_js))
        .pipe(connect.reload());
});
gulp.task("copy-scripts", function() {
    return gulp.src(paths.init)
        .pipe(gulp.dest(paths.dest_js))
        .pipe(connect.reload());
});

// compile sass
gulp.task("sass", function() {
    return gulp.src(paths.scss)
        .pipe(sass({outputStyle: "compressed"}))
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest(paths.dest_css))
        .pipe(connect.reload());
});

// minify html & copy over
gulp.task("html", function() {
    return gulp.src(paths.html, {base: paths.root})
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(paths.dest))
        .pipe(connect.reload());
});

gulp.task("copy", function() {
    return gulp.src([paths.libs, paths.json, paths.favicon], {base: paths.root})
        .pipe(newer(paths.dest))
        .pipe(gulp.dest(paths.dest))
        .pipe(connect.reload());
});

gulp.task("assets", function() {
    return gulp.src(paths.assets, {base: "assets"})
        .pipe(newer(paths.dest_assets))
        .pipe(gulp.dest(paths.dest_assets))
        .pipe(connect.reload());
});

gulp.task("build", ["lint", "scripts", "copy-scripts", "sass", "html", "copy", "assets"]);

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
    gulp.watch(paths.all_js, ["lint", "scripts"]);
    gulp.watch(paths.scss, ["sass"]);
    gulp.watch(paths.html, ["html"]);
    gulp.watch(paths.init, ["copy-scripts"]);
    gulp.watch([paths.libs, paths.json, paths.favicon], ["copy"]);
    gulp.watch(paths.assets, ["assets"]);
});

// empty destination directory
gulp.task("clean", function() {
    gulp.src(paths.dest)
        .pipe(rimraf());
});

// Default Task
gulp.task("default", ["build", "connect", "watch"]);