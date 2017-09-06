var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var proto;
(function (proto) {
    var MessageHandle = (function () {
        function MessageHandle() {
            this.commands = {};
            this.commands[proto.MessageType.s_LoginAccount] = this.do_s_LoginAccount;
            this.commands[proto.MessageType.s_CreateRoom] = this.do_s_CreateRoom;
            this.commands[proto.MessageType.s_Kickout] = this.do_s_Kickout;
            this.commands[proto.MessageType.s_EnterRoom] = this.do_s_EnterRoom;
        }
        MessageHandle.prototype.do_s_LoginAccount = function (mess) { };
        MessageHandle.prototype.do_s_CreateRoom = function (mess) { };
        MessageHandle.prototype.do_s_Kickout = function (mess) { };
        MessageHandle.prototype.do_s_EnterRoom = function (mess) { };
        return MessageHandle;
    }());
    proto.MessageHandle = MessageHandle;
    __reflect(MessageHandle.prototype, "proto.MessageHandle");
})(proto || (proto = {}));
//# sourceMappingURL=MessageHandle.js.map