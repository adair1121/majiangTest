var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PopMyScoreController = (function (_super) {
    __extends(PopMyScoreController, _super);
    function PopMyScoreController() {
        var _this = _super.call(this) || this;
        //初始化ui
        _this.popMyScore = new PopScore(_this, LayerManager.UI_Popup);
        App.ViewManager.register(ViewConst.MyScore, _this.popMyScore);
        return _this;
    }
    return PopMyScoreController;
}(BaseController));
__reflect(PopMyScoreController.prototype, "PopMyScoreController");
//# sourceMappingURL=PopMyScoreController.js.map