class CardItem extends eui.ItemRenderer{
	public cardIcon:eui.Image;
	public cardBg:eui.Image;
	private defaultBg:string = "opposite_block_image_30_png";
	private leftBg:string = "dachupai_left";
	private _icon:string;
	public constructor() {
		super();
		this.skinName = "CardItemSkin";
	}
	protected dataChanged():void{
		this.cardIcon.source = this.data.icon;
		if(this.data.cardBg){
			this.cardBg.source = this.leftBg;
		}else{
			this.cardBg.source = this.defaultBg;
		}
	}
	public set icon(source:string){
		this.cardIcon.source = source+"_png";
		this._icon = source;
		this.cardBg.source = this.defaultBg;
	}
	public get icon():string{
		return this._icon;
	}
	public get iconTrans():number{
		return parseInt(this._icon);
	}
}