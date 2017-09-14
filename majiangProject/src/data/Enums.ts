module data{
	export enum Seat{
		None=0,
		/**
		* 东家101
		**/
		East=101,
		/**
		* 南家102
		**/
		South=102,
		/**
		* 西家103
		**/
		West=103,
		/**
		* 北家104
		**/
		North=104,
	}

	export enum Option{
		/**
		* 过
		**/
		Pass=0,
		/**
		* 吃
		**/
		Chow=1,
		/**
		* 碰
		**/
		Pong=2,
		/**
		* 杠
		**/
		Kong=3,
		/**
		* 胡
		**/
		Win=4,
	}

	export enum TableState{
		/**
		* 准备
		**/
		Ready=0,
		/**
		* 开始
		**/
		Start=1,
		/**
		* 等待摸牌
		**/
		WaitDraw=2,
		/**
		* 等待打牌
		**/
		WaitPlay=3,
		/**
		* 等待用户操作
		**/
		WaitUser=4,
		/**
		* 结束
		**/
		End=5,
	}

	export enum PlayerAttr{
		/**
		* 房卡数量
		**/
		CardCount=0,
	}


}
