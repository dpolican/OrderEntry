var webpack = require('webpack');
var path = require('path');

var parentDir = __dirname;

module.exports = {
    entry: [
        path.join(parentDir, 'src/index.js')
    ],
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        }, {
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
        }, {
            test: /\.(woff|woff2|eot|ttf|otf|svg|png)$/,
            use: ['file-loader']
        }]
    },
    output: {
        path: parentDir + '/dist',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.join(parentDir, 'src/'),
        historyApiFallback: true
    }
}