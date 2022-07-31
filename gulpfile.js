import gulp from "gulp";
import minify from "gulp-htmlmin";
import cleanCss from "gulp-clean-css";
import uglify from "gulp-uglify";
import gzip from "gulp-gzip";

import del from "del";

// Concat and minify CSS files
gulp.task("build-css", () => {
  return (
    gulp
      .src("assets/css/*.css")
      //.pipe(concat("main.css"))
      .pipe(cleanCss())
      .pipe(gulp.dest("build/assets/css"))
  );
});

// Concat and minify libraries JS files
gulp.task("build-vendor-css", () => {
  return (
    gulp
      .src("assets/vendor/**/*.css")
      //.pipe(concat("vendor-bundle.css"))
      .pipe(cleanCss())
      .pipe(gulp.dest("build/assets/vendor"))
  );
});

gulp.task("build-vendor-js", () => {
  return (
    gulp
      .src("assets/vendor/**/*.js")
      //.pipe(concat("vendor-bundle.js"))
      .pipe(uglify())
      .pipe(gulp.dest("build/assets/vendor"))
  );
});

// Concat and minify application specific JS files
gulp.task("build-js", () => {
  return (
    gulp
      .src("assets/js/*.js")
      //.pipe(concat("app.js"))
      .pipe(uglify())
      .pipe(gulp.dest("build/assets/js"))
  );
});

gulp.task("clean", async () => {
  return del.sync("build");
});

/**
 * Copy HTML files
 */

gulp.task("build-html", (cb) => {
  return gulp
    .src(["*.html"])
    .pipe(minify({ collapseWhitespace: true }))
    .pipe(gulp.dest("./build"));
});

/**
 * Copy assets images file
 */

gulp.task("build-images", (cb) => {
  return gulp
    .src(["assets/img/**/*.png", "assets/img/**/*.jpg", "assets/img/**/*.svg"])
    .pipe(gulp.dest("./build/assets/img"));
});

/**
 * Copy Boostrap icons file
 */

gulp.task("build-bootstrap-icons-files", (cb) => {
  return gulp
    .src(["assets/vendor/bootstrap-icons/*.json"])
    .pipe(gulp.dest("./build/assets/vendor/bootstrap-icons"));
});

gulp.task("build-bootstrap-icons-html", (cb) => {
  return gulp
    .src(["assets/vendor/bootstrap-icons/*.html"])
    .pipe(minify({ collapseWhitespace: true }))
    .pipe(gulp.dest("./build/assets/vendor/bootstrap-icons"));
});

gulp.task("build-bootstrap-icons-css", (cb) => {
  return gulp
    .src(["assets/vendor/bootstrap-icons/*.css"])
    .pipe(cleanCss())
    .pipe(gulp.dest("./build/assets/vendor/bootstrap-icons"));
});

gulp.task("build-bootstrap-icons-files", (cb) => {
  return gulp
    .src([
      "assets/vendor/bootstrap-icons/**/*.woff",
      "assets/vendor/bootstrap-icons/**/*.woff2",
    ])
    .pipe(gulp.dest("./build/assets/vendor/bootstrap-icons"));
});

// Start session
gulp.task("session-start", (cb) => {
  return gulp.series(
    "clean",
    "build-html",
    "build-css",
    "build-vendor-js",
    "build-vendor-css",
    "build-js",
    "build-images",
    "build-bootstrap-icons-files",
    "build-bootstrap-icons-html",
    "build-bootstrap-icons-css"
  )(cb);
});

// static server and watching CSS/JS/HTML files for changes
/* gulp.task("server", (done) => {
  browsersync.init({
    server: "./build",
    directory: true,
  });

  // Watch for file changes
  gulp.watch(
    "./src/css/*.css",
    gulp.series("session-start"),
    browsersync.reload
  );
  gulp.watch("./src/js/*.js", gulp.series("session-start"), browsersync.reload);
  gulp.watch(
    "./src/libs/*.js",
    gulp.series("session-start"),
    browsersync.reload
  );
}); */

gulp.task("default", gulp.series("session-start" /* , "server" */));
