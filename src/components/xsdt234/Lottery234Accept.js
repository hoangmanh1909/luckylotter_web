import React from 'react';
import { Text, Carousel, Button, WingBlank, Flex, Toast } from "antd-mobile";
import styles from './lottery234.less';
import { stringToNumberFormat, getBagName } from '../../utils/Helper';
import styles1 from '../Main.less';


class Lottery234Accept extends React.Component {

  componentWillMount() {
    this.setState(this.props.location.payload);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
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
    data.Amount =
      this.state.tabIndex == 1
        ? this.state.totalAmount
        : this.state.totalAmountParity;
    this.props.onGetFee(data);
  }

  init() {
    let item = {};
    let value = [];
    if (this.state.tabIndex == 1) {
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
    } else if (this.state.tabIndex == 2) {
      if (this.state.isEvenNumberA || this.state.isOddNumberA) {
        item = this.initParity(1);
        value.push(item);
      }
      if (this.state.isEvenNumberB || this.state.isOddNumberB) {
        item = this.initParity(2);
        value.push(item);
      }
      if (this.state.isEvenNumberC || this.state.isOddNumberC) {
        item = this.initParity(3);
        value.push(item);
      }
      if (this.state.isBigNumberA || this.state.isSmallNumberA) {
        item = this.initParity(4);
        value.push(item);
      }
      if (this.state.isBigNumberB || this.state.isSmallNumberB) {
        item = this.initParity(5);
        value.push(item);
      }
      if (this.state.isBigNumberC || this.state.isSmallNumberC) {
        item = this.initParity(6);
        value.push(item);
      }
    }
    return value;
  }

  initParity = type => {
    let name;
    let amount = 0;
    if (type == 1) {
      amount = this.state.aAmountO;
      if (this.state.isEvenNumberA) {
        name = "Chẵn";
      } else if (this.state.isOddNumberA) {
        name = "Lẻ";
      }
    } else if (type == 2) {
      amount = this.state.bAmountO;
      if (this.state.isEvenNumberB) {
        name = "Chẵn";
      } else if (this.state.isOddNumberB) {
        name = "Lẻ";
      }
    }
    else if (type == 3) {
      amount = this.state.cAmountO;
      if (this.state.isEvenNumberC) {
        name = "Chẵn";
      } else if (this.state.isOddNumberC) {
        name = "Lẻ";
      }
    }
    else if (type == 4) {
      amount = this.state.dAmountO;
      if (this.state.isBigNumberA) {
        name = "Lớn";
      } else if (this.state.isSmallNumberA) {
        name = "Nhỏ";
      }
    }
    else if (type == 5) {
      amount = this.state.eAmountO;
      if (this.state.isBigNumberB) {
        name = "Lớn";
      } else if (this.state.isSmallNumberB) {
        name = "Nhỏ";
      }
    }
    else if (type == 6) {
      amount = this.state.fAmountO;
      if (this.state.isBigNumberC) {
        name = "Lớn";
      } else if (this.state.isSmallNumberC) {
        name = "Nhỏ";
      }
    }
    return (
      <div key={`pa${type}`} className={styles.row_number}>
        <Text
          className={styles.text_header}
          style={{ float: "left", width: 40, fontWeight: "bold" }}
        >
          A
        </Text>
        <div
          className={styles.text_number_non_circle}
          style={{ textAlign: "left" }}
        >
          {name}
        </div>
        <div style={{ marginLeft: 15 }}>
          <Text style={{ color: "red", fontWeight: "bold", fontSize: 18 }}>
            {stringToNumberFormat(amount)}
          </Text>
        </div>
      </div>
    );
  };

  initaNumber = () => {
    const number = this.state.aNumber.map((item, index, data) => {
      return (
        <Text key={index} className={styles.text_number_non_circle}>
          {item.toString().padStart(2, '0')}
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
        <div style={{ width: 200, borderRight: "1px solid #c3c5c6" }}>{number}</div>
        <div style={{ marginLeft: 15 }}><Text style={{ color: "#f36026" }}>Bậc {this.state.aNumber.length}</Text> <br />
          <Text style={{ color: "red", fontWeight: "bold", fontSize: 18 }}>{stringToNumberFormat(this.state.aAmount)}</Text></div>
      </div>
    );
  };

  initbNumber = () => {
    const number = this.state.bNumber.map((item, index, data) => {
      return (
        <Text key={index} className={styles.text_number_non_circle}>
          {item.toString().padStart(2, '0')}
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
        <div style={{ width: 200, borderRight: "1px solid #c3c5c6" }}>{number}</div>
        <div style={{ marginLeft: 15 }}><Text style={{ color: "#f36026" }}>Bậc {this.state.bNumber.length}</Text> <br />
          <Text style={{ color: "red", fontWeight: "bold", fontSize: 18 }}>{stringToNumberFormat(this.state.bAmount)}</Text></div>
      </div>
    );
  };

  initcNumber = () => {
    const number = this.state.cNumber.map((item, index, data) => {
      return (
        <Text key={index} className={styles.text_number_non_circle}>
          {item.toString().padStart(2, '0')}
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
        <div style={{ width: 200, borderRight: "1px solid #c3c5c6" }}>{number}</div>
        <div style={{ marginLeft: 15 }}><Text style={{ color: "#f36026" }}>Bậc {this.state.cNumber.length}</Text> <br />
          <Text style={{ color: "red", fontWeight: "bold", fontSize: 18 }}>{stringToNumberFormat(this.state.cAmount)}</Text></div>
      </div>
    );
  };

  initdNumber = () => {
    const number = this.state.dNumber.map((item, index, data) => {
      return (
        <Text key={index} className={styles.text_number_non_circle}>
          {item.toString().padStart(2, '0')}
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
        <div style={{ width: 200, borderRight: "1px solid #c3c5c6" }}>{number}</div>
        <div style={{ marginLeft: 15 }}><Text style={{ color: "#f36026" }}>Bậc {this.state.dNumber.length}</Text> <br />
          <Text style={{ color: "red", fontWeight: "bold", fontSize: 18 }}>{stringToNumberFormat(this.state.dAmount)}</Text></div>
      </div>
    );
  };

  initeNumber = () => {
    const number = this.state.eNumber.map((item, index, data) => {
      return (
        <Text key={index} className={styles.text_number_non_circle}>
          {item.toString().padStart(2, '0')}
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
        <div style={{ width: 200, borderRight: "1px solid #c3c5c6" }}>{number}</div>
        <div style={{ marginLeft: 15 }}><Text style={{ color: "#f36026" }}>Bậc {this.state.eNumber.length}</Text> <br />
          <Text style={{ color: "red", fontWeight: "bold", fontSize: 18 }}>{stringToNumberFormat(this.state.eAmount)}</Text></div>
      </div>
    );
  };

  initfNumber = () => {
    const number = this.state.fNumber.map((item, index, data) => {
      return (
        <Text key={index} className={styles.text_number_non_circle}>
          {item.toString().padStart(2, '0')}
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
        <div style={{ width: 200, borderRight: "1px solid #c3c5c6" }}>{number}</div>
        <div style={{ marginLeft: 15 }}><Text style={{ color: "#f36026" }}>Bậc {this.state.fNumber.length}</Text> <br />
          <Text style={{ color: "red", fontWeight: "bold", fontSize: 16 }}>{stringToNumberFormat(this.state.fAmount)}</Text></div>
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
        {/* <div style={{ textAlign: "center", width: "100%", paddingTop: 17 }}>
            {getBagName(this.state.bagitem)}
          </div> */}
        <div style={{ textAlign: "center", width: "100%", paddingTop: 5, paddingBottom: 5 }}>
          <Text style={{ fontWeight: "bold" }}>Keno</Text> <br />
          <Text style={{ fontWeight: "bold", border: "1px solid red", fontSize: 16, borderRadius: 7, paddingBottom: 3, paddingTop: 3, paddingLeft: 20, paddingRight: 20, color: "red", fontWeight: "bold" }}>{this.state.tabIndex == 1
            ? this.state.systemKeno
            : this.state.systemKenoParity}{" "}
            kỳ</Text>
        </div>
        <img
          style={{ width: 80, height: 50 }}
          src={require("../../assets/keno_logo.png")}
          alt=""
        />
      </div>
    );
  }
  renderTicket() {
    // const arr = this.state.system.sort((a, b) => a.value - b.value);
    // const system = arr.map((item, index, data) => {
    return (
      <div style={{ padding: 4, marginTop: 8, background: "#FFF" }}>
        {this.header()}
        <WingBlank style={{ marginTop: 8 }}>
          {this.init()}
          <div style={{ marginTop: 10, marginBottom: 10 }}>
            <Text
              style={{
                display: "flex",
                justifyContent: "flex-start",
                fontSize: 18,
                marginTop: 25
              }}
            >
              {/* {item.label} */}
            </Text>
          </div>
        </WingBlank>
        <Flex style={{ padding: 8, borderTop: "1px solid gray" }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Thành tiền:{" "}
          </Text>
          <Flex.Item className={styles.amount_mega_power}>
            <Text>
              {this.state.tabIndex == 1
                ? stringToNumberFormat(this.state.totalAmount)
                : stringToNumberFormat(this.state.totalAmountParity)}{" "}
              đồng
              </Text>
          </Flex.Item>
        </Flex>
      </div>
    );
    // });
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
                  this.props.onGoBack(this.props.location.payload);
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

export default Lottery234Accept;
