import React from "react";
import { List, Modal, Text, WhiteSpace, Flex, Toast } from "antd-mobile";
import styles2 from "../Main.less";
import { stringToNumberFormat } from "../../utils/Helper";

const Item = List.Item;
const prompt = Modal.prompt;

class ChangePayment extends React.Component {
  state = {
    mobileNumber: localStorage.getItem("mobileNumber"),
    balanceObj: {},
  };

  componentWillMount() {
    if (this.props.location.payload != undefined) {
      this.setState({ balanceObj: this.props.location.payload });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.response !== undefined && nextProps.response.data !== undefined) {
      if (nextProps.response.data.Code === "00") {
        const value = nextProps.response.data.Value;
        this.setState({
          Commission: value.Commission,
        });
      }
    }
    if (nextProps.balance !== undefined && nextProps.balance.data !== undefined) {
      if (nextProps.balance.data.Code === "00") {
        const value = nextProps.balance.data.Value;
        console.log('nextProps.balance.data.Value',nextProps.balance.data.Value);
        this.setState({
          BalanceWin: value.BalanceWin,
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
        <div className={styles2.header}>
          <Item
            style={{ paddingTop: 10, paddingBottom: 10, background: "#BA2027" }}
          >
            <div style={{ fontSize: "20px", color: "white", textAlign: "center" }}>ĐỔI THƯỞNG</div>
          </Item>
        </div>

        <div
          style={{
            background: "#FFFFFF",
            display: "flex",
            marginTop: 10,
            fontSize: "17px"
          }}
        >

          <div style={{ marginLeft: 25, alignSelf: "center" }}>
            <div style={{ fontSize: "20px", marginTop: 10, marginBottom: 10, color: "#ba1f25" }}>
              TK Đổi thưởng: {stringToNumberFormat(
              this.state.BalanceWin != null
                ? this.state.BalanceWin
                : 0
            ) + " đ"}
            </div>
          </div>
          {/* <div style={{
            fontSize: "14px", marginTop: 10, marginBottom: 10, borderRadius: 4, color: "white", backgroundColor: "#ba1f25", textAlign: "center", height: 25, display: "flex", alignItems: "center", justifyContent: "center",
            width: 90, marginLeft: "auto", marginRight: 10
          }}
            onClick={() => {
              this.props.onHistoryCommission();
            }}>
            Lịch sử
            </div> */}
        </div>

        <div style={{ margin: 10 }}>

          <List>
            <Item
              onClick={() => {
                this.props.onChangeLuckylotter();
              }}
              style={{ height: 80 }}
              arrow="horizontal"
            >
              <img
                src={require("../../assets/logo_lucky_lotter.png")}
                alt=""
                style={{ width: 50, height: 50, paddingRight: 40 }}
              />
              <Text style={{ color: "#253854" }}>Đổi thưởng vào tài khoản Lucky Lotter </Text>
            </Item>
          </List>

          <List>
            <Item
              onClick={() => {
                this.props.onChangeMerchant();
              }}
              style={{ height: 80 }}
              arrow="horizontal"
            >
              <img
                src={require("../../assets/icon_doithuongvi.png")}
                alt=""
                style={{ width: 50, height: 50, paddingRight: 40 }}
              />
              <Text style={{ color: "#253854" }}>Đổi thưởng vào tài khoản Ví điện tử </Text>
            </Item>
          </List>

          <List>
            <Item
              onClick={() => {
                this.props.onChangeBank();
              }}
              style={{ height: 80 }}
              arrow="horizontal"
            >
              <img
                src={require("../../assets/bank_add.PNG")}
                alt=""
                style={{ width: 50, height: 50, paddingRight: 40 }}
              />
              <Text style={{ color: "#253854" }}>Đổi thưởng vào tài khoản Ngân hàng</Text>
            </Item>
          </List>

        </div>
      </div>
    );
  }
}

export default ChangePayment;
