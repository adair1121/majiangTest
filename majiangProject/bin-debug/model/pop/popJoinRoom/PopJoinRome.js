var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PopJoinRome = (function (_super) {
    __extends(PopJoinRome, _super);
    function PopJoinRome($controller, $parent) {
        var _this = _super.call(this, $controller, $parent) || this;
        _this.romeNum = "";
        _this.skinName = "PopJoinRomeSkin";
        return _this;
    }
    /**
     * 对面板进行初始化
     */
    PopJoinRome.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.collect = new eui.ArrayCollection();
        this.keyList.itemRenderer = MyButton;
        this.keyList.dataProvider = this.collect;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this.keyList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
    };
    /**
     * 面板开启执行函数
     */
    PopJoinRome.prototype.open = function (param) {
        this.initRoomNum();
        this.collect.source = [{ num: "1" }, { num: "2" }, { num: "3" }, { num: "4" }, { num: "5" }, { num: "6" },
            { num: "7" }, { num: "8" }, { num: "9" }, { num: "r" }, { num: "0" }, { num: "d" }];
        this.x = (this.myParent.width >> 1) - (this.measuredWidth >> 1);
        this.y = (this.myParent.height >> 1) - (this.measuredHeight >> 1);
    };
    PopJoinRome.prototype.initRoomNum = function () {
        for (var i = 1; i <= 6; i++) {
            this["num" + i].text = "";
        }
    };
    /**
     * 面板关闭执行函数
     */
    PopJoinRome.prototype.close = function (param) {
        App.ViewManager.close(ViewConst.Join);
    };
    PopJoinRome.prototype.onItemTap = function (evt) {
        switch (evt.item.num) {
            case "d":
                if (this.romeNum.length > 0) {
                    var arr = this.romeNum.split("");
                    arr.pop();
                    this.romeNum = arr.join("");
                }
                break;
            case "r":
                this.romeNum = "";
                this.initRoomNum();
                break;
            default:
                if (this.romeNum.length < 6) {
                    this.romeNum += evt.item.num;
                }
                else {
                }
                break;
        }
    };
    PopJoinRome.prototype.onTouchHandler = function (evt) {
        switch (evt.target) {
            case this.btnClose:
                this.close([]);
                break;
        }
    };
    return PopJoinRome;
}(BaseEuiView));
__reflect(PopJoinRome.prototype, "PopJoinRome");
//# sourceMappingURL=PopJoinRome.js.map