class ViewGame extends BaseEuiView{
	public northList:eui.List;
	public southList:eui.List;
	public eastList:eui.List;
	public westList:eui.List;
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
	private basicCardSprite:egret.Sprite;
	//初始化拿牌  一组多少个
	private cardGroupNum:number = 4;
	//初始化每个人间隔拿牌时间 毫秒单位
	private getCardGroupTime:number = 1000;
	/**移动步长 */
	private moveStep:number = 100;
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
		this.basicCardSprite = new egret.Sprite();
		this.addChild(this.basicCardSprite);
		this.basicCardSprite.touchEnabled = false;
		this.cardSprite = new egret.Sprite();
		this.addChild(this.cardSprite);
		this.basicCardSprite.x = this.cardSprite.x = Config.w_handCard;
		this.basicCardSprite.y = this.cardSprite.y = Config.w_height - Config.h_handCard;
		this.northList.itemRenderer = CardItem;
		this.northList.dataProvider = this.northCollect;
		this.southList.itemRenderer = CardItem;
		this.southList.dataProvider = this.southCollect;
		this.westList.itemRenderer = CardItem;
		this.westList.dataProvider = this.westCollect;
		this.eastList.itemRenderer = CardItem;
		this.eastList.dataProvider = this.eastCollect;
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
		this.hideHandCard();
		this.cardSprite.removeChildren();
	}
	/**初始化底牌 */
	private initBasicCard(num:number):void{
		for(var i:number = 0;i<num;i++){
			var card:CardReverse = new CardReverse();
			this.basicCardSprite.addChild(card);
			card.x = card.width*i;
		}
	}
	/**
	 * 面板开启执行函数
	 */
	public open(param:any[]):void{
		var obj:number[] = [0x24,0x11,0x23,0x12,0x18,0x22,0x19,0x21,0x17];
		var arr:number[] = GlobalFunc.sortRule(GlobalFunc.NORMALIZE,"",obj)
		this.addCardGroup(arr);
		for(var i:number = 0;i<3;i++){
			this.initBasicCard(4);
		}
		this.showHandCard();
		this.overTurnThis(this.cardSprite,this.basicCardSprite,1);
	}
	/**翻牌效果 */
	private overTurnThis(front,back,scale) {
        front.scaleX = 0;
        back.scaleX = scale;
        egret.Tween.get(back).to({ scaleX: 0 }, 300, egret.Ease.circOut).call(() => {
			egret.Tween.get(front).to({ scaleX: scale }, 300, egret.Ease.circIn).call(()=>{
				this.addCardGroup([0x21],true);
			},this);
        },this);
    }
	/**
	 * 面板关闭执行函数
	 */
	public close(param:any[]):void{

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
			var cardTempleId:number = CardTransFormUtil.trasnFormCardIdWay2(cardGroup[i]);
			var cardTemple:data.CardConfigTemple = temple.TempleManager.select(cardTempleId) as data.CardConfigTemple;
			var card:HandCardItem = new HandCardItem(cardTemple.icon);
			if(!ifAddCard){
				card.x = card.width*i;
			}else{
				card.x = this.cardSprite.numChildren * card.width + card.width;
				this.newCard = card;
			}
			this.cardSprite.addChild(card);
		}
	}
	private showHandCard():void{
		this.cardSprite.visible = true;
	}
	private hideHandCard():void{
		this.cardSprite.visible = false;
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
		if(this.clickState){
			this.clickState = false;
			var interVal:number = this.curStageY - evt.stageY;
			if(interVal > Config.h_handCard){
				//==此处需要与服务器进行交互===
				//假设出牌成功
				this.outCard();
			}
		}
	}
	/**出牌 */
	private outCard():void{
		var obj:any = {icon:this.curTarget.path_icon};
		//打出牌添加数据源
		this.addCardItem(this.southCollect,obj);
		//移除手牌item
		var curX:number = this.curTarget.x;
		this.cardSprite.removeChild(this.curTarget);
		if(this.curTarget != this.newCard){
			this.setCardToPosition(curX);
		}
	}
	private setCardToPosition(curX:number):void{
		var len:number = this.cardSprite.numChildren-1;
		var setX:number = -1;
		var curMoveGather:HandCardItem[] = [];
		for(var i:number = 0,item:HandCardItem;i<len;i++){
			item = this.cardSprite.getChildAt(i) as HandCardItem;
			var cardType:number = CardTransFormUtil.getCardType(Number(item.cardId));
			var newCardType:number = CardTransFormUtil.getCardType(Number(this.newCard.cardId));
			if(newCardType === cardType){
				//找到了同类型的卡牌
				var cardId:number = CardTransFormUtil.trasnFormCardIdWay2(Number(item.cardId));
				var newCardId:number = CardTransFormUtil.trasnFormCardIdWay2(Number(this.newCard.cardId));
				if(newCardId <= cardId){
					//新摸到的牌 在当前卡牌后面
					setX = item.x;
					break;
				}
			}else{
				continue;
			}
		}
		if(setX != -1){
			this.searchMoveCardGroup(curX,setX);
		}else{
			//未找到同类新卡牌
			egret.Tween.get(this.newCard).to({x:this.newCard.x - this.newCard.width},this.moveStep).call(()=>{
				egret.Tween.removeTweens(this.newCard);
			},this)
		}
	}
	private searchMoveCardGroup(curX:number,setX:number):void{
		var moveGather:HandCardItem[] = [];
		var diction:number = 0;
		if(setX != curX && Math.abs(curX - setX) != Config.w_handCard){
			//当前新卡牌与打出卡牌不在同一个位置
			if(setX < curX){
				diction = 1;
				//当前设置位置在打出牌位置前面
				for(var i:number = 0;i<this.cardSprite.numChildren;i++){
					var item:HandCardItem = this.cardSprite.getChildAt(i) as HandCardItem;
					if(item.x >= setX && item.x < curX){
						moveGather.push(item);
					}
				}
			}else{
				diction = -1;
				for(var j:number = 0;j<this.cardSprite.numChildren;j++){
					var item:HandCardItem = this.cardSprite.getChildAt(j) as HandCardItem;
					if(item.x <= setX && item.x > curX){
						moveGather.push(item);
					}
				}
			}
			egret.Tween.get(this.newCard).to({y: - this.newCard.height - 20},this.moveStep)
			.to({x:setX},((this.newCard.x - setX)/this.newCard.width)*this.moveStep).call(()=>{
				for(var m:number = 0;m<moveGather.length;m++){
					var item:HandCardItem = moveGather[m];
					egret.Tween.get(item).to({x:(item.x+diction*item.width)},this.moveStep).call(()=>{
						egret.Tween.removeTweens(item);
					},this)
				}
			},this).to({y:0},this.moveStep).call(()=>{
				egret.Tween.removeTweens(this.newCard);
			},this);
			
		}else{
			egret.Tween.get(this.newCard).to({y: - this.newCard.height - 20},this.moveStep)
			.to({x:curX},((this.newCard.x - curX)/this.newCard.width)*this.moveStep)
			.to({y:0},this.moveStep).call(()=>{
				egret.Tween.removeTweens(this.newCard);
			},this);
		}
	}
	private onTouchHandler(evt:egret.TouchEvent):void{
		
	}
}