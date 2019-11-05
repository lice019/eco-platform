/*
* @Author:lice
* @Date: 2019-11-2
* @Desc：webpack配置文件
 */

var path = require('path'); //node内置模块
var webpack = require('webpack'); //引入webpack模块
var WebpackDevServer = require("webpack-dev-server");  //引入webpack-dev-server
var ExtractTextPlugin = require('extract-text-webpack-plugin');//单独处理css
var HtmlWebpackPlugin = require('html-webpack-plugin');
var _common = require('./src/utils/commonUtils');

//环境变量的配置  dev-开发环境  online-线上环境
//process是nodejs的内置对象
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);

var webpackConfig = {
    devtool: 'cheap-module-source-map',
    //模式：development-开发模式  production-生成环境
    mode: "development",
    //入口文件，多入口文件
    entry: {
        'common': ['./src/page/common/index.js', 'webpack-dev-server/client?http://localhost:8088/'],
        'index': ['./src/page/index/index.js'],
        'user-login': ['./src/page/user-login/index.js', 'webpack-dev-server/client?http://localhost:8088/'],
        'user-register':['./src/page/user-register/index.js'],
        'result': ['./src/page/result/index.js'],
    },
    //输出
    output: {
        path: path.resolve(__dirname, 'dist/'),  //打包存放文件的路径
        publicPath: '/dist',   //webpack-dev-server访问的路径
        //js文件夹分类
        filename: "js/[name].js"
    },
    //别名机制
    resolve: {
        alias: {
            node_modules: __dirname + '/node_modules',
            util: __dirname + '/src/utils',
            page: __dirname + '/src/page',
            service: __dirname + '/src/service',
            image: __dirname + '/src/image',
        }
    },
    //加入外部的模块和变量
    externals: {
        //加入外部依赖jQuery
        'jquery': 'window.jQuery',
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
            {
                test: /\.(gif|png|jpg|woff|svg|ttf|eot|woff2|woff)\??.*$/,
                loader: 'file-loader?limit=50000&name=resource/[name].[ext]'
            },
            {test: /\.string$/, loader: 'html-loader'},


        ]
    },
    plugins: [
        //使用CommonsChunkPlugin提取公共js/base.js模块
        // 独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
        }),
        // 把css单独打包到文件里
        new ExtractTextPlugin("css/[name].css"),
        //HTML模板的处理
        new HtmlWebpackPlugin(handleHtmlTemplates('index', '首页')),
        new HtmlWebpackPlugin(handleHtmlTemplates('user-login', '用户登录')),
        new HtmlWebpackPlugin(handleHtmlTemplates('user-register', '用户注册')),
        new HtmlWebpackPlugin(handleHtmlTemplates('result', '操作结果')),
    ],

    //webpack-dev-server代理
    devServer: {
        historyApiFallback: true,
        contentBase: "./",
        quiet: false, //控制台中不输出打包的信息
        noInfo: false,
        hot: true, //开启热点
        inline: true, //开启页面自动刷新
        lazy: false, //不启动懒加载
        progress: true, //显示打包的进度
        watchOptions: {
            aggregateTimeout: 300
        },
        port: '8088', //设置端口号
        //代理请求
        proxy: {
            '/**/*.do': {
                target: 'http://localhost:8081',
                secure: false
            }
        }

    }


};

/*
 *  封装HTML模板处理函数
 */

function handleHtmlTemplates(name, title) {
    return {
        template: './src/view/' + name + '.html',
        filename: 'view/' + name + '.html',
        title: title,
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