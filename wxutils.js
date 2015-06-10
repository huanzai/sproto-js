function IsWx() {
    return navigator.userAgent.indexOf('MicroMessenger') !== -1;
}
function IsIos() {
    return navigator.userAgent.match(/ OS (\d+).*? Mac OS/) || false;
}
function GetWxJsApiSignature(appid, noncestr, timestamp, url) {
    var signature = null;
    $.ajax({
        async: false,
        url: "/wxbase",
        dataType: "json",
        data: {action: "get_jsapi_signature", appid:appid, noncestr: noncestr, timestamp: timestamp, url: url},
        success: function(data) {
            if (data.signature) {
                signature = data.signature;
            }
        },
        error: function() {
            signature = null;
        },
        timeout: 15000,
    });
    return signature;
}
function InitWx(appid, WxReadyCallBack) {
    var signature;
    var noncestr_ = randomString(16);
    var timestamp_ = Math.round(new Date().getTime()/1000);
    var url_ = location.href.split('#')[0];

    signature = GetWxJsApiSignature(appid, noncestr_, timestamp_, url_);

    if (!signature) {
        return false;
    }
    wx.config({
        debug: false,
        appId: appid,
        timestamp: timestamp_,
        nonceStr: noncestr_,
        signature: signature,
        jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'hideMenuItems'
        ]
    });
    wx.error(function(res) {alert(JSON.stringify(res));});
    wx.ready(WxReadyCallBack);
    
    return true;
    
}
function SetWxShareMsg(type, title, desc, link, img) {
    var func;
    if (type == "AppMessage") {
        func = wx.onMenuShareAppMessage;
    } else if (type == "Timeline") {
        func = wx.onMenuShareTimeline;
    } else {
        return false;
    }

    func({title: title, desc: desc, link: link, imgUrl: img});
}
function SetWxCleanMenu()
{
    wx.hideMenuItems({
        menuList:["menuItem:share:qq",
                  "menuItem:share:weiboApp",
                  //                      "menuItem:favorite",
                  "menuItem:openWithQQBrowser",
                  "menuItem:readMode",
                  "menuItem:copyUrl",
                  "menuItem:originPage",
                  "menuItem:share:email",
                  "menuItem:openWithSafari",
                  "menuItem:setFont"
                 ]
    });
}

function GetUserInfo(appid, code) {
    var info = null;
    $.ajax({
        async: false,
        url: "/weixin_api",
        dataType: "json",
        data: {appid: appid, code: code, action: "oauth_get_userinfo"},
        success: function(data) {
            info = data;
        },
        error: function(err) {
            return null;
        },
        timeout: 15000,
    });
    return info;
}
function randomString(len) {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxPos = $chars.length;
    var pwd = '';
    for (i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

