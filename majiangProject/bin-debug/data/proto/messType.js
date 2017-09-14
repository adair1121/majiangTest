var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var proto;
(function (proto) {
    var messType = (function () {
        function messType() {
            this.types = {};
            this.typesByName = {};
            this.typesByName["c_LoginAccount"] = this.types[100] = proto.c_LoginAccount;
            this.typesByName["s_LoginAccount"] = this.types[101] = proto.s_LoginAccount;
            this.typesByName["UserInfo"] = this.types[102] = proto.UserInfo;
            this.typesByName["UserInfoWithSeat"] = this.types[103] = proto.UserInfoWithSeat;
            this.typesByName["c_CreateRoom"] = this.types[104] = proto.c_CreateRoom;
            this.typesByName["s_CreateRoom"] = this.types[105] = proto.s_CreateRoom;
            this.typesByName["s_Kickout"] = this.types[106] = proto.s_Kickout;
            this.typesByName["IntList"] = this.types[107] = proto.IntList;
            this.typesByName["SeatCardInfo"] = this.types[108] = proto.SeatCardInfo;
            this.typesByName["c_EnterRoom"] = this.types[109] = proto.c_EnterRoom;
            this.typesByName["s_EnterRoom"] = this.types[110] = proto.s_EnterRoom;
            this.typesByName["AttrValue"] = this.types[111] = proto.AttrValue;
            this.typesByName["PointsInfo"] = this.types[112] = proto.PointsInfo;
            this.typesByName["SeatHandCards"] = this.types[113] = proto.SeatHandCards;
            this.typesByName["s_AttrChange"] = this.types[114] = proto.s_AttrChange;
            this.typesByName["s_NotifyEnterTable"] = this.types[115] = proto.s_NotifyEnterTable;
            this.typesByName["s_NotifyLeaveTable"] = this.types[116] = proto.s_NotifyLeaveTable;
            this.typesByName["s_NotifyHandCards"] = this.types[117] = proto.s_NotifyHandCards;
            this.typesByName["s_NotifyDealCard"] = this.types[118] = proto.s_NotifyDealCard;
            this.typesByName["s_NotifyPlayCard"] = this.types[119] = proto.s_NotifyPlayCard;
            this.typesByName["s_NotifyPlayResponse"] = this.types[120] = proto.s_NotifyPlayResponse;
            this.typesByName["s_NotifyChangeOpUser"] = this.types[121] = proto.s_NotifyChangeOpUser;
            this.typesByName["s_NotifyEndHandCards"] = this.types[122] = proto.s_NotifyEndHandCards;
        }
        return messType;
    }());
    proto.messType = messType;
    __reflect(messType.prototype, "proto.messType");
})(proto || (proto = {}));
//# sourceMappingURL=messType.js.map