module proto {
	export class Processor extends MessageHandle {
		public constructor() {
			super();
		}
		public handle(p: Pro) {
			if (this.commands[p.S]) {
				this.commands[p.S](p);
			}
		}
		public do_close() {
			console.log("与服务器断开连接");
			Config.connectState = false;
		}
		public do_connect() {
			console.log("连接服务器成功");
			Config.connectState = true;
			// var msg_login:proto.c_Login=new proto.c_Login();
			// msg_login.name=Config.username;
			// msg_login.pass=Config.password;
			// msg_login.isReLogin=false; 
			// SocketManager.getInstance().sendProto(msg_login);

		}
		public do_s_LoginAccount(mess:Pro):void{
			App.MessageCenter.dispatch(LoginConsts.LOGIN_S2C,mess);
		}
		// public do_s_mess(mess:Pro):void {}
		// public do_s_move(mess:Pro):void {}
		// public do_s_Mapload(mess:Pro):void {}
		// public do_s_Mapshow(mess:Pro):void {}
		// public do_s_setpos(mess:Pro):void {}
		// public do_s_Map_UnitAdd(mess:Pro):void {}
		// public do_s_Map_UnitRemove(mess:Pro):void {}
		// public do_s_MapUnitInfo(mess:Pro):void {}
		// public do_s_MapUnit_Model(mess:Pro):void {}
		// public do_s_MapUnit_title(mess:Pro):void {}
		// public do_s_MapUnit_state(mess:Pro):void {}
		// public do_s_TweenTo(mess:Pro):void {}
		// public do_s_addFire(mess:Pro):void {}
		// public do_s_removeFire(mess:Pro):void {}
		// public do_s_MapUnit_PkState(mess:Pro):void {}
		// public do_s_skill_add(mess:Pro):void {}
		// public do_s_skilluse(mess:Pro):void {}
		// public do_s_Damage(mess:Pro):void {}
		// public do_s_skill_setAttr(mess:Pro):void {}
		// public do_s_CD_add(mess:Pro):void {}
		// public do_s_CD_remove(mess:Pro):void {}
		// public do_s_item_add(mess:Pro):void {}
		// public do_s_item_remove(mess:Pro):void {}
		// public do_s_item_setplace(mess:Pro):void {}
		// public do_s_ItemInfo(mess:Pro):void {}
		// public do_s_item_setAttr(mess:Pro):void {}
		// public do_s_item_update(mess:Pro):void {}
		// public do_s_Prefix(mess:Pro):void {}
		// public do_s_item_sort(mess:Pro):void {}
		// public do_s_item_upgrade(mess:Pro):void {}
		// public do_s_item_Confirm(mess:Pro):void {}
		// public do_s_xilian(mess:Pro):void {}
		// public do_s_item_zhufu(mess:Pro):void {}
		// public do_s_GuildInfo(mess:Pro):void {}
		// public do_s_Guild_addMember(mess:Pro):void {}
		// public do_s_Guild_removeMember(mess:Pro):void {}
		// public do_s_GuildList(mess:Pro):void {}
		// public do_s_Guild_ApplyList(mess:Pro):void {}
		// public do_s_GuildInvite(mess:Pro):void {}
		// public do_s_GuildCreate(mess:Pro):void {}
		// public do_s_GuildMemberList(mess:Pro):void {}
		// public do_s_Guild_leave(mess:Pro):void {}
		// public do_s_Guild_Events(mess:Pro):void {}
		// public do_s_Guild_Member_update(mess:Pro):void {}
		// public do_s_Guild_NameOk(mess:Pro):void {}
		// public do_s_Guild_benifits(mess:Pro):void {}
		// public do_s_Guild_Apply(mess:Pro):void {}
		// public do_s_GuildInfo_update(mess:Pro):void {}
		// public do_s_GroupInfo(mess:Pro):void {}
		// public do_s_Group_addMember(mess:Pro):void {}
		// public do_s_Group_removeMember(mess:Pro):void {}
		// public do_s_Group_Disband(mess:Pro):void {}
		// public do_s_GroupUpdateLeader(mess:Pro):void {}
		// public do_s_groupInvite(mess:Pro):void {}
		// public do_s_group_leave(mess:Pro):void {}
		// public do_s_Task_triger(mess:Pro):void {}
		// public do_s_TaskInfo(mess:Pro):void {}
		// public do_s_TaskActive(mess:Pro):void {}
		// public do_s_TaskInActive(mess:Pro):void {}
		// public do_s_TaskRemove(mess:Pro):void {}
		// public do_s_Task_dayInfo(mess:Pro):void {}
		
		// public do_s_CharInfo(mess:Pro):void {}
		// public do_s_Player_EndInit(mess:Pro):void {}
		// public do_s_CharInfoList(mess:Pro):void {}
		// public do_s_UIshow(mess:Pro):void {}
		// public do_s_UIhide(mess:Pro):void {}
		// public do_s_TimerAdd(mess:Pro):void {}
		// public do_s_TimerRemove(mess:Pro):void {}
		// public do_s_setAttr(mess:Pro):void {}
		// public do_s_setAttrs(mess:Pro):void {}
		// public do_s_Buff_add(mess:Pro):void {}
		// public do_s_Buff_remove(mess:Pro):void {}
		// public do_s_Buff_clear(mess:Pro):void {}
		// public do_s_mix(mess:Pro):void {}
		// public do_s_market_up(mess:Pro):void {}
		// public do_s_market_down(mess:Pro):void {}
		// public do_s_market_buy(mess:Pro):void {}
		// public do_s_market_list(mess:Pro):void {}
		// public do_s_market_item(mess:Pro):void {}
		// public do_s_Vip_leftime(mess:Pro):void {}
		// public do_s_Vip_price(mess:Pro):void {}
		// public do_s_broadcast(mess:Pro):void {}
		// public do_s_executeScript(mess:Pro):void {}
		// public do_s_mapTimer(mess:Pro):void {}
		// public do_s_map_turn(mess:Pro):void {}
		// public do_s_map_entertimes(mess:Pro):void {}
		// public do_s_map_pop(mess:Pro):void {}
		// public do_s_map_lasttime(mess:Pro):void {}
		// public do_s_map_lastmonster(mess:Pro):void {}
		// public do_s_map_lastturn(mess:Pro):void {}
		// public do_s_AddFriend(mess:Pro):void {}
		// public do_s_reborn(mess:Pro):void {}
		// public do_s_EXPRate_add(mess:Pro):void {}
		// public do_s_heart(mess:Pro):void {}
		// public do_s_boss_state(mess:Pro):void {}
		// public do_s_bonus_state(mess:Pro):void {}
		// public do_s_bonus_lixian(mess:Pro):void {}
		// public do_s_LiveNess(mess:Pro):void {}
		// public do_s_team_info(mess:Pro):void {}
		// public do_s_team_list(mess:Pro):void {}
		// public do_s_team_disband(mess:Pro):void {}
		// public do_s_team_leave(mess:Pro):void {}
		// public do_s_team_invite(mess:Pro):void {}
		// public do_s_look_infos(mess:Pro):void {}
		// public do_s_RandShop_updateMoney(mess:Pro):void {}
		// public do_s_RandShop(mess:Pro):void {}
		// public do_s_RandShopList(mess:Pro):void {}
		// public do_s_TurnList(mess:Pro):void {}
		// public do_s_turn_result(mess:Pro):void {}
		// public do_s_turn_over(mess:Pro):void {}
		// public do_s_turn_notice(mess:Pro):void {}
		// public do_s_SBK_aff(mess:Pro):void {}
		// public do_s_SBK_btnstatus(mess:Pro):void {}
		// public do_s_ph_Rank(mess:Pro):void {}
		// public do_s_huodong_status(mess:Pro):void {}
	}
}