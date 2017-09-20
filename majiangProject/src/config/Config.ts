class Config {
	public constructor() {
	}

	/**游戏地址 */
	public static gameHost:string="111.231.114.223";//测试
	public static gamePort:number=5005;

	/**版本号 */
	public static THMVERSION:string = "0.0.1";
	public static RESVERSION:string = "0.0.1";

	/**测试用户 */
	public static username:string="g42";
	public static password:string="greentea";


	/**窗口大小 */
	public static w_width:number=1280;
	public static w_height:number=720;

	/**平铺卡牌出牌尺寸 */
	public static w_tieldCard:number = 38;
	public static h_tieldCard:number = 56;

	/** 平铺卡牌组合尺寸*/
	public static w_tieldGroup:number = 98;
	public static h_tieldGroup:number = 142;

	/**玩家手牌尺寸 */
	public static w_handCard:number = 88;
	public static h_handCard:number = 128;

	/**当前玩家手牌容器初始x */
	public static x_handCard:number = 96;
	/**当前玩家手牌容器初始y */
	public static y_handCard:number = 580;

	/**默认游戏背景音乐强度百分比 */
	public static bgSoundPercent:number = 50;
	/**默认游戏音效强度百分比 */
	public static soundEffectPercent:number = 50;

	/**卡牌资源路径 */
	public static path_card:string = "../resource/assets/ui/card/";
	/**音频路径 */
	public static audio_path:string = "../resource/assets/audio/";
	/**网络连接状态 */
	public static connectState:boolean;
	/**当前游戏宽度 */
	public static curWidth():number{
		return egret.MainContext.instance.stage.stageWidth;
	}
	/**当前游戏高度 */
	public static curHeight():number{
		return egret.MainContext.instance.stage.stageHeight;
	}

	/**时间戳 */
	public static time_stamps:number=0;

	public static curStage():egret.Stage{
		return egret.MainContext.instance.stage;
	}

}