var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var StartController = (function (_super) {
    __extends(StartController, _super);
    function StartController() {
        var _this = _super.call(this) || this;
        //初始化model
        _this.startModel = new StartModel(_this);
        //初始化ui
        _this.startView = new ViewStart(_this, LayerManager.UI_Main);
        App.ViewManager.register(ViewConst.Start, _this.startView);
        //初始化proxy
        _this.startProxy = new StartProxy(_this);
        return _this;
    }
    return StartController;
}(BaseController));
__reflect(StartController.prototype, "StartController");
//# sourceMappingURL=StartController.js.map