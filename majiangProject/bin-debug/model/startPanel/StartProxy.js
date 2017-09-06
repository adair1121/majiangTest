var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var StartProxy = (function (_super) {
    __extends(StartProxy, _super);
    function StartProxy(controller) {
        var _this = _super.call(this, controller) || this;
        /**注册从服务器返回消息的监听 */
        _this.receiveServerMsg(StartConsts.CREATE_ROOM_S2C, _this.createRoomRes, _this);
        _this.receiveServerMsg(StartConsts.JOIN_ROOM_S2C, _this.joinRoomRes, _this);
        return _this;
    }
    StartProxy.prototype.createRoom = function (dataObj) {
        var msg = new proto.c_CreateRoom();
        msg.playerCount = dataObj.roomNum;
        msg.times = dataObj.counts;
        msg.roomPassword = dataObj.roomPwd;
        msg.basicScore = dataObj.score;
        this.sendSocketMsg(msg);
    };
    StartProxy.prototype.joinRoom = function (dataObj) {
    };
    StartProxy.prototype.createRoomRes = function (obj) {
        this.applyFunc(StartConsts.CREATE_ROOM_S2C, obj);
    };
    StartProxy.prototype.joinRoomRes = function (obj) {
        this.applyFunc(StartConsts.JOIN_ROOM_S2C, obj);
    };
    return StartProxy;
}(BaseProxy));
__reflect(StartProxy.prototype, "StartProxy");
//# sourceMappingURL=StartProxy.js.map