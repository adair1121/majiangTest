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
        this.x = (Config.w_width >> 1) - (this.width >> 1);
        this.y = (Config.w_height >> 1) - (this.height >> 1);
    };
    /**
     * 面板开启执行函数
     */
    PopCreateRoom.prototype.open = function (param) {
        this.baseScore.m_count = 0;
        this.rewardTop.m_count = 0;
        this.peopleNum.m_count = 1;
        this.peopleNum.maxNum = 4;
        this.peopleNum.minNum = 1;
    };
    /**
     * 面板关闭执行函数
     */
    PopCreateRoom.prototype.close = function (param) {
        App.ViewManager.close(ViewConst.Create);
        this.applyControllerFunc(ControllerConst.START_CONTROLLER, StartConsts.INIT_STARTPANEL);
    };
    PopCreateRoom.prototype.radioChangeHandler = function (evt) {
        var radioButtonGroup = evt.target;
        var radioBtn = radioButtonGroup.selection;
        var index = this.radioGroup.getChildIndex(radioBtn);
        this.counts = this.countsAny[index];
        // alert(this.counts);
    };
    PopCreateRoom.prototype.onTouchHandler = function (evt) {
        switch (evt.target) {
            case this.btnClose:
                this.close();
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
                if (!this.peopleNum.m_count) {
                    alert("请设置游戏人数");
                    return;
                }
                App.ViewManager.close(ViewConst.Create);
                DataCenter.playerCount = this.peopleNum.m_count;
                var obj = { basicScore: this.baseScore.m_count, times: this.rewardTop.m_count, playerCount: DataCenter.playerCount };
                this.applyControllerFunc(ControllerConst.START_CONTROLLER, StartConsts.CREATE_ROOM_C2S, obj);
                break;
        }
    };
    return PopCreateRoom;
}(BaseEuiView));
__reflect(PopCreateRoom.prototype, "PopCreateRoom");
//# sourceMappingURL=PopCreateRoom.js.map