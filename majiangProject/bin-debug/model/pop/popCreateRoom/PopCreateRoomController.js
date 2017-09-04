var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PopCreateRoomController = (function (_super) {
    __extends(PopCreateRoomController, _super);
    function PopCreateRoomController() {
        var _this = _super.call(this) || this;
        //初始化model
        _this.proCreateRoomModel = new PopCreateRoomModel(_this);
        //初始化ui
        _this.popCreateRome = new PopCreateRoom(_this, LayerManager.UI_Popup);
        App.ViewManager.register(ViewConst.Create, _this.popCreateRome);
        //初始化proxy
        _this.popCreateRoomProxy = new PopCreateRoomProxy(_this);
        return _this;
    }
    return PopCreateRoomController;
}(BaseController));
__reflect(PopCreateRoomController.prototype, "PopCreateRoomController");
//# sourceMappingURL=PopCreateRoomController.js.map