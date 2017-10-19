class PopScore extends BaseEuiView{
	public btnClose:eui.Image;
	public scroller:eui.Scroller;
	public list:eui.List;
	public constructor($controller:BaseController,$parent:egret.DisplayObjectContainer) {
		super($controller,$parent);
		this.skinName = "PopMyScore";
	}
	/**
	 * 对面板进行初始化
	 */
	public initUI():void{
		super.initUI();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchHandler,this);
	}
	/**
	 * 面板开启执行函数
	 */
	public open(param:any[]):void{
		this.x = (this.myParent.width >> 1) - (this.measuredWidth>>1);
		this.y = (this.myParent.height >> 1) - (this.measuredHeight >> 1);
	}
	
	/**
	 * 面板关闭执行函数
	 */
	public close(param:any[]):void{
		App.ViewManager.close(ViewConst.MyScore);
	}
	private onTouchHandler(evt:egret.TouchEvent):void{
		switch(evt.target){
			case this.btnClose:
				this.close([]);
				break;
		}
	}
}