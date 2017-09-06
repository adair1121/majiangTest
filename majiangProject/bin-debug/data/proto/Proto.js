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
    var c_LoginAccount = (function (_super) {
        __extends(c_LoginAccount, _super);
        function c_LoginAccount() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.c_LoginAccount;
            return _this;
        }
        c_LoginAccount.prototype.init = function (_userName, _password) {
            this.userName = _userName;
            this.password = _password;
            return this;
        };
        c_LoginAccount.prototype.encode = function (by) {
            by.writeUTF(this.userName);
            by.writeUTF(this.password);
        };
        c_LoginAccount.prototype.decode = function (by) {
            this.userName = by.readUTF();
            this.password = by.readUTF();
        };
        return c_LoginAccount;
    }(proto.Pro));
    proto.c_LoginAccount = c_LoginAccount;
    __reflect(c_LoginAccount.prototype, "proto.c_LoginAccount");
    var s_LoginAccount = (function (_super) {
        __extends(s_LoginAccount, _super);
        function s_LoginAccount() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_LoginAccount;
            return _this;
        }
        s_LoginAccount.prototype.init = function (_isSuccess, _errMsg, _userInfo) {
            this.isSuccess = _isSuccess;
            this.errMsg = _errMsg;
            this.userInfo = _userInfo;
            return this;
        };
        s_LoginAccount.prototype.encode = function (by) {
            by.writeBoolean(this.isSuccess);
            if (this.errMsg != null) {
                by.writeByte(1);
                by.writeUTF(this.errMsg);
            }
            else {
                by.writeByte(0);
            }
            if (this.userInfo != null) {
                by.writeByte(1);
                this.userInfo.encode(by);
            }
            else {
                by.writeByte(0);
            }
        };
        s_LoginAccount.prototype.decode = function (by) {
            this.isSuccess = by.readBoolean();
            if (by.readByte() > 0) {
                this.errMsg = by.readUTF();
            }
            if (by.readByte() > 0) {
                this.userInfo = new UserInfo();
                this.userInfo.decode(by);
            }
        };
        return s_LoginAccount;
    }(proto.Pro));
    proto.s_LoginAccount = s_LoginAccount;
    __reflect(s_LoginAccount.prototype, "proto.s_LoginAccount");
    var UserInfo = (function (_super) {
        __extends(UserInfo, _super);
        function UserInfo() {
            var _this = _super.call(this) || this;
            //required>int
            _this.userId = 0; //用户唯一编号
            //required>int
            _this.cardCount = 0; //房卡数量
            _this.S = proto.MessageType.UserInfo;
            return _this;
        }
        UserInfo.prototype.init = function (_userId, _nick, _cardCount) {
            this.userId = _userId;
            this.nick = _nick;
            this.cardCount = _cardCount;
            return this;
        };
        UserInfo.prototype.encode = function (by) {
            by.writeInt(this.userId);
            by.writeUTF(this.nick);
            by.writeInt(this.cardCount);
        };
        UserInfo.prototype.decode = function (by) {
            this.userId = by.readInt();
            this.nick = by.readUTF();
            this.cardCount = by.readInt();
        };
        return UserInfo;
    }(proto.Pro));
    proto.UserInfo = UserInfo;
    __reflect(UserInfo.prototype, "proto.UserInfo");
    var UserInfoWithSeat = (function (_super) {
        __extends(UserInfoWithSeat, _super);
        function UserInfoWithSeat() {
            var _this = _super.call(this) || this;
            //required>int
            _this.seat = 0; //坐位
            _this.S = proto.MessageType.UserInfoWithSeat;
            return _this;
        }
        UserInfoWithSeat.prototype.init = function (_seat, _userInfo) {
            this.seat = _seat;
            this.userInfo = _userInfo;
            return this;
        };
        UserInfoWithSeat.prototype.encode = function (by) {
            by.writeInt(this.seat);
            this.userInfo.encode(by);
        };
        UserInfoWithSeat.prototype.decode = function (by) {
            this.seat = by.readInt();
            this.userInfo = new UserInfo();
            this.userInfo.decode(by);
        };
        return UserInfoWithSeat;
    }(proto.Pro));
    proto.UserInfoWithSeat = UserInfoWithSeat;
    __reflect(UserInfoWithSeat.prototype, "proto.UserInfoWithSeat");
    var c_CreateRoom = (function (_super) {
        __extends(c_CreateRoom, _super);
        function c_CreateRoom() {
            var _this = _super.call(this) || this;
            //required>int
            _this.basicScore = 0; //底分
            //required>int
            _this.times = 0; //打几局
            //required>int
            _this.playerCount = 0; //几人房间
            _this.S = proto.MessageType.c_CreateRoom;
            return _this;
        }
        c_CreateRoom.prototype.init = function (_basicScore, _times, _roomPassword, _playerCount) {
            this.basicScore = _basicScore;
            this.times = _times;
            this.roomPassword = _roomPassword;
            this.playerCount = _playerCount;
            return this;
        };
        c_CreateRoom.prototype.encode = function (by) {
            by.writeInt(this.basicScore);
            by.writeInt(this.times);
            by.writeUTF(this.roomPassword);
            by.writeInt(this.playerCount);
        };
        c_CreateRoom.prototype.decode = function (by) {
            this.basicScore = by.readInt();
            this.times = by.readInt();
            this.roomPassword = by.readUTF();
            this.playerCount = by.readInt();
        };
        return c_CreateRoom;
    }(proto.Pro));
    proto.c_CreateRoom = c_CreateRoom;
    __reflect(c_CreateRoom.prototype, "proto.c_CreateRoom");
    var s_CreateRoom = (function (_super) {
        __extends(s_CreateRoom, _super);
        function s_CreateRoom() {
            var _this = _super.call(this) || this;
            //optional>int
            _this.tableId = 0; //所在牌桌ID
            //optional>int
            _this.seat = 0; //所在坐位
            _this.S = proto.MessageType.s_CreateRoom;
            return _this;
        }
        s_CreateRoom.prototype.init = function (_isSuccess, _errMsg, _tableId, _seat, _userInfoList) {
            this.isSuccess = _isSuccess;
            this.errMsg = _errMsg;
            this.tableId = _tableId;
            this.seat = _seat;
            this.userInfoList = _userInfoList;
            return this;
        };
        s_CreateRoom.prototype.encode = function (by) {
            by.writeBoolean(this.isSuccess);
            if (this.errMsg != null) {
                by.writeByte(1);
                by.writeUTF(this.errMsg);
            }
            else {
                by.writeByte(0);
            }
            //基础类型不建议用optional
            by.writeByte(1);
            by.writeInt(this.tableId);
            //基础类型不建议用optional
            by.writeByte(1);
            by.writeInt(this.seat);
            if (this.userInfoList != null) {
                by.writeShort(this.userInfoList.length);
                for (var i = 0; i < this.userInfoList.length; i++) {
                    this.userInfoList[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        s_CreateRoom.prototype.decode = function (by) {
            this.isSuccess = by.readBoolean();
            if (by.readByte() > 0) {
                this.errMsg = by.readUTF();
            }
            if (by.readByte() > 0) {
                this.tableId = by.readInt();
            }
            if (by.readByte() > 0) {
                this.seat = by.readInt();
            }
            var __count4 = by.readShort();
            this.userInfoList = [];
            for (var i = 0; i < __count4; i++) {
                this.userInfoList[i] = new UserInfoWithSeat();
                this.userInfoList[i].decode(by);
            }
        };
        return s_CreateRoom;
    }(proto.Pro));
    proto.s_CreateRoom = s_CreateRoom;
    __reflect(s_CreateRoom.prototype, "proto.s_CreateRoom");
    var s_Kickout = (function (_super) {
        __extends(s_Kickout, _super);
        function s_Kickout() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_Kickout;
            return _this;
        }
        s_Kickout.prototype.init = function (_reason) {
            this.reason = _reason;
            return this;
        };
        s_Kickout.prototype.encode = function (by) {
            by.writeUTF(this.reason);
        };
        s_Kickout.prototype.decode = function (by) {
            this.reason = by.readUTF();
        };
        return s_Kickout;
    }(proto.Pro));
    proto.s_Kickout = s_Kickout;
    __reflect(s_Kickout.prototype, "proto.s_Kickout");
    var IntList = (function (_super) {
        __extends(IntList, _super);
        function IntList() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.IntList;
            return _this;
        }
        IntList.prototype.init = function (_list) {
            this.list = _list;
            return this;
        };
        IntList.prototype.encode = function (by) {
            if (this.list != null) {
                by.writeShort(this.list.length);
                for (var i = 0; i < this.list.length; i++) {
                    by.writeInt(this.list[i]);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        IntList.prototype.decode = function (by) {
            var __count0 = by.readShort();
            this.list = [];
            for (var i = 0; i < __count0; i++) {
                this.list[i] = by.readInt();
            }
        };
        return IntList;
    }(proto.Pro));
    proto.IntList = IntList;
    __reflect(IntList.prototype, "proto.IntList");
    var SeatCardInfo = (function (_super) {
        __extends(SeatCardInfo, _super);
        function SeatCardInfo() {
            var _this = _super.call(this) || this;
            //required>int
            _this.seat = 0; //所在坐位
            _this.S = proto.MessageType.SeatCardInfo;
            return _this;
        }
        SeatCardInfo.prototype.init = function (_seat, _PongKongChow, _playCards) {
            this.seat = _seat;
            this.PongKongChow = _PongKongChow;
            this.playCards = _playCards;
            return this;
        };
        SeatCardInfo.prototype.encode = function (by) {
            by.writeInt(this.seat);
            if (this.PongKongChow != null) {
                by.writeShort(this.PongKongChow.length);
                for (var i = 0; i < this.PongKongChow.length; i++) {
                    this.PongKongChow[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
            if (this.playCards != null) {
                by.writeShort(this.playCards.length);
                for (var i = 0; i < this.playCards.length; i++) {
                    by.writeInt(this.playCards[i]);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        SeatCardInfo.prototype.decode = function (by) {
            this.seat = by.readInt();
            var __count1 = by.readShort();
            this.PongKongChow = [];
            for (var i = 0; i < __count1; i++) {
                this.PongKongChow[i] = new IntList();
                this.PongKongChow[i].decode(by);
            }
            var __count2 = by.readShort();
            this.playCards = [];
            for (var i = 0; i < __count2; i++) {
                this.playCards[i] = by.readInt();
            }
        };
        return SeatCardInfo;
    }(proto.Pro));
    proto.SeatCardInfo = SeatCardInfo;
    __reflect(SeatCardInfo.prototype, "proto.SeatCardInfo");
    var c_EnterRoom = (function (_super) {
        __extends(c_EnterRoom, _super);
        function c_EnterRoom() {
            var _this = _super.call(this) || this;
            //required>int
            _this.tableId = 0; //牌桌ID
            _this.S = proto.MessageType.c_EnterRoom;
            return _this;
        }
        c_EnterRoom.prototype.init = function (_tableId, _roomPassword) {
            this.tableId = _tableId;
            this.roomPassword = _roomPassword;
            return this;
        };
        c_EnterRoom.prototype.encode = function (by) {
            by.writeInt(this.tableId);
            by.writeUTF(this.roomPassword);
        };
        c_EnterRoom.prototype.decode = function (by) {
            this.tableId = by.readInt();
            this.roomPassword = by.readUTF();
        };
        return c_EnterRoom;
    }(proto.Pro));
    proto.c_EnterRoom = c_EnterRoom;
    __reflect(c_EnterRoom.prototype, "proto.c_EnterRoom");
    var s_EnterRoom = (function (_super) {
        __extends(s_EnterRoom, _super);
        function s_EnterRoom() {
            var _this = _super.call(this) || this;
            //optional>int
            _this.seat = 0; //所在坐位
            //optional>int
            _this.playerCount = 0; //所创房间人数
            //optional>int
            _this.Dice1 = 0; //股子1
            //optional>int
            _this.Dice2 = 0; //股子2
            //optional>int
            _this.drawCard = 0; //摸的那张牌
            _this.S = proto.MessageType.s_EnterRoom;
            return _this;
        }
        s_EnterRoom.prototype.init = function (_isSuccess, _errMsg, _seat, _playerCount, _Dice1, _Dice2, _drawCard, _HandsCard, _seatCardInfoList, _userInfoList) {
            this.isSuccess = _isSuccess;
            this.errMsg = _errMsg;
            this.seat = _seat;
            this.playerCount = _playerCount;
            this.Dice1 = _Dice1;
            this.Dice2 = _Dice2;
            this.drawCard = _drawCard;
            this.HandsCard = _HandsCard;
            this.seatCardInfoList = _seatCardInfoList;
            this.userInfoList = _userInfoList;
            return this;
        };
        s_EnterRoom.prototype.encode = function (by) {
            by.writeBoolean(this.isSuccess);
            if (this.errMsg != null) {
                by.writeByte(1);
                by.writeUTF(this.errMsg);
            }
            else {
                by.writeByte(0);
            }
            //基础类型不建议用optional
            by.writeByte(1);
            by.writeInt(this.seat);
            //基础类型不建议用optional
            by.writeByte(1);
            by.writeInt(this.playerCount);
            //基础类型不建议用optional
            by.writeByte(1);
            by.writeInt(this.Dice1);
            //基础类型不建议用optional
            by.writeByte(1);
            by.writeInt(this.Dice2);
            //基础类型不建议用optional
            by.writeByte(1);
            by.writeInt(this.drawCard);
            if (this.HandsCard != null) {
                by.writeShort(this.HandsCard.length);
                for (var i = 0; i < this.HandsCard.length; i++) {
                    by.writeInt(this.HandsCard[i]);
                }
            }
            else {
                by.writeShort(0);
            }
            if (this.seatCardInfoList != null) {
                by.writeShort(this.seatCardInfoList.length);
                for (var i = 0; i < this.seatCardInfoList.length; i++) {
                    this.seatCardInfoList[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
            if (this.userInfoList != null) {
                by.writeShort(this.userInfoList.length);
                for (var i = 0; i < this.userInfoList.length; i++) {
                    this.userInfoList[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        s_EnterRoom.prototype.decode = function (by) {
            this.isSuccess = by.readBoolean();
            if (by.readByte() > 0) {
                this.errMsg = by.readUTF();
            }
            if (by.readByte() > 0) {
                this.seat = by.readInt();
            }
            if (by.readByte() > 0) {
                this.playerCount = by.readInt();
            }
            if (by.readByte() > 0) {
                this.Dice1 = by.readInt();
            }
            if (by.readByte() > 0) {
                this.Dice2 = by.readInt();
            }
            if (by.readByte() > 0) {
                this.drawCard = by.readInt();
            }
            var __count7 = by.readShort();
            this.HandsCard = [];
            for (var i = 0; i < __count7; i++) {
                this.HandsCard[i] = by.readInt();
            }
            var __count8 = by.readShort();
            this.seatCardInfoList = [];
            for (var i = 0; i < __count8; i++) {
                this.seatCardInfoList[i] = new SeatCardInfo();
                this.seatCardInfoList[i].decode(by);
            }
            var __count9 = by.readShort();
            this.userInfoList = [];
            for (var i = 0; i < __count9; i++) {
                this.userInfoList[i] = new UserInfoWithSeat();
                this.userInfoList[i].decode(by);
            }
        };
        return s_EnterRoom;
    }(proto.Pro));
    proto.s_EnterRoom = s_EnterRoom;
    __reflect(s_EnterRoom.prototype, "proto.s_EnterRoom");
})(proto || (proto = {}));
//# sourceMappingURL=Proto.js.map