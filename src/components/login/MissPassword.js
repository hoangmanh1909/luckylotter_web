import React from "react";
import styles from "./Login.less";
import { Toast } from "antd-mobile";

const heightDevice = window.innerHeight;

class MissPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileNumber: "",
      mode: ""
    };
  }

  componentWillMount() {
    this.setState({ mode: this.props.location.payload });
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.missPassword !== undefined &&
      nextProps.missPassword.data !== undefined
    ) {
      const response = nextProps.missPassword.data;
      if (response.Code === "00") {
        let data = {};
        data.MobileNumber = this.state.mobileNumber;
        data.ID = response.Value;
        data.Mode = this.state.mode;
        this.props.onNext(data);
      } else {
        Toast.info(response.Message, 2);
      }
    }
    if (nextProps.err !== undefined) {
      Toast.info("Lỗi kết nối", 2);
    }
  }
  onChangeMobile = value => {
    this.setState({ mobileNumber: value.target.value });
  };

  onOK() {
    if (
      this.state.mobileNumber === "" ||
      this.state.mobileNumber === undefined
    ) {
      Toast.info("Bạn chưa nhập số điện thoại", 2);
      return;
    }
    this.props.onMissPassword(this.state.mobileNumber);
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
          <div style={{paddingBottom:"20px", fontSize:"14pt"}}>Khôi phục mật khẩu</div>
          <div className={styles.form_login} style={{ paddingTop: 0 }}>
            <div className={styles.login}>
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
                      placeholder="Nhập số điện thoại"
                      type="number"
                      value={this.state.mobileNumber}
                      onChange={this.onChangeMobile}
                      pattern="[0-9]*"
                    />
                  </div>
                </div>
              </div>
              <div className={styles.button} onClick={() => this.onOK()}>
                <b>Tiếp theo</b>
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MissPassword;
