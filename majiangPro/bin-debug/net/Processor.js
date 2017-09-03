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
        };
        Processor.prototype.do_connect = function () {
            console.log("连接服务器成功");
            // var msg_login:proto.c_Login=new proto.c_Login();
            // msg_login.name=Config.username;
            // msg_login.pass=Config.password;
            // msg_login.isReLogin=false; 
            // SocketManager.getInstance().sendProto(msg_login);
        };
        return Processor;
    }(proto.MessageHandle));
    proto.Processor = Processor;
    __reflect(Processor.prototype, "proto.Processor");
})(proto || (proto = {}));
//# sourceMappingURL=Processor.js.map