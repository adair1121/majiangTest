class CardItem extends eui.ItemRenderer{
	public cardIcon:eui.Image;
	public cardBg:eui.Image;
	private defaultBg:string = "opposite_block_image_30_png";
	private leftBg:string = "dachupai_left";
	public constructor() {
		super();
	}
	protected dataChanged():void{
		this.cardIcon.source = this.data.icon;
		if(this.data.cardBg){
			this.cardBg.source = this.leftBg;
		}else{
			this.cardBg.source = this.defaultBg;
		}
	}
}