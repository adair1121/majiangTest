class PopJoinRoomController extends BaseController{
	/**本模块的数据存储 */
	private proJoinRoomModel:PopJoinRoomModel;
	/**本模块ui */
	private popJoinRome:PopJoinRome;
	/**本模块proxy */
	private popJoinRoomProxy:PopJoinRoomProxy;
	public constructor() {
		super();
		//初始化model
		this.proJoinRoomModel = new PopJoinRoomModel(this);
		//初始化ui
		this.popJoinRome = new PopJoinRome(this,LayerManager.UI_Popup);
		App.ViewManager.register(ViewConst.Join,this.popJoinRome);
		//初始化proxy
		this.popJoinRoomProxy = new PopJoinRoomProxy(this)
	}
}