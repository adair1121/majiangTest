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
		//注册s2c
		this.registerFunc(GameConsts.ENTERTABLE_S2C,this.onEnterTable,this);
		this.registerFunc(GameConsts.LEAVETABLE_S2C,this.onLeaveTabel,this);
		this.registerFunc(GameConsts.CURGAME_END_S2C,this.curGameEnd,this);
		this.registerFunc(GameConsts.OTHER_ENTERTABEL_S2C,this.otherEnterTable,this);
		this.registerFunc(GameConsts.RAISEHANDS_S2C,this.onRaiseHandsRes,this);
		this.registerFunc(GameConsts.DRAWCARDRESPONSE_S2C,this.drawCardResponseRes,this);
		this.registerFunc(GameConsts.PLAYCARD_S2C,this.playCardRes,this);
		this.registerFunc(GameConsts.PLAYCARDRESPONSE_S2C,this.playCardResponseRes,this);
		this.registerFunc(GameConsts.NOTIFY_HANDCARDS_S2C,this.notifyHandCards,this);
		this.registerFunc(GameConsts.NOTIFY_DEALCARDS_S2C,this.notifyDealCards,this);
		this.registerFunc(GameConsts.NOTIFY_PLAYCARDS_S2C,this.notifyPlayCards,this)
		this.registerFunc(GameConsts.NOTIFY_PLAYRESPONSE_S2C,this.notifyPlayResponse,this)
		this.registerFunc(GameConsts.NOTIFY_CHANGEOPUSER_S2C,this.notifyChangeUser,this)
		//注册c2s
		this.registerFunc(GameConsts.RAISEHANDS_C2S,this.onRaiseHands,this);
		this.registerFunc(GameConsts.DRAWCARDRESPONSE_C2S,this.drawCardResponse,this);
		this.registerFunc(GameConsts.PLAYCARD_C2S,this.playCard,this);
		this.registerFunc(GameConsts.PLAYCARDRESPONSE_C2S,this.playCardResponse,this);
	}
	/**举手 */
	private onRaiseHands(dataObj:any):void{
		this.gameProxy.raiseHands(dataObj);
	}
	/**摸牌响应,摸牌时出现的胡牌杠牌等操作选项的响应 请求*/
	private drawCardResponse(dataObj:any):void{
		this.gameProxy.drawCardResponse(dataObj);
	}
	/**打出牌 */
	private playCard(dataObj:any):void{
		this.gameProxy.playCard(dataObj);
	}
	/** 打牌响应,别人打出牌吃碰杠等操作 -- 发送请求*/
	private playCardResponse(dataObj:any):void{
		this.gameProxy.playCardResponse(dataObj);
	}
	//=====================服务器返回====================
	private onEnterTable(msg:proto.s_EnterRoom):void{
		this.gameView.createRoleInfo(msg.userInfoList);
	}
	private onLeaveTabel(msg:proto.s_NotifyLeaveTable):void{
		this.gameView.leaveSeat(msg.seat);
	}
	private curGameEnd(msg:proto.s_NotifyEndHandCards):void{
		this.gameView.curGameEnd(msg);
	}
	private otherEnterTable(msg:proto.s_NotifyEnterTable):void{
		this.gameView.createRoleInfo([msg.userInfo]);
	}
	/**举手返回 */
	private onRaiseHandsRes(msg:proto.s_RaiseHands):void{
		if(msg.isSuccess){
			//举手成功
			this.gameView.raiseHandSuccess();
		}else{
			alert(msg.errMsg);
		}
	}
	/** 摸牌响应,摸牌时出现的胡牌杠牌等操作选项的响应 返回*/
	private drawCardResponseRes(msg:proto.s_DrawCardResponse):void{

	}
	/**打出牌返回 */
	private playCardRes(msg:proto.s_PlayCard):void{

	}
	/**打牌响应,别人打出牌吃碰杠等操作 */
	private playCardResponseRes(msg:proto.s_PlayCardResponse):void{

	}
	/**通知手牌信息 */
	private notifyHandCards(msg:proto.s_NotifyHandCards):void{
		this.gameView.showGameState(msg);
	}
	/**通知发牌信息 */
	private notifyDealCards(msg:proto.s_NotifyDealCard):void{
		this.gameView.notifyDealCards(msg);
	}
	/**通知打牌信息 */
	private notifyPlayCards(msg:proto.s_NotifyPlayCard):void{

	}
	/** 通知打牌响应 玩家打牌后等待其它三个玩家响应*/
	private notifyPlayResponse(msg:proto.s_NotifyPlayResponse):void{

	}
	/**通知切换操作玩家 */
	private notifyChangeUser(msg:proto.s_NotifyChangeOpUser):void{

	}
}