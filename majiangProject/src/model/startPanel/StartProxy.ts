class StartProxy extends BaseProxy{
	public constructor(controller:BaseController) {
		super(controller);
		/**注册从服务器返回消息的监听 */
		this.receiveServerMsg(StartConsts.CREATE_ROOM_S2C,this.createRoomRes,this);
		this.receiveServerMsg(StartConsts.JOIN_ROOM_S2C,this.joinRoomRes,this);
	}
	public createRoom(dataObj:any):void{
		var msg:proto.c_CreateRoom = new proto.c_CreateRoom();
		msg.playerCount = dataObj.playerCount;
		msg.times = dataObj.times;
		msg.roomPassword = "111111";
		msg.basicScore = dataObj.basicScore;
		this.sendSocketMsg(msg);
	}
	public joinRoom(dataObj:any):void{
		var msg:proto.c_EnterRoom = new proto.c_EnterRoom();
		msg.tableId = dataObj.tableId;
		msg.roomPassword = "111111";
		this.sendSocketMsg(msg);
	}
	private createRoomRes(obj:proto.s_CreateRoom):void{
		this.applyFunc(StartConsts.CREATE_ROOM_S2C,obj);
	}
	private joinRoomRes(obj:proto.s_EnterRoom):void{
		this.applyFunc(StartConsts.JOIN_ROOM_S2C,obj);
	}
}