const paths = require('./paths');
const appEntry = require("./getEntry");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const getMeta = require('./getMeta');

const isEnvProduction = process.env.NODE_ENV === 'production';

function pluginConfig(config = {}) {
    return Object.assign(
        {
            ...config
        },
        getMeta(),
        {
            inject: true,
            template: paths.appHtml,
        },
        isEnvProduction
            ? {
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    keepClosingSlash: true,
                    minifyJS: true,
                    minifyCSS: true,
                    minifyURLs: true,
                },
            }
            : undefined
    )
}
function getHtmlWebpackPlugin() {

    if (paths.multiPage) {
        return Object.keys(appEntry).map(name => new HtmlWebpackPlugin(pluginConfig({
            filename: `${name}.html`,
            chunks: [name]
        })));
    } else {
        return [new HtmlWebpackPlugin(pluginConfig({}))];
    }
}

module.exports = getHtmlWebpackPlugin;