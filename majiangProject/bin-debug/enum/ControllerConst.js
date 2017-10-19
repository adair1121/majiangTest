var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ControllerConst = (function () {
    function ControllerConst() {
    }
    return ControllerConst;
}());
ControllerConst.LOGIN_CONTROLLER = 10001;
ControllerConst.START_CONTROLLER = 10002;
ControllerConst.GAME_CONTROLLER = 10003;
ControllerConst.JOIN_ROOM = 10004;
ControllerConst.CREATE_ROOM = 10005;
ControllerConst.SYSTEM_SET = 10006;
ControllerConst.MY_SCORE = 10007;
__reflect(ControllerConst.prototype, "ControllerConst");
//# sourceMappingURL=ControllerConst.js.map