var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameProxy = (function (_super) {
    __extends(GameProxy, _super);
    function GameProxy($controller) {
        var _this = _super.call(this, $controller) || this;
        _this.receiveServerMsg(GameConsts.ENTERTABLE_S2C, _this.enterTable, _this);
        _this.receiveServerMsg(GameConsts.CURGAME_END_S2C, _this.curGameEnd, _this);
        _this.receiveServerMsg(GameConsts.LEAVETABLE_S2C, _this.leaveTable, _this);
        _this.receiveServerMsg(GameConsts.OTHER_ENTERTABEL_S2C, _this.otherEnterTable, _this);
        _this.receiveServerMsg(GameConsts.RAISEHANDS_S2C, _this.onRaiseHandsRes, _this);
        _this.receiveServerMsg(GameConsts.DRAWCARDRESPONSE_S2C, _this.drawCardResponseRes, _this);
        _this.receiveServerMsg(GameConsts.PLAYCARD_S2C, _this.playCardRes, _this);
        _this.receiveServerMsg(GameConsts.PLAYCARDRESPONSE_S2C, _this.playCardResponseRes, _this);
        _this.receiveServerMsg(GameConsts.NOTIFY_HANDCARDS_S2C, _this.notifyHandCards, _this);
        _this.receiveServerMsg(GameConsts.NOTIFY_DEALCARDS_S2C, _this.notifyDealCards, _this);
        _this.receiveServerMsg(GameConsts.NOTIFY_PLAYCARDS_S2C, _this.notifyPlayCards, _this);
        _this.receiveServerMsg(GameConsts.NOTIFY_PLAYRESPONSE_S2C, _this.notifyPlayResponse, _this);
        _this.receiveServerMsg(GameConsts.NOTIFY_CHANGEOPUSER_S2C, _this.notifyChangeUser, _this);
        return _this;
    }
    //=======================向服务器请求==========================
    GameProxy.prototype.raiseHands = function (dataObj) {
        var msg = new proto.c_RaiseHands();
        this.sendSocketMsg(msg);
    };
    //摸牌响应,摸牌时出现的胡牌杠牌等操作选项的响应 -- 发送服务器
    GameProxy.prototype.drawCardResponse = function (dataObj) {
        var msg = new proto.c_DrawCardResponse();
        msg.cardList = dataObj.cardList;
        msg.option = dataObj.option;
        this.sendSocketMsg(msg);
    };
    GameProxy.prototype.playCard = function (dataObj) {
        var msg = new proto.c_PlayCard();
        msg.card = dataObj.card;
        this.sendSocketMsg(msg);
    };
    //打牌响应,别人打出牌吃碰杠等操作 发送请求
    GameProxy.prototype.playCardResponse = function (dataObj) {
        var msg = new proto.c_PlayCardResponse();
        msg.cardList = dataObj.cardList;
        msg.option = dataObj.option;
        this.sendSocketMsg(msg);
    };
    //===================服务器返回==========================
    /**进入房间 */
    GameProxy.prototype.enterTable = function (msg) {
        this.applyFunc(GameConsts.ENTERTABLE_S2C, msg);
    };
    /**离开房间 */
    GameProxy.prototype.leaveTable = function (msg) {
        this.applyFunc(GameConsts.LEAVETABLE_S2C, msg);
    };
    /**当前局数结束 */
    GameProxy.prototype.curGameEnd = function (msg) {
        this.applyFunc(GameConsts.CURGAME_END_S2C, msg);
    };
    /**其他玩家进入房间 */
    GameProxy.prototype.otherEnterTable = function (msg) {
        this.applyFunc(GameConsts.OTHER_ENTERTABEL_S2C, msg);
    };
    /**举手返回*/
    GameProxy.prototype.onRaiseHandsRes = function (msg) {
        this.applyFunc(GameConsts.RAISEHANDS_S2C, msg);
    };
    /**摸牌响应,摸牌时出现的胡牌杠牌等操作选项的响应 返回 */
    GameProxy.prototype.drawCardResponseRes = function (msg) {
        this.applyFunc(GameConsts.DRAWCARDRESPONSE_S2C, msg);
    };
    /**响应出牌 */
    GameProxy.prototype.playCardRes = function (msg) {
        this.applyFunc(GameConsts.PLAYCARD_S2C, msg);
    };
    /**打牌响应,别人打出牌吃碰杠等操作 */
    GameProxy.prototype.playCardResponseRes = function (msg) {
        this.applyFunc(GameConsts.PLAYCARDRESPONSE_S2C, msg);
    };
    /**通知手牌信息 */
    GameProxy.prototype.notifyHandCards = function (msg) {
        this.applyFunc(GameConsts.NOTIFY_HANDCARDS_S2C, msg);
    };
    /**通知发牌信息 */
    GameProxy.prototype.notifyDealCards = function (msg) {
        this.applyFunc(GameConsts.NOTIFY_DEALCARDS_S2C, msg);
    };
    /**通知打牌信息 */
    GameProxy.prototype.notifyPlayCards = function (msg) {
        this.applyFunc(GameConsts.NOTIFY_PLAYCARDS_S2C, msg);
    };
    /**通知打牌响应 玩家打牌后等待其它三个玩家响应 */
    GameProxy.prototype.notifyPlayResponse = function (msg) {
        this.applyFunc(GameConsts.NOTIFY_PLAYRESPONSE_S2C, msg);
    };
    /**通知切换操作玩家 */
    GameProxy.prototype.notifyChangeUser = function (msg) {
        this.applyFunc(GameConsts.NOTIFY_CHANGEOPUSER_S2C, msg);
    };
    return GameProxy;
}(BaseProxy));
__reflect(GameProxy.prototype, "GameProxy");
//# sourceMappingURL=GameProxy.js.map