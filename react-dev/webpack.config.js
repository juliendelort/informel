const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

// THIS ONLY APPLIES TO DEV MODE (npm run dev)
// WEBPACK IS NOT USED FOR npm run build

// https://medium.com/@harshverma04111989/basic-setup-for-react-application-without-cra-8f885d9dbbf
module.exports = {
    entry: './index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'build'),
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
            filename: 'index.html'
        })
    ],
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
        modules: [path.resolve(__dirname, 'node_modules')]
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }
            }
        }, {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        },]
    }
};
