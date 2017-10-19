class App {
    /**
     * 请求服务器使用的用户标识
     * @type {string}
     */
    public static ProxyUserFlag:string = "";
    /**
     * 全局配置数据
     * @type {null}
     */
    public static GlobalData:any = null;
    /**
     * ProtoFile
     * @type {null}
     */
    public static ProtoFile:any = null;
    /**
     * ProtoConfig
     * @type {null}
     */
    public static ProtoConfig:any = null;
    /**
     * 模块管理类
     * @type {ControllerManager}
     */
    public static get ControllerManager():ControllerManager {
        return ControllerManager.getInstance();
    }

    /**
     * View管理类
     * @type {ViewManager}
     */
    public static get ViewManager():ViewManager {
        return ViewManager.getInstance();
    }
	/**
     * Stage操作相关工具类
     */
    public static get StageUtils():StageUtils {
        return StageUtils.getInstance();
    }
    /**
     * 场景管理类
     * @type {SceneManager}
     */
    public static get SceneManager():SceneManager {
        return SceneManager.getInstance();
    }
     /**
     * 资源加载工具类
     */
    public static get ResourceUtils():ResourceUtils {
        return ResourceUtils.getInstance();
    }
     /**
     * 显示对象工具类
     * @type {DisplayUtils}
     */
    public static get DisplayUtils():DisplayUtils {
        return DisplayUtils.getInstance();
    }
    /**
     * 服务器返回的消息处理中心
     * @type {MessageCenter}
     */
    public static get MessageCenter():MessageCenter {
        return MessageCenter.getInstance();
    }
    /**
     * 初始化函数
     * @constructor
     */
    public static Init():void {
        //全局配置数据
        // App.GlobalData = RES.getRes("global");
    }
}
