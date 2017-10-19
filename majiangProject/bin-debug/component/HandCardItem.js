var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HandCardItem = (function (_super) {
    __extends(HandCardItem, _super);
    function HandCardItem(template) {
        var _this = _super.call(this) || this;
        _this.path_icon = "";
        _this.soundObj = {};
        _this.skinName = "HandCardItemSkin";
        _this.cardId = template.icon;
        _this.path_icon = _this.cardId + "_png";
        RES.getResByUrl(Config.audio_path + template.manVoice + ".mp3", function (value) {
            this.soundObj[1] = value;
        }, _this, RES.ResourceItem.TYPE_SOUND);
        RES.getResByUrl(Config.audio_path + template.womenVoice + ".mp3", function (value) {
            this.soundObj[2] = value;
        }, _this, RES.ResourceItem.TYPE_SOUND);
        return _this;
    }
    HandCardItem.prototype.childrenCreated = function () {
        this.cardIcon.source = this.path_icon;
    };
    HandCardItem.prototype.playEffect = function (sex) {
        this.sound = this.soundObj[sex];
        if (this.sound) {
            this.channel = this.sound.play(0, 1);
            this.channel.volume = Config.soundEffectPercent;
        }
    };
    return HandCardItem;
}(eui.Component));
__reflect(HandCardItem.prototype, "HandCardItem");
//# sourceMappingURL=HandCardItem.js.map