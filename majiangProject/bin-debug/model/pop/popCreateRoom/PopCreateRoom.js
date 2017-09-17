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
        _this.countsAny = [8, 16];
        _this.counts = 0;
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
        this.radioBtnOne.selected = true;
        this.counts = 8;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        radioButtonGroup.addEventListener(eui.UIEvent.CHANGE, this.radioChangeHandler, this);
    };
    /**
     * 面板开启执行函数
     */
    PopCreateRoom.prototype.open = function (param) {
        this.x = (this.myParent.width >> 1) - (this.measuredWidth >> 1);
        this.y = (this.myParent.height >> 1) - (this.measuredHeight >> 1);
    };
    /**
     * 面板关闭执行函数
     */
    PopCreateRoom.prototype.close = function (param) {
    };
    PopCreateRoom.prototype.radioChangeHandler = function (evt) {
        var radioButtonGroup = evt.target;
        var radioBtn = radioButtonGroup.selection;
        var index = this.radioGroup.getChildIndex(radioBtn);
        this.counts = this.countsAny[index];
        alert(this.counts);
    };
    PopCreateRoom.prototype.onTouchHandler = function (evt) {
        switch (evt.target) {
            case this.btnClose:
                App.ViewManager.close(ViewConst.Create);
                break;
            case this.buttonSure:
                //加入房间
                if (!this.baseScore.m_count) {
                    alert("请设置底分");
                    return;
                }
                if (!this.rewardTop.m_count) {
                    alert("请设置封顶");
                    return;
                }
                App.ViewManager.close(ViewConst.Create);
                DataCenter.playerCount = 2;
                var obj = { basicScore: this.baseScore.m_count, times: this.rewardTop.m_count, playerCount: 2 };
                this.applyControllerFunc(ControllerConst.START_CONTROLLER, StartConsts.CREATE_ROOM_C2S, obj);
                break;
        }
    };
    return PopCreateRoom;
}(BaseEuiView));
__reflect(PopCreateRoom.prototype, "PopCreateRoom");
//# sourceMappingURL=PopCreateRoom.js.map