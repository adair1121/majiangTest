class PopJoinRome extends BaseEuiView{
	public btnClose:eui.Image;
	public account:eui.BitmapLabel;
	public pwd:eui.BitmapLabel;
	public keyList:eui.List;
	public txtHome:eui.Image;
	public txtPwd:eui.Image;
	public joinBtn:eui.Image;
	private collect:eui.ArrayCollection;
	private accountNum:string = "";
	private pwdNum:string = "";
	private type:string = "";
	private TYPE_ACC:string = "account";
	private TYPE_PWD:string = "pwd";
	public constructor($controller:BaseController,$parent:egret.DisplayObjectContainer) {
		super($controller,$parent);
		this.skinName = "PopJoinRomeSkin";
	}
	/**
	 * 对面板进行初始化
	 */
	public initUI():void{
		super.initUI();
		this.collect = new eui.ArrayCollection();
		this.keyList.itemRenderer = MyButton;
		this.keyList.dataProvider = this.collect;
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchHandler,this);
		this.keyList.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this);
	}
	/**
	 * 面板开启执行函数
	 */
	public open(param:any[]):void{
		this.type = this.TYPE_ACC;
		this.collect.source = [{num:"1"},{num:"2"},{num:"3"},{num:"4"},{num:"5"},{num:"6"},
								{num:"7"},{num:"8"},{num:"9"},{num:"0"}];
		this.x = (this.myParent.width >> 1) - (this.measuredWidth>>1);
		this.y = (this.myParent.height >> 1) - (this.measuredHeight >> 1);
	}
	/**
	 * 面板关闭执行函数
	 */
	public close(param:any[]):void{
		this.accountNum = "";
		this.pwdNum = "";
		this.account.text = this.accountNum;
		this.pwd.text = this.pwdNum;
	}
	private onItemTap(evt:eui.ItemTapEvent):void{
		if(this.type === this.TYPE_ACC){
			this.accountNum += evt.item.num+"";
			this.account.text = this.accountNum;
		}else{
			this.pwdNum += evt.item.num+"";
			this.pwd.text = this.pwdNum;
		}
	}
	private onTouchHandler(evt:egret.TouchEvent):void{
		switch(evt.target){
			case this.btnClose:
				App.ViewManager.close(ViewConst.Join);
				break;
			case this.txtHome:
				this.type = this.TYPE_ACC;
				break;
			case this.txtPwd:
				this.type = this.TYPE_PWD;
				break;
			case this.joinBtn:
				//加入房间
				alert("加入房间")
				break;
		}
	}
	
}