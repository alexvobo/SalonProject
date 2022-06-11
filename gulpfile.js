var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var pkg = require("./package.json");

// Copy vendor files from /node_modules into /vendor
// NOTE: requires `npm install` before running!
gulp.task("copy", function () {
  gulp
    .src(
      gulp.series(
        "node_modules/bootstrap/dist/**/*",
        "!**/npm.js",
        "!**/bootstrap-theme.*",
        "!**/*.map"
      )
    )
    .pipe(gulp.dest("vendor/bootstrap"));

  gulp
    .src(
      gulp.series(
        "node_modules/jquery/dist/jquery.js",
        "node_modules/jquery/dist/jquery.min.js"
      )
    )
    .pipe(gulp.dest("vendor/jquery"));

  gulp
    .src(
      gulp.series(
        "node_modules/popper.js/dist/umd/popper.js",
        "node_modules/popper.js/dist/umd/popper.min.js"
      )
    )
    .pipe(gulp.dest("vendor/popper"));

  gulp
    .src(gulp.series("node_modules/jquery.easing/*.js"))
    .pipe(gulp.dest("vendor/jquery-easing"));

  gulp
    .src(
      gulp.series(
        "node_modules/font-awesome/**",
        "!node_modules/font-awesome/**/*.map",
        "!node_modules/font-awesome/.npmignore",
        "!node_modules/font-awesome/*.txt",
        "!node_modules/font-awesome/*.md",
        "!node_modules/font-awesome/*.json"
      )
    )
    .pipe(gulp.dest("vendor/font-awesome"));
});

// Default task
gulp.task("default", gulp.series("copy"));

// Configure the browserSync task
gulp.task("browserSync", function () {
  browserSync.init({
    server: {
      proxy: "local.dev",
    },
  });
});

// Dev task with browserSync
gulp.task("dev", gulp.series("browserSync"), function () {
  // Reloads the browser whenever HTML or CSS files change
  gulp.watch("css/*.css", browserSync.reload);
  gulp.watch("*.html", browserSync.reload);
});
