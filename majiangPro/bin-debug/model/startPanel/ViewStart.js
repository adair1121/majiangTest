var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ViewStart = (function (_super) {
    __extends(ViewStart, _super);
    function ViewStart($controller, $parent) {
        var _this = _super.call(this, $controller, $parent) || this;
        _this.skinName = "ViewStartSkin";
        return _this;
    }
    /**
     * 对面板进行初始化
     */
    ViewStart.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.maskSp = new egret.Sprite();
        this.addChild(this.maskSp);
        this.maskSp.graphics.beginFill(0xcccccc, 0.5);
        this.maskSp.graphics.drawRect(0, 0, Config.w_width, Config.w_height);
        this.maskSp.graphics.endFill();
        this.addChild(this.maskSp);
        this.maskSp.visible = false;
        this.maskSp.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this, false);
    };
    /**
     * 对面板数据进行初始化
     */
    ViewStart.prototype.initData = function () {
        _super.prototype.initData.call(this);
        this.maskSp.visible = false;
    };
    /**
     * 面板开启执行函数
     */
    ViewStart.prototype.open = function (param) {
        var userInfo = param.userInfo;
        this.playerName.text = userInfo.nick;
        this.playerId.text = "ID:" + userInfo.userId + "";
        DataCenter.playerId = userInfo.userId;
        this.cardNum.text = userInfo.cardCount + "";
        this.maskSp.visible = false;
    };
    /**
     * 面板关闭执行函数
     */
    ViewStart.prototype.close = function (param) {
        this.maskSp.visible = false;
    };
    ViewStart.prototype.onTouchHandler = function (evt) {
        switch (evt.target) {
            case this.createRoomBtn:
                // App.ViewManager.close(ViewConst.Start);
                // App.ViewManager.open(ViewConst.Game);
                this.maskSp.visible = true;
                App.ViewManager.open(ViewConst.Create);
                break;
            case this.joinRoomBtn:
                this.maskSp.visible = true;
                App.ViewManager.open(ViewConst.Join);
                break;
            case this.buttonSet:
                this.maskSp.visible = true;
                App.ViewManager.open(ViewConst.SystemSet);
                break;
            case this.buttonScore:
                this.maskSp.visible = true;
                App.ViewManager.open(ViewConst.MyScore);
                break;
            case this.buttonShare:
            case this.buttonIntro:
                alert("敬请期待");
                break;
        }
    };
    return ViewStart;
}(BaseEuiView));
__reflect(ViewStart.prototype, "ViewStart");
//# sourceMappingURL=ViewStart.js.map