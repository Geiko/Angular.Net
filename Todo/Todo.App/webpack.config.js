var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: __dirname + '/app',
    entry: {
        app: './app.js',
        vendor: ['angular', 'angular-ui-router', 'angular-resource']
    },
    output: {
        path: __dirname + '/bin/Debug/public/js',
        filename: 'app.bundle.js',
        sourceMapFilename: "app.bundle.js.map",
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: [
                        { loader: 'css-loader', query: { sourceMap: true } },
                        { loader: 'postcss-loader' }
                    ],
                })
            },
            {
                test: /\.html$/,
                loader: 'raw-loader'
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ name: "vendor", filename: "vendor.bundle.js" }),
        new ExtractTextPlugin({ filename: 'app.css', disable: false, allChunks: true }),
        new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map'
        })
    ],
    devServer: {
        port:8081,
        proxy: {
            "/api": 'http://localhost:9000'
        },
        publicPath: 'http://localhost:8081/js/',
        contentBase: __dirname + '\\bin\\Debug\\public',
        //stats: 'minimal'
    }
};