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
