module proto {
	export class Processor extends MessageHandle {
		public constructor() {
			super();
		}
		public handle(p: Pro) {
			if (this.commands[p.S]) {
				this.commands[p.S](p);
			}
		}
		public do_close() {
			console.log("与服务器断开连接");
			Config.connectState = false;
		}
		public do_connect() {
			console.log("连接服务器成功");
			Config.connectState = true;
			// var msg_login:proto.c_Login=new proto.c_Login();
			// msg_login.name=Config.username;
			// msg_login.pass=Config.password;
			// msg_login.isReLogin=false; 
			// SocketManager.getInstance().sendProto(msg_login);

		}
		public do_s_LoginAccount(mess:Pro):void{
			App.MessageCenter.dispatch(LoginConsts.LOGIN_S2C,mess);
		}
		public do_s_Kickout(mess:Pro):void{
			App.MessageCenter.dispatch(LoginConsts.KICK_OUT_S2C,mess);
		}
		public do_s_CreateRoom(mess:Pro):void{
			App.MessageCenter.dispatch(StartConsts.CREATE_ROOM_S2C,mess);
		}
		public do_s_EnterRoom(mess:Pro):void{
			App.MessageCenter.dispatch(StartConsts.JOIN_ROOM_S2C,mess);
		}
		public do_s_AttrChange(mess:Pro):void{

		}
		/**加入玩家信息 */
		public do_s_NotifyEnterTable(mess:Pro):void{
			App.MessageCenter.dispatch(GameConsts.OTHER_ENTERTABEL_S2C,mess);
		}
		/**玩家离开座位 */
		public do_s_NotifyLeaveTable(mess:Pro):void{
			App.MessageCenter.dispatch(GameConsts.LEAVETABLE_S2C,mess);
		}
		/**通知手牌信息 */
		public do_s_NotifyHandCards(mess:Pro):void{
			App.MessageCenter.dispatch(GameConsts.NOTIFY_HANDCARDS_S2C,mess);
		}
		/**通知发牌信息 */
		public do_s_NotifyDealCard(mess:Pro):void{
			App.MessageCenter.dispatch(GameConsts.NOTIFY_HANDCARDS_S2C,mess);
		}
		/**通知打牌信息 */
		public do_s_NotifyPlayCard(mess:Pro):void{
			App.MessageCenter.dispatch(GameConsts.NOTIFY_PLAYCARDS_S2C,mess);
		}
		/**通知打牌响应 */
		public do_s_NotifyPlayResponse(mess:Pro):void{
			App.MessageCenter.dispatch(GameConsts.NOTIFY_PLAYRESPONSE_S2C,mess);
		}
		/**通知切换操作玩家 */
		public do_s_NotifyChangeOpUser(mess:Pro):void{
			App.MessageCenter.dispatch(GameConsts.NOTIFY_CHANGEOPUSER_S2C,mess);
		}
		/**游戏结束通知所有玩家手牌信息 */
		public do_s_NotifyEndHandCards(mess:Pro):void{
			App.MessageCenter.dispatch(GameConsts.CURGAME_END_S2C,mess);
		}
		/**通知举手信息 */
		public do_s_RaiseHands(mess:Pro):void{
			App.MessageCenter.dispatch(GameConsts.RAISEHANDS_S2C,mess);
		}
		/**摸牌响应,摸牌时出现的胡牌杠牌等操作选项的响应 */
		public do_s_DrawCardResponse(mess:Pro):void{
			App.MessageCenter.dispatch(GameConsts.DRAWCARDRESPONSE_S2C,mess);
		}
		/**打牌 */
		public do_s_PlayCard(mess:Pro):void{
			App.MessageCenter.dispatch(GameConsts.PLAYCARD_S2C,mess);
		}
		/**打牌响应,别人打出牌吃碰杠等操作 */
		public do_s_PlayCardResponse(mess:Pro):void{
			App.MessageCenter.dispatch(GameConsts.PLAYCARDRESPONSE_S2C,mess);
		}
	}	
}