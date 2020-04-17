import React from "react";
import styles from "./Login.less";
import { Toast, ActivityIndicator } from "antd-mobile";
import CryptoJS from "crypto-js";
import mainCss from "../Main.less";
import { SOURCE_CHANNEL, KEY_PEM ,API_KEY} from "../../config";

const heightDevice = window.innerHeight;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileNumber: "",
      password: "",
      animating: false,
      mode: "LOAD"
    };
  }

  componentWillMount() {
    this.setState({ mode: this.props.location.payload });
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.responseLogin !== undefined &&
      nextProps.responseLogin.data !== undefined
    ) {
      this.setState({ animating: false });
      const response = nextProps.responseLogin.data;
      if (response.Code === "00") {
        console.log(response);
        
        localStorage.setItem("mobileNumber", this.state.mobileNumber);
        localStorage.setItem("isAuthenticated", true);
        localStorage.setItem("token", response.Value);
        localStorage.setItem("merchant_id", 4);
        if (this.state.mode == "LOAD") {
          this.props.onMain();
          //window.location.reload('');
        }else if(this.state.mode == "PAYMENT") {
          this.props.onPayment()
        };
      } else {
        Toast.info(response.Message, 2);
      }
    }

    if (nextProps.err !== undefined) {
      this.setState({ animating: false });
      Toast.info("Lỗi kết nối", 2);
    }
  }

  onChangeMobile = value => {
    this.setState({ mobileNumber: value.target.value });
  };

  onChangePassword = value => {
    if (value.target.value < 999999) {
      this.setState({ password: value.target.value });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.password.length != this.state.password.length &&
      this.state.password.length == 6
    ) {
      this.onOK();
    }
  }

  onOK() {
    // let crypt = new Crypt();
    // let data = "{\"ProductID\":\"7\"}";
    // let signature = JSON.parse(crypt.signature(KEY_PEM, data));
    // console.log(signature.signature);
    
    if (
      this.state.mobileNumber === "" ||
      this.state.mobileNumber === undefined
    ) {
      Toast.info("Bạn chưa nhập số điện thoại", 2);
      return;
    }

    if (
      this.state.mobileNumber === "" ||
      this.state.mobileNumber === undefined
    ) {
      Toast.info("Bạn chưa nhập mật khẩu", 2);
      return;
    }

    if (this.state.password.length !== 6) {
      Toast.info("Mật khẩu gồm 6 ký tự số", 2);
      return;
    }

    let request = {};
    request.MobileNumber = this.state.mobileNumber;
    request.Password = this.state.password;
    request.SourceChannel = SOURCE_CHANNEL;
    request.Signature = CryptoJS.SHA256(
      API_KEY + request.MobileNumber + request.Password + SOURCE_CHANNEL
    );

    this.setState({ animating: true });
    this.props.onLogin(request);
    
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
        <ActivityIndicator
          className={styles.spin}
          animating={this.state.animating}
          toast
        />
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

          <div className={styles.login}>
            <div
              className="am-list-item am-input-item am-list-item-middle"
              style={{ padding: 0 }}
            >
              <div
                className="am-list-line"
                style={{ padding: 0, border: "1px solid #BEBEBE" }}
              >
                <div className="am-input-control" style={{ display: "flex" }}>
                  <img
                    src={require("./../../assets/user.png")}
                    className={styles.icon_fc}
                  />
                  <div className={styles.border} />
                  <input
                    placeholder="Nhập số điện thoại"
                    type="number"
                    value={this.state.mobileNumber}
                    onChange={this.onChangeMobile}
                    pattern="[0-9]*"
                  />
                </div>
              </div>
            </div>
            <div
              className="am-list-item am-input-item am-list-item-middle"
              style={{ marginTop: 15, padding: 0 }}
            >
              <div
                className="am-list-line"
                style={{ padding: 0, border: "1px solid #BEBEBE" }}
              >
                <div className="am-input-control" style={{ display: "flex" }}>
                  <img
                    src={require("./../../assets/password.png")}
                    className={styles.icon_fc}
                  />
                  <div className={styles.border} />
                  <input
                    placeholder="Nhập mật khẩu"
                    type="number"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    className={styles.password}
                    pattern="[0-9]*"
                    min={1}
                    max={999999}
                  />
                </div>
              </div>
            </div>
            <div className={styles.button} onClick={() => this.onOK()}>
              <b>Đăng nhập</b>
            </div>
            <div
              className={mainCss.tutorial}
              onClick={() => this.props.onMissPassword(this.state.mode)}
            >
              Quên mật khẩu
            </div>
          </div>
          <div className={styles.text}>
            Bạn chưa có tài khoản?{" "}
            <span
              onClick={() => this.props.onRegistration(this.state.mode)}
              className={styles.register}
            >
              Tạo tài khoản
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
