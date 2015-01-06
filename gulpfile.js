
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    gStreamify = require('gulp-streamify'),
    source = require("vinyl-source-stream"),
    browserify = require('browserify'),
    watchify = require('watchify'),
    reactify = require('reactify');

var CONFIG = {
    mainScriptPath: './js/ShakaBrahApp.jsx',
    dist: {
        bundlesPath: './js/dist/',
        bundleName: 'bundle.js'
    }
};
gulp.task('scripts', function () {
    return scripts(false);
});

gulp.task('watchScripts', function () {
    return scripts(true);
});

function scripts(watch) {

    var production = false;
    if (process.env.NODE_ENV === 'Release') {
        production = true;
    }

    var bundler, rebundle;
    bundler = browserify(CONFIG.mainScriptPath, {
        basedir: __dirname,
        debug: !production,
        cache: {}, // required for watchify
        packageCache: {}, // required for watchify
        fullPaths: watch // required to be true only for watchify
    });
    
    if (watch) {
        bundler = watchify(bundler);
    }

    bundler.transform(reactify);
    
    rebundle = function () {
        var stream = bundler.bundle();
        
        stream = stream.pipe(source(CONFIG.dist.bundleName));
        
        if (production) {
            stream.pipe(gStreamify(uglify()));
        }

        //remove
        console.log('rebundle');
        
        return stream.pipe(gulp.dest(CONFIG.dist.bundlesPath));
    };

    bundler.on('update', rebundle);
    return rebundle();
}

gulp.task('default', ['scripts']);