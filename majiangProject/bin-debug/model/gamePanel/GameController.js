var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameController = (function (_super) {
    __extends(GameController, _super);
    function GameController() {
        var _this = _super.call(this) || this;
        //初始化model
        _this.gameModel = new GameModel(_this);
        //初始化ui
        _this.gameView = new ViewGame(_this, LayerManager.UI_Main);
        App.ViewManager.register(ViewConst.Game, _this.gameView);
        //初始化proxy
        _this.gameProxy = new GameProxy(_this);
        //注册s2c
        _this.registerFunc(GameConsts.ENTERTABLE_S2C, _this.onEnterTable, _this);
        _this.registerFunc(GameConsts.LEAVETABLE_S2C, _this.onLeaveTabel, _this);
        _this.registerFunc(GameConsts.CURGAME_END_S2C, _this.curGameEnd, _this);
        _this.registerFunc(GameConsts.OTHER_ENTERTABEL_S2C, _this.otherEnterTable, _this);
        return _this;
    }
    GameController.prototype.onEnterTable = function (msg) {
        this.gameView.createRoleInfo(msg.userInfoList);
    };
    GameController.prototype.onLeaveTabel = function (msg) {
        this.gameView.leaveSeat(msg.seat);
    };
    GameController.prototype.curGameEnd = function (msg) {
        this.gameView.curGameEnd(msg);
    };
    GameController.prototype.otherEnterTable = function (msg) {
        this.gameView.createRoleInfo([msg.userInfo]);
    };
    return GameController;
}(BaseController));
__reflect(GameController.prototype, "GameController");
//# sourceMappingURL=GameController.js.map