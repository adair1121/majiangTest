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
        _this.skinName = "CardItemSkin";
        _this.laiOrPi.visible = false;
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
    Object.defineProperty(CardItem.prototype, "icon", {
        get: function () {
            return this._icon;
        },
        set: function (source) {
            this.cardIcon.source = source + "_png";
            this._icon = source;
            this.cardBg.source = this.defaultBg;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CardItem.prototype, "iconTrans", {
        get: function () {
            return parseInt(this._icon);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 设置痞子或癞子的显示
     */
    CardItem.prototype.setOperLabel = function (oper, pi, lai) {
        this.laiOrPi.visible = true;
        if (oper === lai) {
            this.laiOrPi.text = "癞";
        }
        else if (oper === pi) {
            this.laiOrPi.text = "痞";
        }
        else {
            this.laiOrPi.visible = false;
        }
    };
    return CardItem;
}(eui.ItemRenderer));
__reflect(CardItem.prototype, "CardItem");
//# sourceMappingURL=CardItem.js.map