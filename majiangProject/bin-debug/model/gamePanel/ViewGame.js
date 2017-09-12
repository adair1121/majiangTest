var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ViewGame = (function (_super) {
    __extends(ViewGame, _super);
    function ViewGame($controller, $parent) {
        var _this = _super.call(this, $controller, $parent) || this;
        _this.cardData = [];
        _this.clickState = false;
        //初始化拿牌  一组多少个
        _this.cardGroupNum = 4;
        //初始化每个人间隔拿牌时间 毫秒单位
        _this.getCardGroupTime = 1000;
        /**移动步长 */
        _this.moveStep = 100;
        _this.seatObj = {};
        _this.assetObj = {};
        _this.dachuObj = {};
        _this.testCardobj = [0x24, 0x11, 0x23, 0x12, 0x18, 0x22, 0x19, 0x21, 0x17, 0x18, 0x25, 0x11, 0x21];
        _this.testCardObj2 = [];
        _this.skinName = "ViewGameSkin";
        return _this;
    }
    /**
     * 对面板进行初始化
     */
    ViewGame.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.northCollect = new eui.ArrayCollection();
        this.southCollect = new eui.ArrayCollection();
        this.westCollect = new eui.ArrayCollection();
        this.eastCollect = new eui.ArrayCollection();
        this.cardSprite = new egret.Sprite();
        this.addChild(this.cardSprite);
        this.cardSprite.y = Config.w_height - Config.h_handCard;
        this.cardSprite.x = Config.w_handCard;
        this.northList.itemRenderer = CardItem;
        this.northList.dataProvider = this.northCollect;
        this.southList.itemRenderer = CardItem;
        this.southList.dataProvider = this.southCollect;
        this.westList.itemRenderer = CardItem;
        this.westList.dataProvider = this.westCollect;
        this.eastList.itemRenderer = CardItem;
        this.eastList.dataProvider = this.eastCollect;
        this.seatObj[data.Seat.North] = this.topGroup;
        this.seatObj[data.Seat.East] = this.rightGroup;
        this.seatObj[data.Seat.South] = this.cardSprite;
        this.seatObj[data.Seat.West] = this.leftGroup;
        this.dachuObj[data.Seat.North] = this.northCollect;
        this.dachuObj[data.Seat.East] = this.eastCollect;
        this.dachuObj[data.Seat.West] = this.westCollect;
        this.assetObj[data.Seat.North] = "shoupai_duijia_png";
        this.assetObj[data.Seat.East] = "shoupai_you_png";
        this.assetObj[data.Seat.West] = "shoupai_zuo_png";
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this.cardSprite.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCardItemTap, this);
        this.cardSprite.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onCardTouchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onCardTouchEnd, this);
    };
    /**
     * 对面板数据进行初始化
     */
    ViewGame.prototype.initData = function () {
        _super.prototype.initData.call(this);
        this.northCollect.source = [];
        this.westCollect.source = [];
        this.eastCollect.source = [];
        this.southCollect.source = [];
        this.cardData = [];
        this.curTarget = null;
        this.prevTarget = null;
        this.newCard = null;
        this.clickState = false;
        this.cardSprite.removeChildren();
        this.topGroup.removeChildren();
        this.leftGroup.removeChildren();
        this.rightGroup.removeChildren();
    };
    /**
     * 面板开启执行函数
     */
    ViewGame.prototype.open = function (param) {
        var _this = this;
        /**测试数据 */
        var cardMap = new CardMap();
        this.addChild(cardMap);
        cardMap.x = (Config.w_width >> 1) - (cardMap.width >> 1);
        cardMap.y = (Config.w_height >> 1) - (cardMap.height >> 1);
        cardMap.calculBlock(5, 5, data.Seat.East, 4);
        this.testCardObj2 = this.testCardObj2.concat(this.testCardobj);
        CardTransFormUtil.startGetCard(data.Seat.East, 4, this.testCardObj2, this.cardSprite, function (dataObj) {
            if (dataObj.final) {
                //切牌发牌完毕
                _this.cardSprite.removeChildren();
                var arr = GlobalFunc.sortRule(GlobalFunc.NORMALIZE, "", _this.testCardobj);
                _this.addCardGroup(arr);
            }
            else {
                if (dataObj.handCard.length) {
                    //当前为自己的手牌显示
                    _this.addCardGroup(dataObj.handCard);
                    if (dataObj.handCard.length >= 4) {
                        cardMap.removeBlock();
                    }
                    if (dataObj.handCard.length === 2) {
                        cardMap.removeJumpItem();
                    }
                    if (dataObj.handCard.length === 1) {
                        cardMap.removeItem();
                    }
                }
                else {
                    //当前为别的玩家手牌显示
                    for (var i = 0; i < dataObj.num; i++) {
                        var img = new eui.Image();
                        img.source = _this.assetObj[dataObj.seat];
                        _this.seatObj[dataObj.seat].addChild(img);
                        if (dataObj.seat === data.Seat.North) {
                            img.x = _this.seatObj[dataObj.seat].numChildren * img.width;
                        }
                        else {
                            img.y = _this.seatObj[dataObj.seat].numChildren * img.width;
                        }
                    }
                    if (dataObj.num === 4) {
                        //当前单次获得卡牌数为4张
                        cardMap.removeBlock();
                    }
                    if (dataObj.num === 2) {
                        //跳牌
                        cardMap.removeJumpItem();
                    }
                    if (dataObj.num === 1) {
                        cardMap.removeItem();
                    }
                }
            }
        }, this);
    };
    /**
     * 面板关闭执行函数
     */
    ViewGame.prototype.close = function (param) {
    };
    /**
     * 码牌算法
     */
    ViewGame.prototype.createCardMap = function () {
    };
    /**添加打出卡牌 */
    ViewGame.prototype.addCardItem = function (collect, item) {
        collect.addItem(item);
    };
    /**移除打出卡牌 */
    ViewGame.prototype.removeCardItem = function (collect, item) {
        collect.removeItemAt(collect.source[collect.source.length - 1]);
    };
    /**添加卡牌组 包含摸牌 */
    ViewGame.prototype.addCardGroup = function (cardGroup, ifAddCard) {
        if (ifAddCard === void 0) { ifAddCard = false; }
        for (var i = 0, len = cardGroup.length; i < len; i++) {
            var cardTempleId = CardTransFormUtil.trasnFormCardIdWay2(cardGroup[i]);
            var cardTemple = temple.TempleManager.select(cardTempleId);
            var card = new HandCardItem(cardTemple);
            if (!ifAddCard) {
                card.x = card.width * this.cardSprite.numChildren;
            }
            else {
                card.x = this.cardSprite.numChildren * card.width + card.width;
                this.newCard = card;
            }
            this.cardSprite.addChild(card);
        }
    };
    ViewGame.prototype.showHandCard = function () {
        this.cardSprite.visible = true;
    };
    ViewGame.prototype.hideHandCard = function () {
        this.cardSprite.visible = false;
    };
    /**卡牌单项点击 */
    ViewGame.prototype.onCardItemTap = function (evt) {
        this.curTarget = evt.target.parent;
        if (this.prevTarget) {
            if (this.curTarget === this.prevTarget) {
                egret.Tween.get(this.curTarget).to({ y: 0 }, 100).call(function () {
                    egret.Tween.removeTweens(this.curTarget);
                    this.prevTarget = null;
                }, this);
            }
            else {
                egret.Tween.get(this.curTarget).to({ y: this.curTarget.y - (this.curTarget.height >> 2) }, 100).call(function () {
                    egret.Tween.removeTweens(this.curTarget);
                }, this);
                egret.Tween.get(this.prevTarget).to({ y: 0 }, 100).call(function () {
                    egret.Tween.removeTweens(this.prevTarget);
                }, this);
            }
        }
        else {
            egret.Tween.get(this.curTarget).to({ y: this.curTarget.y - (this.curTarget.height >> 2) }, 100).call(function () {
                egret.Tween.removeTweens(this.curTarget);
            }, this);
        }
        this.prevTarget = evt.target.parent;
    };
    ViewGame.prototype.onCardTouchBegin = function (evt) {
        this.clickState = true;
        this.curStageY = evt.stageY;
        this.curTarget = evt.target.parent;
    };
    ViewGame.prototype.onCardTouchEnd = function (evt) {
        if (this.clickState) {
            this.clickState = false;
            var interVal = this.curStageY - evt.stageY;
            if (interVal > Config.h_handCard) {
                //==此处需要与服务器进行交互===
                //假设出牌成功
                this.outCard(data.Seat.South);
            }
        }
    };
    /**出牌 */
    ViewGame.prototype.outCard = function (seat, iconId) {
        if (iconId === void 0) { iconId = ""; }
        if (seat === data.Seat.South) {
            var obj = { icon: this.curTarget.path_icon };
            //打出牌添加数据源
            this.addCardItem(this.southCollect, obj);
            //移除手牌item
            var curX = this.curTarget.x;
            this.cardSprite.removeChild(this.curTarget);
            if (this.curTarget != this.newCard) {
                this.setCardToPosition(curX);
            }
        }
        else {
            var mx = 0;
            var my = 0;
            var moveStepObj = {};
            if (seat === data.Seat.East || seat === data.Seat.West) {
                my = 1;
                mx = 0;
            }
            else {
                mx = 1;
                my = 0;
            }
            //其他玩家打出手牌
            var index = (Math.random() * 12 + 1) >> 0;
            this.addCardItem(this.dachuObj[seat], { cardBg: 1, icon: Config.path_card + iconId + ".png" });
            var len = this.seatObj[seat].numChildren;
            var arr = [];
            for (var i = 0; i < len; i++) {
                if (i > index) {
                    arr.push(this.seatObj[seat].getChildAt(i));
                }
            }
            this.seatObj[seat].removeChildAt(index);
            for (var j = 0; j < arr.length; j++) {
                var item = arr[j];
                if (mx) {
                    moveStepObj = { x: item.x - item.width };
                }
                if (my) {
                    moveStepObj = { y: item.y - item.height };
                }
                egret.Tween.get(item).to(moveStepObj, this.moveStep).call(function () {
                    egret.Tween.removeTweens(item);
                }, this);
            }
        }
    };
    /**设置牌位置 */
    ViewGame.prototype.setCardToPosition = function (curX) {
        var _this = this;
        var len = this.cardSprite.numChildren - 1;
        var setX = -1;
        var curMoveGather = [];
        for (var i = 0, item; i < len; i++) {
            item = this.cardSprite.getChildAt(i);
            var cardType = CardTransFormUtil.getCardType(Number(item.cardId));
            var newCardType = CardTransFormUtil.getCardType(Number(this.newCard.cardId));
            if (newCardType === cardType) {
                //找到了同类型的卡牌
                var cardId = CardTransFormUtil.trasnFormCardIdWay2(Number(item.cardId));
                var newCardId = CardTransFormUtil.trasnFormCardIdWay2(Number(this.newCard.cardId));
                if (newCardId <= cardId) {
                    //新摸到的牌 在当前卡牌后面
                    setX = item.x;
                    break;
                }
            }
            else {
                continue;
            }
        }
        if (setX != -1) {
            this.searchMoveCardGroup(curX, setX);
        }
        else {
            //未找到同类新卡牌
            egret.Tween.get(this.newCard).to({ x: this.newCard.x - this.newCard.width }, this.moveStep).call(function () {
                egret.Tween.removeTweens(_this.newCard);
            }, this);
        }
    };
    ViewGame.prototype.searchMoveCardGroup = function (curX, setX) {
        var _this = this;
        var moveGather = [];
        var diction = 0;
        if (setX != curX && Math.abs(curX - setX) != Config.w_handCard) {
            //当前新卡牌与打出卡牌不在同一个位置
            if (setX < curX) {
                diction = 1;
                //当前设置位置在打出牌位置前面
                for (var i = 0; i < this.cardSprite.numChildren; i++) {
                    var item = this.cardSprite.getChildAt(i);
                    if (item.x >= setX && item.x < curX) {
                        moveGather.push(item);
                    }
                }
            }
            else {
                diction = -1;
                for (var j = 0; j < this.cardSprite.numChildren; j++) {
                    var item = this.cardSprite.getChildAt(j);
                    if (item.x <= setX && item.x > curX) {
                        moveGather.push(item);
                    }
                }
            }
            egret.Tween.get(this.newCard).to({ y: -this.newCard.height - 20 }, this.moveStep)
                .to({ x: setX }, ((this.newCard.x - setX) / this.newCard.width) * this.moveStep).call(function () {
                for (var m = 0; m < moveGather.length; m++) {
                    var item = moveGather[m];
                    egret.Tween.get(item).to({ x: (item.x + diction * item.width) }, _this.moveStep).call(function () {
                        egret.Tween.removeTweens(item);
                    }, _this);
                }
            }, this).to({ y: 0 }, this.moveStep).call(function () {
                egret.Tween.removeTweens(_this.newCard);
            }, this);
        }
        else {
            egret.Tween.get(this.newCard).to({ y: -this.newCard.height - 20 }, this.moveStep)
                .to({ x: curX }, ((this.newCard.x - curX) / this.newCard.width) * this.moveStep)
                .to({ y: 0 }, this.moveStep).call(function () {
                egret.Tween.removeTweens(_this.newCard);
            }, this);
        }
    };
    ViewGame.prototype.onTouchHandler = function (evt) {
    };
    return ViewGame;
}(BaseEuiView));
__reflect(ViewGame.prototype, "ViewGame");
//# sourceMappingURL=ViewGame.js.map