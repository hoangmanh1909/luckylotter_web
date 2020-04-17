import React from "react";
import { List, Modal, Text, WhiteSpace, Flex, Toast } from "antd-mobile";
import styles2 from "../Main.less";
import { stringToNumberFormat } from "../../utils/Helper";

const Item = List.Item;
const prompt = Modal.prompt;

class PersonalInfo extends React.Component {
  state = {
    mobileNumber: localStorage.getItem("mobileNumber"),
    balanceObj: {},
    userInfo: {}
  };

  componentWillMount() {
    if (this.props.location.payload != undefined) {
      this.setState({ balanceObj: this.props.location.payload });
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.info !== undefined && nextProps.info.data !== undefined) {
      if (nextProps.info.data.Code === "00") {
        this.setState({
          userInfo: nextProps.info.data.Value
        });
      }
    }
    if (nextProps.balance !== undefined && nextProps.balance.data !== undefined) {
      if (nextProps.balance.data.Code === "00") {
        const value = nextProps.balance.data.Value;
        this.setState({
          Balance: value.Balance,
          BalanceWin: value.BalanceWin,
        });
      }
    }
    if (
      nextProps.response !== undefined &&
      nextProps.response.data !== undefined
    ) {
      if (nextProps.response.data.Code === "00") {
        // alert("Cập nhật người giới thiệu thành công");
        Toast.success("Cập nhật người giới thiệu thành công", 3, null, false);
        window.location.reload('');
      } else {
        Toast.fail(nextProps.response.data.Message,3,null,false);
      }
    }
    if (nextProps.err !== undefined) {
      Toast.info("Lỗi kết nối hệ thống", 5);
    }
  }

  onAddReferral = mobileNumber => {
    let data = {};
    data.MobileNumber = this.state.mobileNumber;
    data.MobileNumberReferral = mobileNumber;
    data.MerchantID = 8;

    this.props.onAddReferral(JSON.stringify(data));
  };

  render() {
    return (
      <div>
        <div className={styles2.header}>
          <Item
            style={{ paddingTop: 10, paddingBottom: 10, background: "#BA2027" }}
          >
            <div className={styles2.header_personal_info}>
              <img
                src={require("../../assets/icon_user_main.png")}
                alt=""
                style={{ width: 40, height: 35, paddingRight: 10 }}
              />
              <div>
                {this.state.mobileNumber}
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    style={{
                      width: 14,
                      height: 15
                    }}
                    src={require("../../assets/icon_wallet.png")}
                    alt=""
                  />
                  <div
                    style={{
                      alignSelf: "center",
                      marginLeft: 10
                    }}
                  >
                    {stringToNumberFormat(
                      this.state.Balance != null
                        ? this.state.Balance
                        : 0
                    ) + " đ"}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    style={{
                      width: 14,
                      height: 15
                    }}
                    src={require("../../assets/icon_win.png")}
                    alt=""
                  />
                  <div
                    style={{
                      alignSelf: "center",
                      marginLeft: 10
                    }}
                  >
                    {stringToNumberFormat(
                      this.state.BalanceWin != null
                        ? this.state.BalanceWin
                        : 0
                    ) + " đ"}
                  </div>
                </div>
              </div>
            </div>
          </Item>
        </div>

        <div
          style={{
            background: "#FFFFFF",
            display: "flex",
            marginTop: 10,
            fontSize: "17px"
          }}           onClick={() => {
            this.props.onReferral();
          }}
        >
          
          <div style={{ marginLeft: 25, alignSelf: "center" }}>
            <div style={{ fontWeight: "bold" }}>Giới thiệu bạn bè</div>
            <div style={{ fontSize: "14px", marginTop: 10, color: "#757575" }}>
              Số điện thoại giới thiệu: {this.state.mobileNumber}
            </div>
          </div>
          <img
            src={require("../../assets/gioithieu.png")}
            alt=""
            style={{
              width: 85,
              height: 85,
              paddingRight: 10,
              marginLeft: "auto"
            }}
          />
        </div>

        {this.state.userInfo.ParentMobile == "" ? (
          <div style={{ margin: 10 }}>
            <List>
              <Item
                onClick={() =>
                  prompt("Số điện thoại người giới thiệu", "", [
                    { text: "Đóng" },
                    {
                      text: "Xác nhận",
                      onPress: mobileNumber => this.onAddReferral(mobileNumber)
                    }
                  ])
                }
                style={{ height: 50 }}
              >
                <img
                  src={require("../../assets/icon_share.png")}
                  alt=""
                  style={{ width: 26, height: 26, paddingRight: 20 }}
                />
                <Text style={{ color: "#253854" }}>
                  Nhập số điện thoại giới thiệu
                </Text>
              </Item>
            </List>
          </div>
        ) : (
          <div></div>
        )}

        <div style={{ margin: 10 }}>
          <List>
            <Item
              onClick={() => {
                this.props.onUpdateInfo();
              }}
              style={{ height: 50 }}
              arrow="horizontal"
            >
              <img
                src={require("../../assets/information.png")}
                alt=""
                style={{ width: 26, height: 26, paddingRight: 20 }}
              />
              <Text style={{ color: "#253854" }}>Thông tin cá nhân</Text>
            </Item>
          </List>

          <List>
            <Item
              onClick={() => {
                this.props.onUpdatePassword();
              }}
              style={{ height: 50 }}
              arrow="horizontal"
            >
              <img
                src={require("../../assets/edit_pass.png")}
                alt=""
                style={{ width: 26, height: 26, paddingRight: 20 }}
              />
              <Text style={{ color: "#253854" }}>Đổi mật khẩu</Text>
            </Item>
          </List>

          <List>
            <Item
              onClick={() => {
                this.props.onAddMoney();
              }}
              style={{ height: 50 }}
              arrow="horizontal"
            >
              <img
                src={require("../../assets/nap_rut_tien.png")}
                alt=""
                style={{ width: 26, height: 26, paddingRight: 20 }}
              />
              <Text style={{ color: "#253854" }}>Nạp tiền</Text>
            </Item>
          </List>

          <List>
            <Item
              onClick={() => {
                this.props.onAddTransPlayerWin();
              }}
              style={{ height: 50 }}
              arrow="horizontal"
            >
              <img
                src={require("../../assets/cup_do.png")}
                alt=""
                style={{ width: 26, height: 26, paddingRight: 20 }}
              />
              <Text style={{ color: "#253854" }}>Đổi thưởng</Text>
            </Item>
          </List>

          <List>
            <Item
              onClick={() => {
                localStorage.removeItem("mobileNumber");
                localStorage.removeItem("isAuthenticated");
                localStorage.removeItem("token");
                this.props.onLogout();
              }}
              style={{ height: 50 }}
            >
              <img
                src={require("../../assets/logout.png")}
                alt=""
                style={{ width: 25, height: 25, paddingRight: 20 }}
              />
              <Text style={{ color: "#253854" }}>Đăng xuất</Text>
            </Item>
          </List>
        </div>
      </div>
    );
  }
}

export default PersonalInfo;
