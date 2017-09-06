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
		//注册创建房间c2s
		this.registerFunc(StartConsts.CREATE_ROOM_C2S,this.creatRoom,this);
		//注册创建房间s2c
		this.registerFunc(StartConsts.CREATE_ROOM_C2S,this.creatRoomRes,this);
		//注册加入房间c2s
		this.registerFunc(StartConsts.CREATE_ROOM_C2S,this.joinRoom,this);
		//注册加入房间s2c
		this.registerFunc(StartConsts.CREATE_ROOM_C2S,this.joinRoomRes,this);
	}
	private creatRoom(dataObj:any):void{
		this.startProxy.createRoom(dataObj);
	}
	private creatRoomRes(msg:proto.s_CreateRoom):void{

	}
	private joinRoom(dataObj:any):void{
		this.startProxy.joinRoom(dataObj);
	}
	private joinRoomRes(msg:proto.s_EnterRoom):void{

	}
}