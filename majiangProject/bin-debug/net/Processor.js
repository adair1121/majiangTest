var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var proto;
(function (proto) {
    var Processor = (function (_super) {
        __extends(Processor, _super);
        function Processor() {
            return _super.call(this) || this;
        }
        Processor.prototype.handle = function (p) {
            if (this.commands[p.S]) {
                this.commands[p.S](p);
            }
        };
        Processor.prototype.do_close = function () {
            console.log("与服务器断开连接");
            Config.connectState = false;
        };
        Processor.prototype.do_connect = function () {
            console.log("连接服务器成功");
            Config.connectState = true;
            // var msg_login:proto.c_Login=new proto.c_Login();
            // msg_login.name=Config.username;
            // msg_login.pass=Config.password;
            // msg_login.isReLogin=false; 
            // SocketManager.getInstance().sendProto(msg_login);
        };
        Processor.prototype.do_s_LoginAccount = function (mess) {
            App.MessageCenter.dispatch(LoginConsts.LOGIN_S2C, mess);
        };
        Processor.prototype.do_s_Kickout = function (mess) {
            App.MessageCenter.dispatch(LoginConsts.KICK_OUT_S2C, mess);
        };
        Processor.prototype.do_s_CreateRoom = function (mess) {
            App.MessageCenter.dispatch(StartConsts.CREATE_ROOM_S2C, mess);
        };
        Processor.prototype.do_s_EnterRoom = function (mess) {
            App.MessageCenter.dispatch(StartConsts.JOIN_ROOM_S2C, mess);
        };
        Processor.prototype.do_s_AttrChange = function (mess) {
        };
        /**加入玩家信息 */
        Processor.prototype.do_s_NotifyEnterTable = function (mess) {
            App.MessageCenter.dispatch(GameConsts.OTHER_ENTERTABEL_S2C, mess);
        };
        /**玩家离开座位 */
        Processor.prototype.do_s_NotifyLeaveTable = function (mess) {
            App.MessageCenter.dispatch(GameConsts.LEAVETABLE_S2C, mess);
        };
        /**通知手牌信息 */
        Processor.prototype.do_s_NotifyHandCards = function (mess) {
            App.MessageCenter.dispatch(GameConsts.NOTIFY_HANDCARDS_S2C, mess);
        };
        /**通知发牌信息 */
        Processor.prototype.do_s_NotifyDealCard = function (mess) {
            App.MessageCenter.dispatch(GameConsts.NOTIFY_HANDCARDS_S2C, mess);
        };
        /**通知打牌信息 */
        Processor.prototype.do_s_NotifyPlayCard = function (mess) {
            App.MessageCenter.dispatch(GameConsts.NOTIFY_PLAYCARDS_S2C, mess);
        };
        /**通知打牌响应 */
        Processor.prototype.do_s_NotifyPlayResponse = function (mess) {
            App.MessageCenter.dispatch(GameConsts.NOTIFY_PLAYRESPONSE_S2C, mess);
        };
        /**通知切换操作玩家 */
        Processor.prototype.do_s_NotifyChangeOpUser = function (mess) {
            App.MessageCenter.dispatch(GameConsts.NOTIFY_CHANGEOPUSER_S2C, mess);
        };
        /**游戏结束通知所有玩家手牌信息 */
        Processor.prototype.do_s_NotifyEndHandCards = function (mess) {
            App.MessageCenter.dispatch(GameConsts.CURGAME_END_S2C, mess);
        };
        /**通知举手信息 */
        Processor.prototype.do_s_RaiseHands = function (mess) {
            App.MessageCenter.dispatch(GameConsts.RAISEHANDS_S2C, mess);
        };
        /**摸牌响应,摸牌时出现的胡牌杠牌等操作选项的响应 */
        Processor.prototype.do_s_DrawCardResponse = function (mess) {
            App.MessageCenter.dispatch(GameConsts.DRAWCARDRESPONSE_S2C, mess);
        };
        /**打牌 */
        Processor.prototype.do_s_PlayCard = function (mess) {
            App.MessageCenter.dispatch(GameConsts.PLAYCARD_S2C, mess);
        };
        /**打牌响应,别人打出牌吃碰杠等操作 */
        Processor.prototype.do_s_PlayCardResponse = function (mess) {
            App.MessageCenter.dispatch(GameConsts.PLAYCARDRESPONSE_S2C, mess);
        };
        return Processor;
    }(proto.MessageHandle));
    proto.Processor = Processor;
    __reflect(Processor.prototype, "proto.Processor");
})(proto || (proto = {}));
//# sourceMappingURL=Processor.js.map