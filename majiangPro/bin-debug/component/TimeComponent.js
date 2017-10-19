var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TimeComponent = (function (_super) {
    __extends(TimeComponent, _super);
    function TimeComponent() {
        var _this = _super.call(this) || this;
        _this.seatFocusGroup = {};
        _this.skinName = "TimeComponentSkin";
        return _this;
    }
    TimeComponent.prototype.childrenCreated = function () {
        this.seatFocusGroup[data.Seat.East] = this.seat_101;
        this.seatFocusGroup[data.Seat.South] = this.seat_102;
        this.seatFocusGroup[data.Seat.West] = this.seat_103;
        this.seatFocusGroup[data.Seat.North] = this.seat_104;
        this.timer = new egret.Timer(1000);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTimerCom, this);
        this.initFocus();
    };
    TimeComponent.prototype.onTimer = function (evt) {
        var _this = this;
        this.count -= 1;
        egret.Tween.get(this.curFocus).to({ alpha: 0 }, 400).to({ alpha: 1 }, 400).call(function () {
            egret.Tween.removeTweens(_this.curFocus);
        }, this);
        if (this.count < 0) {
            this.count = 0;
        }
        this.time.text = this.count + "";
    };
    TimeComponent.prototype.onTimerCom = function (evt) {
        if (this.callBack && this.arg) {
            this.timer.stop();
            this.callBack.call(this.arg);
        }
    };
    TimeComponent.prototype.initFocus = function () {
        for (var key in this.seatFocusGroup) {
            this.seatFocusGroup[key].visible = false;
        }
    };
    TimeComponent.prototype.setFocus = function (seat, timeCount, callBack, arg) {
        if (!!this.curFocus) {
            this.curFocus.visible = false;
        }
        this.count = timeCount;
        this.callBack = callBack;
        this.arg = arg;
        this.seatFocusGroup[seat].visible = true;
        this.curFocus = this.seatFocusGroup[seat];
        this.timer.start();
        this.timer.repeatCount = timeCount;
        this.time.text = timeCount + "";
    };
    TimeComponent.prototype.initialize = function () {
        this.initFocus();
        this.timer.stop();
        this.curFocus = null;
        this.callBack = null;
        this.count = 0;
        this.arg = null;
    };
    return TimeComponent;
}(eui.Component));
__reflect(TimeComponent.prototype, "TimeComponent");
//# sourceMappingURL=TimeComponent.js.map