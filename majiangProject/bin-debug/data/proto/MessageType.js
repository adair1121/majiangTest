var proto;
(function (proto) {
    var MessageType;
    (function (MessageType) {
        MessageType[MessageType["c_LoginAccount"] = 100] = "c_LoginAccount";
        MessageType[MessageType["s_LoginAccount"] = 101] = "s_LoginAccount";
        MessageType[MessageType["UserInfo"] = 102] = "UserInfo";
        MessageType[MessageType["UserInfoWithSeat"] = 103] = "UserInfoWithSeat";
        MessageType[MessageType["c_CreateRoom"] = 104] = "c_CreateRoom";
        MessageType[MessageType["s_CreateRoom"] = 105] = "s_CreateRoom";
        MessageType[MessageType["s_Kickout"] = 106] = "s_Kickout";
        MessageType[MessageType["IntList"] = 107] = "IntList";
        MessageType[MessageType["SeatCardInfo"] = 108] = "SeatCardInfo";
        MessageType[MessageType["c_EnterRoom"] = 109] = "c_EnterRoom";
        MessageType[MessageType["s_EnterRoom"] = 110] = "s_EnterRoom";
    })(MessageType = proto.MessageType || (proto.MessageType = {}));
})(proto || (proto = {}));
//# sourceMappingURL=MessageType.js.map