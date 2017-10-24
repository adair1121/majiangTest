class CardMap extends eui.Component{
	public northGroup:eui.Group;
	public southGroup:eui.Group;
	public eastGroup:eui.Group;
	public westGroup:eui.Group;
	private seatObj:any = {};
	//当前从哪个方位拿牌
	private curSeat:number;
	//搬牌时留下的卡牌组
	private extraGroup:any[] = [];
	//当前拿牌组集合
	private curGroup:eui.Group;
	//移除牌顺序 顺时针
	private reCardDic:number[];
	private firstSeat:number;
	public constructor() {
		super();
		this.skinName = "CardMapSkin";
	}
	protected childrenCreated():void{
		this.seatObj[data.Seat.North] = this.northGroup;
		this.seatObj[data.Seat.East] = this.eastGroup;
		this.seatObj[data.Seat.South] = this.southGroup;
		this.seatObj[data.Seat.West] = this.westGroup;
	}
	public calculBlock(num1:number,num2:number,seat:number):void{
		var minNum:number;
		var maxNum:number;
		num1 >= num2?(minNum = num2,maxNum = num1):(minNum = num1,maxNum = num2);
		var totleNum:number = minNum + maxNum;
		var curPos:number;
		var loopDir:number[];
		// if(totleNum <= peopleNum){
		// 	curPos = totleNum;
		// }else{
			curPos = totleNum%DataCenter.playerCount;
			if(curPos === 0){
				curPos = 4;
			}
		// }
		loopDir = this.createDicArr(seat,false);
		this.reCardDic = this.createDicArr(loopDir[curPos-1],true);
		this.firstSeat = this.curSeat = this.reCardDic.shift();
		this.curGroup = this.seatObj[this.curSeat];
		for(var i:number = 0;i<minNum;i++){
			this.extraGroup.push(this.curGroup.getChildAt(this.curGroup.numChildren-1-i));
		}
	}
	public removeBlock():void{
		for(var i:number = 0;i<2;i++){
			if(this.curSeat === this.firstSeat){
				var index:number = this.curGroup.numChildren-this.extraGroup.length;
				if(index){
					this.clockWithRemove();
				}else{
					this.curSeat = this.reCardDic.shift();
					this.curGroup = this.seatObj[this.curSeat];
					this.clockWithRemove();
				}
			}else{
				if(this.curGroup.numChildren){
					this.clockWithRemove();
				}else{
					this.curSeat = this.reCardDic.shift();
					this.curGroup = this.seatObj[this.curSeat];
					this.clockWithRemove();
				}
			}
		}
	}
	/**处理跳牌操作 */
	public removeJumpItem():void{
		if(!this.curGroup.numChildren){
			this.curSeat = this.reCardDic.shift();
			this.curGroup = this.seatObj[this.curSeat];
			if(this.curSeat != data.Seat.West){
				var firstGroup:eui.Group = this.curGroup.getChildAt(0) as eui.Group;
				var thirdGroup:eui.Group = this.curGroup.getChildAt(2) as eui.Group;
			}else{
				var len1:number = this.curGroup.numChildren - 1;
				var len2:number = this.curGroup.numChildren - 3;
				var firstGroup:eui.Group = this.curGroup.getChildAt(len1) as eui.Group;
				var thirdGroup:eui.Group = this.curGroup.getChildAt(len2) as eui.Group;
			}
			firstGroup.removeChild(firstGroup.getChildAt(firstGroup.numChildren-1));
			thirdGroup.removeChild(thirdGroup.getChildAt(thirdGroup.numChildren - 1));
		}else{
			var firstGroup:eui.Group = this.curGroup.getChildAt(0) as eui.Group;
			var nextGroupSeat = this.reCardDic[0];
			var nextGroup:eui.Group = this.seatObj[nextGroupSeat];
			if(this.curGroup.numChildren<=1){
				if(nextGroupSeat != data.Seat.West){
					var thirdGroup:eui.Group = nextGroup.getChildAt(1) as eui.Group;
				}else{
					var thirdGroup:eui.Group = nextGroup.getChildAt(nextGroup.numChildren - 2) as eui.Group;
				}
			}else if(this.curGroup.numChildren <= 2){
				if(nextGroupSeat != data.Seat.West){
					var thirdGroup:eui.Group = nextGroup.getChildAt(0) as eui.Group;
				}else{
					var thirdGroup:eui.Group = nextGroup.getChildAt(nextGroup.numChildren - 1) as eui.Group;
				}
			}else{
				var thirdGroup:eui.Group = this.curGroup.getChildAt(2) as eui.Group;
			}
			firstGroup.removeChild(firstGroup.getChildAt(firstGroup.numChildren-1));
			thirdGroup.removeChild(thirdGroup.getChildAt(thirdGroup.numChildren - 1));
		}
	}
	/**平常出牌移除item */
	public removeItem(ifLast:boolean = false):void{
		if(ifLast){
			var basPos:number[] = [data.Seat.West,data.Seat.South,data.Seat.East,data.Seat.North];
			var index:number = basPos.indexOf(this.firstSeat);
			var arr1:number[] = basPos.splice(0,index);
			var arr2:number[] = basPos.splice(index);
			var positionGather:number[] = arr2.concat(arr1);
			var group:eui.Group;
			var seat:number;
			for(var i:number = 0;i<positionGather.length;i++){
				group = this.seatObj[positionGather[i]];
				seat = positionGather[i];
				if(group.numChildren){
					break;
				}
			}
			if(seat === data.Seat.West){
				var index:number = 0;
			}else{
				var index:number = group.numChildren - 1;
			}
			var curItemGroup:eui.Group = group.getChildAt(index) as eui.Group;
			curItemGroup.removeChild(curItemGroup.getChildAt(curItemGroup.numChildren - 1));
			if(!curItemGroup.numChildren){
				group.removeChild(curItemGroup);
			}
			return;
		}
		if(this.curGroup.numChildren){
			this.clockWithRemove(true)
		}else{
			if(this.reCardDic.length){
				this.curSeat = this.reCardDic.shift();
				this.curGroup = this.seatObj[this.curSeat];
				this.clockWithRemove(true)
			}else{
				alert("牌已经打完");
				return;
			}
		}
		
	}
	private clockWithRemove(removeItem:boolean = false):void{
		if(this.curSeat === this.firstSeat){
			if(this.curSeat === data.Seat.West){
				var index:number = this.curGroup.numChildren-1-this.extraGroup.length;
			}else{
				var index:number = this.extraGroup.length;
			}
		}else{
			if(this.curSeat === data.Seat.West){
				var index:number = this.curGroup.numChildren - 1;
			}else{
				var index:number = 0;
			}
		}
		if(!removeItem){
			this.curGroup.removeChild(this.curGroup.getChildAt(index));
		}else{
			var curItemGroup:eui.Group = this.curGroup.getChildAt(index) as eui.Group;
			curItemGroup.removeChild(curItemGroup.getChildAt(curItemGroup.numChildren - 1));
			if(!curItemGroup.numChildren){
				this.curGroup.removeChild(curItemGroup);
			}
		}
		
	}
	private createDicArr(campareValue:number,ifClockWise:boolean):number[]{
		var arr:number[] = [];
		// if(peopleNum === 2){
		// 	if(campareValue === data.Seat.North){
		// 		arr = [data.Seat.North,data.Seat.South];
		// 	}else{
		// 		arr = [data.Seat.South,data.Seat.North];
		// 	}
		// }else{
			switch(campareValue){
				case data.Seat.North:
					if(!ifClockWise){
						arr = [data.Seat.North,data.Seat.West,data.Seat.South,data.Seat.East];
					}else{
						arr = [data.Seat.North,data.Seat.East,data.Seat.South,data.Seat.West];
					}
					break;
				case data.Seat.East:
					if(!ifClockWise){
						arr = [data.Seat.East,data.Seat.North,data.Seat.West,data.Seat.South];
					}else{
						arr = [data.Seat.East,data.Seat.South,data.Seat.West,data.Seat.North];
					}
					break;
				case data.Seat.South:
					if(!ifClockWise){
						arr = [data.Seat.South,data.Seat.East,data.Seat.North,data.Seat.West];
					}else{
						arr = [data.Seat.South,data.Seat.West,data.Seat.North,data.Seat.East];
					}
					break;
				case data.Seat.West:
					if(!ifClockWise){
						arr = [data.Seat.West,data.Seat.South,data.Seat.East,data.Seat.North];
					}else{
						arr = [data.Seat.West,data.Seat.North,data.Seat.East,data.Seat.South];
					}
					break;
			}
		// }
		return arr;
	}
}