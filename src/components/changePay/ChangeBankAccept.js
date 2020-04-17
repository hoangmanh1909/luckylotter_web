import React from 'react';
import styles2 from '../Main.less';
import { InputItem, Text, ActivityIndicator, Toast, Picker, List } from 'antd-mobile';
import { stringToNumberFormat } from '../../utils/Helper';


class ChangeBank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animating: false,
      fee: 0,
      data: {},
      totalAmount: 0
    }
  }

  componentWillMount() {
    // console.log(this.props.location.payload);
    this.setState({
      data: this.props.location.payload.data,
      totalAmount: (parseInt(this.props.location.payload.data.TransAmount) + parseInt(this.props.location.payload.data.Fee))
    });
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.fee !== undefined) {
    //     if (nextProps.fee.data.Code === "00") {
    //         this.setState({ fee: nextProps.fee.data.Value, totalAmount: (parseInt(this.state.data.TransAmount) + parseInt(nextProps.fee.data.Value)) })
    //     }
    // }

    if (nextProps.resAdd !== undefined && nextProps.resAdd !== "") {
      this.setState({ animating: false })
      if (nextProps.resAdd.data.Code === "00") {
        Toast.info("Yêu cầu đổi thưởng của quý khách đã được ghi nhận và xử lý trong thời gian không quá 3 ngày làm việc (trừ thứ 7, chủ nhật, ngày lễ…).", 10)
        this.props.onWin();
      }
      else {
        Toast.info(nextProps.resAdd.data.Message, 2)
      }
    }

    if (nextProps.err !== undefined) {
      this.setState({ animating: false })
      Toast.info("Lỗi kết nối hệ thống", 5)
    }
  }

  onChangeAmout = (value) => {
    this.setState({ amount: value })
  }

  onChangeAccount = (value) => {
    this.setState({ accountNumber: value })
  }

  onChangeFullName = (value) => {
    this.setState({ fullName: value })
  }

  onChangeBranch = (value) => {
    this.setState({ branch: value })
  }

  onOk = () => {
    this.setState({ animating: true })
    let data = {};
    data.MerchantID = 1;
    data.TransAmount = this.state.data.TransAmount;
    data.TransType = 2;
    data.MobileNumber = this.state.data.MobileNumber;
    data.BankID = this.state.data.BankID;
    data.ChangeType = 2;
    data.TransDetails = this.state.data.TransDetails;
    data.FullName = this.state.data.FullName;
    data.BranchName = this.state.data.BranchName;
    data.Fee = this.state.data.Fee;

    this.props.onOK(data);
  }

  render() {
    return (
      <div style={{ background: "#FFFFFF", paddingBottom: 15 }} className={styles2.content}>
        <ActivityIndicator
          className={styles2.spin}
          animating={this.state.animating}
          toast
        />
        <div
          style={{
            backgroundColor: "#E8E8E8",
            marginTop: 12,
            padding: 8,
            fontSize: 18
          }}
        >
          THÔNG TIN ĐỔI THƯỞNG
            </div>
        <div className="am-list-item am-input-item am-list-item-middle">
          <div className="am-list-line">
            <div
              style={{ width: 130 }}
              className="am-input-label am-input-label-5"
            >
              <div>Tổng tiền thưởng</div>
            </div>
            <div className="am-input-control">
              <Text
                style={{
                  float: "right",
                  color: "rgb(255, 0, 0)",
                  fontSize: 17,
                  fontWeight: "bold",
                  fontFamily: "sans-serif"
                }}
              >
                {stringToNumberFormat(this.state.data.Balance) + " đ"}
              </Text>
            </div>
          </div>
        </div>

        <div className="am-list-item am-input-item am-list-item-middle">
          <div className="am-list-line">
            <div
              style={{ width: 130 }}
              className="am-input-label am-input-label-5"
            >
              <div>Số tiền đổi thưởng</div>
            </div>
            <div className="am-input-control">
              <Text
                style={{
                  float: "right",
                  color: "rgb(255, 0, 0)",
                  fontSize: 17,
                  fontWeight: "bold",
                  fontFamily: "sans-serif"
                }}
              >
                {stringToNumberFormat(this.state.data.TransAmount) +
                  " đ"}
              </Text>
            </div>
          </div>
        </div>

        <div className="am-list-item am-input-item am-list-item-middle">
          <div className="am-list-line">
            <div
              style={{ width: 130 }}
              className="am-input-label am-input-label-5"
            >
              <div>Phí</div>
            </div>
            <div className="am-input-control">
              <Text
                style={{
                  float: "right",
                  color: "rgb(255, 0, 0)",
                  fontSize: 17,
                  fontWeight: "bold",
                  fontFamily: "sans-serif"
                }}
              >
                {stringToNumberFormat(this.state.data.Fee) + " đ"}
              </Text>
            </div>
          </div>
        </div>

        <div className="am-list-item am-input-item am-list-item-middle">
          <div className="am-list-line">
            <div
              style={{ width: 130 }}
              className="am-input-label am-input-label-5"
            >
              <div>Thanh toán</div>
            </div>
            <div className="am-input-control">
              <Text
                style={{
                  float: "right",
                  color: "rgb(255, 0, 0)",
                  fontSize: 17,
                  fontWeight: "bold",
                  fontFamily: "sans-serif"
                }}
              >
                {stringToNumberFormat(this.state.totalAmount) +
                  " đ"}
              </Text>
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#E8E8E8",
            marginTop: 12,
            padding: 8,
            fontSize: 18
          }}
        >
          NGƯỜI NHẬN
            </div>

        <InputItem
          style={{
            textAlign: "right",
            fontFamily: "Times",
            fontSize: 16
          }}
          value={this.state.data.BankName}
          editable={false}
          placeholder="Ngân hàng"
        >
          Ngân hàng
            </InputItem>
        <InputItem
          style={{
            textAlign: "right",
            fontFamily: "Times",
            fontSize: 16
          }}
          value={this.state.data.TransDetails}
          editable={false}
          placeholder="Số tài khoản"
        >
          Số TK
            </InputItem>
        <InputItem
          style={{
            textAlign: "right",
            fontFamily: "Times",
            fontSize: 16
          }}
          value={this.state.data.FullName}
          editable={false}
          placeholder="Chủ tài khoản"
        >
          Chủ TK
            </InputItem>
        <InputItem
          style={{
            textAlign: "right",
            fontFamily: "Times",
            fontSize: 16
          }}
          value={this.state.data.BranchName}
          editable={false}
          placeholder="Chi nhánh"
        >
          Chi nhánh
            </InputItem>
        <div
          onClick={() => this.onOk()}
          className={styles2.primary_btn}
          style={{ margin: 15, height: 40 }}
        >
          Hoàn tất
            </div>
      </div>
    );
  }
}
export default ChangeBank;