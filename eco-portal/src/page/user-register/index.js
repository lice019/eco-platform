/*
用户注册
 */

'use strict';
require('./index.css');

var _common = require('util/commonUtils');
var _user = require('service/user-service');


// 表单里的错误提示
var formError = {
    show: function (errMsg) {
        $('.error-item').show().find('.error-msg').text(errMsg);
    },
    hide: function () {
        $('.error-item').hide().find('.error-msg').text('');
    }
};
var register = {
    init() {
        this.bindEvent();
    },
    bindEvent() {
        var _this = this;
        //异步校验用户是否存在
        //blur()方法，当输入框失去聚焦时触发
        $('#username').blur(function () {
            var username = $.trim($(this).val());
            //用户名为空，不做校验
            if (!username) {
                return;
            }
            _user.checkUsername(username, function (res) {
                formError.hide();
            }, function (errMsg) {
                formError.show(errMsg);
            })
        });

        // 注册按钮的点击
        $('#register-submit').click(function () {
            console.log("register")
            _this.registerSubmit();
        });
        // 如果按下回车，也进行提交
        $('.register-content').keyup(function (e) {
            // keyCode == 13 表示回车键
            if (e.keyCode === 13) {
                _this.registerSubmit();
            }
        });

    },

    //提交表单
    registerSubmit() {
        var formData = {
            username: $.trim($('#username').val()),
            password: $.trim($('#password').val()),
            passwordConfirm: $.trim($('#password-confirm').val()),
            phone: $.trim($('#phone').val()),
            email: $.trim($('#email').val()),
            question: $.trim($('#question').val()),
            answer: $.trim($('#answer').val())
        };
        //表单校验
        var result = this.formValidate(formData);
        if (result.status)
            console.log(result.status);
            _user.register(formData,function (res) {
                window.location.href = './result.html?type=register';
            },function (errMsg) {
                formError.show(errMsg);
            })
        },
    //表单校验
    formValidate(formData) {
        var result = {
            status  : false,
            msg     : ''
        };
        // 验证用户名是否为空
        if(!_common.validate(formData.username, 'require')){
            result.msg = '用户名不能为空';
            return result;
        }
        // 验证密码是否为空
        if(!_common.validate(formData.password, 'require')){
            result.msg = '密码不能为空';
            return result;
        }
        // 验证密码长度
        if(formData.password.length < 6){
            result.msg = '密码长度不能少于6位';
            return result;
        }
        // 验证两次输入的密码是否一致
        if(formData.password !== formData.passwordConfirm){
            result.msg = '两次输入的密码不一致';
            return result;
        }
        // 验证手机号
        if(!_common.validate(formData.phone, 'phone')){
            result.msg = '手机号格式不正确';
            return result;
        }
        // 验证邮箱格式
        if(!_common.validate(formData.email, 'email')){
            result.msg = '邮箱格式不正确';
            return result;
        }
        // 验证密码提示问题是否为空
        if(!_common.validate(formData.question, 'require')){
            result.msg = '密码提示问题不能为空';
            return result;
        }
        // 验证密码提示问题答案是否为空
        if(!_common.validate(formData.answer, 'require')){
            result.msg = '密码提示问题答案不能为空';
            return result;
        }
        // 通过验证，返回正确提示
        result.status   = true;
        result.msg      = '验证通过';
        return result;
    }

};

$(function () {
    register.init();
});