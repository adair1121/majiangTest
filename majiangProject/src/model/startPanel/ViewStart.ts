class ViewStart extends BaseEuiView{
	public playerIcon:eui.Image;
	public playerName:eui.Label;
	public playerId:eui.Label;
	public createRoomBtn:eui.Button;
	public joinRoomBtn:eui.Button;
	public addCardBtn:eui.Image;
	public buttonSet:eui.Image;
	public buttonScore:eui.Image;
	public constructor($controller:BaseController,$parent:egret.DisplayObjectContainer) {
		super($controller,$parent);
		this.skinName = "ViewStartSkin";
	}
	/**
	 * 对面板进行初始化
	 */
	public initUI():void{
		super.initUI();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchHandler,this);
	}
	/**
	 * 对面板数据进行初始化
	 */
	public initData():void{
		super.initData();
	}
	/**
	 * 面板开启执行函数
	 */
	public open(param:any[]):void{
		
	}
	/**
	 * 面板关闭执行函数
	 */
	public close(param:any[]):void{

	}
	private onTouchHandler(evt:egret.TouchEvent):void{
		switch(evt.target){
			case this.createRoomBtn:
				// App.ViewManager.close(ViewConst.Start);
				// App.ViewManager.open(ViewConst.Game);
				App.ViewManager.open(ViewConst.Create);
				break;
			case this.joinRoomBtn:
				App.ViewManager.open(ViewConst.Join);
				break;
			case this.buttonSet:
				App.ViewManager.open(ViewConst.SystemSet);
				break;
			case this.buttonScore:
				App.ViewManager.open(ViewConst.MyScore);
				break;
		}
	}
}