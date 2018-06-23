import React from "react";
import BaseLayout from "./layout/BaseLayout";
import zhCN from "antd/lib/locale-provider/zh_CN";
import { LocaleProvider } from "antd";
import moment from "moment";
import "moment/locale/zh-cn";
import { Router, Switch, Route, Redirect } from "react-router-dom";

import { routerRedux } from "dvajs/router";
const { ConnectedRouter } = routerRedux;

moment.locale("zh-cn");

export default function({ history, app }) {
  return (
    <LocaleProvider locale={zhCN}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <BaseLayout app={app} />
        </Switch>
      </ConnectedRouter>
    </LocaleProvider>
  );
}
