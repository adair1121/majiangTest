class PopCreateRoomController extends BaseController{
	/**本模块的数据存储 */
	private proCreateRoomModel:PopCreateRoomModel;
	/**本模块ui */
	private popCreateRome:PopCreateRoom;
	/**本模块proxy */
	private popCreateRoomProxy:PopCreateRoomProxy;
	public constructor() {
		super();
		//初始化model
		this.proCreateRoomModel = new PopCreateRoomModel(this);
		//初始化ui
		this.popCreateRome = new PopCreateRoom(this,LayerManager.UI_Popup);
		App.ViewManager.register(ViewConst.Create,this.popCreateRome);
		//初始化proxy
		this.popCreateRoomProxy = new PopCreateRoomProxy(this);
	}
	
}