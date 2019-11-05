/*
顶头导航
 */
require('./nav.css');
var _common = require('util/commonUtils');
var _user = require('service/user-service');

//导航
var nav = {
    //初始化方法
    init() {
        this.loadUserInfo();
        this.bindEvent();
        return this;

    },
    bindEvent() {

        //登录
        $('.js-login').click(function () {
            _common.doLogin();
        });

        //注册事件
        $('.js-register').click(function () {
            window.location.href = './user-register.html'
        });
        //退出登录事件
        $('.js-logout').click(function () {
            _user.logout(function (res) {
                window.location.reload();
            }, function (errMsg) {
                _common.errorTips(errMsg);
            })
        });

    },
    // 加载用户信息
    loadUserInfo: function () {
        _user.checkLogin(function (res) {
            $('.user.not-login').hide().siblings('.user.login').show()
                .find('.username').text(res.username);
        }, function (errMsg) {
            // do nothing
        });
    },
};

module.exports = nav.init();