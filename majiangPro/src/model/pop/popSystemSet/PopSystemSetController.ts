class PopSystemSetController extends BaseController{
	/**本模块ui */
	private popSystemSet:PopSystemSet;
	public constructor() {
		super();
		//初始化ui
		this.popSystemSet = new PopSystemSet(this,LayerManager.UI_Popup);
		App.ViewManager.register(ViewConst.SystemSet,this.popSystemSet);
	}
}