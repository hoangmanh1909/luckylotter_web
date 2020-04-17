import React from "react";
import { Modal, Toast, ActivityIndicator, List, Text, Button } from "antd-mobile";
import { stringToNumberFormat } from "../../utils/Helper";
import styles from "../Main.less";
import ListItem from "antd-mobile/lib/list/ListItem";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: 0,
      data: [],
      modal: false,
      modal1: false,
      paymentRulesText: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.response.data != undefined) {
      if (nextProps.response.data.Code === "00") {
        this.setState({
          data: nextProps.response.data.ListValue,
          balance: nextProps.response.data.Value
        });
      } else {
        Toast.info("Không lấy được thông tin trúng thưởng", 2);
      }
    }
    // console.log(nextProps.paymentRules);
    if (nextProps.paymentRules !== undefined) {
      if (nextProps.paymentRules.data !== undefined) {

        if (nextProps.paymentRules.data.Code === "00") {
          //   console.log(nextProps.paymentRules.data.Value);
          this.setState({
            paymentRulesText: nextProps.paymentRules.data.Value
          });
        } else {
          Toast.info("Không lấy được quy định trả thưởng", 2);
        }
      }
    }
    if (nextProps.err != undefined) {
      Toast.info("Lỗi kết nối hệ thống", 2);
    }
  }

  showModal = key => e => {
    e.preventDefault();
    this.setState({
      [key]: true
    });
  };

  onClose = key => () => {
    this.setState({
      [key]: false
    });
  };

  onSelect = type => {
    if (type === 1) {
      this.props.onViettel(this.state.balance);
    }
    if (type === 2) {
      if (this.state.balance >= 500000) this.props.onBank(this.state.balance);
      else Toast.info("Chỉ áp dụng với số tiền lớn hơn hoặc bằng 500.000đ", 2);
    }
    this.setState({ modal: false });
  };

  renderModal = () => {
    return (
      <Modal
        visible={this.state.modal}
        transparent
        maskClosable={false}
        className={styles.content}
        onClose={this.onClose("modal")}
        title="Hình thức Chuyển thưởng"
        footer={[
          {
            text: "Đóng",
            onPress: () => {
              this.onClose("modal")();
            }
          }
        ]}
        wrapProps={{ onTouchStart: this.onWrapTouchStart }}
      >
        <ListItem onClick={() => this.onSelect(1)}>
          <img
            style={{ height: 30, width: 30 }}
            src={require("../../assets/zalopay.png")}
            alt=""
          />{" "}
          Ví Viettel pay
        </ListItem>
        <ListItem onClick={() => this.onSelect(2)}>
          <img
            style={{ height: 30, width: 30 }}
            src={require("../../assets/bank.png")}
            alt=""
          />{" "}
          Tài khoản ngân hàng
        </ListItem>
      </Modal>
    );
  };

  renderModalRulesText = () => {
    return (
      <Modal
        visible={this.state.modal1}
        transparent
        maskClosable={false}
        onClose={this.onClose("modal1")}
        title="Quy định Chuyển thưởng"
        style={{ width: "100%", margin: 10, padding: 0 }}
        footer={[
          {
            text: "Đóng",
            onPress: () => {
              this.onClose("modal1")();
            }
          }
        ]}
        wrapProps={{ onTouchStart: this.onWrapTouchStart }}
      >
        {this.rulesText()}
      </Modal>
    );
  };

  createMarkup() {
    return { __html: this.state.paymentRulesText };
  }

  rulesText() {
    return <div dangerouslySetInnerHTML={this.createMarkup()} />;
  }

  renderLogo = (item) => {
    if (item.MerchantID == 1) {
      return (
        <img
          src={require("../../assets/viettelpay.jpg")}
          style={{ width: 22, height: 22, marginRight: 5 }}
        />
      );
    } else if (item.MerchantID == 4) {
      return (
        <img
          src={require("../../assets/zalopay.png")}
          style={{ width: 22, height: 22, marginRight: 5 }}
        />
      );
    } else if (item.MerchantID == 5) {
      return (
        <img
          src={require("../../assets/viviet.png")}
          style={{ width: 22, height: 22, marginRight: 5 }}
        />
      );
    } else if (item.MerchantID == 6) {
      return (
        <img
          src={require("../../assets/vtc.png")}
          style={{ width: 22, height: 22, marginRight: 5 }}
        />
      );
    } else if (item.MerchantID == 7) {
      return (
        <img
          src={require("../../assets/airpay.png")}
          style={{ width: 22, height: 22, marginRight: 5 }}
        />
      );
    } else if (item.MerchantID == 143) {
      return (
        <img
          src={require("../../assets/icon_momo.png")}
          style={{ width: 22, height: 22, marginRight: 5 }}
        />
      );
    } else if (item.MerchantID == 8) {
      return (
        <img
          src={require("../../assets/logo_lucky_lotter.png")}
          style={{ width: 22, height: 22, marginRight: 5 }}
        />
      );
    } else if (item.BankID == 1) {
      return (
        <img
          src={require("../../assets/BIDV.jpg")}
          style={{ width: 22, height: 22, marginRight: 5 }}
        />
      );
    } else if (item.BankID == 2) {
      return (
        <img
          src={require("../../assets/SACOM.jpg")}
          style={{ width: 22, height: 22, marginRight: 5 }}
        />
      );
    } else if (item.BankID == 3) {
      return (
        <img
          src={require("../../assets/VIETTIN.jpg")}
          style={{ width: 22, height: 22, marginRight: 5 }}
        />
      );
    } else if (item.BankID == 4) {
      return (
        <img
          src={require("../../assets/VIETCOM.jpg")}
          style={{ width: 22, height: 22, marginRight: 5 }}
        />
      );
    }
  };

  renderList = () => {
    return (
      <div>
        <div style={{ padding: 12 }}>
          {this.state.data.map((item, index, data) => {
            return (
              <div
                key={item.ID}
                style={{ margin: "10px 0px", display: "flex" }}
              >
                <div>
                  <div
                    style={{ fontSize: "10pt", color: "#253854" }}
                  >
                    {item.TransType === 1
                      ? "Trả thưởng vé " + item.ProductName
                      : item.ReturnNumber === 0
                        ? "Đã chuyển thưởng"
                        : item.ReturnNumber === 1
                          ? "Chờ chuyển thưởng"
                          : "Chuyển thưởng không thành công"}
                  </div>
                  <div style={{ color: "#696969" }}>
                    {item.CreateDate}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "auto"
                  }}
                >
                  {this.renderLogo(item)}
                  {item.TransType === 1 ? (
                    <div style={{ color: "#39B54A" }}>
                      {"+" +
                        stringToNumberFormat(item.TransAmount) +
                        "đ"}
                    </div>
                  ) : item.ReturnNumber === 0 ? (
                    <div style={{ color: "#E32E35" }}>
                      {"-" +
                        stringToNumberFormat(item.TransAmount) +
                        "đ"}
                    </div>
                  ) : item.ReturnNumber === 1 ? (
                    <div style={{ color: "#FD9007" }}>
                      {"-" +
                        stringToNumberFormat(item.TransAmount) +
                        "đ"}
                    </div>
                  ) : (
                          <div style={{ color: "#253854" }}>
                            {"-" +
                              stringToNumberFormat(item.TransAmount) +
                              "đ"}
                          </div>
                        )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  onRules = () => {
    // this.props.onRules(this.state.paymentRulesText, this.state.balance);
    this.props.onComissionPayment();
  }

  render() {
    return (
      <div className={styles.content}>
        {this.renderModal()}
        <div
          style={{
            background: "#FFFFFF",
            padding: 8,
            display: "flex",
            alignItems: "center"
          }}
        >
          <div>
            <img
              style={{
                width: 36,
                height: 36,
                margin: 6,
                marginRight: 8
              }}
              src={require("../../assets/cup_do.png")}
              alt=""
            />
          </div>
          <div className={styles.text_amount}>
            {stringToNumberFormat(this.state.balance) + "đ"}
          </div>
          <div
            // onClick={this.showModal("modal")}
            onClick={() => this.onRules()}
            className={styles.change_btn}
            style={{ marginLeft: "auto" }}
          >
            Chuyển thưởng
          </div>
        </div>
        {/* <Button style={{marginLeft: "15px", marginRight:"15px", height:"40px", lineHeight: "40px", backgroundImage:"linear-gradient(to right, #0069FF, #0CB3FF)", borderRadius:"4px", color:"white"}} onClick={() => this.onRules()}>Quy định đổi thưởng</Button> */}
        {/* <div
          className={styles.primary_btn}
          style={{ margin: "0 10px", height: 32 }}
          onClick={() => this.onRules()}
        >
          Quy định Chuyển thưởng
        </div> */}
        <div style={{ background: "#FFFFFF", marginTop: 15 }}>
          {this.renderList()}
        </div>
      </div>
    );
  }
}
export default Main;
