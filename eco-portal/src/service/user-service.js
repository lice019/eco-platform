/*
用户模块
 */
'use strict';
var _common = require('util/commonUtils');

var _user = {
    // 用户登录
    login: function (userInfo, resolve, reject) {
        _common.request({
            url: '/user/login.do',
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    //获取用户信息
    checkLogin(resolve, reject) {
        _common.request({
            url: '/user/get_user_info.do',
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    //退出登录
    logout(resolve, reject) {
        _common.request({
            url: '/user/logout.do',
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    // 检查用户名
    checkUsername: function (username, resolve, reject) {
        _common.request({
            url: '/user/check_valid.do',
            data: {
                type: 'username',
                criteria: username
            },
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    //用户注册
    register(userInfo, resolve, reject) {
        _common.request({
            url: '/user/register.do',
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject

        })
    }
};


module.exports = _user;