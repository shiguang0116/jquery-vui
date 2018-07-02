'use strict'
const glob    = require('glob')
const path    = require('path')
const config  = require('./config.js');

const pageObj = {
    'index'                 : { title: '首页' },
    'demo'                  : { title: '组件用例' },
}

const util = {}

util.assetsPath = function (_path) {
    const assetsSubDirectory = config.assetsSubDirectory
    return path.posix.join(assetsSubDirectory, _path)
}

util.title = function (name) {
    return pageObj[name] ? pageObj[name].title : '及时油'
}

util.getEntries = function (globPath) {
    let entries = {}
    // 读取src目录,并进行路径裁剪
    glob.sync(globPath).forEach(function (entry) {
        let tmp = entry.split('/').slice(-3)
        let moduleName = tmp.slice(1, 2);
        entries[moduleName] = entry
    });
    return entries;
}

util.trim = function (str) { 
    return str.replace(/(^\s*)|(\s*$)/g, ""); 
}

module.exports = util;