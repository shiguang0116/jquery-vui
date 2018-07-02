/**
 * 本地预览
 */

'use strict'
const webpack           = require('webpack');
const path              = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const util              = require('./util.js');
const merge             = require('webpack-merge');
const config            = require('./config.js');
const webpackBaseConfig = require('./webpack.base.config.js');

const webpackConfig = merge(webpackBaseConfig, {
    entry: Object.assign(util.getEntries('./example/pages/**/*.js'),
        {'app' : ['@/main.js']}
    ),
    output: {
        path        : config.assetsRoot,   //存放打包后文件的输出目录 
        filename    : 'js/[name].js',
        publicPath  : config.assetsPublicPath, //指定资源文件引用的目录 
    },
    devServer: {
        contentBase: config.assetsRoot, //本地服务器所加载的页面所在的目录
        inline: true,
        host: config.host,
        port: config.port,
        open: true,
        openPage: config.autoOpenPage,
        proxy: config.proxyTable
    },
    // 配置路径
    resolve : {
        alias : {
            '@' :  path.resolve(__dirname, '../example'),
        },
    },
    plugins: [
        // 独立通用模块
        new webpack.optimize.CommonsChunkPlugin({
            name : 'app',
            minChunks: 3,
        }),
        // 复制文件
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../example/utils/js'),
                to: 'js/',
            }
        ],{
            // ignore: ['.*']  //忽略拷贝指定的文件
        })
    ]
});

// 配置html文件
const pages = util.getEntries('./example/pages/**/*.html')
for(let page in pages) {
    let title = util.title(page);
    let baseTitle = ' - 及时油';
    let conf = {
        template    : pages[page], 
        filename    : 'index/' + page + '.html',
        title       : title + baseTitle,
        favicon     : './favicon.ico',
        inject      : true,
        hash        : true,
        chunks      : ['app', page],
        chunksSortNode: 'dependency'
    }
    webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

module.exports = webpackConfig