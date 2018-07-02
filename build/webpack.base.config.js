/**
 * 公共配置
 */

'use strict'
const webpack           = require('webpack');
const path              = require('path');
const autoprefixer      = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const util              = require('./util.js');

// 配置
const webpackBaseConfig = {
    module: {
        rules: [
            { 
                test: /\.css$/, 
                use: ExtractTextPlugin.extract({  
                    fallback: "style-loader",  
                    use: ['css-loader','postcss-loader']
                })
            },
            { 
                test: /\.less$/, 
                use: ExtractTextPlugin.extract({  
                    fallback: "style-loader",  
                    use: [
                        { loader: 'css-loader' },
                        {
                            loader: 'postcss-loader',
                        },
                        { loader: 'less-loader' },
                    ]
                }) 
            },
            { 
                test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)\??.*$/, 
                loader: 'url-loader',
                options: {
                    limit: 1024,
                    name: util.assetsPath('image/[name].[ext]')
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
        ]
    },
    externals : {
        'jquery' : 'window.jQuery'  //在编译时，看到require('jquery')，就把它替换成window.jQuery
    },
    // 配置路径
    resolve : {
        extensions: ['.js', ',json'],
        alias : {
            
        },
    },
    plugins: [
        // 打包css
        new ExtractTextPlugin('styles/[name].css'),
    ]
};

module.exports = webpackBaseConfig;
