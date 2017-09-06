var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StartConsts = (function () {
    function StartConsts() {
    }
    return StartConsts;
}());
StartConsts.CREATE_ROOM_C2S = "10001";
StartConsts.CREATE_ROOM_S2C = "10002";
StartConsts.JOIN_ROOM_C2S = "10003";
StartConsts.JOIN_ROOM_S2C = "10004";
StartConsts.GET_ROOMLIST_C2S = "10005";
StartConsts.GET_ROOMLIST_S2C = "10006";
__reflect(StartConsts.prototype, "StartConsts");
//# sourceMappingURL=StartConsts.js.map