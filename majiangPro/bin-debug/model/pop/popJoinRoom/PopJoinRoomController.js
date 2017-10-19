var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PopJoinRoomController = (function (_super) {
    __extends(PopJoinRoomController, _super);
    function PopJoinRoomController() {
        var _this = _super.call(this) || this;
        //初始化model
        _this.proJoinRoomModel = new PopJoinRoomModel(_this);
        //初始化ui
        _this.popJoinRome = new PopJoinRome(_this, LayerManager.UI_Popup);
        App.ViewManager.register(ViewConst.Join, _this.popJoinRome);
        //初始化proxy
        _this.popJoinRoomProxy = new PopJoinRoomProxy(_this);
        return _this;
    }
    return PopJoinRoomController;
}(BaseController));
__reflect(PopJoinRoomController.prototype, "PopJoinRoomController");
//# sourceMappingURL=PopJoinRoomController.js.map