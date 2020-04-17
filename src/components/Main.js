import React from "react";
import {
  WingBlank,
  Toast,
  InputItem,
  Footer,
  Modal,
  Text,
  Button,
} from "antd-mobile";
import styles from "./Main.less";
import CountDownMega from "../utils/countDownMega";
import CountDownPower from "../utils/countDownPower";
import CountDownMax3D from "../utils/countDownMax3D";
import CountDownKeno from "../utils/countDownKeno";
import CountDownLottery123 from "../utils/countDownLottery123";
import {
  stringToNumberFormat,
  checkPrize,
  getNameWinByNum,
  getNameWinMax3DPlusByNum,
  getPadLeft,
  getDayOpen,
} from "../utils/Helper";
import DrawResult from "./resultQSMT/DrawResult";
import PaymentHistory from "./history/PaymentHistory";
import { messaging } from "./../init-fcm";


// let height = window.innerHeight;
// let width = window.innerWidth;

const model = {
  padding: 0,
};

let token = "";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amountMega: 0,
      drawDateMega: "",
      amountPower: 0,
      drawDatePower: "",
      balanceObj: {},
      balance: 0,
      balanceWin: 0,
      TermsText: "",
      modal1: false,
      productID: 0,
      win: false,
      drawCodeKeno: "",
      downTime: 600,
      closeTime: 0,
      showKeno: 1,
      isCloseSale: false,
      mobileNumber: localStorage.getItem("mobileNumber"),
      tabFooterIndex: 1,
      max4d: [],
      power: [],
      mega: [],
      max3d: [],
      keno: [],
      lottery123: [],
      animating: false,
      dataPending: [],
      dataSuccess: [],
      totalRowSuccess: 0,
      dataError: [],
      intervalId: "",
    };
  }

  componentWillMount() {
    if (localStorage.getItem("tab") != null) {
      this.setState({ tabFooterIndex: parseInt(localStorage.getItem("tab")) });
    }
  }

  async componentDidMount() {
    try {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker
          .register("./firebase-messaging-sw.js")
          .then(function (registration) {
            console.log(
              "Registration successful, scope is:",
              registration.scope
            );
          })
          .catch(function (err) {
            console.log("Service worker registration failed, error:", err);
          });
      }
      messaging
        .requestPermission()
        .then(async function () {
          token = await messaging.getToken();
        })
        .catch(function (err) {
          console.log("Unable to get permission to notify.", err);
        });
      navigator.serviceWorker.addEventListener("message", (message) =>
        console.log(message)
      );
    } catch (error) {}

    var intervalId = setInterval(() => {
      this.addTokenNofity();
    }, 1000);
    this.setState({ intervalId: intervalId });
    // console.log(token);
  }

  addTokenNofity() {
    if (token != "") {
      clearInterval(this.state.intervalId);
      let data = {};
      data.MobileNumber = "";
      data.Flatform = "WEB";
      data.TokenNotify = token;
      const json = JSON.stringify(data);
      this.props.onAddTokenNotify(json);
      // console.log(token);
    }
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);

    //#region props dat ve
    if (
      nextProps.drawCodeKeno !== undefined &&
      nextProps.drawCodeKeno.data !== undefined
    ) {
      // console.log(nextProps.drawCodeKeno);
      if (nextProps.drawCodeKeno.data.Code === "00") {
        this.setState({
          drawCodeKeno: nextProps.drawCodeKeno.data.Value.DrawCode,
          closeTime: nextProps.drawCodeKeno.data.Value.CloseTime,
        });
      } else if (nextProps.drawCodeKeno.data.Code === "02") {
        this.setState({ isCloseSale: true });
      }
    }

    this.setState({
      amountMega: localStorage.getItem("amountMega"),
      drawDateMega: localStorage.getItem("drawDateMega"),
      amountPower: localStorage.getItem("amountPower"),
      drawDatePower: localStorage.getItem("drawDatePower"),
    });

    if (localStorage.getItem("amountMega") === null) {
      this.setState({ amountMega: 0 });
    }
    if (localStorage.getItem("amountPower") === null) {
      this.setState({ amountPower: 0 });
    }
    if (nextProps.Terms !== undefined) {
      if (nextProps.Terms.data !== undefined) {
        if (nextProps.Terms.data.Code === "00") {
          //   console.log(nextProps.paymentRules.data.Value);
          this.setState({
            TermsText: nextProps.Terms.data.Value,
          });
        } else {
          Toast.info("Không lấy được điều khoản sử dụng", 2);
        }
      }
    }
    if (nextProps.err != undefined) {
      Toast.info("Lỗi kết nối hệ thống", 2);
    }
    if (
      nextProps.balance !== undefined &&
      nextProps.balance.data !== undefined
    ) {
      //&& nextProps.products.data !== undefined
      // console.log(nextProps.balance.data);
      if (nextProps.balance.data.Code === "00") {
        this.setState({
          balance: nextProps.balance.data.Value.Balance,
          balanceWin: nextProps.balance.data.Value.BalanceWin,
          balanceObj: nextProps.balance.data.Value,
        });
      }
    }

    if (
      nextProps.balanceWin != undefined &&
      nextProps.balanceWin.data != undefined
    ) {
      if (nextProps.balanceWin.data.Code === "00") {
        this.setState({
          balanceWin: nextProps.balanceWin.data.Value,
        });
      }
      // } else {
      //   Toast.info("Không lấy được thông tin trúng thưởng", 2);
      // }
    }

    if (nextProps.Noti !== undefined && nextProps.Noti.data !== undefined) {
      if (nextProps.Noti.data.Code === "00") {
        this.setState({
          customerName: nextProps.Noti.data.Value.MobileNumber,
          amountWin: nextProps.Noti.data.Value.MaxAmount,
          productID: nextProps.Noti.data.Value.ProductID,
          win: true,
        });
      }
    }

    if (
      nextProps.checkAddOrder !== undefined &&
      nextProps.checkAddOrder.data !== undefined
    ) {
      if (nextProps.checkAddOrder.data.Code === "00") {
        switch (this.state.productsID) {
          case 1:
            this.props.onMega645();
            break;
          case 2:
            this.props.onMax4D();
            break;
          case 3:
            this.props.onPower655();
            break;
          case 4:
            this.props.onMax3D();
            break;
          case 5:
            this.props.onMax3DPlus();
            break;
          case 6:
            this.props.onKeno();
            break;
          default:
            break;
        }
      } else {
        Toast.info(nextProps.checkAddOrder.data.Message, 5);
      }
    }

    //#endregion

    //#region props ket qua
    if (
      nextProps.mega !== undefined &&
      this.state.mega.length === 0 &&
      nextProps.power !== undefined &&
      this.state.power.length === 0 &&
      nextProps.max4d !== undefined &&
      this.state.max4d.length === 0 &&
      nextProps.max3d !== undefined &&
      this.state.max3d.length === 0 &&
      nextProps.lottery123 !== undefined &&
      this.state.lottery123.length === 0 &&
      nextProps.keno != undefined &&
      this.state.keno.length === 0
    ) {
      this.setState({ animating: false });
      console.log(nextProps);
      if (
        nextProps.mega.data.Code === "00" &&
        nextProps.power.data.Code === "00" &&
        nextProps.max4d.data.Code === "00" &&
        nextProps.max3d.data.Code === "00" &&
        nextProps.lottery123.data.Code === "00"
      ) {
        this.setState({
          mega: nextProps.mega.data.ListValue,
          power: nextProps.power.data.ListValue,
          max4d: nextProps.max4d.data.ListValue,
          max3d: nextProps.max3d.data.ListValue,
          lottery123: nextProps.lottery123.data.ListValue,
          keno: nextProps.keno.data.ListValue,
        });
      }
    }
    //#endregion

    //#region props lich su
    if (nextProps.pending != undefined && nextProps.pending.data != undefined) {
      if (nextProps.pending.data.Code == "00") {
        this.setState({
          dataPending: nextProps.pending.data.ListValue,
        });
      } else if (nextProps.pending.data.Code == "01") {
        this.setState({
          dataPending: [],
        });
      }
    }
    if (nextProps.success != undefined && nextProps.success.data != undefined) {
      // console.log(nextProps.success);
      if (nextProps.success.data.Code == "00") {
        this.setState({
          dataSuccess: nextProps.success.data.ListValue,
          totalRowSuccess: parseInt(nextProps.success.data.Value),
        });
      } else if (nextProps.success.data.Code == "01") {
        this.setState({
          dataSuccess: [],
          totalRowSuccess: 0,
        });
      }
    }
    if (
      nextProps.dataError != undefined &&
      nextProps.dataError.data != undefined
    ) {
      if (nextProps.dataError.data.Code == "00") {
        this.setState({
          dataError: nextProps.dataError.data.ListValue,
        });
      } else if (nextProps.dataError.data.Code == "01") {
        this.setState({
          dataError: [],
        });
      }
    }
    //#endregion
  }

  //#region Man hinh dat ve
  createMarkup() {
    return { __html: this.state.TermsText };
  }

  rulesText() {
    return <div dangerouslySetInnerHTML={this.createMarkup()} />;
  }

  onTerms = () => {
    this.props.onTerms(this.state.TermsText);
  };

  renderModalRulesText = () => {
    return (
      <Modal
        className={model}
        visible={this.state.modal1}
        transparent
        maskClosable={false}
        onClose={this.onClose("modal1")}
        title="Điều khoản sử dụng"
        // style={{ width: "100%", padding: 0 }}
        footer={[
          {
            text: "Đóng",
            onPress: () => {
              this.onClose("modal1")();
            },
          },
        ]}
        wrapProps={{ onTouchStart: this.onWrapTouchStart }}
      >
        {this.rulesText()}
      </Modal>
    );
  };

  showModal = (key) => (e) => {
    e.preventDefault();
    this.setState({
      [key]: true,
    });
  };

  onClose = (key) => () => {
    this.setState({
      [key]: false,
    });
  };

  renderProduct = () => {
    let amount = this.state.amountMega - this.state.amountPower;
    if (amount > 0) {
      return (
        <div>
          {this.renderMegaTop()}
          {this.renderPower()}
          {this.renderMax3DPlus()}
        </div>
      );
    } else {
      if (this.state.amountMega >= 20000000000) {
        return (
          <div>
            {this.renderPowerTop()}
            {this.renderMega()}
            {this.renderMax3DPlus()}
          </div>
        );
      } else {
        return (
          <div>
            {this.renderPowerTop()}
            {this.renderMega()}
            {this.renderMax3DPlus()}
          </div>
        );
      }
    }
  };

  renderMax3DPlus() {
    return (
      <div
        className={styles.div_button}
        onClick={() => {
          this.props.onCheckAddOrder(5);
          this.setState({ productsID: 5 });
        }}
      >
        <div style={{ display: "flex", padding: "4px 0" }}>
          <div>
            <img
              className={styles.div_img}
              src={require("../assets/max3dcong.png")}
              alt=""
            />
            <div className={styles.div_img_text} style={{ fontSize: "11pt" }}>
              <CountDownMax3D />
            </div>
          </div>
          <div className={styles.div_group_text}>
            {this.renderOpenDay(5, 1)}
            <div className={styles.div_text_amt} style={{ fontSize: "27pt" }}>
              <span className={styles.span_text}>x</span>100.000
              <span className={styles.span_text}>lần</span>
            </div>
            <div className={styles.button_buy}>Đặt vé</div>
          </div>
        </div>
      </div>
    );
  }

  renderMega() {
    return (
      <div
        className={styles.div_button}
        onClick={() => {
          this.props.onCheckAddOrder(1), this.setState({ productsID: 1 });
        }}
      >
        <div style={{ display: "flex", padding: "4px 0" }}>
          <div>
            <img
              className={styles.div_img}
              src={require("../assets/mega.png")}
              alt=""
            />
            <div className={styles.div_img_text}>
              <CountDownMega />
            </div>
          </div>
          <div className={styles.div_group_text}>
            {this.renderOpenDay(1, 1)}
            <div className={styles.div_text_amt}>
              {this.state.amountMega
                .toString()
                .substring(0, this.state.amountMega.toString().length - 9)}
              <span className={styles.span_text}>Tỷ VND</span>
            </div>
            <div className={styles.button_buy}>Đặt vé</div>
          </div>
        </div>
      </div>
    );
  }

  renderMegaTop() {
    return (
      <div
        className={styles.div_button}
        onClick={() => {
          this.props.onCheckAddOrder(3), this.setState({ productsID: 1 });
        }}
      >
        <div style={{ display: "flex", padding: "4px 0" }}>
          <div>
            <img
              className={styles.div_img}
              src={require("../assets/mega_top.png")}
              alt=""
            />
            <div className={styles.div_img_text}>
              <CountDownMega />
            </div>
          </div>
          <div className={styles.div_group_text}>
            {this.renderOpenDay(1, 2)}
            <div className={styles.div_text_amt}>
              {this.state.amountMega
                .toString()
                .substring(0, this.state.amountMega.toString().length - 9)}
              <span className={styles.span_text}>Tỷ VND</span>
            </div>
            <div className={styles.button_buy}>Đặt vé</div>
          </div>
        </div>
      </div>
    );
  }

  renderPower() {
    return (
      <div
        className={styles.div_button}
        onClick={() => {
          this.props.onCheckAddOrder(3), this.setState({ productsID: 3 });
          // this.props.onPower655(), this.setState({ productsID: 3 });
        }}
      >
        <div style={{ display: "flex", padding: "4px 0" }}>
          <div>
            <img
              className={styles.div_img}
              src={require("../assets/power.png")}
              alt=""
            />
            <div className={styles.div_img_text}>
              <CountDownPower />
            </div>
          </div>
          <div className={styles.div_group_text}>
            {this.renderOpenDay(3, 1)}
            <div className={styles.div_text_amt}>
              {this.state.amountPower
                .toString()
                .substring(0, this.state.amountPower.toString().length - 9)}
              <span className={styles.span_text}>Tỷ VND</span>
            </div>
            <div className={styles.button_buy}>Đặt vé</div>
          </div>
        </div>
      </div>
    );
  }

  renderPowerTop() {
    return (
      <div
        className={styles.div_button}
        onClick={() => {
          this.props.onCheckAddOrder(3), this.setState({ productsID: 3 });
          // this.props.onPower655(), this.setState({ productsID: 3 });
        }}
      >
        <div style={{ display: "flex", padding: "4px 0" }}>
          <div>
            <img
              className={styles.div_img}
              src={require("../assets/power_top.png")}
              alt=""
            />
            <div className={styles.div_img_text}>
              <CountDownPower />
            </div>
          </div>
          <div className={styles.div_group_text}>
            {this.renderOpenDay(3, 2)}
            <div className={styles.div_text_amt}>
              {this.state.amountPower
                .toString()
                .substring(0, this.state.amountPower.toString().length - 9)}
              <span className={styles.span_text}>Tỷ VND</span>
            </div>
            <div className={styles.button_buy}>Đặt vé</div>
          </div>
        </div>
      </div>
    );
  }

  renderLottery() {
    return (
      <div
        className={styles.div_button}
        onClick={() => {
          this.props.onLottery();
        }}
      >
        <div style={{ display: "flex", padding: "4px 0" }}>
          <div>
            <img
              className={styles.div_imgxsdt}
              src={require("../assets/lottery.png")}
              alt=""
            />
            <div
              className={styles.div_img_text}
              style={{ fontSize: "10pt", marginTop: 5 }}
            >
              XỔ SỐ THỦ ĐÔ
            </div>
          </div>
          <div className={styles.div_group_text}>
            <div className={styles.div_text_amt}>
              <span className={styles.span_text}>x</span>40.000
              <span className={styles.span_text}>lần</span>
            </div>
            <div className={styles.button_buy}>Đặt vé</div>
          </div>
        </div>
      </div>
    );
  }

  renderBanner() {
    if (this.state.win === true) {
      if (this.state.productID === 1) {
        return (
          <div className={styles.div_button}>
            <div style={{ display: "flex" }}>
              <img
                style={{ width: "100%", height: 80 }}
                src={require("../assets/banner/mega.png")}
                alt=""
              />
              <div
                style={{
                  position: "absolute",
                  top: "90px",
                  left: "54%",
                  transform: "translate(-50%, -50%)",
                  color: "yellow",
                  fontWeight: "bold",
                  fontSize: 12,
                  width: 200,
                }}
              >
                CHÚC MỪNG QUÝ KHÁCH HÀNG
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "108px",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "#1a367f",
                }}
              >
                Đã trúng
              </div>
              {/* <Text className={styles.prize_name}>{getNameWinByNum(this.state.prizeName)}</Text> */}
              <div className={styles.amount_noti}>
                {stringToNumberFormat(this.state.amountWin)} VNĐ
              </div>
            </div>
          </div>
        );
      } else if (this.state.productID === 2) {
        return (
          <div className={styles.div_button}>
            <div style={{ display: "flex" }}>
              <img
                style={{ width: "100%", height: 80 }}
                src={require("../assets/banner/max4d.png")}
                alt=""
              />
              <div
                style={{
                  position: "absolute",
                  top: "90px",
                  left: "54%",
                  transform: "translate(-50%, -50%)",
                  color: "yellow",
                  fontWeight: "bold",
                  fontSize: 12,
                  width: 200,
                }}
              >
                CHÚC MỪNG QUÝ KHÁCH HÀNG
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "108px",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "#1a367f",
                }}
              >
                Đã trúng
              </div>
              {/* <Text className={styles.prize_name}>{getNameWinByNum(this.state.prizeName)}</Text> */}
              <div className={styles.amount_noti}>
                {stringToNumberFormat(this.state.amountWin)} VNĐ
              </div>
            </div>
          </div>
        );
      } else if (this.state.productID === 3) {
        return (
          <div className={styles.div_button}>
            <div style={{ display: "flex" }}>
              <img
                style={{ width: "100%", height: 80 }}
                src={require("../assets/banner/power.png")}
                alt=""
              />
              <div
                style={{
                  position: "absolute",
                  top: "90px",
                  left: "54%",
                  transform: "translate(-50%, -50%)",
                  color: "#9c2b20",
                  fontWeight: "bold",
                  fontSize: 12,
                  width: 200,
                }}
              >
                CHÚC MỪNG QUÝ KHÁCH HÀNG
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "108px",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "#1a367f",
                }}
              >
                Đã trúng{" "}
              </div>
              {/* <Text className={styles.prize_name}>{getNameWinByNum(this.state.prizeName)}</Text> */}
              <div className={styles.amount_noti}>
                {stringToNumberFormat(this.state.amountWin)} VNĐ
              </div>
            </div>
          </div>
        );
      } else if (this.state.productID === 5) {
        return (
          <div className={styles.div_button}>
            <div style={{ display: "flex" }}>
              <img
                style={{ width: "100%", height: 80 }}
                src={require("../assets/banner/max3dcong.png")}
                alt=""
              />
              <div
                style={{
                  position: "absolute",
                  top: "90px",
                  left: "54%",
                  transform: "translate(-50%, -50%)",
                  color: "yellow",
                  fontWeight: "bold",
                  fontSize: 12,
                  width: 200,
                }}
              >
                CHÚC MỪNG QUÝ KHÁCH HÀNG
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "108px",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "#1a367f",
                }}
              >
                Đã trúng{" "}
              </div>
              {/* <Text className={styles.prize_name}>{getNameWinMax3DPlusByNum(this.state.prizeName)}</Text> */}
              <div className={styles.amount_noti}>
                {stringToNumberFormat(this.state.amountWin)} VNĐ
              </div>
            </div>
          </div>
        );
      } else if (this.state.productID === 4) {
        return (
          <div className={styles.div_button}>
            <div style={{ display: "flex" }}>
              <img
                style={{ width: "100%", height: 80 }}
                src={require("../assets/banner/max3d.png")}
                alt=""
              />
              <div
                style={{
                  position: "absolute",
                  top: "90px",
                  left: "54%",
                  transform: "translate(-50%, -50%)",
                  color: "yellow",
                  fontWeight: "bold",
                  fontSize: 12,
                  width: 200,
                }}
              >
                CHÚC MỪNG QUÝ KHÁCH HÀNG
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "108px",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "#1a367f",
                }}
              >
                Đã trúng{" "}
              </div>
              {/* <Text className={styles.prize_name}>{getNameWinMax3DPlusByNum(this.state.prizeName)}</Text> */}
              <div className={styles.amount_noti}>
                {stringToNumberFormat(this.state.amountWin)} VNĐ
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className={styles.div_button}>
            <div style={{ display: "flex" }}>
              <img
                style={{ width: 357, height: 63 }}
                src={require("../assets/banner_01.png")}
                alt=""
              />
            </div>
          </div>
        );
      }
    } else {
      return (
        <div className={styles.div_button}>
          <div style={{ display: "flex" }}>
            <img
              style={{ width: 357, height: 63 }}
              src={require("../assets/banner_01.png")}
              alt=""
            />
          </div>
        </div>
      );
    }
  }

  renderLogin() {
    if (localStorage.getItem("isAuthenticated")) {
      return (
        <div className={styles.header_ele}>
          <div className={styles.header_left}>
            <img
              onClick={() => this.props.onPersonalInfo()}
              style={{
                borderRadius: "50%",
                height: 47,
                width: 54,
                padding: 5,
              }}
              src={require("../assets/icon_user_main.png")}
              alt=""
            />
            <div style={{ marginTop: 10 }}>
              <div>{this.state.mobileNumber}</div>
              <div className={styles.flex_center}>
                <img
                  style={{
                    width: 14,
                    height: 15,
                    padding: 5,
                  }}
                  src={require("../assets/icon_wallet.png")}
                  alt=""
                />
                <div
                  style={{
                    alignSelf: "center",
                    marginRight: 4,
                    fontSize: "12pt",
                    padding: 5,
                  }}
                >
                  {stringToNumberFormat(this.state.balance) + " VNĐ"}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.header_right}>
            <div
              className={styles.flex_center}
              onClick={() => this.props.onWin()}
            >
              <div
                style={{
                  alignSelf: "center",
                  marginRight: 4,
                  paddingTop: 10,
                  fontSize: "12pt",
                }}
              >
                {stringToNumberFormat(this.state.balanceWin) + " VNĐ"}
              </div>
              <div
                style={{
                  background: "#FFF",
                  marginRight: 12,
                  borderRadius: "50%",
                  height: 30,
                }}
                className={styles.flex_center}
              >
                <img
                  style={{
                    width: 20,
                    height: 20,
                    padding: 5,
                  }}
                  src={require("../assets/cup_do.png")}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div style={{ width: "100%" }}>
          <div
            style={{
              width: "240px",
              float: "left",
              display: "flex",
              fontSize: 18,
              color: "#FFF",
            }}
          >
            <img
              style={{
                height: 40,
                padding: 5,
                marginLeft: 15,
              }}
              src={require("../assets/logo.png")}
              alt=""
            />
          </div>
          <div style={{ float: "right" }}>
            <div
              className={styles.flex_center}
              onClick={() => this.props.onLogin("LOAD")}
            >
              <div
                style={{
                  width: "50%",
                  display: "flex",
                  alignItems: "center",
                  width: 110,
                  border: "1px solid #ffffff",
                  borderRadius: 4,
                  marginRight: 8,
                  marginTop: 15,
                  fontSize: "12pt",
                }}
              >
                <img
                  style={{
                    width: 17,
                    height: 17,
                    padding: 4,
                  }}
                  src={require("../assets/icon_login.png")}
                  alt=""
                />
                <div style={{ paddingTop: 2 }}>Đăng nhập</div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  renderHistory() {
    if (localStorage.getItem("isAuthenticated")) {
      return (
        <div
          className={styles.div_b_button}
          onClick={() => this.onChangeTabFooter(2)}
        >
          <div style={{ textAlign: "center" }}>
            <img src={require("../assets/history.png")} alt="" />
            <div className={styles.div_img_text}>Lịch sử đặt vé</div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.div_b_button}>
          <div style={{ textAlign: "center" }}>
            <img
              className={styles.img_btn_disable}
              src={require("../assets/icon_history_disable.png")}
              alt=""
            />
            <div className={styles.div_img_text}>Lịch sử đặt vé</div>
          </div>
        </div>
      );
    }
  }

  plusDrawPeriod = () => {
    let drawcode = parseInt(this.state.drawCodeKeno);
    let DrawCodeNow = drawcode + 1;
    this.setState({
      drawCodeKeno: DrawCodeNow.toString().padStart(7, "0"),
    });
  };

  renderOpenSaleKeno() {
    return (
      <div
        className={styles.div_button_keno}
        onClick={() => {
          this.props.onCheckAddOrder(6), this.setState({ productsID: 6 });
        }}
      >
        <div style={{ display: "flex", padding: "4px 0" }}>
          <div style={{ position: "relative" }}>
            <img
              className={styles.div_img}
              src={require("../assets/keno_logo_white.png")}
              alt=""
            />
            <div className={styles.div_img_text_keno}>
              #{this.state.drawCodeKeno}
            </div>
          </div>
          <div className={styles.div_group_text}>
            <div className={styles.open_keno}>Cả tuần, 10 phút/1 kỳ quay</div>
            <div
              className={styles.div_text_amt}
              style={{ color: "#FFF", fontSize: "27pt" }}
            >
              {this.state.closeTime > 0 ? (
                <CountDownKeno
                  nextPeriod={this.plusDrawPeriod}
                  downTime={this.state.closeTime}
                />
              ) : (
                <div></div>
              )}
            </div>
            <div className={styles.button_buy}>Đặt vé</div>
          </div>
        </div>
      </div>
    );
  }

  renderCloseSaleKeno() {
    return (
      <div
        className={styles.div_button_keno}
        onClick={() => {
          this.props.onCheckAddOrder(6), this.setState({ productsID: 6 });
        }}
      >
        <div style={{ display: "flex", padding: "4px 0" }}>
          <div>
            <img
              className={styles.div_img}
              src={require("../assets/keno_logo_white.png")}
              alt=""
            />
          </div>
          <div className={styles.div_group_text}>
            <div
              className={styles.div_text_amt}
              style={{ color: "#FFF", fontSize: "27pt" }}
            >
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className={styles.count_down_close_sale}></div>
                <div className={styles.count_down_close_sale}></div>
                <div style={{ color: "#60605B", marginRight: -4 }}>:</div>
                <div className={styles.count_down_close_sale}></div>
                <div className={styles.count_down_close_sale}></div>
              </div>
            </div>
            <div
              className={styles.button_buy}
              style={{ background: "#e32e35", color: "white" }}
            >
              Đặt vé
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderKenoOrBanner() {
    // console.log(this.state.showKeno);
    if (this.state.showKeno === 0) {
      return <div>{this.renderBanner()}</div>;
    } else {
      if (this.state.isCloseSale)
        return <div>{this.renderCloseSaleKeno()}</div>;
      else return <div>{this.renderOpenSaleKeno()}</div>;
    }
  }

  renderOpenDay = (productID, type) => {
    const name = getDayOpen(productID);
    if (name != "") {
      if (type == 1) {
        return <div className={styles.open_day}>{name}</div>;
      } else {
        return <div className={styles.open_day_top}>{name}</div>;
      }
    } else {
      return <div></div>;
    }
  };

  //#endregion

  onChangeTabFooter = (index) => {
    this.setState({ tabFooterIndex: index });
    if (localStorage.getItem("tab") != null) localStorage.removeItem("tab");
    localStorage.setItem("tab", index);
  };

  renderContentMain() {
    return (
      <div className={styles.content}>
        {this.renderKenoOrBanner()}
        {this.renderProduct()}

        <div
          className={styles.div_button}
          onClick={() => {
            this.props.onCheckAddOrder(2);
            this.setState({ productsID: 2 });
          }}
        >
          <div style={{ display: "flex", padding: "4px 0" }}>
            <div>
              <img
                className={styles.div_img}
                src={require("../assets/max4d.png")}
                alt=""
              />
              <div className={styles.div_img_text}>
                <CountDownPower />
              </div>
            </div>
            <div className={styles.div_group_text}>
              {this.renderOpenDay(2, 1)}
              <div className={styles.div_text_amt}>
                <span className={styles.span_text}>x</span>1500
                <span className={styles.span_text}>lần</span>
              </div>
              <div className={styles.button_buy}>Đặt vé</div>
            </div>
          </div>
        </div>
        <div
          className={styles.div_button}
          onClick={() => {
            this.props.onCheckAddOrder(4);
            this.setState({ productsID: 4 });
          }}
        >
          <div style={{ display: "flex", padding: "4px 0" }}>
            <div>
              <img
                className={styles.div_img}
                src={require("../assets/max3d.png")}
                alt=""
              />
              <div className={styles.div_img_text} style={{ fontSize: "11pt" }}>
                <CountDownMax3D />
              </div>
            </div>
            <div className={styles.div_group_text}>
              {this.renderOpenDay(4, 1)}
              <div className={styles.div_text_amt}>
                <span className={styles.span_text}>x</span>100
                <span className={styles.span_text}>lần</span>
              </div>
              <div className={styles.button_buy}>Đặt vé</div>
            </div>
          </div>
        </div>
        <div>{this.renderLottery()}</div>
        <div className={styles.div_button}>
          <div style={{ display: "flex", padding: "4px 0" }}>
            <div>
              <img
                className={styles.div_img}
                src={require("../assets/xskt.png")}
                alt=""
              />
              <div className={styles.div_img_text}>
                <CountDownPower />
              </div>
            </div>
            <div className={styles.div_group_text}>
              {this.renderOpenDay(2, 1)}
              <div className={styles.div_text_amt}>
                <span className={styles.span_text}></span>2
                <span className={styles.span_text}>Tỷ VND</span>
              </div>
              <div className={styles.button_buy}>Đặt vé</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  onGetPending = (productID) => {
    this.props.onGetPending(productID);
  };

  onGetSuccess = (pageIndex) => {
    // console.log(pageIndex)
    this.props.onGetSuccess(pageIndex);
  };

  onGetError = () => {
    this.props.onGetError();
  };

  onItem = (item) => {
    this.props.onItem(item);
  };

  onItemKeno = (item) => {
    this.props.onItemKeno(item);
  };

  renderContentHistory() {
    return (
      <div className={styles.content}>
        <PaymentHistory
          onGetPending={this.onGetPending}
          onGetSuccess={this.onGetSuccess}
          onItem={this.onItem}
          onItemKeno={this.onItemKeno}
          onGetError={this.onGetError}
          dataPending={this.state.dataPending}
          dataSuccess={this.state.dataSuccess}
          totalRow={this.state.totalRowSuccess}
          dataError={this.state.dataError}
          activeTab={this.state.activeTab}
        />
      </div>
    );
  }

  onGetResult = () => {
    this.props.onGetResult();
  };

  renderContentResult() {
    return (
      <div className={styles.content} style={{ background: "#FFFFFF" }}>
        <DrawResult
          onGetResult={this.onGetResult}
          max3d={this.state.max3d}
          max4d={this.state.max4d}
          mega={this.state.mega}
          power={this.state.power}
          keno={this.state.keno}
          lottery123={this.state.lottery123}
          animating={this.state.animating}
        />
      </div>
    );
  }

  renderContent() {
    // console.log(this.state.tabFooterIndex)
    let content = "";
    switch (this.state.tabFooterIndex) {
      case 1:
        content = this.renderContentMain();
        break;
      case 2:
        const token = localStorage.getItem("token");
        const isAuthenticated = localStorage.getItem("isAuthenticated");
        if (token != null && isAuthenticated != null)
          content = this.renderContentHistory();
        else {
          if (localStorage.getItem("tab") != null)
            localStorage.removeItem("tab");
          localStorage.setItem("tab", 1);
          this.props.onLogin("LOAD");
        }
        break;
      case 3:
        content = this.renderContentResult();
        break;
      default:
        break;
    }
    return content;
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
              float: "left",
            }}
          >
            {this.renderLogin()}
          </div>
        </div>
        {this.renderContent()}

        <div className={styles.footer}>
          <div
            style={{
              display: "flex",
              padding: "4px 0",
              flexDirection: "row",
            }}
          >
            <div
              className={styles.div_b_button}
              onClick={() => this.onChangeTabFooter(1)}
            >
              <div style={{ textAlign: "center" }}>
                {this.state.tabFooterIndex == 1 ? (
                  <img
                    className={styles.icon_footer}
                    src={require("../assets/footer/luckylotter_red.png")}
                    alt=""
                  />
                ) : (
                  <img
                    className={styles.icon_footer}
                    src={require("../assets/footer/luckylotter_gray.png")}
                    alt=""
                  />
                )}
                <div
                  className={
                    this.state.tabFooterIndex == 1
                      ? styles.div_footer_img_text_select
                      : styles.div_footer_img_text
                  }
                >
                  Đặt vé
                </div>
              </div>
            </div>

            <div
              className={styles.div_b_button}
              onClick={() => this.onChangeTabFooter(2)}
            >
              <div style={{ textAlign: "center" }}>
                {this.state.tabFooterIndex == 2 ? (
                  <img
                    className={styles.icon_footer}
                    src={require("../assets/footer/history.png")}
                    alt=""
                  />
                ) : (
                  <img
                    className={styles.icon_footer}
                    src={require("../assets/footer/history_gray.png")}
                    alt=""
                  />
                )}
                <div
                  className={
                    this.state.tabFooterIndex == 2
                      ? styles.div_footer_img_text_select
                      : styles.div_footer_img_text
                  }
                >
                  Lịch sử đặt vé
                </div>
              </div>
            </div>

            <div
              className={styles.div_b_button}
              onClick={() => this.onChangeTabFooter(3)}
            >
              <div style={{ textAlign: "center" }}>
                {this.state.tabFooterIndex == 3 ? (
                  <img
                    className={styles.icon_footer}
                    src={require("../assets/footer/ket_qua_red.png")}
                    alt=""
                  />
                ) : (
                  <img
                    className={styles.icon_footer}
                    src={require("../assets/footer/ket_qua_gray.png")}
                    alt=""
                  />
                )}
                <div
                  className={
                    this.state.tabFooterIndex == 3
                      ? styles.div_footer_img_text_select
                      : styles.div_footer_img_text
                  }
                >
                  Kết quả QSMT
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Main;
