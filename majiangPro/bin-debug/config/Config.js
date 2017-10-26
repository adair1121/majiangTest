var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config = (function () {
    function Config() {
    }
    /**当前游戏宽度 */
    Config.curWidth = function () {
        return egret.MainContext.instance.stage.stageWidth;
    };
    /**当前游戏高度 */
    Config.curHeight = function () {
        return egret.MainContext.instance.stage.stageHeight;
    };
    Config.curStage = function () {
        return egret.MainContext.instance.stage;
    };
    return Config;
}());
/**游戏地址 */
Config.gameHost = "111.231.114.223"; //测试
Config.gamePort = 5005;
/**版本号 */
Config.THMVERSION = "0.0.1";
Config.RESVERSION = "0.0.1";
/**等待时间 */
Config.waitTime = 60;
/**测试用户 */
Config.username = "g42";
Config.password = "greentea";
/**窗口大小 */
Config.w_width = 1280;
Config.w_height = 720;
/**平铺卡牌出牌尺寸 */
Config.w_tieldCard = 38;
Config.h_tieldCard = 56;
/** 平铺卡牌组合尺寸*/
Config.w_tieldGroup = 98;
Config.h_tieldGroup = 142;
/**玩家手牌尺寸 */
Config.w_handCard = 88;
Config.h_handCard = 128;
/**当前玩家手牌容器初始x */
Config.x_handCard = 96;
/**当前玩家手牌容器初始y */
Config.y_handCard = 580;
/**默认游戏背景音乐强度百分比 */
Config.bgSoundPercent = 50;
/**默认游戏音效强度百分比 */
Config.soundEffectPercent = 50;
/**卡牌资源路径 */
Config.path_card = "../resource/assets/ui/card/";
/**音频路径 */
Config.audio_path = "../resource/assets/audio/";
/**特效路径 */
Config.movie_path = "../resource/assets/movie/";
/**时间戳 */
Config.time_stamps = 0;
__reflect(Config.prototype, "Config");
//# sourceMappingURL=Config.js.map