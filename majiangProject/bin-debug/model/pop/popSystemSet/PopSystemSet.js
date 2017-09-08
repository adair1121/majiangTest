var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PopSystemSet = (function (_super) {
    __extends(PopSystemSet, _super);
    function PopSystemSet($controller, $parent) {
        var _this = _super.call(this, $controller, $parent) || this;
        _this.skinName = "PopHomeSetSkin";
        return _this;
    }
    /**
     * 对面板进行初始化
     */
    PopSystemSet.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.sndEffectSlider.minimum = 0;
        this.sndSlider.minimum = 0;
        this.sndEffectSlider.maximum = 100;
        this.sndSlider.maximum = 100;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this.sndEffectSlider.addEventListener(eui.UIEvent.CHANGE, this.effectSndChangeHandler, this);
        this.sndSlider.addEventListener(eui.UIEvent.CHANGE, this.bgSndChangeHandler, this);
    };
    /**
     * 面板开启执行函数
     */
    PopSystemSet.prototype.open = function (param) {
        this.sndEffectSlider.value = Config.soundEffectPercent;
        this.sndEffectSlider.progressBar.value = Config.soundEffectPercent;
        this.sndSlider.value = Config.bgSoundPercent;
        this.sndSlider.progressBar.value = Config.bgSoundPercent;
        this.x = (this.myParent.width >> 1) - (this.measuredWidth >> 1);
        this.y = (this.myParent.height >> 1) - (this.measuredHeight >> 1);
    };
    PopSystemSet.prototype.effectSndChangeHandler = function (evt) {
        Config.soundEffectPercent = evt.target.value;
        this.sndEffectSlider.progressBar.value = Config.soundEffectPercent;
    };
    PopSystemSet.prototype.bgSndChangeHandler = function (evt) {
        Config.bgSoundPercent = evt.target.value;
        this.sndSlider.progressBar.value = Config.bgSoundPercent;
    };
    /**
     * 面板关闭执行函数
     */
    PopSystemSet.prototype.close = function (param) {
        App.ViewManager.close(ViewConst.SystemSet);
    };
    PopSystemSet.prototype.onTouchHandler = function (evt) {
        switch (evt.target) {
            case this.btnClose:
                this.close([]);
                break;
            case this.btnExit:
                //退出游戏
                break;
        }
    };
    return PopSystemSet;
}(BaseEuiView));
__reflect(PopSystemSet.prototype, "PopSystemSet");
//# sourceMappingURL=PopSystemSet.js.map