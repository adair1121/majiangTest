var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LoginConsts = (function () {
    function LoginConsts() {
    }
    return LoginConsts;
}());
LoginConsts.LOGIN_C2S = "10001";
LoginConsts.LOGIN_S2C = "10002";
LoginConsts.KICK_OUT_S2C = "10003";
__reflect(LoginConsts.prototype, "LoginConsts");
//# sourceMappingURL=LoginConsts.js.map