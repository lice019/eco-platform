/*webpack核心构建配置文件*/


const path = require('path');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');  // 清理构建目录下的文件
const VueLoaderPlugin = require('vue-loader/lib/plugin');         // vue-loader 编译vue文件
const compiler = require('vue-template-compiler');           // 模板函数编译 与vue-loader配合使用
const HtmlWebpackPlugin = require('html-webpack-plugin');


const webpackConfig = {
    mode: "development",
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: "build.js",
        publicPath: ""  //script引入路径

    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',    // 告诉服务从哪提供代码内容(静态文件这么使用)
        hot: true,    //hot模式开启
        historyApiFallback: true
    },
    module: {
        rules: [
            //vue加载器
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            //ES6语法编译
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            //file-loader
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            },
            //style-loader&&css-loader
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(), // 告诉清理插件的目录
        new webpack.HotModuleReplacementPlugin(),  //热模块替换开启
        new VueLoaderPlugin(),                 //vue-loader插件开启
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
    ],
    resolve: {
        //引入路径是不用写对应的后缀名
        extensions: ['.js', '.vue', '.json'],
        alias: {
            //正在使用的是vue的运行时版本，而此版本中的编译器时不可用的，我们需要把它切换成运行时 + 编译的版本
            'vue$': 'vue/dist/vue.esm.js',
            //用@直接指引到src目录下
            '@': path.resolve(__dirname, './src'),
        }
    }


};


module.exports = webpackConfig;