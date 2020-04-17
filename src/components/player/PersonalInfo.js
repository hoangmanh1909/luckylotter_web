import React from "react";
import { List, WingBlank, Text, WhiteSpace, Flex, Toast } from "antd-mobile";
import { stringToNumberFormat } from "../../utils/Helper";

const Item = List.Item;

class PersonalInfo extends React.Component {
  state = {
    mobileNumber: localStorage.getItem("mobileNumber"),
    balance: 0,
    code: ""
  };
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (
      nextProps.balance !== undefined &&
      nextProps.balance.data !== undefined
    ) {
      if (nextProps.balance.data.Code === "00") {
        this.setState({
          balance: nextProps.balance.data.Value
        });
      }
    }
    if (nextProps.info !== undefined && nextProps.info.data !== undefined) {
      if (nextProps.info.data.Code === "00") {
        this.setState({
          code: nextProps.info.data.Value.Code
        });
      }
    }
    if (nextProps.err !== undefined) {
      Toast.info("Lỗi kết nối hệ thống", 5);
    }
  }
  render() {
    return (
      <div>
        <List>
          <Item
            style={{ paddingTop: 15, paddingBottom: 15}}
            arrow="horizontal"
            onClick={() => {
              this.props.onUpdateInfo();
            }}
          >
            <img
              src={require("../../assets/icon/icon-09.png")}
              alt=""
              style={{ width: 35, height: 30, paddingRight: 10 }}
            />
            <Text
              style={{
                fontWeight: "bold",
                color: "#253854",
                verticalAlign:"middle"
              }}
            >
              {this.state.mobileNumber}
            </Text>
          </Item>
        </List>
        <WhiteSpace />
        <List>
          <Item
            arrow="horizontal"
            onClick={() => {
              this.props.onGetCommission();
            }}
            style={{ height: 50 }}
          >
            <Flex>
              <Flex.Item>
                <img
                  src={require("../../assets/icon/icon-11.png")}
                  alt=""
                  style={{ width: 35, height: 30, paddingRight: 20 }}
                />
                <Text
                  style={{color: "#253854" }}
                >
                  Hoa hồng
                </Text>
              </Flex.Item>
              <Flex.Item style={{ textAlign: "right" }}>
                <Text style={{color: "#e32e35",fontWeight:"bold" }}>
                  {stringToNumberFormat(this.state.balance)} đ
                </Text>
              </Flex.Item>
            </Flex>
          </Item>
        </List>
        <WhiteSpace />
        <List>
          <Item
            onClick={() => {
              this.props.onCommissionManage();
            }}
            style={{ height: 50 }}
          >
            <img
              src={require("../../assets/icon/icon-12.png")}
              alt=""
              style={{ width: 35, height: 30, paddingRight: 20 }}
            />
            <Text style={{color: "#253854" }}>
              Quản lý doanh thu
            </Text>
          </Item>
        </List>
        <WhiteSpace />
        <List>
          <Item onClick={() => {}} style={{ height: 150 }}>
            <Flex>
              <Flex.Item>
                <p
                  style={{color: "#253854" }}
                >
                  Mã giới thiệu
                </p>
                <p style={{ color: "#5c5d5f",  }}>
                  Mã của bạn: {this.state.code}
                </p>
              </Flex.Item>
              <Flex.Item>
                <img
                  src={require("../../assets/icon/icon-13.png")}
                  alt=""
                  style={{ width: 120, height: 100,float:"right" }}
                />
              </Flex.Item>
            </Flex>
          </Item>
        </List>
      </div>
    );
  }
}

export default PersonalInfo;
