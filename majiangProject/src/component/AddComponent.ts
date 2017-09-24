class AddComponent extends eui.Component{
	public num:eui.Label;
	public addBtn:eui.Image;
	public reduceBtn:eui.Image;
	private count:number = 0;
	public constructor() {
		super();
		this.skinName = "AddComponentSkin";
	}
	protected childrenCreated():void{
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
	}
	private onTouchTap(evt:egret.TouchEvent):void{
		switch(evt.target){
			case this.addBtn:
				this.count+=1;
				this.num.text = this.count+"";
				break;
			case this.reduceBtn:
				if(this.count > 0){
					this.count -= 1;
					this.num.text = this.count+"";
				}
				break;
		}
	}
	public get m_count():number{
		return this.count;
	}
	public set m_count(value:number){
		this.count = value;
		this.num.text = this.count+"";
	}
}