class PopCreateRoom extends BaseEuiView{
	public radioBtnOne:eui.RadioButton;
	public radioBtnTwo:eui.RadioButton;
	public radioBtnThree:eui.RadioButton;
	public radioBtnFour:eui.RadioButton;
	public pwd:eui.BitmapLabel;
	public txtPwd:eui.Image;
	public keyList:eui.List;
	public btnClose:eui.Image;
	public createBtn:eui.Image;
	private collect:eui.ArrayCollection;
	private pwdNum:string = "";
	public radioGroup:eui.Group;
	private roomNum:number;
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
	}
	private radioChangeHandler(evt:eui.UIEvent):void{
		var radioButtonGroup:eui.RadioButtonGroup = evt.target;
		var radioBtn:eui.RadioButton = radioButtonGroup.selection;
		this.roomNum = this.radioGroup.getChildIndex(radioBtn)+1;
	}
	private onItemTap(evt:eui.ItemTapEvent):void{
		this.pwdNum += evt.item.num+"";
		this.pwd.text = this.pwdNum;
	}
	private onTouchHandler(evt:egret.TouchEvent):void{
		switch(evt.target){
			case this.btnClose:
				App.ViewManager.close(ViewConst.Create);
				break;
			case this.createBtn:
				//加入房间
				alert("创建房间--roomNum:"+this.roomNum+"--pwd:"+this.pwdNum);
				break;
		}
	}
}