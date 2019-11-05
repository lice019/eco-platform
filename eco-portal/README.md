eco-portal 易购网门户平台

1、eco-portal平台
eco-portal是易购网平台的门户平台，提供给用户进行商品浏览和商品购买等功能的平台，仅用于PC端，故不采用响应式架构。

2、eco-portal技术选型
  （1）webpack4：eco-portal由于是电商平台网站，使用webpack模块化构建工具，构建多页面技术。
  （2）CommonJS：通用js，兼顾兼容性问题
  （3）JQuery：JS库
  （4）HTML：页面技术
  （3）CSS：样式兼顾兼容性问题
  
3、eco-portal项目目录结构

eco-portal
|--dist  
|--src
   |--image
   |--page
   |--service
   |--utils
   |--view
|--package.json
|--webpack.config.js
|--README.md


4、项目构建
（1）npm init -y      npm初始化，生成package.json
（2）创建src目录及以下目录结构
（3）webpack@1.15.0安装  局部安装  npm install --save-dev webpack@1.15.0
（4）创建webpack.config.js
（5）引入脚本jQuery  
（6）提取公共模块CommonsChunkPlugin
（7）单独提取CSS样式：npm install css-loader style-loader --save-dev
（8）单独处理CSS : npm install extract-text-webpack-plugin@1.0.1 --save-dev
      注意：
     由于webpack4以上不支持 extract-text-webpack-plugin插件
     再执行 npm install extract-text-webpack-plugin@next --save-dev
（9）安装HTML插件 ： npm install html-webpack-plugin --save-dev
   该插件两个作用：
   1、 为html文件中引入的外部资源如script、link动态添加每次compile后的hash，防止引用缓存的外部文件问题
   2、可以生成创建html入口文件，比如单页面可以生成一个html文件入口，配置N个html-webpack-plugin可以生成N个页面入口
（10）安装html-loader ：npm install html-loader --save-dev
       解决：html页面通用的抽取，通过<%=require('html-loader!./layout/html-head.html')%>方式引入
       
  (11)处理文字和图片引入：    npm install file-loader --save-dev    
  module-loaders中： 
   { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'file-loader?limit=100&name=resource/[name].[ext]' },

 （12）webpack-server-dev :npm install webpack-dev-server@1.16.5 --save-dev
    作用是：使用webpack的服务器，可以自动编译
    webpack-dev-server
    webpack-dev-server --inline --port 8088
    
（13）渲染HTML模板的插件
       npm install hogan --save      (不使用--save-dev，因为需要在代码里使用，不是仅限于开发)
（14）安装icon-font 
      npm install font-awesome --save
  
  