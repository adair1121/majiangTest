class PopJoinRome extends BaseEuiView{
	public btnClose:eui.Image;
	public keyList:eui.List;
	public num1:eui.Label;
	public num2:eui.Label;
	public num3:eui.Label;
	public num4:eui.Label;
	public num5:eui.Label;
	public num6:eui.Label;
	private collect:eui.ArrayCollection;
	private romeNum:string = "";
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
		this.initRoomNum();
		this.collect.source = [{num:"1"},{num:"2"},{num:"3"},{num:"4"},{num:"5"},{num:"6"},
								{num:"7"},{num:"8"},{num:"9"},{num:"r"},{num:"0"},{num:"d"}];
		this.x = (this.myParent.width >> 1) - (this.measuredWidth>>1);
		this.y = (this.myParent.height >> 1) - (this.measuredHeight >> 1);
	}
	private initRoomNum():void{
		for(var i:number = 1;i<=6;i++){
			this["num"+i].text = "";
		}
	}
	/**
	 * 面板关闭执行函数
	 */
	public close(param:any[]):void{
		App.ViewManager.close(ViewConst.Join);
	}
	private onItemTap(evt:eui.ItemTapEvent):void{
		switch(evt.item.num){
			case "d":
				if(this.romeNum.length > 0){
					var arr = this.romeNum.split("");
					arr.pop();
					this.romeNum = arr.join("");
				}
				break;
			case "r":
				this.romeNum = "";
				this.initRoomNum();
				break;
			default:
				if(this.romeNum.length < 6){
					this.romeNum +=evt.item.num;
				}else{
					//请求加入房间
					this.applyControllerFunc(ControllerConst.START_CONTROLLER,StartConsts.JOIN_ROOM_C2S,{tableId:this.romeNum});
				}
				break;
		}
	}
	private onTouchHandler(evt:egret.TouchEvent):void{
		switch(evt.target){
			case this.btnClose:
				this.close([]);
				break;
		}
	}
	
}