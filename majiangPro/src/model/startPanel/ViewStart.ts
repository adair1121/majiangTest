class ViewStart extends BaseEuiView{
	public playerIcon:eui.Image;
	public playerName:eui.Label;
	public playerId:eui.Label;
	public createRoomBtn:eui.Button;
	public joinRoomBtn:eui.Button;
	public addCardBtn:eui.Image;
	public buttonSet:eui.Image;
	public buttonScore:eui.Image;
	public buttonShare:eui.Image;
	public buttonIntro:eui.Image;
	public cardNum:eui.Label;
	private maskSp:egret.Sprite;
	public constructor($controller:BaseController,$parent:egret.DisplayObjectContainer) {
		super($controller,$parent);
		this.skinName = "ViewStartSkin";
	}
	/**
	 * 对面板进行初始化
	 */
	public initUI():void{
		super.initUI();
		this.maskSp = new egret.Sprite();
		this.addChild(this.maskSp);
		this.maskSp.graphics.beginFill(0xcccccc,0.5);
		this.maskSp.graphics.drawRect(0,0,Config.w_width,Config.w_height);
		this.maskSp.graphics.endFill();
		this.addChild(this.maskSp);
		this.maskSp.visible = false;
		this.maskSp.touchEnabled = true;
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchHandler,this,false);
	}
	/**
	 * 对面板数据进行初始化
	 */
	public initData():void{
		super.initData();
		this.maskSp.visible = false;
	}
	/**
	 * 面板开启执行函数
	 */
	public open(param:any):void{
		var userInfo:proto.UserInfo = param.userInfo;
		this.playerName.text = userInfo.nick;
		this.playerId.text = "ID:"+userInfo.userId+"";
		DataCenter.playerId = userInfo.userId;
		this.cardNum.text = userInfo.cardCount+"";
		this.maskSp.visible = false;
	}
	/**
	 * 面板关闭执行函数
	 */
	public close(param:any[]):void{
		this.maskSp.visible = false;
	}
	private onTouchHandler(evt:egret.TouchEvent):void{
		switch(evt.target){
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
	}
}