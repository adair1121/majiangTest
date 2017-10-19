var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SoundUtils = (function () {
    function SoundUtils() {
        // this._click = new egret.Sound();
        // this._click.load("resource/assets/sound/buttonclick.mp3");
        // this._bgm = new egret.Sound();
        // this._bgm.load("resource/assets/sound/Music.mp3");
        // this._right = new egret.Sound();
        // this._right.load("resource/assets/sound/right.mp3");
        // this._wrong = new egret.Sound();
        // this._wrong.load("resource/assets/sound/wrong.mp3");
        this._effect = new egret.Sound();
    }
    SoundUtils.Shared = function () {
        if (SoundUtils.shared == null)
            SoundUtils.shared = new SoundUtils();
        return SoundUtils.shared;
    };
    SoundUtils.prototype.loadEffect = function (path) {
        this._effect.load(path);
    };
    SoundUtils.prototype.PlayBGM = function () {
        if (this.IsMusic) {
            this._bgm_channel = this._bgm.play(0, 0);
        }
    };
    SoundUtils.prototype.StopBGM = function () {
        if (this._bgm_channel != null) {
            this._bgm_channel.stop();
        }
    };
    SoundUtils.prototype.PlayClick = function () {
        if (this.IsSound) {
            this._click.play(0, 1);
        }
    };
    SoundUtils.prototype.PlayRight = function () {
        if (this.IsSound) {
            this._right.play(0, 1);
        }
    };
    SoundUtils.prototype.PlayWrong = function () {
        if (this.IsSound) {
            this._wrong.play(0, 1);
        }
    };
    Object.defineProperty(SoundUtils.prototype, "IsMusic", {
        get: function () {
            var b = egret.localStorage.getItem("ismusic");
            if (b == null || b == "") {
                return true;
            }
            else {
                return b == "1";
            }
        },
        //音乐是否播放，保存设置
        set: function (value) {
            if (!value) {
                egret.localStorage.setItem("ismusic", "0");
                this.StopBGM();
            }
            else {
                egret.localStorage.setItem("ismusic", "1");
                this.PlayBGM();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoundUtils.prototype, "IsSound", {
        get: function () {
            var b = egret.localStorage.getItem("isSound");
            if (b == null || b == "") {
                return true;
            }
            else {
                return b == "1";
            }
        },
        //声效是否播放，保存设置
        set: function (value) {
            if (value) {
                egret.localStorage.setItem("isSound", "1");
            }
            else {
                egret.localStorage.setItem("isSound", "0");
            }
        },
        enumerable: true,
        configurable: true
    });
    return SoundUtils;
}());
__reflect(SoundUtils.prototype, "SoundUtils");
//# sourceMappingURL=SoundUtils.js.map