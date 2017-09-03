var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SocketConst = (function () {
    function SocketConst() {
    }
    SocketConst.prototype.construcCtor = function () {
    };
    return SocketConst;
}());
SocketConst.LOGIN = "login";
SocketConst.LOGIN_S2C = "s2c";
SocketConst.LOGIN_C2S = "c2s";
__reflect(SocketConst.prototype, "SocketConst");
//# sourceMappingURL=SocketConst.js.map