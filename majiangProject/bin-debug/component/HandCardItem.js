var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HandCardItem = (function (_super) {
    __extends(HandCardItem, _super);
    function HandCardItem(icon, index) {
        var _this = _super.call(this) || this;
        _this.path_icon = "";
        _this.skinName = "HandCardItemSkin";
        _this.path_icon = Config.path_card + icon + ".png";
        _this.index = index;
        return _this;
    }
    HandCardItem.prototype.childrenCreated = function () {
        this.cardIcon.source = this.path_icon;
    };
    return HandCardItem;
}(eui.Component));
__reflect(HandCardItem.prototype, "HandCardItem");
//# sourceMappingURL=HandCardItem.js.map