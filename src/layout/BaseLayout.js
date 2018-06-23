import React, { Component } from "react";
import "./BaseLayout.less";
import { Layout, Breadcrumb } from "antd";
import SilderMenu from "../components/SilderMenu";
import { getRouterData, routes } from "../common/router.js";
import Head from "../components/header/header";
import { withRouter } from "react-router-dom";
import { menusList } from "../common/menu";

const { Header, Content } = Layout;

class BaseLayout extends Component {
  /**
   * 筛选菜单
   *
   * @memberof BaseLayout
   */
  filterMenu = (textArray = [], sub = [], pathArr = []) => {
    const select = sub.find(e => e.link === pathArr[0]);
    if (select) {
      textArray.push(select.title);
      if (select.sub) {
        return this.filterMenu(textArray, select.sub, pathArr.slice(1));
      } else {
        return textArray;
      }
    }
  };

  /**
   * 渲染面包屑
   *
   * @memberof BaseLayout
   */
  renderBreadcrumb = () => {
    const { pathname } = this.props.history.location;
    const textArr = this.filterMenu(
      [],
      menusList,
      pathname.split("/").slice(1)
    );
    return textArr.map(e => {
      return <span>{`/${e}`}</span>;
    });
  };

  render() {
    const routerData = getRouterData(this.props.app);
    return (
      <Layout style={{ height: "100%" }}>
        <SilderMenu />
        <Layout style={{ overflow: "hidden" }}>
          <Header style={{ background: "white" }}>
            <Head />
          </Header>
          <Content
            style={{ display: "flex", flex: 1, flexDirection: "column" }}
          >
            <div
              style={{
                background: "white",
                borderTopColor: "#e5e5e5",
                borderTopWidth: 1,
                borderTopStyle: "solid",
                height: 40,
                paddingLeft: 10,
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              {this.renderBreadcrumb()}
            </div>
            <div style={{ display: "flex", flex: 1, height: "100%" }}>
              {routerData}
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(BaseLayout);
