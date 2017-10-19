var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameController = (function (_super) {
    __extends(GameController, _super);
    function GameController() {
        var _this = _super.call(this) || this;
        //初始化model
        _this.gameModel = new GameModel(_this);
        //初始化ui
        _this.gameView = new ViewGame(_this, LayerManager.UI_Main);
        App.ViewManager.register(ViewConst.Game, _this.gameView);
        //初始化proxy
        _this.gameProxy = new GameProxy(_this);
        //注册s2c
        _this.registerFunc(GameConsts.ENTERTABLE_S2C, _this.onEnterTable, _this);
        _this.registerFunc(GameConsts.LEAVETABLE_S2C, _this.onLeaveTabel, _this);
        _this.registerFunc(GameConsts.CURGAME_END_S2C, _this.curGameEnd, _this);
        _this.registerFunc(GameConsts.OTHER_ENTERTABEL_S2C, _this.otherEnterTable, _this);
        _this.registerFunc(GameConsts.RAISEHANDS_S2C, _this.onRaiseHandsRes, _this);
        _this.registerFunc(GameConsts.DRAWCARDRESPONSE_S2C, _this.drawCardResponseRes, _this);
        _this.registerFunc(GameConsts.PLAYCARD_S2C, _this.playCardRes, _this);
        _this.registerFunc(GameConsts.PLAYCARDRESPONSE_S2C, _this.playCardResponseRes, _this);
        _this.registerFunc(GameConsts.NOTIFY_HANDCARDS_S2C, _this.notifyHandCards, _this);
        _this.registerFunc(GameConsts.NOTIFY_DEALCARDS_S2C, _this.notifyDealCards, _this);
        _this.registerFunc(GameConsts.NOTIFY_PLAYCARDS_S2C, _this.notifyPlayCards, _this);
        _this.registerFunc(GameConsts.NOTIFY_PLAYRESPONSE_S2C, _this.notifyPlayResponse, _this);
        _this.registerFunc(GameConsts.NOTIFY_CHANGEOPUSER_S2C, _this.notifyChangeUser, _this);
        //注册c2s
        _this.registerFunc(GameConsts.RAISEHANDS_C2S, _this.onRaiseHands, _this);
        _this.registerFunc(GameConsts.DRAWCARDRESPONSE_C2S, _this.drawCardResponse, _this);
        _this.registerFunc(GameConsts.PLAYCARD_C2S, _this.playCard, _this);
        _this.registerFunc(GameConsts.PLAYCARDRESPONSE_C2S, _this.playCardResponse, _this);
        return _this;
    }
    /**举手 */
    GameController.prototype.onRaiseHands = function (dataObj) {
        this.gameProxy.raiseHands(dataObj);
    };
    /**摸牌响应,摸牌时出现的胡牌杠牌等操作选项的响应 请求*/
    GameController.prototype.drawCardResponse = function (dataObj) {
        this.gameProxy.drawCardResponse(dataObj);
    };
    /**打出牌 */
    GameController.prototype.playCard = function (card) {
        this.gameProxy.playCard(card);
    };
    /** 打牌响应,别人打出牌吃碰杠等操作 -- 发送请求*/
    GameController.prototype.playCardResponse = function (dataObj) {
        this.gameProxy.playCardResponse(dataObj);
    };
    //=====================服务器返回====================
    GameController.prototype.onEnterTable = function (msg) {
        this.gameView.createRoleInfo(msg.userInfoList);
    };
    GameController.prototype.onLeaveTabel = function (msg) {
        this.gameView.leaveSeat(msg.seat);
    };
    GameController.prototype.curGameEnd = function (msg) {
        this.gameView.curGameEnd(msg);
    };
    GameController.prototype.otherEnterTable = function (msg) {
        this.gameView.createRoleInfo([msg.userInfo]);
    };
    /**举手返回 */
    GameController.prototype.onRaiseHandsRes = function (msg) {
        if (msg.isSuccess) {
            //举手成功
            this.gameView.raiseHandSuccess();
        }
        else {
            alert(msg.errMsg);
        }
    };
    /** 摸牌响应,摸牌时出现的胡牌杠牌等操作选项的响应 返回*/
    GameController.prototype.drawCardResponseRes = function (msg) {
    };
    /**打出牌返回 */
    GameController.prototype.playCardRes = function (msg) {
        if (msg.isSuccess) {
            this.gameView.playCardSuccess();
        }
        else {
            alert(msg.errMsg);
        }
    };
    /**打牌响应,别人打出牌吃碰杠等操作 */
    GameController.prototype.playCardResponseRes = function (msg) {
        if (msg.isSuccess) {
            this.gameView.playCardResponse();
        }
        else {
            alert(msg.errMsg);
        }
    };
    /**通知手牌信息 */
    GameController.prototype.notifyHandCards = function (msg) {
        this.gameView.showGameState(msg);
    };
    /**通知发牌信息 */
    GameController.prototype.notifyDealCards = function (msg) {
        this.gameView.notifyDealCards(msg);
    };
    /**通知打牌信息 */
    GameController.prototype.notifyPlayCards = function (msg) {
        this.gameView.notifyPlayCard(msg);
    };
    /** 通知打牌响应 玩家打牌后等待其它三个玩家响应*/
    GameController.prototype.notifyPlayResponse = function (msg) {
        this.gameView.notifyPlayResponse(msg);
    };
    /**通知切换操作玩家 */
    GameController.prototype.notifyChangeUser = function (msg) {
        this.gameView.notifyChangeUser(msg.seat);
    };
    return GameController;
}(BaseController));
__reflect(GameController.prototype, "GameController");
//# sourceMappingURL=GameController.js.map