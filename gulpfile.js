
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    gStreamify = require('gulp-streamify'),
    source = require("vinyl-source-stream"),
    browserify = require('browserify'),
    reactify = require('reactify'),
    through = require('through'),
    riotCompiler = require('riot/compiler/compiler'),
    CombinedStream = require('combined-stream'),
    //helpers
    path = require('path'),
    extend = require('util')._extend;


var CONFIG = {
    serverReactConfig: './js/config/serverReactComponents.js',
    dist: {
        bundlesPath: './js/dist/',
        serverBundleName : 'serverBundle.js'
    }
};

gulp.task('react-serverRenderBundle', function () {
    return scripts('./js/reactServerRender.js', {
        exposeServerVariables: true,
        reactify : true
    });
});

gulp.task('react-clientRenderBundle', function () {
    return scripts('./js/reactClientRender.js', {
        reactify: true
    });
});

gulp.task('angular-bundle', function () {
    return scripts('./js/ngApp.js');
});

gulp.task('riot-bundle', function () {
    return scripts('./js/riotApp.js', { riotify: true });
});

//bundle used for rendering React components on server-side
gulp.task('react-serverBundle', function () {
    return scripts(null, {
        exposeServerVariables: true,
        reactify: true
    });
});

gulp.task('default',
    [
        'react-serverRenderBundle',
        'react-clientRenderBundle',
        'react-serverBundle',
        'angular-bundle',
        'riot-bundle'
]);

//hints here
//http://blog.avisi.nl/2014/04/25/how-to-keep-a-fast-build-with-browserify-and-reactjs/
function scripts(entryPointScript, opts) {

    //default bunlde options
    var defaultOptions = { };
    //extend with specified in specific tasks
    var options = extend(defaultOptions, opts || {});

    //entry point script specified only for normal bundles
    //server bundle that uses React components is build dynamically 
    var isServerBundle = !entryPointScript;
    
    var production = false;
    if (process.env.NODE_ENV === 'Release' && !isServerBundle) {
        production = true;
    }
    
    //common browserify options
    var browserifyOptions = {
        basedir: __dirname,
        debug: !production,
        extensions: ['.jsx', '.js', '.tag'],
        //cache: {}, // required for watchify
        //packageCache: {}, // required for watchify
        //fullPaths: watch // required to be true only for watchify
    };
    
    //define browserify bundler and output script name
    var bundler,
        outputScript;
    
    if (isServerBundle) {
        bundler = browserify(browserifyOptions);
        outputScript = CONFIG.dist.serverBundleName;
    } else {
        bundler = browserify(entryPointScript, browserifyOptions);
        outputScript = path.basename(entryPointScript);
    }

    //transform JSX files to JS
    if (options.reactify) {
        bundler.transform(reactify);
    }
    
    //transform Riot TAG files to JS
    //TODO: replace with rioctify plugin when they release version with fixes
    //for now code taken directly from pull request
    if (options.riotify) {
        bundler.transform(function(file, o) {
            var opts = o;
            var content = '';

            return !file.match(/\.tag$/) ? through() : through(
                function(chunk) { // write
                    content += chunk.toString();
                },
                function() { // end
                    this.queue(riotCompiler.compile(content, opts));
                    this.emit('end');
                }
            );
        });
    }
    
    //expose React components used for server-side rendering
    //or proceed with normal files bundling
    var stream = options.exposeServerVariables
        ? exposeServerComponents(bundler)
        : bundler.bundle();
   
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