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
    var AttrValue = (function (_super) {
        __extends(AttrValue, _super);
        function AttrValue() {
            var _this = _super.call(this) || this;
            //required>int
            _this.attrId = 0; //属性ID
            //optional>int
            _this.value = 0; //属性值
            _this.S = proto.MessageType.AttrValue;
            return _this;
        }
        AttrValue.prototype.init = function (_attrId, _value) {
            this.attrId = _attrId;
            this.value = _value;
            return this;
        };
        AttrValue.prototype.encode = function (by) {
            by.writeInt(this.attrId);
            //基础类型不建议用optional
            by.writeByte(1);
            by.writeInt(this.value);
        };
        AttrValue.prototype.decode = function (by) {
            this.attrId = by.readInt();
            if (by.readByte() > 0) {
                this.value = by.readInt();
            }
        };
        return AttrValue;
    }(proto.Pro));
    proto.AttrValue = AttrValue;
    __reflect(AttrValue.prototype, "proto.AttrValue");
    var PointsInfo = (function (_super) {
        __extends(PointsInfo, _super);
        function PointsInfo() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.PointsInfo;
            return _this;
        }
        PointsInfo.prototype.init = function () {
            return this;
        };
        PointsInfo.prototype.encode = function (by) {
        };
        PointsInfo.prototype.decode = function (by) {
        };
        return PointsInfo;
    }(proto.Pro));
    proto.PointsInfo = PointsInfo;
    __reflect(PointsInfo.prototype, "proto.PointsInfo");
    var SeatHandCards = (function (_super) {
        __extends(SeatHandCards, _super);
        function SeatHandCards() {
            var _this = _super.call(this) || this;
            //optional>int
            _this.seat = 0; //所坐位置
            //optional>int
            _this.drawCard = 0; //摸的那张牌
            //optional>int
            _this.scores = 0; //得分
            //optional>int
            _this.kongCount = 0; //明杠数量
            //optional>int
            _this.anKongCount = 0; //暗杠数量
            _this.S = proto.MessageType.SeatHandCards;
            return _this;
        }
        SeatHandCards.prototype.init = function (_seat, _handCards, _drawCard, _pongKongChow, _playCards, _pointsInfo, _scores, _kongCount, _anKongCount) {
            this.seat = _seat;
            this.handCards = _handCards;
            this.drawCard = _drawCard;
            this.pongKongChow = _pongKongChow;
            this.playCards = _playCards;
            this.pointsInfo = _pointsInfo;
            this.scores = _scores;
            this.kongCount = _kongCount;
            this.anKongCount = _anKongCount;
            return this;
        };
        SeatHandCards.prototype.encode = function (by) {
            //基础类型不建议用optional
            by.writeByte(1);
            by.writeInt(this.seat);
            if (this.handCards != null) {
                by.writeShort(this.handCards.length);
                for (var i = 0; i < this.handCards.length; i++) {
                    by.writeInt(this.handCards[i]);
                }
            }
            else {
                by.writeShort(0);
            }
            //基础类型不建议用optional
            by.writeByte(1);
            by.writeInt(this.drawCard);
            if (this.pongKongChow != null) {
                by.writeShort(this.pongKongChow.length);
                for (var i = 0; i < this.pongKongChow.length; i++) {
                    this.pongKongChow[i].encode(by);
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
            if (this.pointsInfo != null) {
                by.writeByte(1);
                this.pointsInfo.encode(by);
            }
            else {
                by.writeByte(0);
            }
            //基础类型不建议用optional
            by.writeByte(1);
            by.writeInt(this.scores);
            //基础类型不建议用optional
            by.writeByte(1);
            by.writeInt(this.kongCount);
            //基础类型不建议用optional
            by.writeByte(1);
            by.writeInt(this.anKongCount);
        };
        SeatHandCards.prototype.decode = function (by) {
            if (by.readByte() > 0) {
                this.seat = by.readInt();
            }
            var __count1 = by.readShort();
            this.handCards = [];
            for (var i = 0; i < __count1; i++) {
                this.handCards[i] = by.readInt();
            }
            if (by.readByte() > 0) {
                this.drawCard = by.readInt();
            }
            var __count3 = by.readShort();
            this.pongKongChow = [];
            for (var i = 0; i < __count3; i++) {
                this.pongKongChow[i] = new IntList();
                this.pongKongChow[i].decode(by);
            }
            var __count4 = by.readShort();
            this.playCards = [];
            for (var i = 0; i < __count4; i++) {
                this.playCards[i] = by.readInt();
            }
            if (by.readByte() > 0) {
                this.pointsInfo = new PointsInfo();
                this.pointsInfo.decode(by);
            }
            if (by.readByte() > 0) {
                this.scores = by.readInt();
            }
            if (by.readByte() > 0) {
                this.kongCount = by.readInt();
            }
            if (by.readByte() > 0) {
                this.anKongCount = by.readInt();
            }
        };
        return SeatHandCards;
    }(proto.Pro));
    proto.SeatHandCards = SeatHandCards;
    __reflect(SeatHandCards.prototype, "proto.SeatHandCards");
    var s_AttrChange = (function (_super) {
        __extends(s_AttrChange, _super);
        function s_AttrChange() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_AttrChange;
            return _this;
        }
        s_AttrChange.prototype.init = function (_attrList) {
            this.attrList = _attrList;
            return this;
        };
        s_AttrChange.prototype.encode = function (by) {
            if (this.attrList != null) {
                by.writeShort(this.attrList.length);
                for (var i = 0; i < this.attrList.length; i++) {
                    this.attrList[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        s_AttrChange.prototype.decode = function (by) {
            var __count0 = by.readShort();
            this.attrList = [];
            for (var i = 0; i < __count0; i++) {
                this.attrList[i] = new AttrValue();
                this.attrList[i].decode(by);
            }
        };
        return s_AttrChange;
    }(proto.Pro));
    proto.s_AttrChange = s_AttrChange;
    __reflect(s_AttrChange.prototype, "proto.s_AttrChange");
    var s_NotifyEnterTable = (function (_super) {
        __extends(s_NotifyEnterTable, _super);
        function s_NotifyEnterTable() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_NotifyEnterTable;
            return _this;
        }
        s_NotifyEnterTable.prototype.init = function (_userInfo) {
            this.userInfo = _userInfo;
            return this;
        };
        s_NotifyEnterTable.prototype.encode = function (by) {
            this.userInfo.encode(by);
        };
        s_NotifyEnterTable.prototype.decode = function (by) {
            this.userInfo = new UserInfoWithSeat();
            this.userInfo.decode(by);
        };
        return s_NotifyEnterTable;
    }(proto.Pro));
    proto.s_NotifyEnterTable = s_NotifyEnterTable;
    __reflect(s_NotifyEnterTable.prototype, "proto.s_NotifyEnterTable");
    var s_NotifyLeaveTable = (function (_super) {
        __extends(s_NotifyLeaveTable, _super);
        function s_NotifyLeaveTable() {
            var _this = _super.call(this) || this;
            //required>int
            _this.seat = 0; //离开坐位
            _this.S = proto.MessageType.s_NotifyLeaveTable;
            return _this;
        }
        s_NotifyLeaveTable.prototype.init = function (_seat) {
            this.seat = _seat;
            return this;
        };
        s_NotifyLeaveTable.prototype.encode = function (by) {
            by.writeInt(this.seat);
        };
        s_NotifyLeaveTable.prototype.decode = function (by) {
            this.seat = by.readInt();
        };
        return s_NotifyLeaveTable;
    }(proto.Pro));
    proto.s_NotifyLeaveTable = s_NotifyLeaveTable;
    __reflect(s_NotifyLeaveTable.prototype, "proto.s_NotifyLeaveTable");
    var s_NotifyHandCards = (function (_super) {
        __extends(s_NotifyHandCards, _super);
        function s_NotifyHandCards() {
            var _this = _super.call(this) || this;
            //required>int
            _this.dealer = 0; //庄家是谁
            //optional>int
            _this.dice1 = 0; //骰子1
            //optional>int
            _this.dice2 = 0; //骰子2
            _this.S = proto.MessageType.s_NotifyHandCards;
            return _this;
        }
        s_NotifyHandCards.prototype.init = function (_dealer, _dice1, _dice2, _handCards) {
            this.dealer = _dealer;
            this.dice1 = _dice1;
            this.dice2 = _dice2;
            this.handCards = _handCards;
            return this;
        };
        s_NotifyHandCards.prototype.encode = function (by) {
            by.writeInt(this.dealer);
            //基础类型不建议用optional
            by.writeByte(1);
            by.writeInt(this.dice1);
            //基础类型不建议用optional
            by.writeByte(1);
            by.writeInt(this.dice2);
            if (this.handCards != null) {
                by.writeShort(this.handCards.length);
                for (var i = 0; i < this.handCards.length; i++) {
                    by.writeInt(this.handCards[i]);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        s_NotifyHandCards.prototype.decode = function (by) {
            this.dealer = by.readInt();
            if (by.readByte() > 0) {
                this.dice1 = by.readInt();
            }
            if (by.readByte() > 0) {
                this.dice2 = by.readInt();
            }
            var __count3 = by.readShort();
            this.handCards = [];
            for (var i = 0; i < __count3; i++) {
                this.handCards[i] = by.readInt();
            }
        };
        return s_NotifyHandCards;
    }(proto.Pro));
    proto.s_NotifyHandCards = s_NotifyHandCards;
    __reflect(s_NotifyHandCards.prototype, "proto.s_NotifyHandCards");
    var s_NotifyDealCard = (function (_super) {
        __extends(s_NotifyDealCard, _super);
        function s_NotifyDealCard() {
            var _this = _super.call(this) || this;
            //required>int
            _this.seat = 0; //哪个坐位玩家
            //optional>int
            _this.drawCard = 0; //发的哪张牌
            _this.S = proto.MessageType.s_NotifyDealCard;
            return _this;
        }
        s_NotifyDealCard.prototype.init = function (_seat, _drawCard, _isWin, _KongCards) {
            this.seat = _seat;
            this.drawCard = _drawCard;
            this.isWin = _isWin;
            this.KongCards = _KongCards;
            return this;
        };
        s_NotifyDealCard.prototype.encode = function (by) {
            by.writeInt(this.seat);
            //基础类型不建议用optional
            by.writeByte(1);
            by.writeInt(this.drawCard);
            //基础类型不建议用optional
            by.writeByte(1);
            by.writeBoolean(this.isWin);
            if (this.KongCards != null) {
                by.writeShort(this.KongCards.length);
                for (var i = 0; i < this.KongCards.length; i++) {
                    this.KongCards[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        s_NotifyDealCard.prototype.decode = function (by) {
            this.seat = by.readInt();
            if (by.readByte() > 0) {
                this.drawCard = by.readInt();
            }
            if (by.readByte() > 0) {
                this.isWin = by.readBoolean();
            }
            var __count3 = by.readShort();
            this.KongCards = [];
            for (var i = 0; i < __count3; i++) {
                this.KongCards[i] = new IntList();
                this.KongCards[i].decode(by);
            }
        };
        return s_NotifyDealCard;
    }(proto.Pro));
    proto.s_NotifyDealCard = s_NotifyDealCard;
    __reflect(s_NotifyDealCard.prototype, "proto.s_NotifyDealCard");
    var s_NotifyPlayCard = (function (_super) {
        __extends(s_NotifyPlayCard, _super);
        function s_NotifyPlayCard() {
            var _this = _super.call(this) || this;
            //required>int
            _this.seat = 0; //哪个坐位打的牌
            //required>int
            _this.playCard = 0; //打的哪张牌
            _this.S = proto.MessageType.s_NotifyPlayCard;
            return _this;
        }
        s_NotifyPlayCard.prototype.init = function (_seat, _playCard, _isWin, _pongKongChow) {
            this.seat = _seat;
            this.playCard = _playCard;
            this.isWin = _isWin;
            this.pongKongChow = _pongKongChow;
            return this;
        };
        s_NotifyPlayCard.prototype.encode = function (by) {
            by.writeInt(this.seat);
            by.writeInt(this.playCard);
            //基础类型不建议用optional
            by.writeByte(1);
            by.writeBoolean(this.isWin);
            if (this.pongKongChow != null) {
                by.writeShort(this.pongKongChow.length);
                for (var i = 0; i < this.pongKongChow.length; i++) {
                    this.pongKongChow[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        s_NotifyPlayCard.prototype.decode = function (by) {
            this.seat = by.readInt();
            this.playCard = by.readInt();
            if (by.readByte() > 0) {
                this.isWin = by.readBoolean();
            }
            var __count3 = by.readShort();
            this.pongKongChow = [];
            for (var i = 0; i < __count3; i++) {
                this.pongKongChow[i] = new IntList();
                this.pongKongChow[i].decode(by);
            }
        };
        return s_NotifyPlayCard;
    }(proto.Pro));
    proto.s_NotifyPlayCard = s_NotifyPlayCard;
    __reflect(s_NotifyPlayCard.prototype, "proto.s_NotifyPlayCard");
    var s_NotifyPlayResponse = (function (_super) {
        __extends(s_NotifyPlayResponse, _super);
        function s_NotifyPlayResponse() {
            var _this = _super.call(this) || this;
            //required>int
            _this.seat = 0; //谁打的
            //required>int
            _this.option = 0; //是胡杠碰吃
            //optional>int
            _this.playCard = 0; //打的哪张牌
            _this.S = proto.MessageType.s_NotifyPlayResponse;
            return _this;
        }
        s_NotifyPlayResponse.prototype.init = function (_seat, _option, _playCard, _pongKongChow) {
            this.seat = _seat;
            this.option = _option;
            this.playCard = _playCard;
            this.pongKongChow = _pongKongChow;
            return this;
        };
        s_NotifyPlayResponse.prototype.encode = function (by) {
            by.writeInt(this.seat);
            by.writeInt(this.option);
            //基础类型不建议用optional
            by.writeByte(1);
            by.writeInt(this.playCard);
            if (this.pongKongChow != null) {
                by.writeShort(this.pongKongChow.length);
                for (var i = 0; i < this.pongKongChow.length; i++) {
                    by.writeInt(this.pongKongChow[i]);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        s_NotifyPlayResponse.prototype.decode = function (by) {
            this.seat = by.readInt();
            this.option = by.readInt();
            if (by.readByte() > 0) {
                this.playCard = by.readInt();
            }
            var __count3 = by.readShort();
            this.pongKongChow = [];
            for (var i = 0; i < __count3; i++) {
                this.pongKongChow[i] = by.readInt();
            }
        };
        return s_NotifyPlayResponse;
    }(proto.Pro));
    proto.s_NotifyPlayResponse = s_NotifyPlayResponse;
    __reflect(s_NotifyPlayResponse.prototype, "proto.s_NotifyPlayResponse");
    var s_NotifyChangeOpUser = (function (_super) {
        __extends(s_NotifyChangeOpUser, _super);
        function s_NotifyChangeOpUser() {
            var _this = _super.call(this) || this;
            //required>int
            _this.seat = 0; //当前操作玩家
            _this.S = proto.MessageType.s_NotifyChangeOpUser;
            return _this;
        }
        s_NotifyChangeOpUser.prototype.init = function (_seat) {
            this.seat = _seat;
            return this;
        };
        s_NotifyChangeOpUser.prototype.encode = function (by) {
            by.writeInt(this.seat);
        };
        s_NotifyChangeOpUser.prototype.decode = function (by) {
            this.seat = by.readInt();
        };
        return s_NotifyChangeOpUser;
    }(proto.Pro));
    proto.s_NotifyChangeOpUser = s_NotifyChangeOpUser;
    __reflect(s_NotifyChangeOpUser.prototype, "proto.s_NotifyChangeOpUser");
    var s_NotifyEndHandCards = (function (_super) {
        __extends(s_NotifyEndHandCards, _super);
        function s_NotifyEndHandCards() {
            var _this = _super.call(this) || this;
            //optional>int
            _this.winnerSeat = 0; //赢家坐位0:代表荒庄
            //optional>int
            _this.lastCard = 0; //自摸时就是摸的那张牌
            _this.S = proto.MessageType.s_NotifyEndHandCards;
            return _this;
        }
        s_NotifyEndHandCards.prototype.init = function (_winnerSeat, _lastCard, _seatHandCards) {
            this.winnerSeat = _winnerSeat;
            this.lastCard = _lastCard;
            this.seatHandCards = _seatHandCards;
            return this;
        };
        s_NotifyEndHandCards.prototype.encode = function (by) {
            //基础类型不建议用optional
            by.writeByte(1);
            by.writeInt(this.winnerSeat);
            //基础类型不建议用optional
            by.writeByte(1);
            by.writeInt(this.lastCard);
            if (this.seatHandCards != null) {
                by.writeShort(this.seatHandCards.length);
                for (var i = 0; i < this.seatHandCards.length; i++) {
                    this.seatHandCards[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        s_NotifyEndHandCards.prototype.decode = function (by) {
            if (by.readByte() > 0) {
                this.winnerSeat = by.readInt();
            }
            if (by.readByte() > 0) {
                this.lastCard = by.readInt();
            }
            var __count2 = by.readShort();
            this.seatHandCards = [];
            for (var i = 0; i < __count2; i++) {
                this.seatHandCards[i] = new SeatHandCards();
                this.seatHandCards[i].decode(by);
            }
        };
        return s_NotifyEndHandCards;
    }(proto.Pro));
    proto.s_NotifyEndHandCards = s_NotifyEndHandCards;
    __reflect(s_NotifyEndHandCards.prototype, "proto.s_NotifyEndHandCards");
})(proto || (proto = {}));
//# sourceMappingURL=Proto.js.map