class StartProxy extends BaseProxy{
	public constructor(controller:BaseController) {
		super(controller);
		/**注册从服务器返回消息的监听 */
		this.receiveServerMsg(StartConsts.CREATE_ROOM_S2C,this.createRoomRes,this);
		this.receiveServerMsg(StartConsts.JOIN_ROOM_S2C,this.joinRoomRes,this);
	}
	public createRoom(dataObj:any):void{
		var msg:proto.c_CreateRoom = new proto.c_CreateRoom();
		msg.playerCount = dataObj.roomNum;
		msg.times = dataObj.counts;
		msg.roomPassword = dataObj.roomPwd;
		msg.basicScore = dataObj.score;
		this.sendSocketMsg(msg);
	}
	public joinRoom(dataObj:any):void{

	}
	private createRoomRes(obj:proto.s_CreateRoom):void{
		this.applyFunc(StartConsts.CREATE_ROOM_S2C,obj);
	}
	private joinRoomRes(obj:proto.s_EnterRoom):void{
		this.applyFunc(StartConsts.JOIN_ROOM_S2C,obj);
	}
}