class PopMyScoreController extends BaseController{
	/**本模块ui */
	private popMyScore:PopScore;
	public constructor() {
		super();
		//初始化ui
		this.popMyScore = new PopScore(this,LayerManager.UI_Popup);
		App.ViewManager.register(ViewConst.MyScore,this.popMyScore);
	}
}