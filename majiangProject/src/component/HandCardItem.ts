class HandCardItem extends eui.Component{
	public cardIcon:eui.Image;
	public path_icon:string = "";
	public cardId:string;
	public constructor(icon:string) {
		super();
		this.skinName = "HandCardItemSkin";
		this.cardId = icon;
		this.path_icon = Config.path_card + icon + ".png";
	}
	protected childrenCreated():void{
		this.cardIcon.source = this.path_icon;
	}
}