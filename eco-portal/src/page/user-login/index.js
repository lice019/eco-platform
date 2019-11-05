/*
用户登录模块
 */
'use strict';
require('./index.css');
require('page/common/nav-simple/nav-simple.js');
var _common = require('util/commonUtils');
var _user = require('service/user-service');

//表单错误
var formError = {
    show: function (errMsg) {
        $('.error-item').show().find('.error-msg').text(errMsg);
    },
    hide: function () {
        $('.error-item').hide().find('.error-msg').text('');
    }
};

var inputEvent = {
    //input框聚焦事件
    focus() {
        $('#username').focus(function () {
            $("#username").css("border", "1px solid #f6f6f6");
            formError.hide();
        });
        $('#password').focus(function () {
            $("#password").css("border", "1px solid #f6f6f6");
            formError.hide();
        });
    }
};

var loginPage = {
    //初始化方法
    init() {
        this.bindEvent();
        inputEvent.focus();
    },
    bindEvent() {
        var _this = this;
        //登录按钮的点击
        $('#login-submit').click(function () {
            _this.submit();
        });
        //如果按下回车
        $('.user-content').keyup(function (e) {
            if (e.keyCode === 13) {
                _this.submit();
            }
        });

    },

    //登录按钮事件
    submit() {
        //获取input的值
        var formData = {
            username: $.trim($('#username').val()),
            password: $.trim($('#password').val())
        };
        var validResult = this.formValidate(formData);
        if (validResult.status) {
            //校验成功,提交
            _user.login(formData, function (res) {
                window.location.href = _common.getUrlParam('redirect') || './index.html';
            }, function (errMsg) {
                formError.show(errMsg);
            })
        } else {
            //检验失败，提示
            formError.show(validResult.msg);
        }
    },
    //表单校验
    formValidate(data) {
        var result = {
            status: false,
            msg: ''
        };
        if (!_common.validate('require', data.username)) {
            result.msg = '请输入用户名';
            $('#username').css("border", "1px solid #FFDEAD");
            return result;
        }
        if (!_common.validate('require', data.password)) {
            result.msg = '请输入密码';
            $('#password').css('border', "1px solid #FFDEAD");
            return result;
        }
        result.status = true;
        result.msg = '验证成功';
        return result;
    },


};

$(function () {
    loginPage.init();
});