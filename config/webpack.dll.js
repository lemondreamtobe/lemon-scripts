
const paths = require('./paths');
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
		dll: [
            'react',
            'react-dom',
            'react-router',
            'react-router-dom',
            'mobx',
            'mobx-react-lite',
            'history',
        ],
	},
	output: {
        path: paths.appBuild,
		filename: "dll.[name]_[hash].js",
		library: "[name]_[hash]"
	},
	plugins: [
		new webpack.DllPlugin({
			path: path.join(paths.appBuild, "[name]-manifest.json"),
			name: "[name]_[hash]"
		})
	]
}