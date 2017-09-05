var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PopCreateRoom = (function (_super) {
    __extends(PopCreateRoom, _super);
    function PopCreateRoom($controller, $parent) {
        var _this = _super.call(this, $controller, $parent) || this;
        _this.pwdNum = "";
        _this.skinName = "PopCreateRoomSkin";
        return _this;
    }
    /**
     * 对面板进行初始化
     */
    PopCreateRoom.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        var radioButtonGroup = new eui.RadioButtonGroup();
        this.radioBtnOne.group = radioButtonGroup;
        this.radioBtnTwo.group = radioButtonGroup;
        this.radioBtnThree.group = radioButtonGroup;
        this.radioBtnFour.group = radioButtonGroup;
        this.radioBtnOne.selected = true;
        this.collect = new eui.ArrayCollection();
        this.keyList.itemRenderer = MyButton;
        this.keyList.dataProvider = this.collect;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this.keyList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
        radioButtonGroup.addEventListener(eui.UIEvent.CHANGE, this.radioChangeHandler, this);
    };
    /**
     * 面板开启执行函数
     */
    PopCreateRoom.prototype.open = function (param) {
        this.roomNum = 1;
        this.collect.source = [{ num: "1" }, { num: "2" }, { num: "3" }, { num: "4" }, { num: "5" }, { num: "6" },
            { num: "7" }, { num: "8" }, { num: "9" }, { num: "0" }];
        this.x = (this.myParent.width >> 1) - (this.measuredWidth >> 1);
        this.y = (this.myParent.height >> 1) - (this.measuredHeight >> 1);
    };
    /**
     * 面板关闭执行函数
     */
    PopCreateRoom.prototype.close = function (param) {
        this.pwdNum = "";
        this.pwd.text = this.pwdNum;
    };
    PopCreateRoom.prototype.radioChangeHandler = function (evt) {
        var radioButtonGroup = evt.target;
        var radioBtn = radioButtonGroup.selection;
        this.roomNum = this.radioGroup.getChildIndex(radioBtn) + 1;
    };
    PopCreateRoom.prototype.onItemTap = function (evt) {
        this.pwdNum += evt.item.num + "";
        this.pwd.text = this.pwdNum;
    };
    PopCreateRoom.prototype.onTouchHandler = function (evt) {
        switch (evt.target) {
            case this.btnClose:
                App.ViewManager.close(ViewConst.Create);
                break;
            case this.createBtn:
                //加入房间
                alert("创建房间--roomNum:" + this.roomNum + "--pwd:" + this.pwdNum);
                break;
        }
    };
    return PopCreateRoom;
}(BaseEuiView));
__reflect(PopCreateRoom.prototype, "PopCreateRoom");
//# sourceMappingURL=PopCreateRoom.js.map