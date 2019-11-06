一、构建项目
项目采用webpack构建vue项目，作为架构

（1）在项目的目录下初始化package.json  npm init - y
（2）安装局部webpack    npm install webpack  --save-dev
（3）安装webpack脚手架（webpack@4.0以上，需要安装webpack脚手架）  npm install webpack-cli --save-dev
（4）安装webpack-dev-server nodejs的express小型服务器，用于自动编译
        npm install --save-dev webpack-dev-server
（5）安装label,label会将ES6的语法编译成浏览器识别的ES5（此处版本问题）
      npm install --save-dev babel-core babel-loader babel-preset-es2015
      npm i babel-loader @babel/core @babel/runtime @babel/preset-env @babel/plugin-proposal-class-properties @babel/plugin-transform-runtime -D

      根目录下创建 .babelrc文件
      文件内容：
      {
        "presets": ["@babel/preset-env"],
        "plugins": ["@babel/plugin-transform-runtime","@babel/plugin-proposal-class-properties"]
      }
（5）安装css-loader style-loader处理css样式
    npm install css-loader style-loader --save-dev
（6）安装file-loader url-loader处理打包文件和图片
    npm install file-loader url-loader --save-dev
（7）安装vue 默认最新(vue@2.6.10)  npm install vue --save
（8）安装vue模板编译器，用于编译.vue结尾的组件
    npm install --save-dev vue-loader vue-template-compiler
（9）安装vue路由  npm install --save-dev vue-router
（10）npm install --save-dev clean-webpack-plugin  用于构建项目时清理目录下的内容
（11）path 模块提供了一些工具函数，用于处理文件与目录的路径。 npm install --save-dev path
（12）项目的根目录下创建webpack.config.js配置文件
（13）项目根目录下创建index.html 单页面入口
（14）src下创建入口文件index.js 和App.vue入口vue组件
（15）安装html-webpack-plugin


