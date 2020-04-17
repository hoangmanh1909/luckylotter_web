import React from "react";
import {
  WingBlank,
  Toast,
  InputItem,
  Footer,
  Modal,
  Text,
  Button
} from "antd-mobile";
import styles from "./Main.less";
import CountDownLottery123 from "../utils/countDownLottery123";
import {
  stringToNumberFormat,
  checkPrize,
  getNameWinByNum,
  getNameWinMax3DPlusByNum,
  getPadLeft,
  getDayOpen
} from "../utils/Helper";

const model = {
  padding: 0
};

class Lottery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balanceObj: {},
      balance: 0,
      balanceWin: 0,
      mobileNumber: localStorage.getItem("mobileNumber")
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.err != undefined) {
      Toast.info("Lỗi kết nối hệ thống", 2);
    }
    if (
      nextProps.balance !== undefined &&
      nextProps.balance.data !== undefined
    ) {
      if (nextProps.balance.data.Code === "00") {
        this.setState({
          balance: nextProps.balance.data.Value.Balance,
          balanceWin: nextProps.balance.data.Value.BalanceWin,
          balanceObj: nextProps.balance.data.Value
        });
      }
    }

    if (
      nextProps.balanceWin != undefined &&
      nextProps.balanceWin.data != undefined
    ) {
      if (nextProps.balanceWin.data.Code === "00") {
        this.setState({
          balanceWin: nextProps.balanceWin.data.Value
        });
      }
    }

    if (nextProps.Noti !== undefined && nextProps.Noti.data !== undefined) {
      if (nextProps.Noti.data.Code === "00") {
        this.setState({
          customerName: nextProps.Noti.data.Value.MobileNumber,
          amountWin: nextProps.Noti.data.Value.MaxAmount,
          productID: nextProps.Noti.data.Value.ProductID,
          win: true
        });
      }
    }
  }

  renderXSDT() {
    return (
      <div style={{ width: "100%" }}>
        <div
          style={{
            width: "240px",
            float: "left",
            display: "flex",
            fontSize: 18,
            color: "#FFF"
          }}
        >
          <img
            style={{
              height: 40,
              padding: 5,
              marginLeft: 15
            }}
            src={require("../assets/logo.png")}
            alt=""
          />
        </div>
        <div style={{ float: "right" }}>
          <div
            className={styles.flex_center}
          >
            <div
              style={{
                width: "50%",
                display: "flex",
                alignItems: "center",
                width: 80,
                borderRadius: 4,
                marginTop: 15,
                fontSize: "12pt"
              }}
            >
              <div style={{ paddingTop: 5 }}>XSDT</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div
            style={{
              display: "flex",
              fontSize: 18,
              color: "#FFF",
              float: "left"
            }}
          >
            {this.renderXSDT()}
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.div_buttonxsdt}
            onClick={() => {
              this.props.onLottery123();
            }}
          >
            <div style={{ display: "flex", padding: "4px 0" }}>
              <div>
                <img
                  className={styles.div_img}
                  src={require("../assets/xsdt123.png")}
                  alt=""
                />
                <div className={styles.div_img_text}>
                </div>
              </div>
              <div className={styles.div_group_text}>
                <div className={styles.div_text_amt}>
                  <span className={styles.span_text}>x</span>40.000
                  <span className={styles.span_text}>lần</span>
                </div>
                <div className={styles.button_buyxsdt}>Đặt vé</div>
              </div>
            </div>
          </div>
          <div className={styles.div_buttonxsdt}
            onClick={() => {
              this.props.onLottery234();
            }}
          >
            <div style={{ display: "flex", padding: "4px 0" }}>
              <div>
                <img
                  className={styles.div_img}
                  src={require("../assets/xosodientoan234.png")}
                  alt=""
                />
                <div className={styles.div_img_text}>
                </div>
              </div>
              <div className={styles.div_group_text}>
                <div className={styles.div_text_amt}>
                  <span className={styles.span_text}>x</span>1.000
                  <span className={styles.span_text}>lần</span>
                </div>
                <div className={styles.button_buyxsdt}>Đặt vé</div>
              </div>
            </div>
          </div>
          <div className={styles.div_buttonxsdt}
            onClick={() => {
              this.props.onLottery235();
            }}
          >
            <div style={{ display: "flex", padding: "4px 0" }}>
              <div>
                <img
                  className={styles.div_img}
                  src={require("../assets/xosodientoan.png")}
                  alt=""
                />
                <div className={styles.div_img_text}>
                </div>
              </div>
              <div className={styles.div_group_text}>
                <div className={styles.div_text_amt}>
                  <span className={styles.span_text}>x</span>1.000
                  <span className={styles.span_text}>lần</span>
                </div>
                <div className={styles.button_buyxsdt}>Đặt vé</div>
              </div>
            </div>
          </div>
          <div className={styles.div_buttonxsdt}
          >
            <div style={{ display: "flex", padding: "4px 0" }}>
              <div>
                <img
                  className={styles.div_img}
                  src={require("../assets/xosodientoan.png")}
                  alt=""
                />
                <div className={styles.div_img_text}>
                </div>
              </div>
              <div className={styles.div_group_text}>
                <div className={styles.div_text_amt}>
                  <span className={styles.span_text}>Coming soon</span>
                </div>
                <div className={styles.button_buyxsdt}>Đặt vé</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}
export default Lottery;
