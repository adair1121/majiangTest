var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MyButton = (function (_super) {
    __extends(MyButton, _super);
    function MyButton() {
        var _this = _super.call(this) || this;
        _this.skinName = "MyButtonSkin";
        return _this;
    }
    MyButton.prototype.dataChanged = function () {
        this.num.text = this.data.num;
    };
    return MyButton;
}(eui.ItemRenderer));
__reflect(MyButton.prototype, "MyButton");
//# sourceMappingURL=MyButton.js.map