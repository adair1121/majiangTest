# majiangTest

> 相关协议的初步调试信息
##当前完成协议的初步测试
* 1.登录协议初步调试        s_LoginAccount
* 2.创建房间初步调试        s_CreateRoom
* 3.玩家加入房间初步调试    s_EnterRoom
* 4.玩家举手的初步调试      s_RaiseHands
* 5.玩家初始化手牌调试      s_NotifyHandCards
* 6.其他玩家进入房间初步调试 s_NotifyEnterTable
* 7.玩家出牌初步测试        s_playCard
* 8.通知打牌信息初步测试    s_NotifyPlayCard

> ##待测试协议
>
* 1.通知发牌信息    s_NotifyDealCard
* 2.通知打牌响应    s_NotifyPlayResponse
* 3.通知用户切换    s_NotifyChangeOpUser
* 4.通知摸牌响应    s_DrawCardResponse
* 5.通知打牌响应    s_PlayCardResponse

> ##待修改问题
>
* 1.关于创建房间用户 首先准备后 为接受到处理摸牌信息协议操作
* 2.痞子癞子显示不准确问题（有癞子或者痞子但是在操作组中没有数据》 没有显示过癞子 》 手牌没有 但是操作组中含有 ）
* 3.用户切换问题 另一个用户未收到切换用户信息；
* 4.关于proto.IntList的问题 多个操作集合如何判定问题 
* 5.有操作时 选择过 通知等待状态
* 6.--------------待修改进行-----------------
