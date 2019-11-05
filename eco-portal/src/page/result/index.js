/*
*操作结果提示页面
 */
'use strict';

require('./index.css');
require('page/common/nav-simple/nav-simple');
var _common = require('util/commonUtils');


$(function () {
    //默认显示default
    var type = _common.getUrlParam('type') || 'default';
    //根据type值显示相应的操作结果
    var $element = $('.' + type + '-success');
    $element.show();
});
