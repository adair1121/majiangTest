var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ViewLogin = (function (_super) {
    __extends(ViewLogin, _super);
    function ViewLogin($controller, $parent) {
        var _this = _super.call(this, $controller, $parent) || this;
        _this.clickState = false;
        _this.skinName = "ViewLoginSkin";
        return _this;
    }
    /**
     * 对面板进行初始化
     */
    ViewLogin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
    };
    /**
     * 对面板数据进行初始化
     */
    ViewLogin.prototype.initData = function () {
        _super.prototype.initData.call(this);
    };
    /**
     * 面板开启执行函数
     */
    ViewLogin.prototype.open = function (param) {
    };
    /**
     * 面板关闭执行函数
     */
    ViewLogin.prototype.close = function (param) {
        this.clickState = false;
    };
    ViewLogin.prototype.onTouchHandler = function (evt) {
        var _this = this;
        switch (evt.target) {
            case this.btnLogin:
                if (!this.clickState) {
                    this.clickState = true;
                    var ip = this.ip.text;
                    if (!ip) {
                        ip = Config.gameHost;
                    }
                    SocketManager.getInstance().connectServer(ip, Config.gamePort, function () {
                        if (Config.connectState) {
                            _this.clickState = false;
                            var account = GlobalFunc.guid();
                            var pwd = "111111";
                            // egret.localStorage.clear();
                            // if(!account){
                            // 	account = GlobalFunc.guid();
                            // 	egret.localStorage.setItem("account",account);
                            // }
                            // if(!pwd){
                            // 	pwd = "111111";
                            // 	egret.localStorage.setItem("pwd",pwd);
                            // }
                            _this.applyFunc(LoginConsts.LOGIN_C2S, { userName: account, pwd: pwd });
                        }
                        else {
                            alert("连接错误");
                            _this.clickState = false;
                        }
                    }, this);
                }
                else {
                    alert("正在连接");
                }
                break;
            case this.wxLogin:
                break;
        }
    };
    ViewLogin.prototype.loginSuccess = function () {
    };
    return ViewLogin;
}(BaseEuiView));
__reflect(ViewLogin.prototype, "ViewLogin");
//# sourceMappingURL=ViewLogin.js.map