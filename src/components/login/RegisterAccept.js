import React from "react";
import styles from "./Login.less";
import { Toast, ActivityIndicator } from "antd-mobile";
import Countdown from "react-countdown-now";
import CryptoJS from "crypto-js";
import { API_KEY } from "../../config";
const heightDevice = window.innerHeight;
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      OTP: "",
      isReSendOTP: false,
      animating: false,
      date: Date.now() + 180000
    };
  }

  componentWillMount() {
    // console.log(this.props.location.payload);
    this.setState(this.props.location.payload);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.verifyOTP !== undefined &&
      nextProps.verifyOTP.data !== undefined
    ) {
      const response = nextProps.verifyOTP.data;
      if (response.Code === "00") {
        this.props.onNext(this.state);
      } else {
        Toast.info(response.Message, 2);
      }
    }
    if (nextProps.addOTP !== undefined && nextProps.addOTP.data !== undefined) {
      const response = nextProps.addOTP.data;
      this.setState({ animating: false });
      if (response.Code === "00") {
        this.setState({ isReSendOTP: false });
      } else {
        Toast.info(response.Message, 2);
      }
    }
    if (nextProps.err !== undefined) {
      Toast.info("Lỗi kết nối", 2);
    }
  }


  onOTP = value => {
    this.setState({ OTP: value.target.value });
  };

  renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      this.setState({ isReSendOTP: true });
      return <span />;
    } else {
      // Render a countdown
      return (
        <span>
          {minutes}:{seconds}
        </span>
      );
    }
  };

  onReSendOTP() {
    this.setState({ animating: true });
    const sign = CryptoJS.HmacSHA256(this.state.MobileNumber, API_KEY);
    console.log(sign);

    let data = {};
    data.MobileNumber = this.state.MobileNumber;
    data.Sign = sign;
    this.props.onAddOTP(data);
  }

  renderOTP = () => {
    if (this.state.isReSendOTP) {
      return (
        <div style={{ display: "flex", marginTop: -10 }}>
          <div style={{ paddingTop: 2 }}>Không nhận được mã xác nhận?</div>
          <div
            style={{
              marginLeft: "auto",
              border: "1px solid #0069FF",
              padding: "2px 9px"
            }}
            onClick={() => this.onReSendOTP()}
          >
            Gửi lại
          </div>
        </div>
      );
    } else {
      return (
        <div style={{ display: "flex", marginTop: -10 }}>
          <div style={{ paddingTop: 2 }}>
            Không nhận được mã xác nhận?
          </div>
          <div
            style={{
              marginLeft: "auto",
              border: "1px solid #BEBEBE",
              padding: "2px 9px"
            }}
          >
            <Countdown date={this.state.date} renderer={this.renderer} />
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div
        style={{
          position: "relative",
          height: heightDevice,
          backgroundColor: "#ffffff"
        }}
      >
        <div className={styles.form_login}>
          <div style={{ marginTop: 50, marginBottom: 20 }}>
            <img
              style={{
                height: 100,
                padding: 5
              }}
              src={require("../../assets/logo_lucky_lotter.png")}
              alt=""
            />
          </div>
          <div style={{ paddingBottom: "20px", fontSize: "14pt" }}>Nhập mã xác nhận</div>
          <ActivityIndicator
            className={styles.spin}
            animating={this.state.animating}
            toast
          />
          <div className={styles.form_login} style={{ paddingTop: 20 }}>
            <div className={styles.login}>
              <div style={{ paddingBottom: 25, fontSize: 12.5 }}>
                LuckyLotter sẽ gọi cho bạn vào số điện thoại {" "}
                {this.state.MobileNumber}
                <span> để cung cấp cho bạn mã OTP xác minh</span>
              </div>
              <div
                className="am-list-item am-input-item am-list-item-middle"
                style={{ padding: 0 }}
              >
                <div
                  className="am-list-line"
                  style={{ padding: 0, border: "1px solid #BEBEBE" }}
                >
                  <div
                    className="am-input-control"
                    style={{ display: "flex", paddingLeft: 15 }}
                  >
                    <input
                      placeholder="Nhập mã xác nhận"
                      type="number"
                      value={this.state.OTP}
                      onChange={this.onOTP}
                      pattern="[0-9]*"
                    />
                  </div>
                </div>
              </div>

              <div
                className={styles.button}
                onClick={() => this.props.onVerifyOTP(this.state)}
              >
                <b>Tiếp theo</b>
              </div>

              {this.renderOTP()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
