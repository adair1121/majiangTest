class CardItem extends eui.ItemRenderer{
	public cardIcon:eui.Image;
	public cardBg:eui.Image;
	private defaultBg:string = "opposite_block_image_30_png";
	private leftBg:string = "dachupai_left_png";
	private _icon:string;
	public laiOrPi:eui.Image;
	public constructor() {
		super();
		this.skinName = "CardItemSkin";
		this.laiOrPi.visible = false;
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
	/**
	 * 设置痞子或癞子的显示
	 */
	public setOperLabel(oper:number,pi:number,lai:number):void{
		this.laiOrPi.visible = true;
		if(oper === lai){
			this.laiOrPi.source = "icon_lai_png";
		}else if(oper === pi){
			this.laiOrPi.source = "icon_pi_png";
		}else{
			this.laiOrPi.visible = false;
		}

	}
}