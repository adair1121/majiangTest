var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AddComponent = (function (_super) {
    __extends(AddComponent, _super);
    function AddComponent() {
        var _this = _super.call(this) || this;
        _this.count = 0;
        _this.skinName = "AddComponentSkin";
        return _this;
    }
    AddComponent.prototype.childrenCreated = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    AddComponent.prototype.onTouchTap = function (evt) {
        switch (evt.target) {
            case this.addBtn:
                this.count += 1;
                this.num.text = this.count + "";
                break;
            case this.reduceBtn:
                if (this.count > 0) {
                    this.count -= 1;
                    this.num.text = this.count + "";
                }
                break;
        }
    };
    Object.defineProperty(AddComponent.prototype, "m_count", {
        get: function () {
            return this.count;
        },
        set: function (value) {
            this.count = value;
            this.num.text = this.count + "";
        },
        enumerable: true,
        configurable: true
    });
    return AddComponent;
}(eui.Component));
__reflect(AddComponent.prototype, "AddComponent");
//# sourceMappingURL=AddComponent.js.map