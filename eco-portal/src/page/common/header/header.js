'use strict';
require('./header.css');
var _common = require('util/commonUtils');

//通用header的js
var header = {
    //初始化
    init() {
        this.bindEvent();
    },

    onLoad() {
        //  提取搜索框的搜索关键字
        var keyword = _common.getUrlParam('keyword');
        //如果keyword不为空，放到input框中
        if (keyword) {
            $('#search-input').val(keyword);
        }
    },

    //搜索框事件绑定
    bindEvent() {
        var _this = this;
        $('#search-btn').click(function () {
            _this.searchSubmit();
        });
        // 输入会车后，做搜索提交
        $('#search-input').keyup(function(e){
            // 13是回车键的keyCode
            if(e.keyCode === 13){
                _this.searchSubmit();
            }
        });
    },
    //搜索提交，调到list页面，将关键字带到list页面，剩下的交给list处理
    searchSubmit() {
        var keyword = $.trim($('#search-input').val());
        //如果keyWord没有，返回home.html
        if (keyword) {
            window.location.href = './list.html?keyword=' + keyword;
        } else {
            _common.goHome();
        }
    }
};


header.init();