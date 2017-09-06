var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LoginProxy = (function (_super) {
    __extends(LoginProxy, _super);
    function LoginProxy($controller) {
        var _this = _super.call(this, $controller) || this;
        /**注册从服务器返回消息的监听 */
        _this.receiveServerMsg(LoginConsts.LOGIN_S2C, _this.loginSuccess, _this);
        return _this;
    }
    /**
     * 用户登录
     */
    LoginProxy.prototype.login = function (userName, pwd) {
        var msg = new proto.c_LoginAccount();
        msg.userName = userName;
        msg.password = pwd;
        this.sendSocketMsg(msg);
    };
    /**
     * 用户登录成功返回
     */
    LoginProxy.prototype.loginSuccess = function (obj) {
        this.applyFunc(LoginConsts.LOGIN_S2C, obj);
    };
    return LoginProxy;
}(BaseProxy));
__reflect(LoginProxy.prototype, "LoginProxy");
//# sourceMappingURL=LoginProxy.js.map