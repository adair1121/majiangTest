class HandCardItem extends eui.Component{
	public cardIcon:eui.Image;
	private path_icon:string = "";
	public index:number;
	public constructor(icon:string,index:number) {
		super();
		this.skinName = "HandCardItemSkin";
		this.path_icon = Config.path_card + icon + ".png";
		this.index = index;
	}
	protected childrenCreated():void{
		this.cardIcon.source = this.path_icon;
	}
}