var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PopScore = (function (_super) {
    __extends(PopScore, _super);
    function PopScore($controller, $parent) {
        var _this = _super.call(this, $controller, $parent) || this;
        _this.skinName = "PopMyScore";
        return _this;
    }
    /**
     * 对面板进行初始化
     */
    PopScore.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
    };
    /**
     * 面板开启执行函数
     */
    PopScore.prototype.open = function (param) {
        this.x = (Config.w_width >> 1) - (this.width >> 1);
        this.y = (Config.w_height >> 1) - (this.height >> 1);
    };
    /**
     * 面板关闭执行函数
     */
    PopScore.prototype.close = function (param) {
        App.ViewManager.close(ViewConst.MyScore);
    };
    PopScore.prototype.onTouchHandler = function (evt) {
        switch (evt.target) {
            case this.btnClose:
                this.close([]);
                break;
        }
    };
    return PopScore;
}(BaseEuiView));
__reflect(PopScore.prototype, "PopScore");
//# sourceMappingURL=PopScore.js.map