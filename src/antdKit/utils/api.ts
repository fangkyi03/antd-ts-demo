interface fetchInfo {
  /**
   * url请求网址
   *
   * @type {string}
   * @memberof fetchInfo
   */
  url: string;
  /**
   * 请求完数据以后需要刷新的对应model
   *
   * @type {string}
   * @memberof fetchInfo
   */
  target: string;
  /**
   * 如果网络请求出错返回的数据
   *
   * @memberof fetchInfo
   */
  onError?: () => void | any;
  /**
   * 网络请求成功时回调
   *
   * @memberof fetchInfo
   */
  onCallBack?:()=>void;
  /**
   * 网络请求以后数据转换
   *
   * @memberof fetchInfo
   */
  tranData?:({retData}:any)=>void;
}

interface dispatchInfo {
  type: string;
  payload?: any | fetchInfo;
}

interface storeInfo {
  dispatch(info: dispatchInfo): void;
}

interface appInfo {
  _store: storeInfo;
}

interface apiInfo {
  /**
   * 清空对应model中的数据
   *
   * @type {(modelName:string)}
   * @memberof apiInfo
   */
  clear(modelName: string): void;
  /**
   * 发送网络请求
   *
   * @param {string} modelName
   * @memberof apiInfo
   */
  send(fetchInfo: fetchInfo[]): void;
}

let app: appInfo;

export const getApp = (appData: any) => {
  app = appData;
};

export default new class Api implements apiInfo {
  clear = (modelName: string) => {
    app._store.dispatch({ type: `${modelName}/clear` });
  };

  send = (params: fetchInfo[] ) => {
    app._store.dispatch({
      type: "fetch/send",
      payload: params
    });
  };
}();
