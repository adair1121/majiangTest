class MyButton extends eui.ItemRenderer{
	public num:eui.BitmapLabel;
	public constructor() {
		super();
		this.skinName = "MyButtonSkin";
	}
	protected dataChanged():void{
		this.num.text = this.data.num;
	}
}