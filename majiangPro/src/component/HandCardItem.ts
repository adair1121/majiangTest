class HandCardItem extends eui.Component{
	public cardIcon:eui.Image;
	public path_icon:string = "";
	public cardId:string;
	private soundObj:any = {};
	private sound:egret.Sound;
	private channel:egret.SoundChannel;
	public cardIdNum:number;
	public laiOrPiIcon:eui.Image;
	public constructor(template:data.CardConfigTemple) {
		super();
		this.skinName = "HandCardItemSkin";
		this.cardId = template.icon;
		this.path_icon = this.cardId + "_png";
		this.cardIdNum = parseInt(this.cardId);
		RES.getResByUrl(Config.audio_path + template.manVoice+".mp3",function(value){
			this.soundObj[1] = value;
		},this,RES.ResourceItem.TYPE_SOUND);
		RES.getResByUrl(Config.audio_path + template.womenVoice+".mp3",function(value){
			this.soundObj[2] = value;
		},this,RES.ResourceItem.TYPE_SOUND);
		this.scaleX = this.scaleY = 0.8;
		this.laiOrPiIcon.visible = true;
	}
	protected childrenCreated():void{
		this.cardIcon.source = this.path_icon;
	}
	public playEffect(sex:number):void{
		this.sound = this.soundObj[sex] as egret.Sound;
		if(this.sound){
			this.channel = this.sound.play(0,1);
			this.channel.volume = Config.soundEffectPercent;
		}
	}
	/**
	 * 设置痞子或癞子的显示
	 */
	public setOperLabel(oper:number,pi:number,lai:number):void{
		this.laiOrPiIcon.visible = true;
		if(oper === lai){
			this.laiOrPiIcon.source = "icon_lai_png";
		}else if(oper === pi){
			this.laiOrPiIcon.source = "icon_pi_png";
		}else{
			this.laiOrPiIcon.visible = false;
		}

	}
}