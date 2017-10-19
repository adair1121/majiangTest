var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PlayerRoleInfo = (function (_super) {
    __extends(PlayerRoleInfo, _super);
    function PlayerRoleInfo() {
        var _this = _super.call(this) || this;
        _this.skinName = "PlayerRoleInfoSkin";
        return _this;
    }
    PlayerRoleInfo.prototype.childrenCreated = function () {
        this.infoGroup.visible = false;
    };
    PlayerRoleInfo.prototype.setRoleInfo = function (userInfo) {
        this.infoGroup.visible = true;
        this.leaveLabel.visible = false;
        this.userId = userInfo.userId;
        // this.playerIcon.source = dataObj.icon;
        this.playerName.text = userInfo.nick;
        this.playerCardNum.text = userInfo.cardCount + "";
    };
    PlayerRoleInfo.prototype.showLeave = function () {
        this.infoGroup.visible = false;
        this.leaveLabel.visible = true;
    };
    return PlayerRoleInfo;
}(eui.Component));
__reflect(PlayerRoleInfo.prototype, "PlayerRoleInfo");
//# sourceMappingURL=PlayerRoleInfo.js.map