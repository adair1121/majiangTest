var GlobalFunc;
(function (GlobalFunc) {
    /**排序方式--从小到大 */
    GlobalFunc.NORMALIZE = "normalize";
    /**排序方式--从大道小 */
    GlobalFunc.REVERSE = "reverse";
    /**深复制 */
    function deepCopy(source) {
        var arr = [];
        for (var i = 0; i < source.length; i++) {
            var result = {};
            for (var key in source[i]) {
                result[key] = source[i][key];
            }
            arr.push(result);
        }
        return arr;
    }
    GlobalFunc.deepCopy = deepCopy;
    /**深复制字典 */
    function deepCopyDict(source) {
        var dic = new Dictionary();
        for (var key in source.dict) {
            var arr = GlobalFunc.deepCopy(source.dict[key]);
            dic.add(key, arr);
        }
        return dic;
    }
    GlobalFunc.deepCopyDict = deepCopyDict;
    //验证内容是否包含空格
    function checkTextSpace(content, temp) {
        if (temp === void 0) { temp = 1; }
        var reg = /(^\s+)|(\s+$)/g;
        //temp用来标识内容是否允许存在空格1为可存在0为不存在
        // if(temp==1){
        reg = /\s+/g;
        // }
        var content2 = content.replace(reg, "");
        if (!content2) {
            return false;
        }
        return true;
    }
    GlobalFunc.checkTextSpace = checkTextSpace;
    /**排序规则 */
    function sortRule(type, comparingValues, sourceCollection) {
        var relationNum = 1;
        if (type === GlobalFunc.NORMALIZE) {
            relationNum = 1;
        }
        else {
            relationNum = -1;
        }
        function compareFunc(item1, item2) {
            var a, b;
            if (comparingValues != "") {
                a = item1[comparingValues];
                b = item2[comparingValues];
            }
            else {
                a = item1;
                b = item2;
            }
            if (a > b) {
                return relationNum;
            }
            else if (a < b) {
                return -relationNum;
            }
            else {
                return 0;
            }
        }
        return sourceCollection.sort(compareFunc);
    }
    GlobalFunc.sortRule = sortRule;
    /**根据对象键值排序 */
    function sortByKey(source) {
        var objKeys = Object.keys(source);
        return source;
    }
    GlobalFunc.sortByKey = sortByKey;
    /**时间格式化 */
    function formatTime(timespan, ufc, extra) {
        if (ufc === void 0) { ufc = true; }
        if (extra === void 0) { extra = false; }
        var data = new Date((timespan > 0 ? timespan : -timespan) * 1000);
        var year = data.getFullYear();
        var day = data.getDate();
        var hour = data.getHours();
        var month = data.getMonth() + 1;
        var day = data.getDate();
        var minutes = data.getMinutes();
        var seconds = data.getSeconds();
        var str2 = "";
        var str = "";
        if (ufc) {
            str2 = year + "-" + (month < 10 ? "0" + month : month) + "-" + (day < 10 ? "0" + day : day) + "\t";
            str = (hour < 10 ? "0" + hour : hour) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
            return str2 + str;
        }
        else {
            if (extra) {
                hour = Math.floor(timespan / 3600);
                minutes = Math.floor(timespan % 3600 / 60);
                seconds = Math.floor(timespan % 3600 % 60);
                str = (hour < 10 ? "0" + hour : hour) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
            }
            else {
                day = Math.floor(timespan / 24 / 60 / 60);
                hour = Math.floor(timespan % (24 * 60 * 60) / 3600);
                minutes = Math.floor(timespan % (24 * 60 * 60) % 3600 / 60);
                str = day + "天" + hour + "时" + minutes + "分";
            }
            return str;
        }
    }
    GlobalFunc.formatTime = formatTime;
    function guid() {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }
    GlobalFunc.guid = guid;
})(GlobalFunc || (GlobalFunc = {}));
//# sourceMappingURL=GlobalFunc.js.map