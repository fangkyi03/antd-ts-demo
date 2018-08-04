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
      return retData
    },
    onGLNetError: ({ retData }) => {
      console.log('object',retData)
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
