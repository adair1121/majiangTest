class ViewGame extends BaseEuiView{
	public northList:eui.List;
	public southList:eui.List;
	public eastList:eui.List;
	public westList:eui.List;
	public promptGroup:eui.Group;
	public roleInfo_104:PlayerRoleInfo;
	public roleInfo_103:PlayerRoleInfo;
	public roleInfo_102:PlayerRoleInfo;
	public roleInfo_101:PlayerRoleInfo;
	public out_101_group:eui.Group;
	public out_102_group:eui.Group;
	public out_103_group:eui.Group;
	public out_104_group:eui.Group;
	public leftHand:eui.Image;
	public topHand:eui.Image;
	public bottomHand:eui.Image;
	public rightHand:eui.Image;
	public readyBtn:eui.Image;
	public buttonYaoQing:eui.Image;
	public tableId:eui.Label;
	public gameNum:eui.Label;
	public timeCom:TimeComponent;
	public rightOper:eui.Group;
	public leftOper:eui.Group;
	private northCollect:eui.ArrayCollection;
	private southCollect:eui.ArrayCollection;
	private eastCollect:eui.ArrayCollection;
	private westCollect:eui.ArrayCollection;
	private cardSprite:egret.Sprite;
	private cardData:any[] = [];
	private curTarget:HandCardItem;
	private prevTarget:HandCardItem;
	private timer:egret.Timer;
	private curStageY:number;
	private clickState:boolean = false;
	private newCard:HandCardItem;
	//初始化拿牌  一组多少个
	private cardGroupNum:number = 4;
	//初始化每个人间隔拿牌时间 毫秒单位
	private getCardGroupTime:number = 1000;
	/**移动步长 */
	private moveStep:number = 100;
	public leftGroup:eui.Group;
	public rightGroup:eui.Group;
	public topGroup:eui.Group;
	public bottomGroup:eui.Group;
	private TYPE_WAIT:string = "wait";
	private TYPE_GAME:string = "game";
	//当前游戏状态 0为当局结束 1为开始
	private curGameState:number = 0;
	private seatObj:any = {};
	//资源集合
	private assetObj:any = {};
	//打出牌集合
	private dachuObj:any = {};
	//记录相对位置
	private relativeSeat:any ={};
	//我的位置
	private ownerSeat:number;
	//码牌实例类
	private cardMap:CardMap
	//初始化方位--玩家进入房间的方位顺序
	private initSeat:number[] = [data.Seat.South,data.Seat.North,data.Seat.West,data.Seat.East];
	//初始化牌集合
	private cardobj:number[] = [];
	//当前手牌
	private curCardGather:number[] = [];
	//当前出牌位置
	private curFocusSeat:number;
	//当前用户是否存在痞子赖子碰等操作
	private ifExitOper:boolean = false;
	private initialized:boolean = true;
	private curOption:number = -1;//默认值为-1 普通摸牌
	public constructor($controller:BaseController,$parent:egret.DisplayObjectContainer) {
		super($controller,$parent);
		this.skinName = "ViewGameSkin";
	}
	/**
	 * 对面板进行初始化
	 */
	public initUI():void{
		super.initUI();
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
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchHandler,this);
		this.cardSprite.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCardItemTap,this);
		this.cardSprite.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onCardTouchBegin,this);
		this.addEventListener(egret.TouchEvent.TOUCH_END,this.onCardTouchEnd,this);
	}
	/**
	 * 对面板数据进行初始化
	 */
	public initData():void{
		super.initData();
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
	}
	/**
	 * 面板开启执行函数
	 */
	public open(param:any):void{
		if(param.oper === "createRoom"){
			this.tableId.text = param.tableId;
			this.ownerSeat = param.seat;
			this.skin.currentState = this.TYPE_WAIT;
			var userInfo:proto.UserInfo = DataCenter.userInfo;
			this.roleInfo_102.setRoleInfo(userInfo);
			var index:number = this.initSeat.indexOf(data.Seat.South);
			this.initSeat.splice(index,1);
			this.relativeSeat[param.seat] = data.Seat.South;
			this.curFocusSeat = data.Seat.South;
		}else{
			if(param.handCards.length){
				//掉线后重新进入
				//生成掉线前出牌数据
				this.skin.currentState = this.TYPE_GAME;
			}else{
				//第一次进入房间
				this.skin.currentState = this.TYPE_WAIT;
				this.tableId.text = param.tableId;
				this.ownerSeat = param.seat;
				DataCenter.playerCount = param.playerCount;
				var userInfo:proto.UserInfo = DataCenter.userInfo;
				this.roleInfo_102.setRoleInfo(userInfo);
				var index:number = this.initSeat.indexOf(data.Seat.South);
				this.initSeat.splice(index,1);
				this.relativeSeat[param.seat] = data.Seat.South;
				this.createRoleInfo(param.userInfoList);
			}
		}
	}
	
	/**
	 * 面板关闭执行函数
	 */
	public close(param:any[]):void{

	}
	/**
	 * 创建人物信息
	 */
	public createRoleInfo(userInfoList:proto.UserInfoWithSeat[]):void{
		if(DataCenter.playerCount === 2){
			if(userInfoList.length){
				var userInfoWithSeat:proto.UserInfoWithSeat = userInfoList[0] as proto.UserInfoWithSeat;
				var userInfo:proto.UserInfo = userInfoWithSeat.userInfo;
				this.roleInfo_104.setRoleInfo(userInfo);
				var index:number = this.initSeat.indexOf(data.Seat.North);
				this.initSeat.splice(index,1);
				this.relativeSeat[userInfoWithSeat.seat] = data.Seat.North;
			}
		}else{
			if(userInfoList.length){
				for(var i:number = 0,len:number = userInfoList.length,item:proto.UserInfoWithSeat;i<len;i++){
					item = userInfoList[i];
					var seat:number = this.initSeat.shift();
					// this["roleInfo_"+seat].seat = item.seat;
					this.relativeSeat[item.seat] = seat;
					this["roleInfo_"+seat].setRoleInfo(item.userInfo);
				}
			}
		}
		
	}
	private curCardPi:number;
	private curCardLai:number;
	private dice1:number;
	private dice2:number;
	private dealer:number;
	/**
	 * 初始化手牌
	 */
	public showGameState(msg:proto.s_NotifyHandCards):void{
		this.skin.currentState = this.TYPE_GAME;
		this.cardobj = this.cardobj.concat(msg.handCards);
		this.curCardPi = msg.pizi;
		this.curCardLai = msg.laizi;
		console.log("=========>laizi:"+msg.laizi+"=========>pizi:"+msg.pizi);
		this.dice1 = msg.dice1;
		this.dice2 = msg.dice2;
		this.dealer = msg.dealer;
		this.curCardGather = this.curCardGather.concat(msg.handCards);
	}
	/**处理摸牌 */
	public notifyDealCards(msg:proto.s_NotifyDealCard):void{
		if(this.relativeSeat[msg.seat] === data.Seat.South){
			//如果相对座位为南是 添加手牌到显示组 -- 当前玩家摸牌
			// this.addCardGroup([msg.drawCard],true);
			if(this.initialized){
				this.curCardGather.push(msg.drawCard);
				console.log("============>此处为我现在的手牌====>"+this.curCardGather);
				this.startNewGame(this.dice1,this.dice2,this.relativeSeat[this.dealer]);
			}else{
				// if(DataCenter.playerCount === 1){
					//测试当前为1个玩家是 打牌后立即摸牌 设置newCard会影响后面设置位置 要延迟
					var timeOut = egret.setTimeout(()=>{
						if(this.curOption === -1){
							this.cardMap.removeItem();
						}else{
							this.cardMap.removeItem(true);
						}
						this.addCardGroup([msg.drawCard],true);
						egret.clearTimeout(timeOut);
					},this,300);
				// }else{
				// 	if(this.curOption === -1){
				// 		this.cardMap.removeItem();
				// 	}else{
				// 		this.cardMap.removeItem(true);
				// 	}
				// 	this.addCardGroup([msg.drawCard],true);
				// }
				
			}
			//此处响应玩家摸牌 收到可操作牌组
			this.ifExitOper = this.judgeOper(msg.KongCards);
			//测试输出
			for(var i:number = 0;i<msg.KongCards.length;i++){
				console.log("=====>此处为收到的操作组=====》"+msg.KongCards[i].list)
			}
		}else{
			if(this.initialized){
				this.startNewGame(this.dice1,this.dice2,this.relativeSeat[this.dealer]);
			}else{
				//其他玩家摸牌显示0
				var seat:number = this.relativeSeat[msg.seat];
				var curGroup:eui.Group = this.seatObj[seat];
				var img:eui.Image = new eui.Image();
				img.source = this.assetObj[seat];
				curGroup.addChild(img);
				if(seat === data.Seat.North){
					img.x = curGroup.numChildren * img.width;
					curGroup.x -= img.width;
				}else{
					img.y = curGroup.numChildren * img.width;
					curGroup.y -= img.width;
				}
				if(this.curOption === -1){
					this.cardMap.removeItem();
				}else{
					this.cardMap.removeItem(true);
				}
			}
		}
		if(msg.isWin){
			alert("win");
		}
	}
	/**通知其他人打牌信息 */
	public notifyPlayCard(msg:proto.s_NotifyPlayCard):void{
		if(this.relativeSeat[msg.seat] === data.Seat.South){
			return;
		}
		var cardTemple:data.CardConfigTemple = temple.TempleManager.select(msg.playCard) as data.CardConfigTemple;
		var item:any = {cardBg:1,icon:cardTemple.icon + "_png"}
		this.addCardItem(this.dachuObj[this.relativeSeat[msg.seat]],item);
		var seat:number = this.relativeSeat[msg.seat];
		var curGroup:eui.Group = this.seatObj[seat];
		curGroup.removeChildAt(curGroup.numChildren-1);
		if(seat === data.Seat.North){
			curGroup.x -= Config.w_tieldCard;
		}else{
			curGroup.y -= Config.w_tieldCard;
		}
		//此处响应玩家打牌 收到可操作牌组
		this.ifExitOper = this.judgeOper(msg.pongKongChow);
		if(msg.isWin){
			//胡牌
			alert("win");
		}
	}
	/**判断是否含有操作 */
	private judgeOper(oper:proto.IntList[]):boolean{
		//待确定修改
		var operGather:number[] = [];
		var curOper:number;
		this.curOperGroup = {};
		for(var i:number = 0;i<oper.length;i++){
			if(oper[i].list.length >= 4 && oper[i].list[0] != this.curCardLai && oper[i].list[0] != this.curCardPi){
				//杠
				curOper = data.Option.Kong;
			}else if(oper[i].list.length >=3 && oper[i].list[0] != this.curCardLai && oper[i].list[0] != this.curCardPi){
				//碰或吃
				if(oper[i].list[0] == oper[i].list[1]){
					//碰
					curOper = data.Option.Pong;
				}else{
					//吃
					curOper = data.Option.Chow;
				}
			}else{
				//痞子癞子
				for(var j:number = 0;j<oper[i].list.length;j++){
					var value:number = oper[i].list[j];
					if(value === this.curCardPi){
						curOper = data.Option.Pi;
					}else if(value === this.curCardLai){
						curOper = data.Option.Lai;
					}
				}
			}
			operGather.push(curOper);
			if(!this.curOperGroup[curOper]){
				this.curOperGroup[curOper] = [];
			}
			this.curOperGroup[curOper].push(oper[i]);
		}
		if(operGather.length){
			// operGather.push(data.Option.Pass);
			this.createOper(operGather);
			return true;
		}
		return false;
	}
	/**
	 * 打牌响应 等待其他玩家响应
	 */
	public notifyPlayResponse(msg:proto.s_NotifyPlayResponse):void{
		if(this.relativeSeat[msg.seat] === data.Seat.South){
			//如果收到的是当前打牌用户 返回
			return;
		}
		if(!msg.pongKongChow.length){
			//过
			this.applyFunc(GameConsts.PLAYCARDRESPONSE_C2S,{option:data.Option.Pass});
		}else{
			this.curFocusSeat = this.relativeSeat[msg.seat];
			//提示对应操作
			this.createOper([msg.option]);
		}

	}
	/**
	 * 切换用户
	 */
	public notifyChangeUser(seat:number):void{
		if(!this.initialized){
			this.timeCom.initialize();
			this.curFocusSeat = this.relativeSeat[seat];
			this.timeCom.setFocus(this.curFocusSeat,Config.waitTime,this.timeEnd,this);
		}
		
	}
	/**
	 * 响应别人打出牌吃碰杠等操作完成后
	 */
	public playCardResponse():void{
		this.leftOper.removeChildren();
		this.rightOper.removeChildren();
		this.ifExitOper = false;
		this.operShow(this.curFocusSeat);
	}
	/**
	 * 摸牌响应操作
	 */
	public drawCardResponseRes():void{
		this.leftOper.removeChildren();
		this.rightOper.removeChildren();
		this.ifExitOper = false;
		this.operShow(data.Seat.South);
	}
	/**
	 * 响应操作后 吃碰杠显示
	 */
	private operShow(seat:number):void{
		if(this.curOperGroup && this.curOutCardList.length){
			var curGroup:eui.Group = this["out_"+seat+"_group"];
			var handGroup:eui.Group = this.seatObj[seat];
			var group:eui.Group = new eui.Group();
			this.curOutCardList.forEach((cardNum:number,index:number)=>{
				var cardItem:CardItem = new CardItem();
				var cardTemple:data.CardConfigTemple = temple.TempleManager.select(cardNum) as data.CardConfigTemple;
				cardItem.icon = cardTemple.icon;
				cardItem.setOperLabel(cardTemple.id,this.curCardPi,this.curCardLai);
				group.addChild(cardItem);
				if(seat === data.Seat.South){
					cardItem.scaleX = cardItem.scaleY = 1.3;
				}
				cardItem.x = index*cardItem.width;
				if(seat === data.Seat.South){
					for(var i:number = this.cardSprite.numChildren-1;i>=0;i--){
						var item:HandCardItem = this.cardSprite.getChildAt(i) as HandCardItem;
						if(item.cardIdNum == cardNum){
							this.cardSprite.removeChild(item);
							break;
						}
					}
				}else{
					handGroup.removeChildAt(0);
				}
			},this);
			curGroup.addChild(group);
			group.x = curGroup.width;
			curGroup.width += group.width;
			if(seat === data.Seat.South){
				this.sortHandCards(this.cardSprite);
			}
			if(seat === data.Seat.South || seat === data.Seat.North){
				curGroup.x -= group.width;
				if(curGroup.x < handGroup.x + handGroup.width){
					handGroup.x -= Math.abs(handGroup.x + handGroup.width - curGroup.x);
				}
			}else{
				curGroup.y -= group.width;
				if(curGroup.y < handGroup.y + handGroup.height){
					handGroup.y -= Math.abs(handGroup.y + handGroup.height - curGroup.y)
				}
			}
		}
	}
	/**
	 * 重新排序手牌
	 */
	private sortHandCards(cardSprite:egret.Sprite):void{
		var arr:number[] = [];
		for(var i:number = 0;i<cardSprite.numChildren;i++){
			var card1:HandCardItem = cardSprite.getChildAt(i) as HandCardItem;
			arr.push(card1.cardIdNum);
		}
		var arr2:number[] = GlobalFunc.sortRule(GlobalFunc.NORMALIZE,"",arr);
		this.cardSprite.removeChildren();
		this.addCardGroup(arr2);
	}
	/**
	 * 离开房间
	 */
	public leaveSeat(seat:number):void{
		if(DataCenter.playerCount === 2){
			this.roleInfo_104.showLeave();
		}else{
			this["roleInfo_"+this.relativeSeat[seat]].showLeave();
		}
	}
	/**出牌成功 */
	public playCardSuccess():void{
		this.curOption = -1;
		this.outCard(data.Seat.South);
	}
	/**
	 * 当前局数结束
	 */
	public curGameEnd(msg:proto.s_NotifyEndHandCards):void{
		this.curGameState = 0;
	}
	/**举手成功 */
	public raiseHandSuccess():void{
		this.readyBtn.visible = false;
		this.bottomHand.visible = true;
	}
	/**
	 * 开始新的一局
	 */
	private startNewGame(num1:number,num2:number,seat:number):void{
		if(this.cardMap && this.cardMap.parent && this.cardMap.parent.contains(this.cardMap)){
			this.cardMap.parent.removeChild(this.cardMap);
		}
		this.curFocusSeat = seat;
		this.cardMap = new CardMap();
		this.curGameState = 1;
		this.addChild(this.cardMap);
		this.setChildIndex(this.cardMap,1);
		this.cardMap.width = Config.w_width;
		this.cardMap.height = Config.w_height;
		this.cardMap.x = this.cardMap.y = 0;
		this.cardMap.calculBlock(num1,num2,seat);
		CardTransFormUtil.startGetCard(seat,this.cardobj,this.cardSprite,(dataObj)=>{
			if(dataObj.final){
				//切牌发牌完毕
				this.initialized = false;
				this.cardSprite.removeChildren();
				var curCardNum:number;
				if(seat === data.Seat.South){
					curCardNum = this.curCardGather.pop();
				}
				var arr:number[] = GlobalFunc.sortRule(GlobalFunc.NORMALIZE,"",this.curCardGather);
				this.addCardGroup(arr);
				if(!isNaN(curCardNum)){
					var cardTemple:data.CardConfigTemple = temple.TempleManager.select(curCardNum) as data.CardConfigTemple;
					var card:HandCardItem = new HandCardItem(cardTemple);
					this.newCard = card;
					this.addCardGroup([curCardNum],true);
					this.curCardGather.push(curCardNum);
				}
				this.timeCom.initialize();
				this.timeCom.setFocus(this.curFocusSeat,Config.waitTime,this.timeEnd,this);
			}else{
				if(dataObj.handCard.length){
					//当前为自己的手牌显示
					this.addCardGroup(dataObj.handCard);
					if(dataObj.handCard.length >= 4){
						this.cardMap.removeBlock();
					}
					if(dataObj.handCard.length === 2){
						this.cardMap.removeJumpItem();
					}
					if(dataObj.handCard.length === 1){
						if(this.ownerSeat === this.dealer){
							this.cardMap.removeJumpItem();
						}else{
							this.cardMap.removeItem();
						}
					}
				}else{
					//当前为别的玩家手牌显示
					for(var i:number = 0;i<dataObj.num;i++){
						var img:eui.Image = new eui.Image();
						img.source = this.assetObj[dataObj.seat];
						this.seatObj[dataObj.seat].addChild(img);
						if(dataObj.seat === data.Seat.North){
							img.x = this.seatObj[dataObj.seat].numChildren * 39;
						}else{
							img.y = this.seatObj[dataObj.seat].numChildren * 26;
						}
					}
					if(dataObj.num === 4){
						//当前单次获得卡牌数为4张
						this.cardMap.removeBlock();
					}
					if(dataObj.num === 2){
						//跳牌
						this.cardMap.removeJumpItem();
					}
					if(dataObj.num === 1){
						this.cardMap.removeItem();
					}
				}
			}
		},this)
	}
	/**
	 * 当前出牌时间结束
	 */
	private timeEnd():void{
		// if(this.curFocusSeat === data.Seat.South){
		// 	var lastCard:HandCardItem = this.cardSprite.getChildAt(this.cardSprite.numChildren - 1) as HandCardItem;
		// 	this.newCard = this.curTarget = lastCard;
		// 	var card:number = CardTransFormUtil.trasnFormCardIdWay2(Number(this.curTarget.cardId));
		// 	this.applyFunc(GameConsts.PLAYCARD_C2S,card);
		// }
	}
	/**添加打出卡牌 */
	private addCardItem(collect:eui.ArrayCollection,item:any):void{
		collect.addItem(item);
	}
	/**移除打出卡牌 */
	private removeCardItem(collect:eui.ArrayCollection,item:any):void{
		collect.removeItemAt(collect.source[collect.source.length - 1]);
	}
	/**添加卡牌组 包含摸牌 */
	private addCardGroup(cardGroup:number[],ifAddCard:boolean = false):void{
		for(var i:number = 0,len = cardGroup.length;i<len;i++){
			// var cardTempleId:number = CardTransFormUtil.trasnFormCardIdWay2(cardGroup[i]);
			var cardTemple:data.CardConfigTemple = temple.TempleManager.select(cardGroup[i]) as data.CardConfigTemple;
			var card:HandCardItem = new HandCardItem(cardTemple);
			card.setOperLabel(cardGroup[i],this.curCardPi,this.curCardLai);
			if(!ifAddCard){
				card.x = (card.width*0.8)*this.cardSprite.numChildren;
			}else{
				card.x = this.cardSprite.numChildren * (card.width*0.8) + card.width*0.8;
				this.newCard = card;
			}
			this.cardSprite.addChild(card);
		}
	}
	/**卡牌单项点击 */
	private onCardItemTap(evt:egret.TouchEvent):void{
		this.curTarget = evt.target.parent as HandCardItem;
		if(this.prevTarget){
			if(this.curTarget === this.prevTarget){
				egret.Tween.get(this.curTarget).to({y:0},100).call(function(){
					egret.Tween.removeTweens(this.curTarget);
					this.prevTarget = null;
				},this);
			}else{
				egret.Tween.get(this.curTarget).to({y:this.curTarget.y-(this.curTarget.height>>2)},100).call(function(){
					egret.Tween.removeTweens(this.curTarget)
				},this);
				egret.Tween.get(this.prevTarget).to({y:0},100).call(function(){
					egret.Tween.removeTweens(this.prevTarget);
				},this);
			}
		}else{
			egret.Tween.get(this.curTarget).to({y:this.curTarget.y-(this.curTarget.height>>2)},100).call(function(){
				egret.Tween.removeTweens(this.curTarget)
			},this);
		}
		this.prevTarget = evt.target.parent as HandCardItem;
	}
	private onCardTouchBegin(evt:egret.TouchEvent):void{
		this.clickState = true;
		this.curStageY = evt.stageY;
		this.curTarget = evt.target.parent as HandCardItem;
	}
	private onCardTouchEnd(evt:egret.TouchEvent):void{
		if(this.clickState && this.curFocusSeat === data.Seat.South && this.skin.currentState === this.TYPE_GAME && !this.ifExitOper){
			this.clickState = false;
			var interVal:number = this.curStageY - evt.stageY;
			if(interVal > Config.h_handCard){
				//==此处需要与服务器进行交互===
				var card:number = CardTransFormUtil.trasnFormCardIdWay2(Number(this.curTarget.cardId))
				console.log("============当前打的牌是-----====》："+this.curTarget.cardId);
				this.applyFunc(GameConsts.PLAYCARD_C2S,card);
			}
		}
	}
	/**查询当前牌 */
	private searchHandCard(cardId:number):number{
		return this.curCardGather.indexOf(cardId);
	}
	/**出牌 */
	private outCard(seat:number,iconId?:string,ifGroup?:boolean):void{
		if(ifGroup){
			if(seat === data.Seat.South){

			}else{

			}
			return;
		}
		if(seat === data.Seat.South){
			var obj:any = {icon:this.curTarget.path_icon};
			//将打出的牌移除当前手牌
			this.curCardGather.splice(this.searchHandCard(parseInt(this.curTarget.cardId)),1);
			//打出牌添加数据源
			this.addCardItem(this.southCollect,obj);
			//移除手牌item
			var curX:number = this.curTarget.x;
			this.cardSprite.removeChild(this.curTarget);
			if(this.curTarget != this.newCard){
				this.setCardToPosition(curX);
			}
		}else{
			var mx:number = 0;
			var my:number = 0;
			var moveStepObj:any = {};
			if(seat === data.Seat.East || seat === data.Seat.West){
				my = 1;mx = 0;
			}else{
				mx = 1;my = 0;
			}
			//其他玩家打出手牌
			var index:number = (Math.random()*12+1)>>0;
			this.addCardItem(this.dachuObj[seat],{cardBg:1,icon:iconId + "_png"});
			var len:number = this.seatObj[seat].numChildren;
			var arr:any[] = [];
			for(var i:number = 0;i<len;i++){
				if(i>index){
					arr.push(this.seatObj[seat].getChildAt(i));
				}
			}
			this.seatObj[seat].removeChildAt(index);
			for(var j:number = 0;j<arr.length;j++){
				var item:eui.Image = arr[j];
				if(mx){
					moveStepObj = {x:item.x - item.width};
				}
				if(my){
					moveStepObj = {y:item.y - item.height};
				}
				egret.Tween.get(item).to(moveStepObj,this.moveStep).call(()=>{
					egret.Tween.removeTweens(item);
				},this)
			}
		}
		
	}
	private lastCard:boolean = false;
	private cardIndex:number = -1;
	/**设置牌位置 */
	private setCardToPosition(curX:number):void{
		this.lastCard = false;
		var len:number = this.cardSprite.numChildren-1;
		var setX:number = -1;
		var curMoveGather:HandCardItem[] = [];
		this.cardIndex = -1;
		for(var i:number = 0,item:HandCardItem;i<len;i++){
			item = this.cardSprite.getChildAt(i) as HandCardItem;
			var cardType:number = CardTransFormUtil.getCardType(item.cardId);
			var newCardType:number = CardTransFormUtil.getCardType(this.newCard.cardId);
			if(newCardType == cardType){
				//找到了同类型的卡牌
				var cardId:number = CardTransFormUtil.trasnFormCardIdWay2(Number(item.cardId));
				var newCardId:number = CardTransFormUtil.trasnFormCardIdWay2(Number(this.newCard.cardId));
				this.cardIndex = i;
				if(newCardId <= cardId){
					//新摸到的牌 在当前卡牌后面
					setX = item.x;
					if(setX > curX){
						setX = item.x - (item.width*0.8);
					}
					this.lastCard = false;
					break;
				}
				this.lastCard = true;
				this.cardIndex += 1;
				if(item.x < curX){
					setX = item.x + (item.width*0.8);
				}else{
					setX = item.x;
				}
			}else{
				continue;
			}
		}
		if(setX != -1){
			this.searchMoveCardGroup(curX,setX);
		}else{
			//未找到同类新卡牌
			// egret.Tween.get(this.newCard).to({x:this.newCard.x - (this.newCard.width*0.8)},this.moveStep).call(()=>{
			// 	egret.Tween.removeTweens(this.newCard);
			// 	var moveGather:HandCardItem[] = [];
			// 	for(var i:number = 0;i<this.cardSprite.numChildren;i++){
			// 		var item:HandCardItem = this.cardSprite.getChildAt(i) as HandCardItem;
			// 		if(item.x >= curX){
			// 			egret.Tween.get(item).to({x:(item.x - (item.width*0.8))},this.moveStep).call(()=>{
			// 				egret.Tween.removeTweens(item);
			// 			},this)
			// 		}
			// 	}
			// },this);
			this.cardIndex = this.cardSprite.numChildren - 1;
			//未找到同类新卡牌
			for(var i:number = 0;i<this.cardSprite.numChildren;i++){
				var item:HandCardItem = this.cardSprite.getChildAt(i) as HandCardItem;
				if(item.x >= curX){
					egret.Tween.get(item).to({x:(item.x - (item.width*0.8))},this.moveStep).call(()=>{
						egret.Tween.removeTweens(item);
					},this)
				}
			}
			egret.Tween.get(this.newCard).to({x:this.newCard.x - (this.newCard.width*0.8*2)},this.moveStep*2).call(()=>{
					egret.Tween.removeTweens(this.newCard);
			},this);
			
		}
	}
	/**查询移动卡牌组合 */
	private searchMoveCardGroup(curX:number,setX:number):void{
		var moveGather:HandCardItem[] = [];
		var diction:number = 0;
		if(Math.abs(setX - curX ) > 3){
			//当前新卡牌与打出卡牌不在同一个位置
			if(setX < curX){
				diction = 1;
				//当前设置位置在打出牌位置前面
				for(var i:number = 0;i<this.cardSprite.numChildren;i++){
					var item:HandCardItem = this.cardSprite.getChildAt(i) as HandCardItem;
					if(item.x >= setX-3 && item.x < curX + 3){
						moveGather.push(item);
					}
				}
			}else{
				diction = -1;
				for(var j:number = 0;j<this.cardSprite.numChildren;j++){
					var item:HandCardItem = this.cardSprite.getChildAt(j) as HandCardItem;
					if(item.x <= setX + 3 && item.x > curX - 3){
						moveGather.push(item);
					}
				}
			}
			egret.Tween.get(this.newCard).to({y: - (this.newCard.height*0.8) - 20},this.moveStep)
			.to({x:setX},((this.newCard.x - setX)/(this.newCard.width*0.8))*this.moveStep).call(()=>{
				for(var m:number = 0;m<moveGather.length;m++){
					var item:HandCardItem = moveGather[m];
					egret.Tween.get(item).to({x:(item.x+diction*item.width*0.8)},this.moveStep).call((data)=>{
						egret.Tween.removeTweens(item);
					},this,[{item:item,index:m}])
				}
			},this).to({y:0},this.moveStep).call(()=>{
				this.setCardLayerRelation();
				egret.Tween.removeTweens(this.newCard);
			},this);
			
		}else{
			egret.Tween.get(this.newCard).to({y: - (this.newCard.height*0.8) - 20},this.moveStep)
			.to({x:curX},((this.newCard.x - curX)/(this.newCard.width*0.8))*this.moveStep)
			.to({y:0},this.moveStep).call(()=>{
				this.setCardLayerRelation();
				egret.Tween.removeTweens(this.newCard);
			},this);
		}
	}
	/**设置层级 */
	private setCardLayerRelation():void{
		if(DataCenter.playerCount === 1){
			this.cardSprite.setChildIndex(this.cardSprite.getChildAt(this.cardSprite.numChildren-2),this.cardIndex);
		}else{
			this.cardSprite.setChildIndex(this.cardSprite.getChildAt(this.cardSprite.numChildren-1),this.cardIndex);
		}
	}
	/**生成对应操作 */
	private createOper(option:number[]):void{
		this.leftOper.removeChildren();
		this.rightOper.removeChildren();
		var passImg:eui.Image = new eui.Image();
		passImg.source = "room_oper_"+data.Option.Pass+"_png";
		this.rightOper.addChild(passImg);
		passImg.name = data.Option.Pass+"";
		passImg.width = 63,passImg.height = 78;
		passImg.x = this.rightOper.width - passImg.width;
		for(var i:number = 0,len:number = option.length;i<len;i++){
			var img:eui.Image = new eui.Image();
			img.source = "room_oper_"+option[i]+"_png";
			img.width = 63;
			img.height = 78;
			img.name = option[i]+"";
			if(option[i] === data.Option.Lai || option[i] === data.Option.Pi){
				this.leftOper.addChild(img);
				img.x = i*img.width+10;
			}else{
				this.rightOper.addChild(img);
				img.x = this.rightOper.width - this.rightOper.numChildren*(img.width+10);
			}
		}
	}
	/**显示提示操作牌选项信息-- */
	private promptOperGroup(optionCardList:proto.IntList[]):void{
		this.promptGroup.width = 0;
		for(var i:number = 0;i<optionCardList.length;i++){
			var itemList:number[] = optionCardList[i].list;
			var group:eui.Group = new eui.Group();
			for(var j:number = 0;j<itemList.length;j++){
				var cardItem:CardItem = new CardItem();
				var cardTemple:data.CardConfigTemple = temple.TempleManager.select(itemList[j]) as data.CardConfigTemple;
				cardItem.icon = cardTemple.icon;
				group.addChild(cardItem);
				cardItem.x = j*cardItem.width;
			}
			this.promptGroup.addChild(group);
			this.promptGroup.width += group.width + 10;
			group.x = (group.numChildren * Config.w_tieldCard) * i + 10;
		}
	}
	private readyState:boolean = false;
	//当前可操作的卡牌集合（如点击吃 -- 供选择的卡牌组）形式为{data.Option.Chi:proto.IntList[]}
	private curOperGroup:any = {};
	//当前出牌集合
	private curOutCardList:number[];
	private onTouchHandler(evt:egret.TouchEvent):void{
		if(evt.target.parent === this.leftOper || evt.target.parent ===this.rightOper){
			var name:string = evt.target.name;
			switch(parseInt(name)){
				case data.Option.Pass:
					//过
					this.applyFunc(GameConsts.DRAWCARDRESPONSE_C2S,{option:name});
					break;
				default:
					var cardList:proto.IntList[] = this.curOperGroup[name];
					if(cardList.length > 1){
						//供用户选择当前操作的出牌集合
						this.promptOperGroup(cardList);
					}else{
						if(parseInt(name) === data.Option.Pi || parseInt(name) === data.Option.Lai || parseInt(name) === data.Option.Kong){
							this.curOption = parseInt(name);
						}
						//当前操作的牌集合只有一张  直接打出
						this.curOutCardList = cardList[0].list;
						this.applyFunc(GameConsts.DRAWCARDRESPONSE_C2S,{option:name,cardList:cardList[0].list});
					}
			}
			return;
		}
		switch(evt.target){
			case this.buttonYaoQing:
				//邀请微信好友
				break;
			case this.readyBtn:
				if(this.readyState){
					return;
				}
				this.readyState = true;
				this.applyFunc(GameConsts.RAISEHANDS_C2S);
				break;
			case (evt.target.parent.parent == this.promptGroup):
				var list:CardItem[] = evt.target.parent;
				var cardArr:number[] = [];
				list.forEach((card:CardItem)=>{
					cardArr.push(card.iconTrans);
				},this)
				this.curOutCardList = this.curOutCardList.concat(cardArr);
				this.applyFunc(GameConsts.DRAWCARDRESPONSE_C2S,{option:name,cardList:cardArr});
				break;
		}
	}
}