import React, { Component } from "react";
import { Layout, /*Button,*/ Icon /*,Menu*/ } from "antd";
import { withRouter /*,Link*/ } from "react-router-dom";
import SiderMenu from "./renderMenu";
import { menusList, formatter } from "../../common/menu";
import "./index.less";
import { connect } from "dvajs";
import PropTypes from "prop-types";
const { Sider } = Layout;

class SiderCustom extends Component {
  constructor(props, context) {
    let key1 = "";
    let key2 = "";
    const { pathname } = props.location;
    let pathArr = pathname.split("/");
    pathArr.splice(0, 1);
    if (pathArr.length > 3) {
      key1 = pathname.substr(0, pathname.lastIndexOf("/"));
      key2 = key1.substr(0, key1.lastIndexOf("/"));
    }
    if (!key1) {
      key1 = "/app/systemset";
      key2 = "/app/systemset/appcontroller";
    }
    super(props, context);
    this.state = {
      collapsed: false,
      firstHide: false,
      openKeys: ["/companyinfo"],
      //openKey: [key1, key2],
      selectedKey: pathname
    };
  }

  componentWillMount() {
    const { history } = this.context.router;
    this.unlisten = history.listen(e => {
      const path = e.pathname.split("/").slice(1);
      const parent = path[0];
      const pathname = path.slice(0, 2) || path.slice(0, 1);
      this.setState({
        openKeys: [`/${parent}`],
        selectedKeys: [pathname.reduce((a, b) => "/" + a + "/" + b)]
      });
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
      firstHide: !this.state.firstHide
    });
  };

  /**
   * 渲染菜单头部数据
   *
   * @memberof SiderCustom
   */
  renderMenuHeader = () => {
    return (
      <div>
        <div className="aside-btn">
          <a onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
            <Icon type={this.state.collapsed ? "menu-unfold" : "menu-fold"} />
          </a>
        </div>
        <div className="logo">
          <img
            src="http://cxhke.test.upcdn.net/YYpicture/logo.png"
            alt="农业主体"
          />
        </div>
      </div>
    );
  };

  onOpenChange = e => {
    this.setState({ openKeys: e });
  };
  
  menuClick = e => {
    this.setState({
      selectedKey: e.key
    });
  };

  render() {
    const { isAttestation } = this.props;
    return (
      <Sider
        collapsible
        className={"aside-box"}
        trigger={null}
        collapsed={this.state.collapsed}
      >
        {this.renderMenuHeader()}

        <SiderMenu
          onSelect={this.menuClick}
          onOpenChange={this.onOpenChange}
          openKeys={this.state.openKeys}
          selectedKeys={this.state.selectedKeys}
          menus={formatter(menusList)} //
          theme="dark"
          mode="inline"
        />
      </Sider>
    );
  }
}

SiderCustom.contextTypes = {
  router: PropTypes.object
};
export default withRouter(connect(({ app }) => ({ ...app }))(SiderCustom));
