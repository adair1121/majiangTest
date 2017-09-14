class PopCreateRoom extends BaseEuiView{
	public radioBtnOne:eui.RadioButton;
	public radioBtnTwo:eui.RadioButton;
	public radioBtnThree:eui.RadioButton;
	public radioBtnFour:eui.RadioButton;
	public pwd:eui.BitmapLabel;
	public txtPwd:eui.Image;
	public basicScore:eui.BitmapLabel;
	public txtBasicScore:eui.Image;
	public counts:eui.BitmapLabel;
	public txtCounts:eui.Image;
	public keyList:eui.List;
	public btnClose:eui.Image;
	public createBtn:eui.Image;
	private collect:eui.ArrayCollection;
	private pwdNum:string = "";
	private countNum:string = "";
	private scoreNum:string = "";
	public radioGroup:eui.Group;
	private roomNum:number;
	private TYPE_PWD:number = 10001;
	private TYPE_COUNT:number = 10002;
	private TYPE_SCORE:number = 10003;
	private focus:number = 0;
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
		this.radioBtnThree.group = radioButtonGroup;
		this.radioBtnFour.group = radioButtonGroup;
		this.radioBtnOne.selected = true;
		this.collect = new eui.ArrayCollection();
		this.keyList.itemRenderer = MyButton;
		this.keyList.dataProvider = this.collect;
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchHandler,this);
		this.keyList.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this);
		radioButtonGroup.addEventListener(eui.UIEvent.CHANGE, this.radioChangeHandler, this);
	}
	/**
	 * 面板开启执行函数
	 */
	public open(param:any[]):void{
		this.roomNum = 1;
		this.collect.source = [{num:"1"},{num:"2"},{num:"3"},{num:"4"},{num:"5"},{num:"6"},
								{num:"7"},{num:"8"},{num:"9"},{num:"0"}];
		this.x = (this.myParent.width >> 1) - (this.measuredWidth>>1);
		this.y = (this.myParent.height >> 1) - (this.measuredHeight >> 1);
	}
	/**
	 * 面板关闭执行函数
	 */
	public close(param:any[]):void{
		this.pwdNum = "";
		this.pwd.text = this.pwdNum;
		this.countNum = "";
		this.counts.text = this.countNum;
		this.scoreNum = "";
		this.basicScore.text = this.scoreNum;
		this.focus = 0;
	}
	private radioChangeHandler(evt:eui.UIEvent):void{
		var radioButtonGroup:eui.RadioButtonGroup = evt.target;
		var radioBtn:eui.RadioButton = radioButtonGroup.selection;
		this.roomNum = this.radioGroup.getChildIndex(radioBtn)+1;
	}
	private onItemTap(evt:eui.ItemTapEvent):void{
		switch(this.focus){
			case this.TYPE_PWD:
				this.pwdNum += evt.item.num+"";
				this.pwd.text = this.pwdNum;
				break;
			case this.TYPE_COUNT:
				this.countNum = evt.item.num+"";
				this.counts.text = this.countNum;
				break;
			case this.TYPE_SCORE:
				this.scoreNum = evt.item.num+"";
				this.basicScore.text = this.scoreNum;
				break;
		}
		
	}
	private onTouchHandler(evt:egret.TouchEvent):void{
		switch(evt.target){
			case this.btnClose:
				App.ViewManager.close(ViewConst.Create);
				break;
			case this.createBtn:
				//加入房间
				if(!parseInt(this.scoreNum)){
					alert("请输入底分");
					return;
				}
				if(!parseInt(this.countNum)){
					alert("请设置局数");
					return;
				}
				var obj:any = {roomNum:this.roomNum,romePwd:this.pwdNum,score:this.scoreNum,counts:this.countNum}
				this.applyControllerFunc(ControllerConst.START_CONTROLLER,StartConsts.CREATE_ROOM_C2S,obj);
				break;
			case this.txtPwd:
				this.focus = this.TYPE_PWD;
				break;
			case this.txtBasicScore:
				this.focus = this.TYPE_SCORE;
				break;
			case this.txtCounts:
				this.focus = this.TYPE_COUNT;
				break;
		}
	}
}