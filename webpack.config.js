var path = require("path");

module.exports = {
    devtool: 'source-map',
    entry: ['babel-polyfill', './src/app.js'],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.scss$/, loader: 'style!css?sourceMap!sass?sourceMap' },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    devServer: {
        stats: 'errors-only',
    }
};