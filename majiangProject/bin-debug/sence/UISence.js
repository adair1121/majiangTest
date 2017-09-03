var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by yangsong on 2014/11/28.
 * UI场景层
 */
var UIScene = (function (_super) {
    __extends(UIScene, _super);
    /**
     * 构造函数
     */
    function UIScene() {
        return _super.call(this) || this;
    }
    /**
     * 进入Scene调用
     */
    UIScene.prototype.onEnter = function () {
        _super.prototype.onEnter.call(this);
        //添加该Scene使用的层级
        this.addLayer(LayerManager.UI_Main);
        this.addLayer(LayerManager.UI_Popup);
        this.addLayer(LayerManager.UI_Message);
        this.addLayer(LayerManager.UI_Tips);
        //添加一个纯色背景
        var rect = new eui.Rect();
        rect.fillColor = 0x78b93f;
        rect.percentHeight = 100;
        rect.percentWidth = 100;
        LayerManager.UI_Main.addChild(rect);
        //初始打开Login页面
        App.ViewManager.open(ViewConst.Login);
        //播放背景音乐
        // App.SoundManager.playBg("sound_bg");
    };
    /**
     * 退出Scene调用
     */
    UIScene.prototype.onExit = function () {
        _super.prototype.onExit.call(this);
    };
    return UIScene;
}(BaseScene));
__reflect(UIScene.prototype, "UIScene");
//# sourceMappingURL=UISence.js.map