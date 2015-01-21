
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    gStreamify = require('gulp-streamify'),
    source = require("vinyl-source-stream"),
    browserify = require('browserify'),
    CombinedStream = require('combined-stream'),
    path = require('path');

var CONFIG = {
    mainScriptPath: './js/main.js',
    serverReactConfig: './js/config/serverReactComponents.js',
    dist: {
        bundlesPath: './js/dist/',
        bundleName: 'bundle.js',
        serverBundleName : 'serverBundle.js'
    }
};

gulp.task('clientBundle', function () {
    return scripts(CONFIG.mainScriptPath, true);
});

gulp.task('clientBundle2', function () {
    return scripts('./js/main2.js', false);
});

gulp.task('serverBundle', function () {
    return scripts(null, true);
});

gulp.task('default', ['clientBundle', 'clientBundle2', 'serverBundle']);

//hints here
//http://blog.avisi.nl/2014/04/25/how-to-keep-a-fast-build-with-browserify-and-reactjs/
function scripts(mainScriptPath, exposeServerVariables) {

    var isServerBundle = !mainScriptPath;
    
    var production = false;
    if (process.env.NODE_ENV === 'Release' && !isServerBundle) {
        production = true;
    }

    var entryPointScript = !isServerBundle && mainScriptPath/*CONFIG.mainScriptPath*/,
        outputScript = isServerBundle ? CONFIG.dist.serverBundleName : path.basename(mainScriptPath)/*CONFIG.dist.bundleName*/;

    var browserifyOptions = {
        basedir: __dirname,
        debug: !production,
        extensions: ['.jsx', '.js'],
        //cache: {}, // required for watchify
        //packageCache: {}, // required for watchify
        //fullPaths: watch // required to be true only for watchify
    };

    var bundler = isServerBundle ? browserify(browserifyOptions) : browserify(entryPointScript, browserifyOptions);
    
    var stream = exposeServerVariables ? exposeServerComponents(bundler) : bundler.bundle();
   
    //setup bundled script name
    stream = stream.pipe(source(outputScript));
    
    //minification
    if (production) {
        stream.pipe(gStreamify(uglify()));
    }

    return stream.pipe(gulp.dest(CONFIG.dist.bundlesPath));
}

//idea taken from 
//http://janekk.github.io/tech/2014/07/25/aspnet-mvc-reactjs-browserify.html
function exposeServerComponents(browserifyBundler) {

    var serverComponents = require(CONFIG.serverReactConfig),
        os = require('os'),
        
        exposedVariables = '',
        requires = [];

    requires.push({ file: "react" });
    exposedVariables += 'var React = require("react");' + os.EOL;

    for (var i = 0; i < serverComponents.length; i++) {
        var component = serverComponents[i],
            moduleName = path.basename(component, path.extname(component));

        //expose option NEEDED for proper 'require' call in runtime
        requires.push({ file: component, expose: moduleName });
        exposedVariables += 'var ' + moduleName + ' = React.createFactory(require("' + moduleName + '"));' + os.EOL;
    }
    
    var bundleStream = CombinedStream.create();
    //load server side rendered components
    browserifyBundler.require(requires);
    bundleStream.append(browserifyBundler.bundle());
    //expose compoenents for usage in runtime
    bundleStream.append(exposedVariables);

    return bundleStream;
}