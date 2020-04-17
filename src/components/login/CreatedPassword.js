import React from "react";
import styles from "./Login.less";
import { Toast, ActivityIndicator } from "antd-mobile";

const heightDevice = window.innerHeight;

class CreatedPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      rePassword: ""
    };
  }

  componentWillMount() {
    this.setState(this.props.location.payload);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.addPassword !== undefined &&
      nextProps.addPassword.data !== undefined
    ) {
      const response = nextProps.addPassword.data;
      if (response.Code === "00") {
        localStorage.setItem("mobileNumber", this.state.MobileNumber);
        localStorage.setItem("isAuthenticated", true);
        localStorage.setItem("token", response.Value);
        if (this.state.Mode == "LOAD") this.props.onMain();
        else if (this.state.Mode == "PAYMENT") this.props.onPayment();
      } else {
        Toast.info(response.Message, 2);
        localStorage.clear();
      }
    }
  }

  onChangeRePassword = value => {
    if (value.target.value < 999999)
      this.setState({ rePassword: value.target.value });
  };

  onChangePassword = value => {
    if (value.target.value < 999999)
      this.setState({ password: value.target.value });
  };

  onOk() {
    if (this.state.password == "" || this.state.password == undefined) {
      Toast.info("Bạn chưa nhập mật khẩu", 2);
      return;
    }
    if (this.state.password.length !== 6) {
      Toast.info("Mật khẩu gồm 6 ký tự số", 2);
      return;
    }

    if (this.state.rePassword == "" || this.state.rePassword == undefined) {
      Toast.info("Bạn chưa nhập lại mật khẩu", 2);
      return;
    } else {
      if (this.state.password !== this.state.rePassword) {
        Toast.info("Mật khẩu không khớp", 2);
        return;
      }
    }

    console.log(this.state);
    
    this.props.onAddPassword(this.state);
    this.props.onMain();
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
          <div style={{paddingBottom:"20px", fontSize:"14pt"}}>Nhập mật khẩu</div>
        <div className={styles.form_login} style={{ paddingTop: 0 }}>
          <div className={styles.login}>
            <div
              className="am-list-item am-input-item am-list-item-middle"
              style={{ marginTop: 15, padding: 0 }}
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
                    placeholder="Nhập mật khẩu 6 ký tự số"
                    type="number"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    className={styles.password}
                    pattern="[0-9]*"
                    minLength={6}
                    maxLength={6}
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
                <div
                  className="am-input-control"
                  style={{ display: "flex", paddingLeft: 15 }}
                >
                  <input
                    placeholder="Nhập lại mật khẩu"
                    type="number"
                    value={this.state.rePassword}
                    onChange={this.onChangeRePassword}
                    className={styles.password}
                    pattern="[0-9]*"
                    minLength={6}
                    maxLength={6}
                  />
                </div>
              </div>
            </div>
            <div className={styles.button} onClick={() => this.onOk()}>
              <b>Xác nhận</b>
            </div>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default CreatedPassword;
