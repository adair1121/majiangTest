var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var App = (function () {
    function App() {
    }
    Object.defineProperty(App, "ControllerManager", {
        /**
         * 模块管理类
         * @type {ControllerManager}
         */
        get: function () {
            return ControllerManager.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "ViewManager", {
        /**
         * View管理类
         * @type {ViewManager}
         */
        get: function () {
            return ViewManager.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "StageUtils", {
        /**
         * Stage操作相关工具类
         */
        get: function () {
            return StageUtils.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "SceneManager", {
        /**
         * 场景管理类
         * @type {SceneManager}
         */
        get: function () {
            return SceneManager.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "ResourceUtils", {
        /**
        * 资源加载工具类
        */
        get: function () {
            return ResourceUtils.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "DisplayUtils", {
        /**
        * 显示对象工具类
        * @type {DisplayUtils}
        */
        get: function () {
            return DisplayUtils.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "MessageCenter", {
        /**
         * 服务器返回的消息处理中心
         * @type {MessageCenter}
         */
        get: function () {
            return MessageCenter.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 初始化函数
     * @constructor
     */
    App.Init = function () {
        //全局配置数据
        // App.GlobalData = RES.getRes("global");
    };
    return App;
}());
/**
 * 请求服务器使用的用户标识
 * @type {string}
 */
App.ProxyUserFlag = "";
/**
 * 全局配置数据
 * @type {null}
 */
App.GlobalData = null;
/**
 * ProtoFile
 * @type {null}
 */
App.ProtoFile = null;
/**
 * ProtoConfig
 * @type {null}
 */
App.ProtoConfig = null;
__reflect(App.prototype, "App");
//# sourceMappingURL=App.js.map