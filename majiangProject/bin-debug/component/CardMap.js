var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CardMap = (function (_super) {
    __extends(CardMap, _super);
    function CardMap() {
        var _this = _super.call(this) || this;
        _this.seatObj = {};
        //搬牌时留下的卡牌组
        _this.extraGroup = [];
        _this.skinName = "CardMapSkin";
        return _this;
    }
    CardMap.prototype.childrenCreated = function () {
        this.seatObj[data.Seat.North] = this.northGroup;
        this.seatObj[data.Seat.East] = this.eastGroup;
        this.seatObj[data.Seat.South] = this.southGroup;
        this.seatObj[data.Seat.West] = this.westGroup;
    };
    CardMap.prototype.calculBlock = function (num1, num2, seat, peopleNum) {
        if (peopleNum === void 0) { peopleNum = 4; }
        var minNum;
        var maxNum;
        num1 >= num2 ? (minNum = num2, maxNum = num1) : (minNum = num1, maxNum = num2);
        var totleNum = minNum + maxNum;
        var curPos;
        var loopDir;
        if (totleNum <= peopleNum) {
            curPos = totleNum;
        }
        else {
            curPos = totleNum % peopleNum;
            if (curPos === 0) {
                curPos = 4;
            }
        }
        loopDir = this.createDicArr(peopleNum, seat, false);
        this.reCardDic = this.createDicArr(peopleNum, loopDir[curPos - 1], true);
        this.firstSeat = this.curSeat = this.reCardDic.shift();
        this.curGroup = this.seatObj[this.curSeat];
        for (var i = 0; i < minNum; i++) {
            this.extraGroup.push(this.curGroup.getChildAt(this.curGroup.numChildren - 1 - i));
        }
    };
    CardMap.prototype.removeBlock = function () {
        for (var i = 0; i < 2; i++) {
            if (this.curSeat === this.firstSeat) {
                var index = this.curGroup.numChildren - this.extraGroup.length;
                if (index) {
                    this.clockWithRemove();
                }
                else {
                    this.curSeat = this.reCardDic.shift();
                    this.curGroup = this.seatObj[this.curSeat];
                    this.clockWithRemove();
                }
            }
            else {
                if (this.curGroup.numChildren) {
                    this.clockWithRemove();
                }
                else {
                    this.curSeat = this.reCardDic.shift();
                    this.curGroup = this.seatObj[this.curSeat];
                    this.clockWithRemove();
                }
            }
        }
    };
    /**处理跳牌操作 */
    CardMap.prototype.removeJumpItem = function () {
        if (!this.curGroup.numChildren) {
            this.curSeat = this.reCardDic.shift();
            this.curGroup = this.seatObj[this.curSeat];
            if (this.curSeat != data.Seat.East) {
                var firstGroup = this.curGroup.getChildAt(0);
                var thirdGroup = this.curGroup.getChildAt(2);
            }
            else {
                var len1 = this.curGroup.numChildren - 1;
                var len2 = this.curGroup.numChildren - 3;
                var firstGroup = this.curGroup.getChildAt(len1);
                var thirdGroup = this.curGroup.getChildAt(len2);
            }
            firstGroup.removeChild(firstGroup.getChildAt(firstGroup.numChildren - 1));
            thirdGroup.removeChild(thirdGroup.getChildAt(thirdGroup.numChildren - 1));
        }
        else {
            var firstGroup = this.curGroup.getChildAt(0);
            var nextGroupSeat = this.reCardDic[0];
            var nextGroup = this.seatObj[nextGroupSeat];
            if (this.curGroup.numChildren <= 1) {
                if (nextGroupSeat != data.Seat.East) {
                    var thirdGroup = nextGroup.getChildAt(1);
                }
                else {
                    var thirdGroup = nextGroup.getChildAt(nextGroup.numChildren - 2);
                }
            }
            else if (this.curGroup.numChildren <= 2) {
                if (nextGroupSeat != data.Seat.East) {
                    var thirdGroup = nextGroup.getChildAt(0);
                }
                else {
                    var thirdGroup = nextGroup.getChildAt(nextGroup.numChildren - 1);
                }
            }
            else {
                var thirdGroup = this.curGroup.getChildAt(2);
            }
            firstGroup.removeChild(firstGroup.getChildAt(firstGroup.numChildren - 1));
            thirdGroup.removeChild(thirdGroup.getChildAt(thirdGroup.numChildren - 1));
        }
    };
    /**平常出牌移除item */
    CardMap.prototype.removeItem = function () {
        if (this.curGroup.numChildren) {
            this.clockWithRemove(true);
        }
        else {
            if (this.reCardDic.length) {
                this.curSeat = this.reCardDic.shift();
                this.curGroup = this.seatObj[this.curSeat];
                this.clockWithRemove(true);
            }
            else {
                alert("牌已经打完");
                return;
            }
        }
    };
    CardMap.prototype.clockWithRemove = function (removeItem) {
        if (removeItem === void 0) { removeItem = false; }
        if (this.curSeat === this.firstSeat) {
            if (this.curSeat === data.Seat.West) {
                var index = this.curGroup.numChildren - 1 - this.extraGroup.length;
            }
            else {
                var index = this.extraGroup.length;
            }
        }
        else {
            if (this.curSeat === data.Seat.West) {
                var index = this.curGroup.numChildren - 1;
            }
            else {
                var index = 0;
            }
        }
        if (!removeItem) {
            this.curGroup.removeChild(this.curGroup.getChildAt(index));
        }
        else {
            var curItemGroup = this.curGroup.getChildAt(index);
            curItemGroup.removeChild(curItemGroup.getChildAt(curItemGroup.numChildren - 1));
            if (!curItemGroup.numChildren) {
                this.curGroup.removeChild(curItemGroup);
            }
        }
    };
    CardMap.prototype.createDicArr = function (peopleNum, campareValue, ifClockWise) {
        var arr = [];
        if (peopleNum === 2) {
            if (campareValue === data.Seat.North) {
                arr = [data.Seat.North, data.Seat.South];
            }
            else {
                arr = [data.Seat.South, data.Seat.North];
            }
        }
        else {
            switch (campareValue) {
                case data.Seat.North:
                    if (!ifClockWise) {
                        arr = [data.Seat.North, data.Seat.West, data.Seat.South, data.Seat.East];
                    }
                    else {
                        arr = [data.Seat.North, data.Seat.East, data.Seat.South, data.Seat.West];
                    }
                    break;
                case data.Seat.East:
                    if (!ifClockWise) {
                        arr = [data.Seat.East, data.Seat.North, data.Seat.West, data.Seat.South];
                    }
                    else {
                        arr = [data.Seat.East, data.Seat.South, data.Seat.West, data.Seat.North];
                    }
                    break;
                case data.Seat.South:
                    if (!ifClockWise) {
                        arr = [data.Seat.South, data.Seat.East, data.Seat.North, data.Seat.West];
                    }
                    else {
                        arr = [data.Seat.South, data.Seat.West, data.Seat.North, data.Seat.East];
                    }
                    break;
                case data.Seat.West:
                    if (!ifClockWise) {
                        arr = [data.Seat.West, data.Seat.South, data.Seat.East, data.Seat.North];
                    }
                    else {
                        arr = [data.Seat.West, data.Seat.North, data.Seat.East, data.Seat.South];
                    }
                    break;
            }
        }
        return arr;
    };
    return CardMap;
}(eui.Component));
__reflect(CardMap.prototype, "CardMap");
//# sourceMappingURL=CardMap.js.map