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
        }
        return messType;
    }());
    proto.messType = messType;
    __reflect(messType.prototype, "proto.messType");
})(proto || (proto = {}));
//# sourceMappingURL=messType.js.map