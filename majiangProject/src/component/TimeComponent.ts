class TimeComponent extends eui.Component{
	public time:eui.BitmapLabel;
	public seat_103:eui.Image;
	public seat_101:eui.Image;
	public seat_102:eui.Image;
	public seat_104:eui.Image;
	private seatFocusGroup:any = {};
	private curFocus:eui.Image;
	private timer:egret.Timer;
	private count:number;
	private callBack:Function;
	private arg:any;
	public constructor() {
		super();
		this.skinName = "TimeComponentSkin";
	}
	protected childrenCreated():void{
		this.seatFocusGroup[data.Seat.East] = this.seat_101;
		this.seatFocusGroup[data.Seat.South] = this.seat_102;
		this.seatFocusGroup[data.Seat.West] = this.seat_103;
		this.seatFocusGroup[data.Seat.North] = this.seat_104;
		this.timer = new egret.Timer(1000);
		this.timer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
		this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onTimerCom,this);
		this.initFocus();
	}
	private onTimer(evt:egret.TimerEvent):void{
		this.count -= 1;
		egret.Tween.get(this.curFocus).to({alpha:0},400).to({alpha:1},400).call(()=>{
			egret.Tween.removeTweens(this.curFocus);
		},this);
		if(this.count < 0){
			this.count = 0;
		}
		this.time.text = this.count+"";
	}
	private onTimerCom(evt:egret.TimerEvent):void{
		if(this.callBack && this.arg){
			this.timer.stop();
			this.callBack.call(this.arg);
		}
	}
	private initFocus():void{
		for(var key in this.seatFocusGroup){
			this.seatFocusGroup[key].visible = false;
		}
	}
	public setFocus(seat:number,timeCount:number,callBack:Function,arg:any):void{
		if(!!this.curFocus){
			this.curFocus.visible = false;
		}
		this.count = timeCount;
		this.callBack = callBack;
		this.arg = arg;
		this.seatFocusGroup[seat].visible = true;
		this.curFocus = this.seatFocusGroup[seat];
		this.timer.start();
		this.timer.repeatCount = timeCount;
		this.time.text = timeCount+"";
	}
	public initialize():void{
		this.initFocus();
		this.timer.stop();
		this.curFocus = null;
		this.callBack = null;
		this.count= 0;
		this.arg = null;
	}
}