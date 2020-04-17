import React from "react";
import { Text, Carousel, Button, WingBlank, Flex, Toast } from "antd-mobile";
import styles from "../../utils/mega645.less";
import { stringToNumberFormat, getBagName } from "../../utils/Helper";
import styles1 from "../Main.less";

class Lottery235Accept extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.setState(this.props.location.payload);
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps)
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
        <Text
          style={{
            width: 140,
            color: "red",
            fontSize: "12pt",
            textAlign: "right",
            fontWeight: "bold"
          }}
        >
          {stringToNumberFormat(this.state.aAmount)}đ
        </Text>
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
        <Text
          style={{
            width: 140,
            color: "red",
            fontSize: "12pt",
            textAlign: "right",
            fontWeight: "bold"
          }}
        >
          {stringToNumberFormat(this.state.bAmount)}đ
        </Text>
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
        <Text
          style={{
            width: 140,
            color: "red",
            fontSize: "12pt",
            textAlign: "right",
            fontWeight: "bold"
          }}
        >
          {stringToNumberFormat(this.state.cAmount)}đ
        </Text>
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
        <Text
          style={{
            width: 140,
            color: "red",
            fontSize: "12pt",
            textAlign: "right",
            fontWeight: "bold"
          }}
        >
          {stringToNumberFormat(this.state.dAmount)}đ
        </Text>
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
        <Text
          style={{
            width: 140,
            color: "red",
            fontSize: "12pt",
            textAlign: "right",
            fontWeight: "bold"
          }}
        >
          {stringToNumberFormat(this.state.eAmount)}đ
        </Text>
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

  header() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          fontSize: 20,
          marginTop: 4,
          marginRight: 10
        }}
      >
        <div style={{ alignSelf: "center" }}>Xổ số điện toán 235</div>
        <img
          style={{ width: 45, height: 50 }}
          src={require("../../assets/lottery_123.png")}
          alt=""
        />
      </div>
    );
  }

  renderTicket() {
    const system = this.state.systemInit.map((item, index, data) => {
      //console.log('ab',system);
      if (index < this.state.system) {
        return (
          <div
            key={index}
            style={{ padding: 8, marginTop: 8, background: "#FFF" }}
          >
            {this.header()}
            <WingBlank style={{ marginTop: 8 }}>
              {this.init()}
              <div style={{ marginTop: 10, marginBottom: 10 }}>
                <Text
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    fontSize: "12pt",
                    marginTop: 25
                  }}
                >
                  {item.label}
                </Text>
              </div>
            </WingBlank>
            <Flex style={{ padding: 8, borderTop: "1px solid gray" }}>
              <Text style={{ fontSize: "12pt", fontWeight: "bold" }}>
                Thành tiền:{" "}
              </Text>
              <Flex.Item className={styles.amount_mega_power}>
                <Text>{stringToNumberFormat(this.state.totalAmount/this.state.system)} đồng</Text>
              </Flex.Item>
            </Flex>
          </div>
        );
      }
    });
    return system;
  }
  render() {
    // console.log('a',this.props);
    // console.log('a',this.state.system);
    // console.log('b',this.props.location.payload.aNumber);
    
    return (
      <div className={styles1.content}>
        <div style={{ margin: 8, paddingBottom: 50 }}>
          {this.renderTicket()}
        </div>

        <div
          className={styles1.fixed_bottom}
          style={{
            display: "flex",
            paddingBottom: 13,
            background: "#FFFFFF"
          }}
        >
          <Button
            onClick={() => {
              this.props.onGoBack(this.props.location.payload);
            }}
            style={{
              width: "50%",
              marginRight: 4,
              marginLeft: 8,
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
              marginRight: 8,
              height: "40px",
              lineHeight: "40px"
            }}
            className={styles1.primary_btn}
          >
            <Text>Thanh toán</Text>
          </div>
        </div>
      </div>
    );
  }
}

export default Lottery235Accept;
