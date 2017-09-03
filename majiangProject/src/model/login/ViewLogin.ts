class ViewLogin extends BaseEuiView{
	public btnLogin:eui.Button;
	public constructor($controller:BaseController,$parent:egret.DisplayObjectContainer) {
		super($controller,$parent);
		this.skinName = "ViewLoginSkin";
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
			case this.btnLogin:
				
				break;
		}
	}
	public loginSuccess():void{
		
	}
}