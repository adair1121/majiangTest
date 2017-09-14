var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameProxy = (function (_super) {
    __extends(GameProxy, _super);
    function GameProxy($controller) {
        var _this = _super.call(this, $controller) || this;
        _this.receiveServerMsg(GameConsts.ENTERTABLE_S2C, _this.enterTable, _this);
        _this.receiveServerMsg(GameConsts.CURGAME_END_S2C, _this.curGameEnd, _this);
        _this.receiveServerMsg(GameConsts.LEAVETABLE_S2C, _this.leaveTable, _this);
        _this.receiveServerMsg(GameConsts.OTHER_ENTERTABEL_S2C, _this.otherEnterTable, _this);
        return _this;
    }
    GameProxy.prototype.enterTable = function (msg) {
        this.applyFunc(GameConsts.ENTERTABLE_S2C, msg);
    };
    GameProxy.prototype.leaveTable = function (msg) {
        this.applyFunc(GameConsts.LEAVETABLE_S2C, msg);
    };
    GameProxy.prototype.curGameEnd = function (msg) {
        this.applyFunc(GameConsts.CURGAME_END_S2C, msg);
    };
    GameProxy.prototype.otherEnterTable = function (msg) {
        this.applyFunc(GameConsts.OTHER_ENTERTABEL_S2C, msg);
    };
    return GameProxy;
}(BaseProxy));
__reflect(GameProxy.prototype, "GameProxy");
//# sourceMappingURL=GameProxy.js.map