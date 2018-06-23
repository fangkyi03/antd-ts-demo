import "./header.less";
import React, { Component } from "react";
import { Menu, Dropdown, Icon, Avatar } from "antd";

import { connect } from "dvajs";

import { routerRedux } from "dvajs/router";

class Head extends Component {
  constructor(prop) {
    super(prop);
    this.state = {};
    this.menu = (
      <Menu>
        <Menu.Item>
          <a onClick={this.loginOut}>退出登录</a>
        </Menu.Item>
      </Menu>
    );
  }

  loginOut = () => {
    // this.props.history.push("/login");
    this.props.dispatch(routerRedux.push("/login"));
  };

  render() {
    return (
      <div className={"headerView"}>
        <div className={"headerIcon"}>
          <Icon type="search" />
        </div>
        <div className={"headerIcon"}>
          <Icon type="bell" />
        </div>
        <div className={"headerIcon"}>
          <Dropdown overlay={this.menu}>
            <Avatar size="small" src="https://0x9.me/eqUbA" />
          </Dropdown>
        </div>
      </div>
    );
  }
}

export default connect()(Head);
