const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const prodPlugins = [
    new ExtractTextPlugin("styles.css"),
];

const commonPlugins = [
    new webpack.LoaderOptionsPlugin({
        options: {
            postcss: { browsers: ['last 2 versions'] },
        }
    }),
    new HtmlWebpackPlugin({
        template: 'assets/html/index-template.html'
    })
];

const commonLoaders = [{
    test: /\.sass$/,
    loader: ["style", "css", "sass", "postcss"]
}, {
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'babel', // 'babel-loader' is also a valid name to reference
}];

const devLoaders = [{
    test: /\.scss$/,
    loaders: ["style", "css", "sass"]
}];

const prodLoaders = [{
    test: /\.sass$/,
    loader: ExtractTextPlugin.extract(["css", "sass", "postcss"])
}];

const plugins = commonPlugins;
const loaders = commonLoaders.concat(devLoaders);

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: "./js/main",
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js"
    },
    module: {
        loaders: loaders,
    },
    plugins: plugins,
};
