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
        MessageType[MessageType["AttrValue"] = 111] = "AttrValue";
        MessageType[MessageType["PointsInfo"] = 112] = "PointsInfo";
        MessageType[MessageType["SeatHandCards"] = 113] = "SeatHandCards";
        MessageType[MessageType["s_AttrChange"] = 114] = "s_AttrChange";
        MessageType[MessageType["s_NotifyEnterTable"] = 115] = "s_NotifyEnterTable";
        MessageType[MessageType["s_NotifyLeaveTable"] = 116] = "s_NotifyLeaveTable";
        MessageType[MessageType["s_NotifyHandCards"] = 117] = "s_NotifyHandCards";
        MessageType[MessageType["s_NotifyDealCard"] = 118] = "s_NotifyDealCard";
        MessageType[MessageType["s_NotifyPlayCard"] = 119] = "s_NotifyPlayCard";
        MessageType[MessageType["s_NotifyPlayResponse"] = 120] = "s_NotifyPlayResponse";
        MessageType[MessageType["s_NotifyChangeOpUser"] = 121] = "s_NotifyChangeOpUser";
        MessageType[MessageType["s_NotifyEndHandCards"] = 122] = "s_NotifyEndHandCards";
    })(MessageType = proto.MessageType || (proto.MessageType = {}));
})(proto || (proto = {}));
//# sourceMappingURL=MessageType.js.map