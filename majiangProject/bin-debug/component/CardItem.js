var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CardItem = (function (_super) {
    __extends(CardItem, _super);
    function CardItem() {
        var _this = _super.call(this) || this;
        _this.defaultBg = "opposite_block_image_30_png";
        _this.leftBg = "dachupai_left";
        return _this;
    }
    CardItem.prototype.dataChanged = function () {
        this.cardIcon.source = this.data.icon;
        if (this.data.cardBg) {
            this.cardBg.source = this.leftBg;
        }
        else {
            this.cardBg.source = this.defaultBg;
        }
    };
    return CardItem;
}(eui.ItemRenderer));
__reflect(CardItem.prototype, "CardItem");
//# sourceMappingURL=CardItem.js.map