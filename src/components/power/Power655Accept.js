import React from 'react';
import { Text, Carousel, Button, WingBlank, Flex, Toast } from "antd-mobile";
import styles from '../../utils/mega645.less';
import { stringToNumberFormat, getBagName } from '../../utils/Helper';
import styles1 from '../Main.less';


class Power655Accept extends React.Component {

  componentWillMount() {
    this.setState(this.props.location.payload);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fee !== undefined && nextProps.fee.data !== undefined) {
      if (nextProps.fee.data.Code == "00") {
        this.props.onPayment(this.state, nextProps.fee.data.Value);
      } else {
        Toast.info("Lỗi tính phí", 2);
      }
    }
    if (nextProps.err !== undefined) {
      Toast.info("Lỗi kết nối", 2);
    }
  }

  onPayment() {
    const data = {};
    data.ProductID = this.state.productID;
    data.MerchantID = localStorage.getItem("merchant_id");
    data.Amount = this.state.totalAmount;
    this.props.onGetFee(data);
  }

  init() {
    let item = {};
    let value = [];
    if (this.state.aIsCheck) {
      item = this.initaNumber();
      value.push(item);
    }
    if (this.state.bIsCheck) {
      item = this.initbNumber();
      value.push(item);
    }
    if (this.state.cIsCheck) {
      item = this.initcNumber();
      value.push(item);
    }
    if (this.state.dIsCheck) {
      item = this.initdNumber();
      value.push(item);
    }
    if (this.state.eIsCheck) {
      item = this.initeNumber();
      value.push(item);
    }
    if (this.state.fIsCheck) {
      item = this.initfNumber();
      value.push(item);
    }
    return value;
  }

  initaNumber = () => {
    const number = this.state.aNumber.map((item, index, data) => {
      return (
        <Text key={index} className={styles.text_number_non_circle}>
          {item}
        </Text>
      );
    });

    return (
      <div key="anumber" className={styles.row_number}>
        <Text
          className={styles.text_header}
          style={{ float: "left", width: 40, fontWeight: "bold" }}
        >
          A
        </Text>
        <div style={{ width: "100%" }}>{number}</div>
      </div>
    );
  };

  initbNumber = () => {
    const number = this.state.bNumber.map((item, index, data) => {
      return (
        <Text key={index} className={styles.text_number_non_circle}>
          {item}
        </Text>
      );
    });

    return (
      <div key="bnumber" className={styles.row_number}>
        <Text
          className={styles.text_header}
          style={{ float: "left", width: 40, fontWeight: "bold" }}
        >
          B
        </Text>
        <div style={{ width: "100%" }}>{number}</div>
      </div>
    );
  };

  initcNumber = () => {
    const number = this.state.cNumber.map((item, index, data) => {
      return (
        <Text key={index} className={styles.text_number_non_circle}>
          {item}
        </Text>
      );
    });

    return (
      <div key="cnumber" className={styles.row_number}>
        <Text
          className={styles.text_header}
          style={{ float: "left", width: 40, fontWeight: "bold" }}
        >
          C
        </Text>
        <div style={{ width: "100%" }}>{number}</div>
      </div>
    );
  };

  initdNumber = () => {
    const number = this.state.dNumber.map((item, index, data) => {
      return (
        <Text key={index} className={styles.text_number_non_circle}>
          {item}
        </Text>
      );
    });

    return (
      <div key="dnumber" className={styles.row_number}>
        <Text
          className={styles.text_header}
          style={{ float: "left", width: 40, fontWeight: "bold" }}
        >
          D
        </Text>
        <div style={{ width: "100%" }}>{number}</div>
      </div>
    );
  };

  initeNumber = () => {
    const number = this.state.eNumber.map((item, index, data) => {
      return (
        <Text key={index} className={styles.text_number_non_circle}>
          {item}
        </Text>
      );
    });

    return (
      <div key="enumber" className={styles.row_number}>
        <Text
          className={styles.text_header}
          style={{ float: "left", width: 40, fontWeight: "bold" }}
        >
          E
        </Text>
        <div style={{ width: "100%" }}>{number}</div>
      </div>
    );
  };

  initfNumber = () => {
    const number = this.state.fNumber.map((item, index, data) => {
      return (
        <Text key={index} className={styles.text_number_non_circle}>
          {item}
        </Text>
      );
    });

    return (
      <div key="fnumber" className={styles.row_number}>
        <Text
          className={styles.text_header}
          style={{ float: "left", width: 40, fontWeight: "bold" }}
        >
          F
        </Text>
        <div style={{ width: "100%" }}>{number}</div>
      </div>
    );
  };

  initSystem() {
    const arr = this.state.system.sort((a, b) => a.value - b.value);
    const system = arr.map((item, index, data) => {
      return (
        <Text
          key={index}
          style={{
            display: "flex",
            justifyContent: "flex-start",
            fontSize: 18,
            marginTop: 25
          }}
        >
          {item.label}
        </Text>
      );
    });
    return system;
  }
  header() {
    if (this.state.productID === 1) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            fontSize: 20,
            marginTop: 4,
            marginRight: 10
          }}
        >
          <img
            className={styles1.div_imgicon1}
            src={require("../../assets/icon11.png")}
            alt=""
          />
          <div style={{ textAlign: "center", width: "100%", paddingTop: 17, zIndex: 2 }}>
            {getBagName(this.state.bagitem)}
          </div>
          <img
            style={{ width: 80, height: 50 }}
            src={require("../../assets/mega.png")}
            alt=""
          />
        </div>
      );
    } else {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            fontSize: 20,
            marginTop: 4,
            marginRight: 10
          }}
        >
          <img
            className={styles1.div_imgicon1}
            src={require("../../assets/icon11.png")}
            alt=""
          />
          <div style={{ textAlign: "center", width: "100%", paddingTop: 17, zIndex: 2 }}>
            {getBagName(this.state.bagitem)}
          </div>
          <img
            style={{ width: 80, height: 50 }}
            src={require("../../assets/power.png")}
            alt=""
          />
        </div>
      );
    }
  }
  renderTicket() {
    const arr = this.state.system.sort((a, b) => a.value - b.value);
    const system = arr.map((item, index, data) => {
      return (
        <div style={{ padding: 8, marginTop: 8, background: "#FFF" }}>
          {this.header()}
          <WingBlank style={{ marginTop: 8 }}>
            {this.init()}
            <div style={{ marginTop: 10, marginBottom: 10 }}>
              <Text
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  fontSize: 18,
                  marginTop: 25
                }}
              >
                {item.label}
              </Text>
            </div>
          </WingBlank>
          <Flex style={{ padding: 8, borderTop: "1px solid gray", zIndex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Thành tiền:{" "}
            </Text>
            <Flex.Item className={styles.amount_mega_power}>
              <Text>
                {stringToNumberFormat(
                  this.state.totalAmount / this.state.system.length
                )}{" "}
                đồng
              </Text>
            </Flex.Item>
            <img
              className={styles1.div_imgicon2}
              src={require("../../assets/icon12.png")}
              alt=""
            />
          </Flex>
        </div >
      );
    });
    return system;
  }
  render() {
    return (
      <div className={styles1.content}>
        <WingBlank style={{ margin: 8 }}>
          {this.renderTicket()}
          <div style={{ marginTop: 8 }}>
            <Flex>
              <Button
                onClick={() => {
                  this.props.location.payload.productID == 1
                    ? this.props.onGoBack(this.props.location.payload)
                    : this.props.onGoBackPW(this.props.location.payload);
                }}
                style={{
                  width: "50%",
                  marginRight: 4,
                  height: "40px",
                  lineHeight: "40px"
                }}
                type="warning"
              >
                <Text>Chọn lại</Text>
              </Button>
              <div
                onClick={() => {
                  this.onPayment();
                }}
                style={{
                  width: "50%",
                  marginLeft: 4,
                  height: "40px",
                  lineHeight: "40px"
                }}
                className={styles1.primary_btn}
              >
                <Text>Thanh toán</Text>
              </div>
            </Flex>
          </div>
        </WingBlank>
      </div>
    );
  }
}

export default Power655Accept;
