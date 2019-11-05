/*
 * @Author:lice
 * @Date: 2019-11-3
 * @Desc:js的通用工具
 */


'use strict';
var Hogan = require('hogan.js'); //引入hogan的HTML模板的渲染

var conf = {
    serverHost: 'http://127.0.0.1:8088', //由于开发期的host和现在的一样:localhost，当服务器改变时，可以通过设定
};
var _common = {

    //通用请求request,使用jQuery的ajax
    request(param) {
        /*
         *  支传url也是可以请求的
         */
        var _this = this;
        $.ajax({
            type: param.method || 'get',
            url: param.url || '',
            dataType: param.type || 'json',  //默认使用json
            data: param.data || '',  //请求参数
            success: function (res) {  //请求成功回调
                //请求成功
                if (200 === res.status) {
                    typeof param.success === 'function' && param.success(res.data, res.msg)
                }
                //用户没用登录状态，需要登录
                else if (10 === res.status) {
                    _this.doLogin();
                }
                //请求成功，参数不合法
                else if (201 === res.status) {
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            //浏览器请求错误：404
            error: function (err) { //请求失败回调
                typeof param.error === 'function' && param.error(err.statusText);
            }
        })
    },

    //统一处理登录，如果登录成功，调回原来的页面
    doLogin() {
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    //跳回主页
    goHome() {
        window.location.href = './index.html';
    },

    //获取服务器地址
    getServerURL(path) {
        return conf.serverHost + path;
    },

    //获取url的参数
    getUrlParam(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        return result ? encodeURIComponent(result[2]) : null;
    },
    //渲染HTML默认
    renderHtml(htmlTemplates, data) {
        var template = Hogan.compile(htmlTemplates);
        var result = template.render(data);
        return result;
    },
    /*
    * 封装提示
     */
    //成功提示
    successTips(msg) {
        alert(msg || '操作成功！');
    },
    //错误提示
    errorTips(msg) {
        alert(msg || '操作失败！')
    },

    //form表单检验
    //字段验证：支持非空、手机、邮箱
    validate(type, value) {
        //去掉value的空值
        var value = $.trim(value);
        //非空验证
        if ('require' === type) {
            return !!value;
        }
        //手机号验证
        if ('phone' === type) {
            return /^1\d{10}$/.test(value)
        }
        //邮箱格式验证
        if ('email' == type) {
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    }

};


module.exports = _common;