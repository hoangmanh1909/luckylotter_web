import React from "react";
import { List, InputItem, Text, ActivityIndicator, Toast } from "antd-mobile";
import styles2 from "../Main.less";
import { stringToNumberFormat } from "../../utils/Helper";

const Item = List.Item;

class ChangeMerchantDetail extends React.Component {
  state = {
    mobileNumber: localStorage.getItem("mobileNumber"),
    balance: 0,
    amount: 0,
    listmerchant: 0,
  };

  componentWillMount() {
    if (this.props.location.payload != undefined) {
      this.setState({ listmerchant: this.props.location.payload });
    }
  }

  onChangeAmout = value => {
    this.setState({ amount: value });
  };

  onChangeName = value => {
    this.setState({ name: value });
  };

  onChangeAccountNumber = value => {
    this.setState({ accountnumber: value });
  };

  onChangeBank = value => {
    this.setState({ bank: value });
  };

  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps);

    if (nextProps.response !== undefined && nextProps.response.data !== undefined) {
      if (nextProps.response.data.Code === "00") {
        this.setState({
          code: nextProps.response.data.Code,
        });
        Toast.info("Chuyển thưởng thành công", 2);
      }
      else {
        Toast.info(nextProps.response.data.Message);
      }
    }
    if (nextProps.balance !== undefined && nextProps.balance.data !== undefined) {
      if (nextProps.balance.data.Code === "00") {
        const value = nextProps.balance.data.Value;
        this.setState({
          BalanceWin: value.BalanceWin,
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
    data.MerchantID = this.state.listmerchant;
    data.TransAmount = parseInt(this.state.amount);
    data.TransType = 2;
    data.ChangeType = 1;
    data.BankID = 0;
    data.MobileNumber = this.state.mobileNumber;
    data.AccountNumber = this.state.accountnumber;
    data.FullName = this.state.name;
    data.Fee = parseInt(this.state.amount) * 2 / 100;
    console.log('data', data);
    this.props.onOK(data);
  }

  renderbank = () => {
    if (this.state.listmerchant == 1) {
      return (
        <div className="am-list-item am-input-item am-list-item-middle">
          <div className="am-list-line">
            <div
              style={{ width: 150, fontSize: "12pt" }}
              className="am-input-label am-input-label-5"
            >
              <div>Tài khoản ví</div>
            </div>
            <div className="am-input-control">
              <InputItem
                disabled={true}
                value="VIETTELPAY"
                style={{
                  textAlign: "right",
                  fontWeight: "bold",
                  fontSize: "12pt",
                  color: "rgb(255, 0, 0)"
                }}
                type="number"
                clear
                onChange={this.onChangeBank}
              >
              </InputItem>
            </div>
          </div>
        </div>
      );
    }
    else if (this.state.listmerchant == 2) {
      return (
        <div className="am-list-item am-input-item am-list-item-middle">
          <div className="am-list-line">
            <div
              style={{ width: 150, fontSize: "12pt" }}
              className="am-input-label am-input-label-5"
            >
              <div>Tài khoản ví</div>
            </div>
            <div className="am-input-control">
              <InputItem
                disabled={true}
                value="APAY"
                style={{
                  textAlign: "right",
                  fontWeight: "bold",
                  fontSize: "12pt",
                  color: "rgb(255, 0, 0)"
                }}
                type="number"
                clear
                onChange={this.onChangeBank}
              >
              </InputItem>
            </div>
          </div>
        </div>
      );
    }
    else if (this.state.listmerchant == 4) {
      return (
        <div className="am-list-item am-input-item am-list-item-middle">
          <div className="am-list-line">
            <div
              style={{ width: 150, fontSize: "12pt" }}
              className="am-input-label am-input-label-5"
            >
              <div>Tài khoản ví</div>
            </div>
            <div className="am-input-control">
              <InputItem
                disabled={true}
                value="ZALOPAY"
                style={{
                  textAlign: "right",
                  fontWeight: "bold",
                  fontSize: "12pt",
                  color: "rgb(255, 0, 0)"
                }}
                type="number"
                clear
                onChange={this.onChangeBank}
              >
              </InputItem>
            </div>
          </div>
        </div>
      );
    }
    else if (this.state.listmerchant == 5) {
      return (
        <div className="am-list-item am-input-item am-list-item-middle">
          <div className="am-list-line">
            <div
              style={{ width: 150, fontSize: "12pt" }}
              className="am-input-label am-input-label-5"
            >
              <div>Tài khoản ví</div>
            </div>
            <div className="am-input-control">
              <InputItem
                disabled={true}
                value="VIVIET"
                style={{
                  textAlign: "right",
                  fontWeight: "bold",
                  fontSize: "12pt",
                  color: "rgb(255, 0, 0)"
                }}
                type="number"
                clear
                onChange={this.onChangeBank}
              >
              </InputItem>
            </div>
          </div>
        </div>
      );
    }
    else if (this.state.listmerchant == 143) {
      return (
        <div className="am-list-item am-input-item am-list-item-middle">
          <div className="am-list-line">
            <div
              style={{ width: 150, fontSize: "12pt" }}
              className="am-input-label am-input-label-5"
            >
              <div>Tài khoản ví</div>
            </div>
            <div className="am-input-control">
              <InputItem
                disabled={true}
                value="MOMO"
                style={{
                  textAlign: "right",
                  fontWeight: "bold",
                  fontSize: "12pt",
                  color: "rgb(255, 0, 0)"
                }}
                type="number"
                clear
                onChange={this.onChangeBank}
              >
              </InputItem>
            </div>
          </div>
        </div>
      );
    }

  }

  render() {
    return (
      <div>
        <div className={styles2.header}>
          <Item
            style={{ paddingTop: 10, paddingBottom: 10, background: "#BA2027" }}
          >
            <div style={{ fontSize: "20px", color: "white", textAlign: "center" }}>ĐỔI THƯỞNG QUA VÍ</div>
          </Item>
        </div>
        <div style={{ background: "#FFFFFF", paddingBottom: 15, fontSize: "12pt" }} className={styles2.content}>
          <div className="am-list-item am-input-item am-list-item-middle">
            <div className="am-list-line">
              <div
                style={{ width: 130, fontSize: "12pt" }}
                className="am-input-label am-input-label-5"
              >
                <div>TỔNG TIỀN</div>
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
                    this.state.BalanceWin != null
                      ? this.state.BalanceWin
                      : 0
                  ) + " đ"}
                </Text>
              </div>
            </div>
          </div>
          <div className="am-list-item am-input-item am-list-item-middle">
            <div className="am-list-line">
              <div
                style={{ width: 135, fontSize: "12pt" }}
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
          {this.renderbank(this.state.banklist)}
          <div className="am-list-item am-input-item am-list-item-middle">
            <div className="am-list-line">
              <div
                style={{ width: 130, fontSize: "12pt" }}
                className="am-input-label am-input-label-5"
              >
                <div>Số điện thoại</div>
              </div>
              <div className="am-input-control">
                <InputItem
                  disabled={true}
                  value={this.state.mobileNumber}
                  style={{
                    textAlign: "right",
                    fontWeight: "bold",
                    fontSize: "12pt",
                    color: "rgb(255, 0, 0)"
                  }}
                  clear
                  onChange={this.onChangeAccountNumber}
                >
                </InputItem>
              </div>
            </div>
          </div>
          <div className="am-list-item am-input-item am-list-item-middle">
            <div className="am-list-line">
              <div
                style={{ width: 150, fontSize: "12pt" }}
                className="am-input-label am-input-label-5"
              >
                <div>Họ tên</div>
              </div>
              <div className="am-input-control">
                <InputItem
                  disabled={true}
                  value={this.state.name}
                  style={{
                    textAlign: "right",
                    fontWeight: "bold",
                    fontSize: "12pt",
                    color: "rgb(255, 0, 0)"
                  }}
                  clear
                  onChange={this.onChangeName}
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

export default ChangeMerchantDetail;
