import React from 'react';
import {
  Text,
  Button,
  WingBlank,
  Carousel,
  Flex,
  WhiteSpace,
  Toast
} from "antd-mobile";
import 'antd-mobile/dist/antd-mobile.css';
import { ColorCarousel, ColorTextNumber } from '../../utils/ColorBase';
import styles from '../../utils/max4d.less';
import { stringToNumberFormat, getTypeName } from '../../utils/Helper';
import { FontSizeSystemTypeMax4D } from '../../utils/Params';
import styles2 from '../Main.less';

class Max4DAccept extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amountPayment: 0
    };
  }

  componentWillMount() {
    this.setState(this.props.location.payload);
  }

  componentDidMount() {
    let _amountPayment = 0;
    if (this.state.type === 1 || this.state.type === 4) {
      if (this.state.aIsAmount && this.state.aIsNumber)
        _amountPayment = this.state.aAmount;
      if (this.state.bIsAmount && this.state.bIsNumber)
        _amountPayment += this.state.bAmount;
      if (this.state.cIsAmount && this.state.cIsNumber)
        _amountPayment += this.state.cAmount;
      if (this.state.dIsAmount && this.state.dIsNumber)
        _amountPayment += this.state.dAmount;
      if (this.state.eIsAmount && this.state.eIsNumber)
        _amountPayment += this.state.eAmount;
      if (this.state.fIsAmount && this.state.fIsNumber)
        _amountPayment += this.state.fAmount;
      _amountPayment = _amountPayment * this.state.systemMax4D.length;
    } else if (this.state.type === 2 || this.state.type === 3) {
      if (this.state.aIsAmount && this.state.aIsNumber)
        _amountPayment = this.state.aAmount;
      if (this.state.bIsAmount && this.state.bIsNumber)
        _amountPayment += this.state.bAmount;
      if (this.state.cIsAmount && this.state.cIsNumber)
        _amountPayment += this.state.cAmount;
      if (this.state.dIsAmount && this.state.dIsNumber)
        _amountPayment += this.state.dAmount;
      if (this.state.eIsAmount && this.state.eIsNumber)
        _amountPayment += this.state.eAmount;
      if (this.state.fIsAmount && this.state.fIsNumber)
        _amountPayment += this.state.fAmount;
      _amountPayment = _amountPayment * this.state.systemMax4D.length * 10;
    } else if (this.state.type === 5) {
      if (this.state.aIsAmount && this.state.aIsNumber)
        _amountPayment = this.amountSysA();
      if (this.state.bIsAmount && this.state.bIsNumber)
        _amountPayment += this.amountSysB();
      if (this.state.cIsAmount && this.state.cIsNumber)
        _amountPayment += this.amountSysC();
      if (this.state.dIsAmount && this.state.dIsNumber)
        _amountPayment += this.amountSysD();
      if (this.state.eIsAmount && this.state.eIsNumber)
        _amountPayment += this.amountSysE();
      if (this.state.fIsAmount && this.state.fIsNumber)
        _amountPayment += this.amountSysF();
    }

    this.setState({ amountPayment: _amountPayment });
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
    data.ProductID = 2;
    data.MerchantID = localStorage.getItem("merchant_id");
    data.Amount = this.state.amountPayment;
    this.props.onGetFee(data);
  }

  amountSysA = () => {
    let _totalAmount = 0;
    let _arrNew = [];
    let _arrNew1 = [];

    this.state.aNumber.map((item, index, data) => {
      if (_arrNew.length === 0) _arrNew.push(item);
      else {
        if (!_arrNew.some(x => x === item)) {
          _arrNew.push(item);
        } else {
          if (!_arrNew1.some(x => x === item)) _arrNew1.push(item);
        }
      }
      return item;
    });
    if (_arrNew.length === 2 && _arrNew1.length === 1) {
      this.setState({ typeItem: 4 });
      _totalAmount = this.state.aAmount * 4 * this.state.systemMax4D.length;
    } else if (_arrNew.length === 2 && _arrNew1.length === 2) {
      this.setState({ typeItem: 6 });
      _totalAmount = this.state.aAmount * 6 * this.state.systemMax4D.length;
    } else if (_arrNew.length === 3) {
      this.setState({ typeItem: 12 });
      _totalAmount = this.state.aAmount * 12 * this.state.systemMax4D.length;
    } else if (_arrNew.length === 4) {
      this.setState({ typeItem: 12 });
      _totalAmount = this.state.aAmount * 24 * this.state.systemMax4D.length;
    }

    return _totalAmount;
  };

  amountSysB = () => {
    let _totalAmount = 0;
    let _arrNew = [];
    let _arrNew1 = [];

    this.state.bNumber.map((item, index, data) => {
      if (_arrNew.length === 0) _arrNew.push(item);
      else {
        if (!_arrNew.some(x => x === item)) {
          _arrNew.push(item);
        } else {
          if (!_arrNew1.some(x => x === item)) _arrNew1.push(item);
        }
      }
      return item;
    });
    if (_arrNew.length === 2 && _arrNew1.length === 1) {
      this.setState({ typeItem: 4 });
      _totalAmount += this.state.bAmount * 4 * this.state.systemMax4D.length;
    } else if (_arrNew.length === 2 && _arrNew1.length === 2) {
      this.setState({ typeItem: 6 });
      _totalAmount += this.state.bAmount * 6 * this.state.systemMax4D.length;
    } else if (_arrNew.length === 3) {
      this.setState({ typeItem: 12 });
      _totalAmount += this.state.bAmount * 12 * this.state.systemMax4D.length;
    } else if (_arrNew.length === 4) {
      this.setState({ typeItem: 12 });
      _totalAmount += this.state.bAmount * 24 * this.state.systemMax4D.length;
    }
    return _totalAmount;
  };

  amountSysC = () => {
    let _totalAmount = 0;
    let _arrNew = [];
    let _arrNew1 = [];

    this.state.cNumber.map((item, index, data) => {
      if (_arrNew.length === 0) _arrNew.push(item);
      else {
        if (!_arrNew.some(x => x === item)) {
          _arrNew.push(item);
        } else {
          if (!_arrNew1.some(x => x === item)) _arrNew1.push(item);
        }
      }
      return item;
    });
    if (_arrNew.length === 2 && _arrNew1.length === 1) {
      this.setState({ typeItem: 4 });
      _totalAmount += this.state.cAmount * 4 * this.state.systemMax4D.length;
    } else if (_arrNew.length === 2 && _arrNew1.length === 2) {
      this.setState({ typeItem: 6 });
      _totalAmount += this.state.cAmount * 6 * this.state.systemMax4D.length;
    } else if (_arrNew.length === 3) {
      this.setState({ typeItem: 12 });
      _totalAmount += this.state.cAmount * 12 * this.state.systemMax4D.length;
    } else if (_arrNew.length === 4) {
      this.setState({ typeItem: 12 });
      _totalAmount += this.state.cAmount * 24 * this.state.systemMax4D.length;
    }
    return _totalAmount;
  };

  amountSysD = () => {
    let _totalAmount = 0;
    let _arrNew = [];
    let _arrNew1 = [];
    this.state.dNumber.map((item, index, data) => {
      if (_arrNew.length === 0) _arrNew.push(item);
      else {
        if (!_arrNew.some(x => x === item)) {
          _arrNew.push(item);
        } else {
          if (!_arrNew1.some(x => x === item)) _arrNew1.push(item);
        }
      }
      return item;
    });

    if (_arrNew.length === 2 && _arrNew1.length === 1) {
      this.setState({ typeItem: 4 });
      _totalAmount += this.state.dAmount * 4 * this.state.systemMax4D.length;
    } else if (_arrNew.length === 2 && _arrNew1.length === 2) {
      this.setState({ typeItem: 6 });
      _totalAmount += this.state.dAmount * 6 * this.state.systemMax4D.length;
    } else if (_arrNew.length === 3) {
      this.setState({ typeItem: 12 });
      _totalAmount += this.state.dAmount * 12 * this.state.systemMax4D.length;
    } else if (_arrNew.length === 4) {
      this.setState({ typeItem: 12 });
      _totalAmount += this.state.dAmount * 24 * this.state.systemMax4D.length;
    }

    return _totalAmount;
  };

  amountSysE = () => {
    let _totalAmount = 0;
    let _arrNew = [];
    let _arrNew1 = [];
    this.state.eNumber.map((item, index, data) => {
      if (_arrNew.length === 0) _arrNew.push(item);
      else {
        if (!_arrNew.some(x => x === item)) {
          _arrNew.push(item);
        } else {
          if (!_arrNew1.some(x => x === item)) _arrNew1.push(item);
        }
      }
      return item;
    });

    if (_arrNew.length === 2 && _arrNew1.length === 1) {
      this.setState({ typeItem: 4 });
      _totalAmount += this.state.eAmount * 4 * this.state.systemMax4D.length;
    } else if (_arrNew.length === 2 && _arrNew1.length === 2) {
      this.setState({ typeItem: 6 });
      _totalAmount += this.state.eAmount * 6 * this.state.systemMax4D.length;
    } else if (_arrNew.length === 3) {
      this.setState({ typeItem: 12 });
      _totalAmount += this.state.eAmount * 12 * this.state.systemMax4D.length;
    } else if (_arrNew.length === 4) {
      this.setState({ typeItem: 12 });
      _totalAmount += this.state.eAmount * 24 * this.state.systemMax4D.length;
    }
    return _totalAmount;
  };

  amountSysF = () => {
    let _totalAmount = 0;
    let _arrNew = [];
    let _arrNew1 = [];
    this.state.fNumber.map((item, index, data) => {
      if (_arrNew.length === 0) _arrNew.push(item);
      else {
        if (!_arrNew.some(x => x === item)) {
          _arrNew.push(item);
        } else {
          if (!_arrNew1.some(x => x === item)) _arrNew1.push(item);
        }
      }
      return item;
    });

    if (_arrNew.length === 2 && _arrNew1.length === 1) {
      this.setState({ typeItem: 4 });
      _totalAmount += this.state.fAmount * 4 * this.state.systemMax4D.length;
    } else if (_arrNew.length === 2 && _arrNew1.length === 2) {
      this.setState({ typeItem: 6 });
      _totalAmount += this.state.fAmount * 6 * this.state.systemMax4D.length;
    } else if (_arrNew.length === 3) {
      this.setState({ typeItem: 12 });
      _totalAmount += this.state.fAmount * 12 * this.state.systemMax4D.length;
    } else if (_arrNew.length === 4) {
      this.setState({ typeItem: 12 });
      _totalAmount += this.state.fAmount * 24 * this.state.systemMax4D.length;
    }
    return _totalAmount;
  };

  renderAccept = () => {
    let item = {};
    let value = [];
    if (this.state.aIsAmount && this.state.aIsNumber) {
      item = this.rendervalueA();
      value.push(item);
    }
    if (this.state.bIsAmount && this.state.bIsNumber) {
      item = this.rendervalueB();
      value.push(item);
    }
    if (this.state.cIsAmount && this.state.cIsNumber) {
      item = this.rendervalueC();
      value.push(item);
    }
    if (this.state.dIsAmount && this.state.dIsNumber) {
      item = this.rendervalueD();
      value.push(item);
    }
    if (this.state.eIsAmount && this.state.eIsNumber) {
      item = this.rendervalueE();
      value.push(item);
    }
    if (this.state.fIsAmount && this.state.fIsNumber) {
      item = this.rendervalueF();
      value.push(item);
    }
    return value;
  };

  rendervalueA = () => {
    return (
      <div key="valueA">
        <Flex>
          <Text className={styles.text_header_accept}>A</Text>

          <Text className={styles.text_number_accept}>
            {this.state.aNumber[0]}
          </Text>
          <Text className={styles.text_number_accept}>
            {this.state.aNumber[1]}
          </Text>
          <Text className={styles.text_number_accept}>
            {this.state.aNumber[2]}
          </Text>
          <Text className={styles.text_number_accept}>
            {this.state.aNumber[3]}
          </Text>

          <Text
            style={{
              width: FontSizeSystemTypeMax4D,
              color: ColorTextNumber,
              fontSize: 20,
              textAlign: "center"
            }}
          >
            {this.getName("A")}
          </Text>
          <Text
            style={{
              width: 140,
              color: "red",
              fontSize: 20,
              textAlign: "right"
            }}
          >
            {stringToNumberFormat(this.state.aAmount)}đ
          </Text>
        </Flex>
        <WhiteSpace />
      </div>
    );
  };

  rendervalueB = () => {
    return (
      <div key="valueB">
        <Flex>
          <Text className={styles.text_header_accept}>B</Text>

          <Text className={styles.text_number_accept}>
            {this.state.bNumber[0]}
          </Text>
          <Text className={styles.text_number_accept}>
            {this.state.bNumber[1]}
          </Text>
          <Text className={styles.text_number_accept}>
            {this.state.bNumber[2]}
          </Text>
          <Text className={styles.text_number_accept}>
            {this.state.bNumber[3]}
          </Text>

          <Text
            style={{
              width: FontSizeSystemTypeMax4D,
              color: ColorTextNumber,
              fontSize: 20,
              textAlign: "center"
            }}
          >
            {this.getName("B")}
          </Text>
          <Text
            style={{
              width: 140,
              color: "red",
              fontSize: 20,
              textAlign: "right"
            }}
          >
            {stringToNumberFormat(this.state.bAmount)}đ
          </Text>
        </Flex>
        <WhiteSpace />
      </div>
    );
  };

  rendervalueC = () => {
    return (
      <div key="valueC">
        <Flex>
          <Text className={styles.text_header_accept}>C</Text>

          <Text className={styles.text_number_accept}>
            {this.state.cNumber[0]}
          </Text>
          <Text className={styles.text_number_accept}>
            {this.state.cNumber[1]}
          </Text>
          <Text className={styles.text_number_accept}>
            {this.state.cNumber[2]}
          </Text>
          <Text className={styles.text_number_accept}>
            {this.state.cNumber[3]}
          </Text>

          <Text
            style={{
              width: FontSizeSystemTypeMax4D,
              color: ColorTextNumber,
              fontSize: 20,
              textAlign: "center"
            }}
          >
            {this.getName("C")}
          </Text>
          <Text
            style={{
              width: 140,
              color: "red",
              fontSize: 20,
              textAlign: "right"
            }}
          >
            {stringToNumberFormat(this.state.cAmount)}đ
          </Text>
        </Flex>
        <WhiteSpace />
      </div>
    );
  };

  rendervalueD = () => {
    return (
      <div key="valueD">
        <Flex>
          <Text className={styles.text_header_accept}>D</Text>

          <Text className={styles.text_number_accept}>
            {this.state.dNumber[0]}
          </Text>
          <Text className={styles.text_number_accept}>
            {this.state.dNumber[1]}
          </Text>
          <Text className={styles.text_number_accept}>
            {this.state.dNumber[2]}
          </Text>
          <Text className={styles.text_number_accept}>
            {this.state.dNumber[3]}
          </Text>

          <Text
            style={{
              width: FontSizeSystemTypeMax4D,
              color: ColorTextNumber,
              fontSize: 20,
              textAlign: "center"
            }}
          >
            {this.getName("D")}
          </Text>
          <Text
            style={{
              width: 140,
              color: "red",
              fontSize: 20,
              textAlign: "right"
            }}
          >
            {stringToNumberFormat(this.state.dAmount)}đ
          </Text>
        </Flex>
        <WhiteSpace />
      </div>
    );
  };

  rendervalueE = () => {
    return (
      <div key="valueE">
        <Flex>
          <Text className={styles.text_header_accept}>E</Text>

          <Text className={styles.text_number_accept}>
            {this.state.eNumber[0]}
          </Text>
          <Text className={styles.text_number_accept}>
            {this.state.eNumber[1]}
          </Text>
          <Text className={styles.text_number_accept}>
            {this.state.eNumber[2]}
          </Text>
          <Text className={styles.text_number_accept}>
            {this.state.eNumber[3]}
          </Text>

          <Text
            style={{
              width: FontSizeSystemTypeMax4D,
              color: ColorTextNumber,
              fontSize: 20,
              textAlign: "center"
            }}
          >
            {this.getName("E")}
          </Text>
          <Text
            style={{
              width: 140,
              color: "red",
              fontSize: 20,
              textAlign: "right"
            }}
          >
            {stringToNumberFormat(this.state.eAmount)}đ
          </Text>
        </Flex>
        <WhiteSpace />
      </div>
    );
  };

  rendervalueF = () => {
    return (
      <div key="valueF">
        <Flex>
          <Text className={styles.text_header_accept}>F</Text>

          <Text className={styles.text_number_accept}>
            {this.state.fNumber[0]}
          </Text>
          <Text className={styles.text_number_accept}>
            {this.state.fNumber[1]}
          </Text>
          <Text className={styles.text_number_accept}>
            {this.state.fNumber[2]}
          </Text>
          <Text className={styles.text_number_accept}>
            {this.state.fNumber[3]}
          </Text>

          <Text
            style={{
              width: FontSizeSystemTypeMax4D,
              color: ColorTextNumber,
              fontSize: 20,
              textAlign: "center"
            }}
          >
            {this.getName("F")}
          </Text>
          <Text
            style={{
              width: 140,
              color: "red",
              fontSize: 20,
              textAlign: "right"
            }}
          >
            {stringToNumberFormat(this.state.fAmount)}đ
          </Text>
        </Flex>
        <WhiteSpace />
      </div>
    );
  };

  initSystem() {
    if (this.state.systemMax4D) {
      const arr = this.state.systemMax4D.sort((a, b) => a.value - b.value);
      const system = arr.map((item, index, data) => {
        return (
          <Text
            key={index}
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: 18,
              marginTop: 6
            }}
          >
            {item.label}
          </Text>
        );
      });
      return system;
    } else return <Text />;
  }

  getName(type) {
    let name = "";
    if (this.state.type === 4 || this.state.type === 5) {
      switch (type) {
        case "A":
          name = this.state.typeItemA + "x";
          break;
        case "B":
          name = this.state.typeItemB + "x";
          break;
        case "C":
          name = this.state.typeItemC + "x";
          break;
        case "D":
          name = this.state.typeItemD + "x";
          break;
        case "E":
          name = this.state.typeItemE + "x";
          break;
        case "F":
          name = this.state.typeItemF + "x";
          break;
        default:
          break;
      }
    }
    return name;
  }
  RenderSystem() {
    if (this.state.systemMax4D) {
      const arr = this.state.systemMax4D.sort((a, b) => a.value - b.value);
      const system = arr.map((item, index, data) => {
        return (
          <div key={index}>
            <WingBlank>
              <div style={{ padding: 8, marginTop: 8, background: "#FFF" }}>
                {/* <Text style={{ display: "flex", flexDirection: "row", justifyContent: "center", fontSize: 20, marginBottom: 20 }}>{getTypeName(this.state.type)}</Text> */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    fontSize: 20,
                    marginTop: 4,
                    marginRight: 10
                  }}
                >
                  <div
                    style={{
                      textAlign: "center",
                      width: "100%",
                      paddingTop: 17
                    }}
                  >
                    {getTypeName(this.state.type)}
                  </div>
                  <img
                    style={{ width: 80, height: 50 }}
                    src={require("../../assets/max4d.png")}
                    alt=""
                  />
                </div>
                <WingBlank style={{ marginTop: 10 }}>
                  {this.renderAccept()}
                  <div style={{ marginTop: 10, marginBottom: 10 }}>
                    <Text
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        fontSize: 18,
                        marginTop: 6
                      }}
                    >
                      {item.label}
                    </Text>
                  </div>
                </WingBlank>
                <Flex style={{ padding: 8, borderTop: "1px solid gray" }}>
                  <Text style={{ fontSize: "16px", fontWeight: "bold" }}>
                    Thành tiền:{" "}
                  </Text>
                  <Text className={styles.amount_max4d}>
                    {" "}
                    {stringToNumberFormat(
                      this.state.amountPayment / this.state.systemMax4D.length
                    )}{" "}
                    đ
                  </Text>
                </Flex>
              </div>
            </WingBlank>
          </div>
        );
      });
      return system;
    } else return <Text />;
  }

  render() {
    return (
      <div className={styles2.content}>
        {this.RenderSystem()}
        <WingBlank>
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
                className={styles2.primary_btn}
                onClick={() => {
                  this.onPayment();
                }}
                style={{ width: "50%", marginLeft: 4 }}
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
export default Max4DAccept;
