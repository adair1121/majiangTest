class GameProxy extends BaseProxy{
	public constructor($controller:BaseController) {
		super($controller);
		this.receiveServerMsg(GameConsts.ENTERTABLE_S2C,this.enterTable,this);
		this.receiveServerMsg(GameConsts.CURGAME_END_S2C,this.curGameEnd,this);
		this.receiveServerMsg(GameConsts.LEAVETABLE_S2C,this.leaveTable,this);
		this.receiveServerMsg(GameConsts.OTHER_ENTERTABEL_S2C,this.otherEnterTable,this);
		this.receiveServerMsg(GameConsts.RAISEHANDS_S2C,this.onRaiseHandsRes,this);
		this.receiveServerMsg(GameConsts.DRAWCARDRESPONSE_S2C,this.drawCardResponseRes,this);
		this.receiveServerMsg(GameConsts.PLAYCARD_S2C,this.playCardRes,this);
		this.receiveServerMsg(GameConsts.PLAYCARDRESPONSE_S2C,this.playCardResponseRes,this);
		this.receiveServerMsg(GameConsts.NOTIFY_HANDCARDS_S2C,this.notifyHandCards,this);
		this.receiveServerMsg(GameConsts.NOTIFY_DEALCARDS_S2C,this.notifyDealCards,this);
		this.receiveServerMsg(GameConsts.NOTIFY_PLAYCARDS_S2C,this.notifyPlayCards,this);
		this.receiveServerMsg(GameConsts.NOTIFY_PLAYRESPONSE_S2C,this.notifyPlayResponse,this);
		this.receiveServerMsg(GameConsts.NOTIFY_CHANGEOPUSER_S2C,this.notifyChangeUser,this);
	}
	//=======================向服务器请求==========================
	public raiseHands(dataObj:any):void{
		var msg:proto.c_RaiseHands = new proto.c_RaiseHands();
		this.sendSocketMsg(msg);
	}
	//摸牌响应,摸牌时出现的胡牌杠牌等操作选项的响应 -- 发送服务器
	public drawCardResponse(dataObj:any):void{
		var msg:proto.c_DrawCardResponse = new proto.c_DrawCardResponse();
		msg.cardList = dataObj.cardList;
		msg.option = dataObj.option;
		this.sendSocketMsg(msg);
	}
	public playCard(dataObj:any):void{
		var msg:proto.c_PlayCard = new proto.c_PlayCard();
		msg.card = dataObj.card;
		this.sendSocketMsg(msg);
	}
	//打牌响应,别人打出牌吃碰杠等操作 发送请求
	public playCardResponse(dataObj:any):void{
		var msg:proto.c_PlayCardResponse = new proto.c_PlayCardResponse();
		msg.cardList = dataObj.cardList;
		msg.option = dataObj.option;
		this.sendSocketMsg(msg);
	}
	//===================服务器返回==========================
	/**进入房间 */
	private enterTable(msg:proto.s_EnterRoom):void{
		this.applyFunc(GameConsts.ENTERTABLE_S2C,msg);
	}
	/**离开房间 */
	private leaveTable(msg:proto.s_NotifyLeaveTable):void{
		this.applyFunc(GameConsts.LEAVETABLE_S2C,msg);
	}
	/**当前局数结束 */
	private curGameEnd(msg:proto.s_NotifyEndHandCards):void{
		this.applyFunc(GameConsts.CURGAME_END_S2C,msg);
	}
	/**其他玩家进入房间 */
	private otherEnterTable(msg:proto.s_NotifyEnterTable):void{
		this.applyFunc(GameConsts.OTHER_ENTERTABEL_S2C,msg);
	}
	/**举手返回*/
	private onRaiseHandsRes(msg:proto.s_RaiseHands):void{
		this.applyFunc(GameConsts.RAISEHANDS_S2C,msg);
	}
	/**摸牌响应,摸牌时出现的胡牌杠牌等操作选项的响应 返回 */
	private drawCardResponseRes(msg:proto.s_DrawCardResponse):void{
		this.applyFunc(GameConsts.DRAWCARDRESPONSE_S2C,msg);
	}
	/**响应出牌 */
	private playCardRes(msg:proto.s_PlayCard):void{
		this.applyFunc(GameConsts.PLAYCARD_S2C,msg);
	}
	/**打牌响应,别人打出牌吃碰杠等操作 */
	private playCardResponseRes(msg:proto.s_PlayCardResponse):void{
		this.applyFunc(GameConsts.PLAYCARDRESPONSE_S2C,msg);
	}
	/**通知手牌信息 */
	private notifyHandCards(msg:proto.s_NotifyHandCards):void{
		this.applyFunc(GameConsts.NOTIFY_HANDCARDS_S2C,msg);
	}
	/**通知发牌信息 */
	private notifyDealCards(msg:proto.s_NotifyDealCard):void{
		this.applyFunc(GameConsts.NOTIFY_DEALCARDS_S2C,msg);
	}
	/**通知打牌信息 */
	private notifyPlayCards(msg:proto.s_NotifyPlayCard):void{
		this.applyFunc(GameConsts.NOTIFY_PLAYCARDS_S2C,msg);
	}
	/**通知打牌响应 玩家打牌后等待其它三个玩家响应 */
	public notifyPlayResponse(msg:proto.s_NotifyPlayResponse):void{
		this.applyFunc(GameConsts.NOTIFY_PLAYRESPONSE_S2C,msg);
	}
	/**通知切换操作玩家 */
	public notifyChangeUser(msg:proto.s_NotifyChangeOpUser):void{
		this.applyFunc(GameConsts.NOTIFY_CHANGEOPUSER_S2C,msg);
	}
}