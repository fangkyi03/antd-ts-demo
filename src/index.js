import "./index.less";
import dva from "dvajs";
import router from "./router";
import * as NetTool from "./common/netTool";
import * as converData from "./common/converData";

import fetch from "./models/fetch";
import { message } from "antd";

// import {createBrowserHistory} from 'history'

message.config({
  maxCount: 1
});
/*console.log = () => ({});
console.warn = () => ({});
console.error = () => ({});*/
// dva配置
const app = dva({
  // history: createBrowserHistory()
});

let isAuth = false;
app.model(
  fetch({
    converData: converData,
    netTool: NetTool,
    onGLNetStart: ({ retData }) => {
      if ((retData.code === 200 && retData.data) || retData.status === 0) {
        if (!isAuth) {
          isAuth = true;
          app._store.dispatch({
            type: "app/setValue",
            payload: {
              isAttestation: true
            }
          });
        }
        return retData;
      }
    },
    onGLNetError: ({ retData }) => {
      console.log("网络接口出错", retData);
      if (retData.code === 3002) {
        app._history.push({
          pathname: "/login"
        });
        message.error(retData.msg);
      } else if (retData.code !== 200 && retData.msg !== "") {
        message.error(retData.msg);
      }
      if (retData.code === 401) {
        if (isAuth) {
          isAuth = false;
          app._store.dispatch({
            type: "app/setValue",
            payload: {
              isAttestation: false
            }
          });
          app._history.push({
            pathname: "/login"
          });
        }
      }
    },
    onGLNetCatch: ({ error }) => {
      return null;
    },
    extendAttr: {
      message
    }
  })
);

// 载入路由设置
app.router(router);

// 初始化启动
app.start("#root");
