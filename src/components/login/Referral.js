import React from "react";
import { List, Modal, Text, WhiteSpace, Flex, Toast } from "antd-mobile";
import styles2 from "../Main.less";
import { stringToNumberFormat } from "../../utils/Helper";

const Item = List.Item;
const prompt = Modal.prompt;

class Referral extends React.Component {
  state = {
    mobileNumber: localStorage.getItem("mobileNumber"),
    balanceObj: {},
    response: {},
    Comisssion: 0,
    OrderAmount: 0,
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
          OrderAmount: value.OrderAmount,
          NumberReferral: value.PlayReferral,
        });
      }
    }
    if (nextProps.balance !== undefined && nextProps.balance.data !== undefined) {
      if (nextProps.balance.data.Code === "00") {
        const value = nextProps.balance.data.Value;
        this.setState({
          BalanceCommission: value.BalanceReferral,
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
            <div style={{ fontSize: "20px", color: "white", textAlign: "center" }}>GIỚI THIỆU BẠN BÈ</div>
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
            <div style={{ fontWeight: "bold" }}>Giới thiệu bạn bè</div>
            <div style={{ fontSize: "14px", marginTop: 10, color: "#757575" }}>
              Số điện thoại giới thiệu: {this.state.mobileNumber}
            </div>
            <div style={{ fontSize: "20px", marginTop: 10, color: "#ba1f25" }}>
              TK Hoa Hồng: {stringToNumberFormat(
              this.state.BalanceCommission != null
                ? this.state.BalanceCommission
                : 0
            ) + " đ"}
            </div>
            <div style={{ fontSize: "14px", borderRadius: 4, marginTop: 5, color: "white", backgroundColor: "#ba1f25", textAlign: "center", height: 25, display: "flex", alignItems: "center", justifyContent: "center" }}
              onClick={() => {
                this.props.onComissionPayment();
              }}>
              Thanh toán hoa hồng
            </div>
          </div>
          <img
            src={require("../../assets/gioithieu.png")}
            alt=""
            style={{
              width: 115,
              height: 115,
              paddingRight: 10,
              marginLeft: "auto"
            }}
          />
        </div>

        <div style={{ margin: 10 }}>
          <List>
            <Item
              onClick={() => {
                this.props.onNumberReferral();
              }}
              style={{ height: 50 }}
              arrow="horizontal"
            >
              <Text style={{ color: "#253854", display:"flex", justifyContent: "space-between" }}>Số người nhập mã <span style={{ color: "#ba1f25" }}>{this.state.NumberReferral != null ? this.state.NumberReferral : 0 }</span> </Text>
            </Item>
          </List>

          <List>
            <Item
              onClick={() => {
                this.props.onOrderReferral();
              }}
              style={{ height: 50 }}
              arrow="horizontal"
            >
              <Text style={{ color: "#253854", display:"flex", justifyContent: "space-between" }}>Số tiền người giới thiệu mua vé: <span style={{ color: "#ba1f25" }}>{stringToNumberFormat(
                this.state.OrderAmount != null
                  ? this.state.OrderAmount
                  : 0
              ) + " đ"}</span> </Text>
            </Item>
          </List>

          <List>
            <Item
              onClick={() => {
                this.props.onCommissionDetail();
              }}
              style={{ height: 50 }}
              arrow="horizontal"
            >
              <Text style={{ color: "#253854", display:"flex", justifyContent: "space-between" }}>Hoa hồng đã giới thiệu <span style={{ color: "#ba1f25" }}>{stringToNumberFormat(
                this.state.Commission != null
                  ? this.state.Commission
                  : 0
              ) + " đ"}</span>  </Text>
            </Item>
          </List>

        </div>
      </div>
    );
  }
}

export default Referral;
