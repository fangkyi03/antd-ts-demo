import dynamic from "dvajs/dynamic";
import { Route } from "react-router-dom";
import React from "react";
import { AllModel } from "../models";

// 转换model函数m
const tranModel = (model = []) => {
  return model.map(e => {
    return new Promise((resolve, reject) => {
      resolve({
        namespace: e,
        state: {
          isShow: true
        },
        reducers: {},
        effect: {},
        subscriptions: {}
      });
    });
  });
};

export const routes = [
  {
    name: "首页",
    path: "/home",
    component: () => import("../routes/Home/index.tsx"),
    models: [AllModel.Home]
  }
];

export const getRouterData = app => {
  return routes.map(({ path, models, component }, index) => {
    return (
      <Route
        exact={true}
        path={path}
        key={index}
        component={dynamic({
          app,
          component,
          models: () => tranModel(models)
        })}
      />
    );
  });
};
