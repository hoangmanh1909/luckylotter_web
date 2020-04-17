import React from 'react';
import styles2 from '../Main.less';
import { InputItem, Text, ActivityIndicator, Toast } from 'antd-mobile';
import { stringToNumberFormat } from '../../utils/Helper';
import { API_KEY, SOURCE_CHANNEL } from '../../config.js';
import CryptoJS from 'crypto-js';
class ConfirmWithdrawCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            fee: 0,
            totalAmount: 0,
            animating: false
        }
    }

    componentWillMount() {
        this.setState({
          data: this.props.location.payload.data,
          totalAmount: (parseInt(this.props.location.payload.data.TransAmount) + parseInt(this.props.location.payload.data.Fee))
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.resAdd !== undefined && nextProps.resAdd !== "") {
            this.setState({ animating: false })
            if (nextProps.resAdd.data.Code === "00") {
                Toast.info(
                  "Yêu cầu chuyển tiền của quý khách đã được ghi nhận và xử lý trong thời gian không quá 3 ngày làm việc (trừ thứ 7, chủ nhật, ngày lễ…).",
                  10
                );
                this.props.onDone();
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


    onOk = () => {
        this.setState({animating : true})
        let data = {};
        data.MerchantID = localStorage.getItem("merchant_id");
        data.TransAmount = this.state.data.TransAmount;
        data.WithdrawalType = this.state.data.WithdrawalType;
        data.BankID = this.state.data.BankID;
        data.BranchName = this.state.data.BranchName;
        data.AccountNumber = this.state.data.AccountNumber;
        data.MobileNumber = this.state.data.MobileNumber;
        data.Fee = this.state.data.Fee;
        data.TransDetail = this.state.data.TransDetail;
        data.FullName = this.state.data.FullName;
        data.SourceChannel = CryptoJS.SHA256(SOURCE_CHANNEL).toString().toUpperCase();
        data.Signature = CryptoJS.SHA256(API_KEY + data.MobileNumber + data.WithdrawalType.toString() + data.TransAmount.toString()).toString();
        this.props.onOK(data);
    }

    render() {
        const data = this.state.data;
        return (
          <div
            style={{
              background: "#FFFFFF",
              paddingBottom: 15,
              fontSize: "12pt",
              
            }}
            className={styles2.content}
          >
            <ActivityIndicator
              className={styles2.spin}
              animating={this.state.animating}
              toast
            />
            <div className="am-list-item am-input-item am-list-item-middle">
              <div className="am-list-line">
                <div
                  style={{ width: 140, fontSize: "12pt" }}
                  className="am-input-label am-input-label-5"
                >
                  <div>Hoa hồng</div>
                </div>
                <div className="am-input-control">
                  <Text
                    style={{
                      float: "right",
                      color: "rgb(255, 0, 0)",
                      fontSize: "12pt",
                      fontWeight: "bold"
                    }}
                  >
                    {stringToNumberFormat(data.Balance) + " đ"}
                  </Text>
                </div>
              </div>
            </div>
            <div className="am-list-item am-input-item am-list-item-middle">
              <div className="am-list-line">
                <div
                  style={{ width: 170, fontSize: "12pt" }}
                  className="am-input-label am-input-label-5"
                >
                  <div>Số tiền rút</div>
                </div>
                <div className="am-input-control">
                  <Text
                    style={{
                      float: "right",
                      color: "rgb(255, 0, 0)",
                      fontSize: "12pt",
                      fontWeight: "bold"
                    }}
                  >
                    {stringToNumberFormat(data.TransAmount) + " đ"}
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
                  <div>Phí</div>
                </div>
                <div className="am-input-control">
                  <Text
                    style={{
                      float: "right",
                      color: "rgb(255, 0, 0)",
                      fontWeight: "bold",
                      fontSize: "12pt"
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
                  style={{ width: 130, fontSize: "12pt" }}
                  className="am-input-label am-input-label-5"
                >
                  <div>Thanh toán</div>
                </div>
                <div className="am-input-control">
                  <Text
                    style={{
                      float: "right",
                      color: "rgb(255, 0, 0)",
                      fontWeight: "bold",
                      fontSize: "12pt"
                    }}
                  >
                    {stringToNumberFormat(this.state.totalAmount) +
                      " đ"}
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
                  <div>Số điện thoại</div>
                </div>
                <div className="am-input-control">
                  <Text style={{ float: "right", fontSize: "12pt" }}>
                    {data.MobileNumber}
                  </Text>
                </div>
              </div>
            </div>
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
export default ConfirmWithdrawCom;