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
        _this.countNum = "";
        _this.scoreNum = "";
        _this.TYPE_PWD = 10001;
        _this.TYPE_COUNT = 10002;
        _this.TYPE_SCORE = 10003;
        _this.focus = 0;
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
        this.countNum = "";
        this.counts.text = this.countNum;
        this.scoreNum = "";
        this.basicScore.text = this.scoreNum;
        this.focus = 0;
    };
    PopCreateRoom.prototype.radioChangeHandler = function (evt) {
        var radioButtonGroup = evt.target;
        var radioBtn = radioButtonGroup.selection;
        this.roomNum = this.radioGroup.getChildIndex(radioBtn) + 1;
    };
    PopCreateRoom.prototype.onItemTap = function (evt) {
        switch (this.focus) {
            case this.TYPE_PWD:
                this.pwdNum += evt.item.num + "";
                this.pwd.text = this.pwdNum;
                break;
            case this.TYPE_COUNT:
                this.countNum = evt.item.num + "";
                this.counts.text = this.countNum;
                break;
            case this.TYPE_SCORE:
                this.scoreNum = evt.item.num + "";
                this.basicScore.text = this.scoreNum;
                break;
        }
    };
    PopCreateRoom.prototype.onTouchHandler = function (evt) {
        switch (evt.target) {
            case this.btnClose:
                App.ViewManager.close(ViewConst.Create);
                break;
            case this.createBtn:
                //加入房间
                if (!parseInt(this.scoreNum)) {
                    alert("请输入底分");
                    return;
                }
                if (!parseInt(this.countNum)) {
                    alert("请设置局数");
                    return;
                }
                var obj = { roomNum: this.roomNum, romePwd: this.pwdNum, score: this.scoreNum, counts: this.countNum };
                this.applyControllerFunc(ControllerConst.START_CONTROLLER, StartConsts.CREATE_ROOM_C2S, obj);
                break;
            case this.txtPwd:
                this.focus = this.TYPE_PWD;
                break;
            case this.txtBasicScore:
                this.focus = this.TYPE_SCORE;
                break;
            case this.txtCounts:
                this.focus = this.TYPE_COUNT;
                break;
        }
    };
    return PopCreateRoom;
}(BaseEuiView));
__reflect(PopCreateRoom.prototype, "PopCreateRoom");
//# sourceMappingURL=PopCreateRoom.js.map