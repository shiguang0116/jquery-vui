/**
 * 生成jquery-vui文件
 */

'use strict'
const webpack               = require('webpack');
const path                  = require('path');
const ExtractTextPlugin     = require('extract-text-webpack-plugin');
const CleanWebpackPlugin    = require('clean-webpack-plugin');
const merge                 = require('webpack-merge');
const webpackBaseConfig     = require('./webpack.base.config.js');

const webpackConfig = merge(webpackBaseConfig, {
    entry: {
        'jquery-vui' : ['@/index.js']
    },
    output: {
        path        : path.resolve(__dirname, '../dist/'),   //存放打包后文件的输出目录 
        filename    : '[name].js',
        publicPath  : '/', //指定资源文件引用的目录 
    },
    // 配置路径
    resolve : {
        alias : {
            '@' : path.resolve(__dirname, '../src/'),
        },
    },
    plugins: [
        new CleanWebpackPlugin(['dist/*'], {
            root: path.resolve(__dirname, '../')
        })
    ]
});

module.exports = webpackConfig