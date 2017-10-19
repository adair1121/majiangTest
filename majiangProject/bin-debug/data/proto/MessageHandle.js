var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var proto;
(function (proto) {
    var MessageHandle = (function () {
        function MessageHandle() {
            this.commands = {};
            this.commands[proto.MessageType.s_LoginAccount] = this.do_s_LoginAccount;
            this.commands[proto.MessageType.s_Kickout] = this.do_s_Kickout;
            this.commands[proto.MessageType.s_CreateRoom] = this.do_s_CreateRoom;
            this.commands[proto.MessageType.s_EnterRoom] = this.do_s_EnterRoom;
            this.commands[proto.MessageType.s_LeaveRoom] = this.do_s_LeaveRoom;
            this.commands[proto.MessageType.s_RaiseHands] = this.do_s_RaiseHands;
            this.commands[proto.MessageType.s_AttrChange] = this.do_s_AttrChange;
            this.commands[proto.MessageType.s_NotifyEnterTable] = this.do_s_NotifyEnterTable;
            this.commands[proto.MessageType.s_NotifyLeaveTable] = this.do_s_NotifyLeaveTable;
            this.commands[proto.MessageType.s_NotifyHandCards] = this.do_s_NotifyHandCards;
            this.commands[proto.MessageType.s_NotifyDealCard] = this.do_s_NotifyDealCard;
            this.commands[proto.MessageType.s_NotifyPlayCard] = this.do_s_NotifyPlayCard;
            this.commands[proto.MessageType.s_NotifyPlayResponse] = this.do_s_NotifyPlayResponse;
            this.commands[proto.MessageType.s_NotifyChangeOpUser] = this.do_s_NotifyChangeOpUser;
            this.commands[proto.MessageType.s_NotifyEndHandCards] = this.do_s_NotifyEndHandCards;
            this.commands[proto.MessageType.s_DrawCardResponse] = this.do_s_DrawCardResponse;
            this.commands[proto.MessageType.s_PlayCard] = this.do_s_PlayCard;
            this.commands[proto.MessageType.s_PlayCardResponse] = this.do_s_PlayCardResponse;
        }
        MessageHandle.prototype.do_s_LoginAccount = function (mess) { };
        MessageHandle.prototype.do_s_Kickout = function (mess) { };
        MessageHandle.prototype.do_s_CreateRoom = function (mess) { };
        MessageHandle.prototype.do_s_EnterRoom = function (mess) { };
        MessageHandle.prototype.do_s_LeaveRoom = function (mess) { };
        MessageHandle.prototype.do_s_RaiseHands = function (mess) { };
        MessageHandle.prototype.do_s_AttrChange = function (mess) { };
        MessageHandle.prototype.do_s_NotifyEnterTable = function (mess) { };
        MessageHandle.prototype.do_s_NotifyLeaveTable = function (mess) { };
        MessageHandle.prototype.do_s_NotifyHandCards = function (mess) { };
        MessageHandle.prototype.do_s_NotifyDealCard = function (mess) { };
        MessageHandle.prototype.do_s_NotifyPlayCard = function (mess) { };
        MessageHandle.prototype.do_s_NotifyPlayResponse = function (mess) { };
        MessageHandle.prototype.do_s_NotifyChangeOpUser = function (mess) { };
        MessageHandle.prototype.do_s_NotifyEndHandCards = function (mess) { };
        MessageHandle.prototype.do_s_DrawCardResponse = function (mess) { };
        MessageHandle.prototype.do_s_PlayCard = function (mess) { };
        MessageHandle.prototype.do_s_PlayCardResponse = function (mess) { };
        return MessageHandle;
    }());
    proto.MessageHandle = MessageHandle;
    __reflect(MessageHandle.prototype, "proto.MessageHandle");
})(proto || (proto = {}));
//# sourceMappingURL=MessageHandle.js.map