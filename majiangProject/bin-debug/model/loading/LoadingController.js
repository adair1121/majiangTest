var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by yangsong on 15-1-6.
 */
var LoadingController = (function (_super) {
    __extends(LoadingController, _super);
    function LoadingController() {
        var _this = _super.call(this) || this;
        //初始化UI
        _this.loadingView = new LoadingView(_this, LayerManager.UI_Main);
        App.ViewManager.register(ViewConst.Loading, _this.loadingView);
        //注册事件监听
        _this.registerFunc(LoadingConst.SetProgress, _this.setProgress, _this);
        return _this;
    }
    LoadingController.prototype.setProgress = function (current, total) {
        this.loadingView.setProgress(current, total);
    };
    return LoadingController;
}(BaseController));
__reflect(LoadingController.prototype, "LoadingController");
//# sourceMappingURL=LoadingController.js.map