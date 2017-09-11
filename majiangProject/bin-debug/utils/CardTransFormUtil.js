var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CardTransFormUtil = (function () {
    function CardTransFormUtil() {
    }
    /**
     * 卡牌way1转换
     */
    CardTransFormUtil.trasnFormCardIdWay1 = function (cardNum) {
        var num = cardNum & 0xF0;
        if (num >= 16) {
            return parseInt(((cardNum & 0xF0) >> 4) + "" + (cardNum & 0x0F));
        }
        else {
            return cardNum & 0x0F;
        }
    };
    /**
     * 获取卡牌类型
     */
    CardTransFormUtil.getCardType = function (cardNum) {
        var num = cardNum & 0xF0;
        if (num >= 16) {
            return (cardNum & 0xF0) >> 4;
        }
        else {
            return cardNum & 0x0F;
        }
    };
    /**卡牌转换way2 10进制*/
    CardTransFormUtil.trasnFormCardIdWay2 = function (cardNum) {
        return parseInt(cardNum + "");
    };
    /**
     * 卡牌排序
     */
    CardTransFormUtil.cardSort = function (cardGather) {
        var arr = GlobalFunc.deepCopy(cardGather);
        var cardArr = [];
        for (var i = 0; i < arr.length; i++) {
            var cardNum = CardTransFormUtil.trasnFormCardIdWay2(arr[i]);
            cardArr.push(cardNum);
        }
        var operArr = GlobalFunc.sortRule(GlobalFunc.NORMALIZE, "", cardArr);
        return operArr;
    };
    /**开始发牌 */
    CardTransFormUtil.startGetCard = function (seat, peopleNum, cardGather, cardSprite, callBack, arg) {
        var arr = [];
        CardTransFormUtil.zhuangjiaPos = seat;
        CardTransFormUtil.num += 1;
        if (peopleNum === 2) {
            switch (seat) {
                case data.Seat.South:
                    arr = [data.Seat.South, data.Seat.North];
                    break;
                case data.Seat.North:
                    arr = [data.Seat.North, data.Seat.South];
                    break;
            }
        }
        else {
            switch (seat) {
                case data.Seat.North:
                    arr = [data.Seat.North, data.Seat.East, data.Seat.South, data.Seat.West];
                    break;
                case data.Seat.East:
                    arr = [data.Seat.East, data.Seat.South, data.Seat.West, data.Seat.North];
                    break;
                case data.Seat.South:
                    arr = [data.Seat.South, data.Seat.West, data.Seat.North, data.Seat.East];
                    break;
                case data.Seat.West:
                    arr = [data.Seat.West, data.Seat.North, data.Seat.East, data.Seat.South];
                    break;
            }
        }
        var len = arr.length + 1;
        var final = false;
        for (var j = 1; j < len; j++) {
            var timeOut = egret.setTimeout(function (param, time) {
                egret.clearTimeout(time);
                var pos = arr.shift();
                if (CardTransFormUtil.num > CardTransFormUtil.getCardNum && param === len - 1) {
                    final = true;
                }
                if (pos === data.Seat.South) {
                    CardTransFormUtil.divideCard(pos, cardGather.splice(0, 4), final, cardSprite, callBack, arg);
                }
                else {
                    CardTransFormUtil.divideCard(pos, [], final, cardSprite, callBack, arg);
                }
                if (!arr.length && CardTransFormUtil.num <= CardTransFormUtil.getCardNum && param === len - 1) {
                    CardTransFormUtil.startGetCard(seat, peopleNum, cardGather, cardSprite, callBack, arg);
                }
            }, this, 500 * j, j, timeOut);
        }
    };
    /**切牌 */
    CardTransFormUtil.divideCard = function (seat, handCard, final, cardSprite, callBackFunc, arg) {
        if (seat === data.Seat.South) {
            if (callBackFunc && arg) {
                callBackFunc.call(arg, { final: false, handCard: handCard });
            }
        }
        else {
            var num = 0;
            if (CardTransFormUtil.num > CardTransFormUtil.getCardNum) {
                if (CardTransFormUtil.zhuangjiaPos == seat) {
                    num = 2;
                }
                else {
                    num = 1;
                }
            }
            else {
                num = 4;
            }
            if (callBackFunc && arg) {
                callBackFunc.call(arg, { final: false, handCard: handCard, num: num, seat: seat });
            }
        }
        if (final && seat === data.Seat.South) {
            var timeOut = egret.setTimeout(function () {
                egret.clearTimeout(timeOut);
                CardTransFormUtil.num = 0;
                CardTransFormUtil.overTurnThis(cardSprite, cardSprite, 1, callBackFunc, arg);
            }, this, 500);
        }
    };
    /**翻牌效果 */
    CardTransFormUtil.overTurnThis = function (front, back, scale, callBackFun, arg) {
        var _this = this;
        front.scaleX = 0;
        back.scaleX = scale;
        egret.Tween.get(back).to({ scaleX: 0 }, 300, egret.Ease.circOut).call(function () {
            egret.Tween.get(front).to({ scaleX: scale }, 300, egret.Ease.circIn).call(function () {
                if (callBackFun && arg) {
                    callBackFun.call(arg, { final: true });
                }
                // this.cardSprite.removeChildren();
                // var arr:number[] = GlobalFunc.sortRule(GlobalFunc.NORMALIZE,"",this.testCardobj);
                // this.addCardGroup(arr);
            }, _this);
        }, this);
    };
    return CardTransFormUtil;
}());
CardTransFormUtil.NORTH = 10001;
CardTransFormUtil.SOUTH = 10002;
CardTransFormUtil.WEST = 10003;
CardTransFormUtil.EAST = 10004;
CardTransFormUtil.curDirection = 0;
CardTransFormUtil.cardDataArray = [
    0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09,
    0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09,
    0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09,
    0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09,
    0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18, 0x19,
    0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18, 0x19,
    0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18, 0x19,
    0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18, 0x19,
    0x21, 0x22, 0x23, 0x24, 0x25, 0x26, 0x27, 0x28, 0x29,
    0x21, 0x22, 0x23, 0x24, 0x25, 0x26, 0x27, 0x28, 0x29,
    0x21, 0x22, 0x23, 0x24, 0x25, 0x26, 0x27, 0x28, 0x29,
    0x21, 0x22, 0x23, 0x24, 0x25, 0x26, 0x27, 0x28, 0x29 //同
];
CardTransFormUtil.getCardNum = 3;
CardTransFormUtil.num = 0;
__reflect(CardTransFormUtil.prototype, "CardTransFormUtil");
//# sourceMappingURL=CardTransFormUtil.js.map