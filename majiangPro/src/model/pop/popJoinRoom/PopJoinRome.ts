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
		this.x = (Config.w_width >> 1) - (this.width>>1);
		this.y = (Config.w_height >> 1) - (this.height >> 1);
	}
	/**
	 * 面板开启执行函数
	 */
	public open(param:any[]):void{
		this.initRoomNum();
		this.collect.source = [{num:"1"},{num:"2"},{num:"3"},{num:"4"},{num:"5"},{num:"6"},
								{num:"7"},{num:"8"},{num:"9"},{num:"r"},{num:"0"},{num:"d"}];
		
	}
	private initRoomNum():void{
		this.romeNum = "";
		for(var i:number = 1;i<=6;i++){
			this["num"+i].text = "";
		}
	}
	/**
	 * 面板关闭执行函数
	 */
	public close(param:any[]):void{
		App.ViewManager.close(ViewConst.Join);
		this.applyControllerFunc(ControllerConst.START_CONTROLLER,StartConsts.INIT_STARTPANEL)
	}
	private onItemTap(evt:eui.ItemTapEvent):void{
		switch(evt.item.num){
			case "d":
				var arr = this.romeNum.split("");
				if(arr.length > 0){
					arr.pop();
					this.romeNum = arr.join("");
					this.addLabel();
				}
				break;
			case "r":
				this.romeNum = "";
				this.addLabel();
				break;
			default:
				var arr1 = this.romeNum.split("");
				if(arr1.length <= 5){
					this.romeNum +=evt.item.num;
					this.addLabel();
					var arr2 = this.romeNum.split("");
					if(arr2.length >=5){
						//请求加入房间
						this.close([]);
						this.applyControllerFunc(ControllerConst.START_CONTROLLER,StartConsts.JOIN_ROOM_C2S,{tableId:this.romeNum});
					}
				}
				break;
		}
	}
	private addLabel():void{
		var arr:string[] = this.romeNum.split("");
		for(var j:number = 1;j<=6;j++){
			this["num"+j].text = "";
		}
		if(arr.length){
			for(var i:number = 1;i<=arr.length;i++){
				this["num"+i].text = arr[i-1];
			}
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