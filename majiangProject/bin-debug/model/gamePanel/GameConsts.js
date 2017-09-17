var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameConsts = (function () {
    function GameConsts() {
    }
    return GameConsts;
}());
GameConsts.ENTERTABLE_S2C = "game_10001";
GameConsts.LEAVETABLE_S2C = "game_10002";
GameConsts.CURGAME_END_S2C = "game_10003";
GameConsts.OTHER_ENTERTABEL_S2C = "game_10005";
GameConsts.RAISEHANDS_S2C = "game_10006";
GameConsts.RAISEHANDS_C2S = "game_10007";
GameConsts.DRAWCARDRESPONSE_C2S = "game_10008";
GameConsts.DRAWCARDRESPONSE_S2C = "game_10009";
GameConsts.PLAYCARD_C2S = "game_10010";
GameConsts.PLAYCARD_S2C = "game_10011";
GameConsts.PLAYCARDRESPONSE_S2C = "game_10012";
GameConsts.PLAYCARDRESPONSE_C2S = "game_10013";
GameConsts.NOTIFY_HANDCARDS_S2C = "game_10014";
GameConsts.NOTIFY_DEALCARDS_S2C = "game_10015";
GameConsts.NOTIFY_PLAYCARDS_S2C = "game_10016";
GameConsts.NOTIFY_PLAYRESPONSE_S2C = "game_10017";
GameConsts.NOTIFY_CHANGEOPUSER_S2C = "game_10018";
__reflect(GameConsts.prototype, "GameConsts");
//# sourceMappingURL=GameConsts.js.map