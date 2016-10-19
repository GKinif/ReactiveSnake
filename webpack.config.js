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
            { test: /\.scss$/, loader: 'style!css!sass' },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: "file-loader?name=images/img-[hash:6].[ext]"
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname),
        stats: 'errors-only',
    }
};