/*
* @Author:lice
* @Date: 2019-11-2
* @Desc：webpack配置文件
 */

const path = require('path'); //node内置模块
const webpack = require('webpack'); //引入webpack模块
const ExtractTextPlugin = require('extract-text-webpack-plugin');//单独处理css
var HtmlWebpackPlugin = require('html-webpack-plugin');

//环境变量的配置  dev-开发环境  online-线上环境
//process是nodejs的内置对象
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);

var webpackConfig = {
    //模式：development-开发模式  production-生成环境
    mode: "development",
    //入口文件，多入口文件
    entry: {
        'common': ['./src/page/common/index.js'],
        'index': ['./src/page/index/index.js'],
        'login': ['./src/page/login/index.js']
    },
    //输出
    output: {
        path: path.resolve(__dirname, 'dist/'),  //打包存放文件的路径
        publicPath: '/dist',   //webpack-dev-server访问的路径
        //js文件夹分类
        filename: "js/[name].js"
    },
    //加入外部的模块和变量
    externals: {
        //加入外部依赖jQuery
        'jquery': 'window.jQuery',
    },
    module: {
        loaders: [
            //单独处理css
            {test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')},
            {test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]'},
        ]
    },
    plugins: [
        //使用CommonsChunkPlugin提取公共js/base.js模块
        new webpack.optimize.CommonsChunkPlugin({
            //文件名--通用的入口common
            name: 'common',
            //输出文件名称
            filename: 'js/base.js'
        }),
        //CSS单独处理输出文件
        new ExtractTextPlugin("css/[name].css"),
        //HTML模板的处理
        new HtmlWebpackPlugin(handleHtmlTemplates('index')),
        new HtmlWebpackPlugin(handleHtmlTemplates('login')),
    ],


};

/*
 *  封装HTML模板处理函数
 */

function handleHtmlTemplates(name) {
    return {
        template: './src/view/' + name + '.html',
        filename: 'view/' + name + '.html',
        hash: true,
        inject: true,
        //会将common.js和index.js文件引入到HTML页面
        chunks: ['common', name]
    };
};

if ('dev' === WEBPACK_ENV) {
    webpackConfig.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}
module.exports = webpackConfig;