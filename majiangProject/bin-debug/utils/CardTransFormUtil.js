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
            var obj = {};
            var cardNum = CardTransFormUtil.trasnFormCardIdWay2(arr[i]);
            obj.card = arr[i];
            obj.transFormCard = cardNum;
            cardArr.push(obj);
        }
        var operArr = GlobalFunc.sortRule(GlobalFunc.NORMALIZE, "transFormCard", cardArr);
        return operArr;
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
__reflect(CardTransFormUtil.prototype, "CardTransFormUtil");
//# sourceMappingURL=CardTransFormUtil.js.map