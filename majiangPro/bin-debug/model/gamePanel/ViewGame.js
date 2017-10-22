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
        _this.TYPE_WAIT = "wait";
        _this.TYPE_GAME = "game";
        //当前游戏状态 0为当局结束 1为开始
        _this.curGameState = 0;
        _this.seatObj = {};
        //资源集合
        _this.assetObj = {};
        //打出牌集合
        _this.dachuObj = {};
        //记录相对位置
        _this.relativeSeat = {};
        //初始化方位--玩家进入房间的方位顺序
        _this.initSeat = [data.Seat.South, data.Seat.North, data.Seat.West, data.Seat.East];
        //初始化牌集合
        _this.cardobj = [];
        //当前手牌
        _this.curCardGather = [];
        //当前用户是否存在痞子赖子碰等操作
        _this.ifExitOper = false;
        _this.initialized = true;
        _this.readyState = false;
        //当前可操作的卡牌集合（如点击吃 -- 供选择的卡牌组）形式为{data.Option.Chi:proto.IntList[]}
        _this.curOperGroup = {};
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
        this.bottomGroup.addChild(this.cardSprite);
        // this.cardSprite.y = Config.w_height - Config.h_handCard - 10;
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
        this.leftHand.visible = false;
        this.rightHand.visible = false;
        this.topHand.visible = false;
        this.bottomHand.visible = false;
        this.cardSprite.removeChildren();
        this.topGroup.removeChildren();
        this.leftGroup.removeChildren();
        this.rightGroup.removeChildren();
        this.initialized = true;
    };
    /**
     * 面板开启执行函数
     */
    ViewGame.prototype.open = function (param) {
        if (param.oper === "createRoom") {
            this.tableId.text = param.tableId;
            this.ownerSeat = param.seat;
            this.skin.currentState = this.TYPE_WAIT;
            var userInfo = DataCenter.userInfo;
            this.roleInfo_102.setRoleInfo(userInfo);
            var index = this.initSeat.indexOf(data.Seat.South);
            this.initSeat.splice(index, 1);
            this.relativeSeat[param.seat] = data.Seat.South;
            this.curFocusSeat = data.Seat.South;
        }
        else {
            if (param.handCards.length) {
                //掉线后重新进入
                //生成掉线前出牌数据
                this.skin.currentState = this.TYPE_GAME;
            }
            else {
                //第一次进入房间
                this.skin.currentState = this.TYPE_WAIT;
                this.tableId.text = param.tableId;
                this.ownerSeat = param.seat;
                DataCenter.playerCount = param.playerCount;
                var userInfo = DataCenter.userInfo;
                this.roleInfo_102.setRoleInfo(userInfo);
                var index = this.initSeat.indexOf(data.Seat.South);
                this.initSeat.splice(index, 1);
                this.relativeSeat[param.seat] = data.Seat.South;
                this.createRoleInfo(param.userInfoList);
            }
        }
    };
    /**
     * 面板关闭执行函数
     */
    ViewGame.prototype.close = function (param) {
    };
    /**
     * 创建人物信息
     */
    ViewGame.prototype.createRoleInfo = function (userInfoList) {
        if (DataCenter.playerCount === 2) {
            if (userInfoList.length) {
                var userInfoWithSeat = userInfoList[0];
                var userInfo = userInfoWithSeat.userInfo;
                this.roleInfo_104.setRoleInfo(userInfo);
                var index = this.initSeat.indexOf(data.Seat.North);
                this.initSeat.splice(index, 1);
                this.relativeSeat[userInfoWithSeat.seat] = data.Seat.North;
            }
        }
        else {
            if (userInfoList.length) {
                for (var i = 0, len = userInfoList.length, item; i < len; i++) {
                    item = userInfoList[i];
                    var seat = this.initSeat.shift();
                    // this["roleInfo_"+seat].seat = item.seat;
                    this.relativeSeat[item.seat] = seat;
                    this["roleInfo_" + seat].setRoleInfo(item.userInfo);
                }
            }
        }
    };
    /**
     * 初始化手牌
     */
    ViewGame.prototype.showGameState = function (msg) {
        this.skin.currentState = this.TYPE_GAME;
        this.cardobj = this.cardobj.concat(msg.handCards);
        this.curCardPi = msg.pizi;
        this.curCardLai = msg.laizi;
        this.dice1 = msg.dice1;
        this.dice2 = msg.dice2;
        this.dealer = msg.dealer;
        this.curCardGather = this.curCardGather.concat(msg.handCards);
    };
    /**处理摸牌 */
    ViewGame.prototype.notifyDealCards = function (msg) {
        if (this.relativeSeat[msg.seat] === data.Seat.South) {
            //如果相对座位为南是 添加手牌到显示组 -- 当前玩家摸牌
            // this.addCardGroup([msg.drawCard],true);
            if (this.initialized) {
                this.initialized = false;
                this.curCardGather.push(msg.drawCard);
                this.startNewGame(this.dice1, this.dice2, this.relativeSeat[this.dealer]);
            }
            else {
                this.cardMap.removeItem();
                this.addCardGroup([msg.drawCard], true);
            }
            //此处响应玩家摸牌 收到可操作牌组
            this.ifExitOper = this.judgeOper(msg.KongCards);
        }
        else {
            //其他玩家摸牌显示0
            var seat = this.relativeSeat[msg.seat];
            var curGroup = this.seatObj[seat];
            var img = new eui.Image();
            img.source = this.assetObj[seat];
            curGroup.addChild(img);
            if (seat === data.Seat.North) {
                img.x = curGroup.numChildren * img.width;
                curGroup.x -= img.width;
            }
            else {
                img.y = curGroup.numChildren * img.width;
                curGroup.y -= img.width;
            }
            if (this.initialized) {
                this.initialized = false;
                this.startNewGame(this.dice1, this.dice2, this.relativeSeat[this.dealer]);
            }
            else {
                this.cardMap.removeItem();
            }
        }
        if (msg.isWin) {
            alert("win");
        }
    };
    /**通知其他人打牌信息 */
    ViewGame.prototype.notifyPlayCard = function (msg) {
        if (this.relativeSeat[msg.seat] === data.Seat.South) {
            return;
        }
        var cardTemple = temple.TempleManager.select(msg.playCard);
        var item = { cardBg: 1, icon: cardTemple.icon + "_png" };
        this.addCardItem(this.dachuObj[this.relativeSeat[msg.seat]], item);
        var seat = this.relativeSeat[msg.seat];
        var curGroup = this.seatObj[seat];
        curGroup.removeChildAt(curGroup.numChildren - 1);
        if (seat === data.Seat.North) {
            curGroup.x -= Config.w_tieldCard;
        }
        else {
            curGroup.y -= Config.w_tieldCard;
        }
        //此处响应玩家打牌 收到可操作牌组
        this.ifExitOper = this.judgeOper(msg.pongKongChow);
        if (msg.isWin) {
            //胡牌
            alert("win");
        }
    };
    /**判断是否含有操作 */
    ViewGame.prototype.judgeOper = function (oper) {
        //待确定修改
        var operGather = [];
        for (var i = 0; i < oper.length; i++) {
            if (oper[i].list.length >= 4) {
                operGather.push(data.Option.Kong);
                if (!this.curOperGroup[data.Option.Kong]) {
                    this.curOperGroup[data.Option.Kong] = [];
                }
                this.curOperGroup[data.Option.Kong].push(oper[i]);
                continue;
            }
            for (var j = 0; j < oper[i].list.length; j++) {
                var value = oper[i].list[j];
                if (value === this.curCardPi) {
                    operGather.push(data.Option.Pi);
                    if (!this.curOperGroup[data.Option.Pi]) {
                        this.curOperGroup[data.Option.Pi] = [];
                    }
                    this.curOperGroup[data.Option.Pi].push(oper[i]);
                    continue;
                }
                else if (value === this.curCardLai) {
                    if (!this.curOperGroup[data.Option.Lai]) {
                        this.curOperGroup[data.Option.Lai] = [];
                    }
                    this.curOperGroup[data.Option.Lai].push(oper[i]);
                    operGather.push(data.Option.Lai);
                    continue;
                }
            }
        }
        if (operGather.length) {
            operGather.push(data.Option.Pass);
            this.createOper(operGather);
            return true;
        }
        return false;
    };
    /**
     * 打牌响应 等待其他玩家响应
     */
    ViewGame.prototype.notifyPlayResponse = function (msg) {
        if (this.relativeSeat[msg.seat] === data.Seat.South) {
            //如果收到的是当前打牌用户 返回
            return;
        }
        if (!msg.pongKongChow.length) {
            //过
            this.curOption = data.Option.Pass;
            this.applyFunc(GameConsts.PLAYCARDRESPONSE_C2S, { option: data.Option.Pass });
        }
        else {
            //提示对应操作
            this.createOper([msg.option]);
        }
    };
    /**
     * 切换用户
     */
    ViewGame.prototype.notifyChangeUser = function (seat) {
        if (!this.initialized) {
            this.timeCom.initialize();
            this.curFocusSeat = this.relativeSeat[seat];
            this.timeCom.setFocus(this.curFocusSeat, Config.waitTime, this.timeEnd, this);
        }
    };
    /**
     * 响应别人打出牌吃碰杠等操作完成后
     */
    ViewGame.prototype.playCardResponse = function () {
        this.leftOper.removeChildren();
        this.rightOper.removeChildren();
        this.ifExitOper = false;
    };
    /**
     * 摸牌响应
     */
    ViewGame.prototype.drawCardResponseRes = function () {
        this.leftOper.removeChildren();
        this.rightOper.removeChildren();
        this.ifExitOper = false;
    };
    /**
     * 离开房间
     */
    ViewGame.prototype.leaveSeat = function (seat) {
        if (DataCenter.playerCount === 2) {
            this.roleInfo_104.showLeave();
        }
        else {
            this["roleInfo_" + this.relativeSeat[seat]].showLeave();
        }
    };
    /**出牌成功 */
    ViewGame.prototype.playCardSuccess = function () {
        this.outCard(data.Seat.South);
    };
    /**
     * 当前局数结束
     */
    ViewGame.prototype.curGameEnd = function (msg) {
        this.curGameState = 0;
    };
    /**举手成功 */
    ViewGame.prototype.raiseHandSuccess = function () {
        this.readyBtn.visible = false;
        this.bottomHand.visible = true;
    };
    /**
     * 开始新的一局
     */
    ViewGame.prototype.startNewGame = function (num1, num2, seat) {
        var _this = this;
        if (this.cardMap && this.cardMap.parent && this.cardMap.parent.contains(this.cardMap)) {
            this.cardMap.parent.removeChild(this.cardMap);
        }
        this.curFocusSeat = seat;
        this.cardMap = new CardMap();
        this.curGameState = 1;
        this.addChild(this.cardMap);
        this.setChildIndex(this.cardMap, 1);
        this.cardMap.width = Config.w_width;
        this.cardMap.height = Config.w_height;
        this.cardMap.x = this.cardMap.y = 0;
        this.cardMap.calculBlock(num1, num2, seat);
        CardTransFormUtil.startGetCard(seat, this.cardobj, this.cardSprite, function (dataObj) {
            if (dataObj.final) {
                //切牌发牌完毕
                _this.cardSprite.removeChildren();
                var curCardNum;
                if (seat === data.Seat.South) {
                    curCardNum = _this.curCardGather.pop();
                }
                var arr = GlobalFunc.sortRule(GlobalFunc.NORMALIZE, "", _this.curCardGather);
                _this.addCardGroup(arr);
                if (!isNaN(curCardNum)) {
                    var cardTemple = temple.TempleManager.select(curCardNum);
                    var card = new HandCardItem(cardTemple);
                    _this.newCard = card;
                    _this.addCardGroup([curCardNum], true);
                    _this.curCardGather.push(curCardNum);
                }
                _this.timeCom.initialize();
                _this.timeCom.setFocus(_this.curFocusSeat, Config.waitTime, _this.timeEnd, _this);
            }
            else {
                if (dataObj.handCard.length) {
                    //当前为自己的手牌显示
                    _this.addCardGroup(dataObj.handCard);
                    if (dataObj.handCard.length >= 4) {
                        _this.cardMap.removeBlock();
                    }
                    if (dataObj.handCard.length === 2) {
                        _this.cardMap.removeJumpItem();
                    }
                    if (dataObj.handCard.length === 1) {
                        if (_this.ownerSeat === _this.dealer) {
                            _this.cardMap.removeJumpItem();
                        }
                        else {
                            _this.cardMap.removeItem();
                        }
                    }
                }
                else {
                    //当前为别的玩家手牌显示
                    for (var i = 0; i < dataObj.num; i++) {
                        var img = new eui.Image();
                        img.source = _this.assetObj[dataObj.seat];
                        _this.seatObj[dataObj.seat].addChild(img);
                        if (dataObj.seat === data.Seat.North) {
                            img.x = _this.seatObj[dataObj.seat].numChildren * 39;
                        }
                        else {
                            img.y = _this.seatObj[dataObj.seat].numChildren * 26;
                        }
                    }
                    if (dataObj.num === 4) {
                        //当前单次获得卡牌数为4张
                        _this.cardMap.removeBlock();
                    }
                    if (dataObj.num === 2) {
                        //跳牌
                        _this.cardMap.removeJumpItem();
                    }
                    if (dataObj.num === 1) {
                        _this.cardMap.removeItem();
                    }
                }
            }
        }, this);
    };
    /**
     * 当前出牌时间结束
     */
    ViewGame.prototype.timeEnd = function () {
        // if(this.curFocusSeat === data.Seat.South){
        // 	var lastCard:HandCardItem = this.cardSprite.getChildAt(this.cardSprite.numChildren - 1) as HandCardItem;
        // 	this.newCard = this.curTarget = lastCard;
        // 	var card:number = CardTransFormUtil.trasnFormCardIdWay2(Number(this.curTarget.cardId));
        // 	this.applyFunc(GameConsts.PLAYCARD_C2S,card);
        // }
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
            // var cardTempleId:number = CardTransFormUtil.trasnFormCardIdWay2(cardGroup[i]);
            var cardTemple = temple.TempleManager.select(cardGroup[i]);
            var card = new HandCardItem(cardTemple);
            card.setOperLabel(cardGroup[i], this.curCardPi, this.curCardLai);
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
        if (this.clickState && this.curFocusSeat === data.Seat.South && this.skin.currentState === this.TYPE_GAME && !this.ifExitOper) {
            this.clickState = false;
            var interVal = this.curStageY - evt.stageY;
            if (interVal > Config.h_handCard) {
                //==此处需要与服务器进行交互===
                var card = CardTransFormUtil.trasnFormCardIdWay2(Number(this.curTarget.cardId));
                console.log("============当前打的牌是-----====》：" + this.curTarget.cardId);
                this.applyFunc(GameConsts.PLAYCARD_C2S, card);
            }
        }
    };
    /**查询当前牌 */
    ViewGame.prototype.searchHandCard = function (cardId) {
        return this.curCardGather.indexOf(cardId);
    };
    /**出牌 */
    ViewGame.prototype.outCard = function (seat, iconId) {
        if (iconId === void 0) { iconId = ""; }
        if (seat === data.Seat.South) {
            var obj = { icon: this.curTarget.path_icon };
            //将打出的牌移除当前手牌
            this.curCardGather.splice(this.searchHandCard(parseInt(this.curTarget.cardId)), 1);
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
            this.addCardItem(this.dachuObj[seat], { cardBg: 1, icon: iconId + "_png" });
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
            var cardType = CardTransFormUtil.getCardType(item.cardId);
            var newCardType = CardTransFormUtil.getCardType(this.newCard.cardId);
            if (newCardType == cardType) {
                //找到了同类型的卡牌
                var cardId = CardTransFormUtil.trasnFormCardIdWay2(Number(item.cardId));
                var newCardId = CardTransFormUtil.trasnFormCardIdWay2(Number(this.newCard.cardId));
                if (newCardId <= cardId) {
                    //新摸到的牌 在当前卡牌后面
                    setX = item.x;
                    if (setX > curX) {
                        setX = item.x - item.width;
                    }
                    break;
                }
                setX = item.x + item.width;
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
                var moveGather = [];
                for (var i = 0; i < _this.cardSprite.numChildren; i++) {
                    var item = _this.cardSprite.getChildAt(i);
                    if (item.x >= curX) {
                        egret.Tween.get(item).to({ x: (item.x - item.width) }, _this.moveStep).call(function () {
                            egret.Tween.removeTweens(item);
                        }, _this);
                    }
                }
            }, this);
        }
    };
    ViewGame.prototype.searchMoveCardGroup = function (curX, setX) {
        var _this = this;
        var moveGather = [];
        var diction = 0;
        // var min:number = Math.min(curX,setX);
        // var max:number = Math.max(curX,setX);
        // if(curX > setX){
        // 	min = setX,max = curX;
        // 	diction = 1
        // }else{
        // 	min = curX,max = setX;
        // 	diction = -1
        // }
        // for(var i:number = 0;i<this.cardSprite.numChildren;i++){
        // 	var item:HandCardItem = this.cardSprite.getChildAt(i) as HandCardItem;
        // 	if(item.x > min && item.x < max){
        // 		moveGather.push(item);
        // 	}
        // }
        // egret.Tween.get(this.newCard).to({y: - this.newCard.height - 20},this.moveStep)
        // .to({x:setX+diction*this.newCard.width},((this.newCard.x - setX)/this.newCard.width)*this.moveStep).call(()=>{
        // 	for(var m:number = 0;m<moveGather.length;m++){
        // 		var item:HandCardItem = moveGather[m];
        // 		egret.Tween.get(item).to({x:(item.x+diction*item.width)},this.moveStep).call(()=>{
        // 			egret.Tween.removeTweens(item);
        // 		},this)
        // 	}
        // },this).to({y:0},this.moveStep).call(()=>{
        // 	egret.Tween.removeTweens(this.newCard);
        // },this);
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
    /**生成对应操作 */
    ViewGame.prototype.createOper = function (option) {
        this.leftOper.removeChildren();
        this.rightOper.removeChildren();
        var passImg = new eui.Image();
        passImg.source = "room_oper_" + data.Option.Pass + "_png";
        this.rightGroup.addChild(passImg);
        passImg.name = data.Option.Pass + "";
        passImg.width = 63, passImg.height = 78;
        passImg.x = this.rightOper.width - passImg.width;
        for (var i = 0, len = option.length; i < len; i++) {
            var img = new eui.Image();
            img.source = "room_oper_" + option[i] + "_png";
            img.name = option[i] + "";
            if (option[i] === data.Option.Lai || option[i] === data.Option.Pi) {
                this.leftOper.addChild(img);
                img.x = i * img.width + 10;
            }
            else {
                this.rightOper.addChild(img);
                img.width = 63;
                img.height = 78;
                img.x = this.rightOper.width - this.rightGroup.numChildren * (img.width + 10);
            }
        }
    };
    /**显示提示操作牌选项信息-- */
    ViewGame.prototype.promptOperGroup = function (optionCardList) {
        this.promptGroup.width = 0;
        for (var i = 0; i < optionCardList.length; i++) {
            var itemList = optionCardList[i].list;
            var group = new eui.Group();
            for (var j = 0; j < itemList.length; j++) {
                var cardItem = new CardItem();
                var cardTemple = temple.TempleManager.select(itemList[j]);
                cardItem.icon = cardTemple.icon;
                group.addChild(cardItem);
            }
            this.promptGroup.addChild(group);
            this.promptGroup.width += group.width + 10;
            group.x = (group.numChildren * Config.w_tieldCard) * i + 10;
        }
    };
    ViewGame.prototype.onTouchHandler = function (evt) {
        if (evt.target.parent === this.leftOper || evt.target.parent === this.rightOper) {
            var name = evt.target.name;
            switch (parseInt(name)) {
                case data.Option.Pass:
                    //过
                    this.applyFunc(GameConsts.DRAWCARDRESPONSE_C2S, { option: name });
                    break;
                default:
                    var cardList = this.curOperGroup[name];
                    if (cardList.length > 1) {
                        //供用户选择当前操作的出牌集合
                        this.promptOperGroup(cardList);
                    }
                    else {
                        //当前操作的牌集合只有一张  直接打出
                        this.applyFunc(GameConsts.DRAWCARDRESPONSE_C2S, { option: name, cardList: cardList[0].list });
                    }
            }
            return;
        }
        switch (evt.target) {
            case this.buttonYaoQing:
                //邀请微信好友
                break;
            case this.readyBtn:
                if (this.readyState) {
                    return;
                }
                this.readyState = true;
                this.applyFunc(GameConsts.RAISEHANDS_C2S);
                break;
            case (evt.target.parent.parent == this.promptGroup):
                var list = evt.target.parent;
                var cardArr = [];
                list.forEach(function (card) {
                    cardArr.push(card.iconTrans);
                }, this);
                this.applyFunc(GameConsts.DRAWCARDRESPONSE_C2S, { option: name, cardList: cardArr });
                break;
        }
    };
    return ViewGame;
}(BaseEuiView));
__reflect(ViewGame.prototype, "ViewGame");
//# sourceMappingURL=ViewGame.js.map