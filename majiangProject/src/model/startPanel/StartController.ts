class StartController extends BaseController{
	/**本模块的数据存储 */
	private startModel:StartModel;
	/**本模块ui */
	private startView:ViewStart;
	/**本模块proxy */
	private startProxy:StartProxy;
	public constructor() {
		super();
		//初始化model
		this.startModel = new StartModel(this);
		//初始化ui
		this.startView = new ViewStart(this,LayerManager.UI_Main);
		App.ViewManager.register(ViewConst.Start,this.startView);
		//初始化proxy
		this.startProxy = new StartProxy(this);
	}
}