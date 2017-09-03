var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SenceLoading = (function (_super) {
    __extends(SenceLoading, _super);
    /**
     * 构造函数
     */
    function SenceLoading() {
        return _super.call(this) || this;
    }
    /**
     * 进入Scene调用
     */
    SenceLoading.prototype.onEnter = function () {
        _super.prototype.onEnter.call(this);
        //添加该Scene使用的层级
        this.addLayer(LayerManager.UI_Main);
        //初始打开Loading页面
        App.ViewManager.open(ViewConst.Loading);
    };
    /**
     * 退出Scene调用
     */
    SenceLoading.prototype.onExit = function () {
        _super.prototype.onExit.call(this);
    };
    return SenceLoading;
}(BaseScene));
__reflect(SenceLoading.prototype, "SenceLoading");
//# sourceMappingURL=SenceLoadIng.js.map