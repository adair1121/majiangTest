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
        return _this;
    }
    return GameController;
}(BaseController));
__reflect(GameController.prototype, "GameController");
//# sourceMappingURL=GameController.js.map