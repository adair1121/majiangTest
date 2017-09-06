var data;
(function (data) {
    var Seat;
    (function (Seat) {
        Seat[Seat["None"] = 0] = "None";
        /**
        * 东家101
        **/
        Seat[Seat["East"] = 101] = "East";
        /**
        * 南家102
        **/
        Seat[Seat["South"] = 102] = "South";
        /**
        * 西家103
        **/
        Seat[Seat["West"] = 103] = "West";
        /**
        * 北家104
        **/
        Seat[Seat["North"] = 104] = "North";
    })(Seat = data.Seat || (data.Seat = {}));
    var Option;
    (function (Option) {
        /**
        * 过
        **/
        Option[Option["Pass"] = 0] = "Pass";
        /**
        * 吃
        **/
        Option[Option["Chow"] = 1] = "Chow";
        /**
        * 碰
        **/
        Option[Option["Pong"] = 2] = "Pong";
        /**
        * 杠
        **/
        Option[Option["Kong"] = 3] = "Kong";
        /**
        * 胡
        **/
        Option[Option["Win"] = 4] = "Win";
    })(Option = data.Option || (data.Option = {}));
    var TableState;
    (function (TableState) {
        /**
        * 准备
        **/
        TableState[TableState["Ready"] = 0] = "Ready";
        /**
        * 开始
        **/
        TableState[TableState["Start"] = 1] = "Start";
        /**
        * 等待摸牌
        **/
        TableState[TableState["WaitDraw"] = 2] = "WaitDraw";
        /**
        * 等待打牌
        **/
        TableState[TableState["WaitPlay"] = 3] = "WaitPlay";
        /**
        * 等待用户操作
        **/
        TableState[TableState["WaitUser"] = 4] = "WaitUser";
        /**
        * 结束
        **/
        TableState[TableState["End"] = 5] = "End";
    })(TableState = data.TableState || (data.TableState = {}));
})(data || (data = {}));
//# sourceMappingURL=Enums.js.map