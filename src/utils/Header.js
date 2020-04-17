import React, { Component } from "react";
import { routerRedux } from "dva/router";
import mainCss from "./../components/Main.less";

class Header extends React.Component {
  render() {
    return (
      <div className={mainCss.header_v1}>
        <div
          className={mainCss.header_left}
          onClick={() => this.props.history.replace({ pathname: "/" })}
        >
          <img
            src={require("./../assets/logo.png")}
            style={{ width: 180, height: 50, marginLeft: 15 }}
          ></img>
        </div>
        <div className={mainCss.header_right_v1}>{this.props.title}</div>
      </div>
    );
  }
}

export default Header;


