const paths = require('./paths');
const path = require('path');

const outPut = (webpackEnv) => {
    const isEnvDevelopment = webpackEnv === 'development';
    const isEnvProduction = webpackEnv === 'production';

    return {
        // The build folder.
        path: paths.appBuild,
        // Add /* filename */ comments to generated require()s in the output.
        pathinfo: isEnvDevelopment,
        // There will be one main bundle, and one file per asynchronous chunk.
        // In development, it does not produce real files.
        filename: isEnvProduction
            ? (paths.multiPage ? 'static/[name]/[name].[contenthash:8].js' : 'static/js/[name].[contenthash:8].js')
            : isEnvDevelopment && paths.multiPage ? 'static/js/[name].bundle.js' : 'static/js/bundle.js',
        // There are also additional JS chunk files if you use code splitting.
        chunkFilename: isEnvProduction
            ? ('static/js/[name].[contenthash:8].chunk.js')
            : isEnvDevelopment && 'static/js/[name].chunk.js',
        assetModuleFilename: 'static/media/[name].[hash][ext]',
        // webpack uses `publicPath` to determine where the app is being served from.
        // It requires a trailing slash, or the file assets will get an incorrect path.
        // We inferred the "public path" (such as / or /my-project) from homepage.
        publicPath: paths.publicUrlOrPath,
        // Point sourcemap entries to original disk location (format as URL on Windows)
        devtoolModuleFilenameTemplate: isEnvProduction
            ? info =>
                path
                    .relative(paths.appSrc, info.absoluteResourcePath)
                    .replace(/\\/g, '/')
            : isEnvDevelopment &&
            (info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')),
    }
}

module.exports = outPut;