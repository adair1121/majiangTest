class HandCardItem extends eui.Component{
	public cardIcon:eui.Image;
	public path_icon:string = "";
	public cardId:string;
	private soundObj:any = {};
	private sound:egret.Sound;
	private channel:egret.SoundChannel;
	public laiOrPi:eui.Label;
	public constructor(template:data.CardConfigTemple) {
		super();
		this.skinName = "HandCardItemSkin";
		this.cardId = template.icon;
		this.path_icon = this.cardId + "_png";
		RES.getResByUrl(Config.audio_path + template.manVoice+".mp3",function(value){
			this.soundObj[1] = value;
		},this,RES.ResourceItem.TYPE_SOUND);
		RES.getResByUrl(Config.audio_path + template.womenVoice+".mp3",function(value){
			this.soundObj[2] = value;
		},this,RES.ResourceItem.TYPE_SOUND);
		this.laiOrPi.visible = false;
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
	public setOperLabel(oper:number):void{
		this.laiOrPi.visible = true;
		if(oper === data.Option.Lai){
			this.laiOrPi.text = "癞";
		}else if(oper === data.Option.Pi){
			this.laiOrPi.text = "痞";
		}else{
			this.laiOrPi.visible = false;
		}

	}
}