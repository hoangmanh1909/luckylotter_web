import React from "react";
import { List, InputItem, Text, ActivityIndicator, Toast } from "antd-mobile";
import styles2 from "../Main.less";
import { stringToNumberFormat } from "../../utils/Helper";

const Item = List.Item;

class PaymentLuckylotter extends React.Component {
  state = {
    mobileNumber: localStorage.getItem("mobileNumber"),
    balance: 0,
    amount: 0
  };

  componentWillMount() {
    if (this.props.location.payload != undefined) {
      this.setState({ balanceObj: this.props.location.payload });
    }
  }

  onChangeAmout = value => {
    this.setState({ amount: value });
  };

  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps);

    if (nextProps.response !== undefined && nextProps.response.data !== undefined) {
      if (nextProps.response.data.Code === "00") {
        this.setState({
          code: nextProps.response.data.Code,
        });
        Toast.info("Thanh toán thành công", 2);
        window.location.assign('');
      }
      else {
        Toast.info(nextProps.response.data.Message, 2);
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

  onOk = () => {
    this.setState({ animating: true })
    let data = {};
    data.MerchantID = 8;
    data.TransAmount = parseInt(this.state.amount);
    data.TransType = 2;
    data.WithdrawalType = 3;
    data.MobileNumber = this.state.mobileNumber;
    data.Fee = 0;
    this.props.onOK(data);
  }

  render() {
    return (
      <div>
        <div className={styles2.header}>
          <Item
            style={{ paddingTop: 10, paddingBottom: 10, background: "#BA2027" }}
          >
            <div style={{ fontSize: "20px", color: "white", textAlign: "center" }}>THANH TOÁN HOA HỒNG</div>
          </Item>
        </div>
        <div style={{ background: "#FFFFFF", paddingBottom: 15, fontSize: "12pt" }} className={styles2.content}>
          <div className="am-list-item am-input-item am-list-item-middle">
            <div className="am-list-line">
              <div
                style={{ width: 130, fontSize: "12pt" }}
                className="am-input-label am-input-label-5"
              >
                <div>HOA HỒNG</div>
              </div>
              <div className="am-input-control">
                <Text
                  style={{
                    float: "right",
                    color: "rgb(255, 0, 0)",
                    fontSize: "12pt",
                    fontWeight: "bold",
                    fontFamily: "sans-serif"
                  }}
                >
                  {stringToNumberFormat(
                    this.state.BalanceCommission != null
                      ? this.state.BalanceCommission
                      : 0
                  ) + " đ"}
                </Text>
              </div>
            </div>
          </div>
          <div className="am-list-item am-input-item am-list-item-middle">
            <div className="am-list-line">
              <div
                style={{ width: 130, fontSize: "12pt" }}
                className="am-input-label am-input-label-5"
              >
                <div>Số tiền thanh toán</div>
              </div>
              <div className="am-input-control">
                <InputItem
                  value={stringToNumberFormat(
                    this.state.amount != null
                      ? this.state.amount
                      : 0
                  )}
                  style={{
                    textAlign: "right",
                    fontWeight: "bold",
                    fontSize: "12pt",
                    color: "rgb(255, 0, 0)"
                  }}
                  type="number"
                  clear
                  onChange={this.onChangeAmout}
                >
                </InputItem>
              </div>
            </div>
          </div>
          <div
            onClick={() => this.onOk()}
            className={styles2.primary_btn}
            style={{ margin: 15, height: 40 }}
          >
            Tiếp tục
        </div>
        {/* <div
            onClick={() => this.props.onMain()}
            className={styles2.primary_btn}
            style={{ margin: 15, height: 40 }}
          >
            Trang chủ
        </div> */}
        </div>
      </div>
    );
  }
}

export default PaymentLuckylotter;
