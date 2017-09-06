class GameController extends BaseController{
	/**本模块的数据存储 */
	private gameModel:GameModel;
	/**本模块ui */
	private gameView:ViewGame;
	/**本模块proxy */
	private gameProxy:GameProxy;
	public constructor() {
		super();
		//初始化model
		this.gameModel = new GameModel(this);
		//初始化ui
		this.gameView = new ViewGame(this,LayerManager.UI_Main);
		App.ViewManager.register(ViewConst.Game,this.gameView)
		//初始化proxy
		this.gameProxy = new GameProxy(this);
	}
}