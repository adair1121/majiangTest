var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ViewConst = (function () {
    function ViewConst() {
    }
    return ViewConst;
}());
ViewConst.Loading = 10000;
ViewConst.Login = 10001;
ViewConst.Start = 10002;
ViewConst.Game = 10003;
ViewConst.Join = 10004;
ViewConst.Create = 10005;
ViewConst.SystemSet = 10006;
ViewConst.MyScore = 10007;
__reflect(ViewConst.prototype, "ViewConst");
//# sourceMappingURL=ViewConst.js.map