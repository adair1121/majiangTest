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
__reflect(ViewConst.prototype, "ViewConst");
//# sourceMappingURL=ViewConst.js.map