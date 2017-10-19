class PopCreateRoom extends BaseEuiView{
	public radioBtnOne:eui.RadioButton;
	public radioBtnTwo:eui.RadioButton;
	public btnClose:eui.Image;
	public buttonSure:eui.Image;
	public radioGroup:eui.Group;
	public baseScore:AddComponent;
	public rewardTop:AddComponent;
	private countsAny:number[] = [8,16];
	private counts:number = 0;
	public constructor($controller:BaseController,$parent:egret.DisplayObjectContainer) {
		super($controller,$parent);
		this.skinName = "PopCreateRoomSkin";
	}
	/**
	 * 对面板进行初始化
	 */
	public initUI():void{
		super.initUI();
		var radioButtonGroup:eui.RadioButtonGroup = new eui.RadioButtonGroup();
		this.radioBtnOne.group = radioButtonGroup;
		this.radioBtnTwo.group = radioButtonGroup;
		this.radioBtnOne.selected = true;
		this.counts = 8;
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchHandler,this);
		radioButtonGroup.addEventListener(eui.UIEvent.CHANGE, this.radioChangeHandler, this);
	}
	/**
	 * 面板开启执行函数
	 */
	public open(param:any[]):void{
		this.x = (this.myParent.width >> 1) - (this.measuredWidth>>1);
		this.y = (this.myParent.height >> 1) - (this.measuredHeight >> 1);
		this.baseScore.m_count = 0;
		this.rewardTop.m_count = 0;
	}
	/**
	 * 面板关闭执行函数
	 */
	public close(param:any[]):void{
		
	}
	private radioChangeHandler(evt:eui.UIEvent):void{
		var radioButtonGroup:eui.RadioButtonGroup = evt.target;
		var radioBtn:eui.RadioButton = radioButtonGroup.selection;
		var index:number = this.radioGroup.getChildIndex(radioBtn);
		this.counts = this.countsAny[index];
		alert(this.counts);
	}
	private onTouchHandler(evt:egret.TouchEvent):void{
		switch(evt.target){
			case this.btnClose:
				App.ViewManager.close(ViewConst.Create);
				break;
			case this.buttonSure:
				//加入房间
				if(!this.baseScore.m_count){
					alert("请设置底分");
					return;
				}
				if(!this.rewardTop.m_count){
					alert("请设置封顶");
					return;
				}
				App.ViewManager.close(ViewConst.Create);
				DataCenter.playerCount = 2;
				var obj:any = {basicScore:this.baseScore.m_count,times:this.rewardTop.m_count,playerCount:2}
				this.applyControllerFunc(ControllerConst.START_CONTROLLER,StartConsts.CREATE_ROOM_C2S,obj);
				break;
		}
	}
}