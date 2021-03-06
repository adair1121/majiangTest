class PopSystemSet extends BaseEuiView{
	public btnClose:eui.Image;
	public sndEffectSlider:MyHSlider;
	public sndSlider:MyHSlider;
	public btnExit:eui.Image;
	public constructor($controller:BaseController,$parent:egret.DisplayObjectContainer) {
		super($controller,$parent);
		this.skinName = "PopHomeSetSkin";
	}
	/**
	 * 对面板进行初始化
	 */
	public initUI():void{
		super.initUI();
		this.sndEffectSlider.minimum = 0;
		this.sndSlider.minimum = 0;
		this.sndEffectSlider.maximum = 100;
		this.sndSlider.maximum = 100;
		this.sndEffectSlider.progressBar.maximum = 100;
		this.sndSlider.progressBar.maximum = 100;
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchHandler,this);
		this.sndEffectSlider.addEventListener(eui.UIEvent.CHANGE, this.effectSndChangeHandler, this);
		this.sndSlider.addEventListener(eui.UIEvent.CHANGE, this.bgSndChangeHandler, this);
		this.x = (Config.w_width >> 1) - (this.width>>1);
		this.y = (Config.w_height >> 1) - (this.height >> 1);
	}
	/**
	 * 面板开启执行函数
	 */
	public open(param:any[]):void{
		this.sndEffectSlider.value = Config.soundEffectPercent;
		this.sndEffectSlider.progressBar.value = Config.soundEffectPercent;
		this.sndSlider.value = Config.bgSoundPercent;
		this.sndSlider.progressBar.value = Config.bgSoundPercent;
		
	}
	private effectSndChangeHandler(evt:eui.UIEvent):void{
		Config.soundEffectPercent = evt.target.value;
		this.sndEffectSlider.progressBar.value = Config.soundEffectPercent;
	}
	private bgSndChangeHandler(evt:eui.UIEvent):void{
		Config.bgSoundPercent = evt.target.value;
		this.sndSlider.progressBar.value = Config.bgSoundPercent;
	}
	/**
	 * 面板关闭执行函数
	 */
	public close(param:any[]):void{
		App.ViewManager.close(ViewConst.SystemSet);
		this.applyControllerFunc(ControllerConst.START_CONTROLLER,StartConsts.INIT_STARTPANEL)
	}
	private onTouchHandler(evt:egret.TouchEvent):void{
		switch(evt.target){
			case this.btnClose:
				this.close([]);
				break;
			case this.btnExit:
				//退出游戏
				break;
		}
	}
}