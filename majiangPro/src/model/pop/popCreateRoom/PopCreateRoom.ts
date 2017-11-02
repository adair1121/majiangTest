class PopCreateRoom extends BaseEuiView{
	public radioBtnOne:eui.RadioButton;
	public radioBtnTwo:eui.RadioButton;
	public btnClose:eui.Image;
	public buttonSure:eui.Image;
	public radioGroup:eui.Group;
	public baseScore:AddComponent;
	public rewardTop:AddComponent;
	public peopleNum:AddComponent;
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
		this.x = (Config.w_width >> 1) - (this.width>>1);
		this.y = (Config.w_height >> 1) - (this.height >> 1);
	}
	/**
	 * 面板开启执行函数
	 */
	public open(param:any[]):void{
		
		this.baseScore.m_count = 0;
		this.rewardTop.m_count = 0;
		this.peopleNum.m_count = 1;
		this.peopleNum.maxNum = 4;
		this.peopleNum.minNum = 1;
	}
	/**
	 * 面板关闭执行函数
	 */
	public close(param?:any[]):void{
		App.ViewManager.close(ViewConst.Create);
		this.applyControllerFunc(ControllerConst.START_CONTROLLER,StartConsts.INIT_STARTPANEL)
	}
	private radioChangeHandler(evt:eui.UIEvent):void{
		var radioButtonGroup:eui.RadioButtonGroup = evt.target;
		var radioBtn:eui.RadioButton = radioButtonGroup.selection;
		var index:number = this.radioGroup.getChildIndex(radioBtn);
		this.counts = this.countsAny[index];
		// alert(this.counts);
	}
	private onTouchHandler(evt:egret.TouchEvent):void{
		switch(evt.target){
			case this.btnClose:
				this.close();
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
				if(!this.peopleNum.m_count){
					alert("请设置游戏人数");
					return;
				}
				App.ViewManager.close(ViewConst.Create);
				DataCenter.playerCount = this.peopleNum.m_count;
				var obj:any = {basicScore:this.baseScore.m_count,times:this.rewardTop.m_count,playerCount:DataCenter.playerCount}
				this.applyControllerFunc(ControllerConst.START_CONTROLLER,StartConsts.CREATE_ROOM_C2S,obj);
				break;
		}
	}
}