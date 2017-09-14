var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameConsts = (function () {
    function GameConsts() {
    }
    return GameConsts;
}());
GameConsts.ENTERTABLE_S2C = "10001";
GameConsts.LEAVETABLE_S2C = "10002";
GameConsts.CURGAME_END_S2C = "10003";
GameConsts.OTHER_ENTERTABEL_S2C = "10005";
__reflect(GameConsts.prototype, "GameConsts");
//# sourceMappingURL=GameConsts.js.map