class CardItem extends eui.ItemRenderer{
	public cardIcon:eui.Image;
	public constructor() {
		super();
	}
	protected dataChanged():void{
		this.cardIcon.source = this.data.icon;
	}
}