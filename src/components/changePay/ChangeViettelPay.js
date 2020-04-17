import React from "react";
import styles2 from "../Main.less";
import { InputItem, Text, ActivityIndicator, Toast } from "antd-mobile";
import { stringToNumberFormat } from "../../utils/Helper";


class ChangeViettelPay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: 0,
      mobileNumber: "",
      amount: 0
    };
  }
  componentWillMount() {
    this.setState({
      mobileNumber: localStorage.getItem("mobileNumber"),
      balance: this.props.location.balance
    });
  }

  onChangeAmout = value => {
    this.setState({ amount: value });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.fee !== undefined) {
      if (nextProps.fee.data.Code === "00") {
        let data = {};
        data.MerchantID = 1;
        data.TransAmount = this.state.amount;
        data.TransType = 2;
        data.ChangeType = 1;
        data.MobileNumber = this.state.mobileNumber;
        data.Balance = this.state.balance;
        data.Fee = nextProps.fee.data.Value;
        this.props.onOK(data);
      }
      else {
        Toast.info(nextProps.fee.data.Message, 2);
      }
    }

    if (nextProps.err !== undefined) {
      this.setState({ animating: false });
      Toast.info("Lỗi kết nối hệ thống", 2);
    }
  }

  onOk = () => {
    // console.log(this.state.amount)
    if (this.state.amount <= 0 || this.state.amount === "") {
      Toast.info("Bạn chưa nhập số tiền Chuyển thưởng", 2);
      return;
    }
    if (this.state.amount > this.state.balance) {
      Toast.info("Số tiền Chuyển thưởng không được lớn hơn tổng tiền thưởng", 2);
      return;
    }
    // if (this.state.amount % 10000 !== 0 && this.state.amount < 30000) {
    //   Toast.info("Số tiền yêu cầu chuyển thưởng tối thiểu là 30.000 đồng và là bội số của 10.000 đồng", 2);
    //   return;
    // }
    if (this.state.amount % 10000 !== 0) {
      Toast.info("Số tiền yêu cầu chuyển thưởng phải là bội số của 10.000 đồng", 2);
      return;
    }
    // if (this.state.amount < 30000) {
    //     Toast.info("Số tiền yêu cầu chuyển thưởng tối thiểu là 30.000 đồng", 2);
    //     return;
    // }

    // if (this.state.amount > 5000000) {
    //   Toast.info("Số tiền Chuyển thưởng tối đa là 5.000.000 VNĐ", 2);
    //   return;
    // }

    let data = {};
    data.MerchantID = 1;
    data.TransAmount = this.state.amount;
    data.TransType = 2;
    data.ChangeType = 1;
    data.MobileNumber = this.state.mobileNumber;
    data.Balance = this.state.balance;

    this.props.onFee(data);
  };

  render() {
    return (
      <div style={{ background: "#FFFFFF", paddingBottom: 15, fontSize: "12pt" }} className={styles2.content}>
        <div className="am-list-item am-input-item am-list-item-middle">
          <div className="am-list-line">
            <div
              style={{ width: 130, fontSize: "12pt" }}
              className="am-input-label am-input-label-5"
            >
              <div>Tổng tiền thưởng</div>
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
                {stringToNumberFormat(this.state.balance) + " đ"}
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
              <div>Số tiền chuyển</div>
            </div>
            <div className="am-input-control">
              <InputItem
                value={stringToNumberFormat(this.state.amount)}
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

        <div className="am-list-item am-input-item am-list-item-middle">
          <div className="am-list-line">
            <div
              style={{ width: 130, fontSize: "12pt" }}
              className="am-input-label am-input-label-5"
            >
              <div>Số điện thoại</div>
            </div>
            <div className="am-input-control">
              <Text style={{ float: "right", fontSize: 17 }}>
                {this.state.mobileNumber}
              </Text>
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
      </div>
    );
  }
}
export default ChangeViettelPay;
