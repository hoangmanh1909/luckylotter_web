import React from "react";
import {
  Text,
  WhiteSpace,
  Flex,
  ActionSheet,
  WingBlank,
  Carousel,
  Button,
  Picker,
  Toast,
  ActivityIndicator
} from "antd-mobile";
import "antd-mobile/dist/antd-mobile.css";
import styles from "./keno.less";
import styles1 from "../../index.css";
import styles2 from "../Main.less";
import button from "../Button.less"
import { ColorButton, ColorButtonText } from "../../utils/ColorBase";
import { stringToNumberFormat } from "../../utils/Helper";
import SelectNumberKeno from "./SelectNumberKeno";
import CustomeIcon from "../../utils/CustomeIcon";
import CustomeIcon2 from "../../utils/CustomeIcon2";
import CountDownKeno from "../../utils/countDownKeno";
import { getTypeName, max3dType, getWeekdaysShort, kenoLevel, } from "../../utils/Helper";
import CustomeTrashIcon from "../../utils/CustomeTrashIcon";
import Countdown, { zeroPad } from "react-countdown-now";
const isIPhone = new RegExp("\\biPhone\\b|\\biPod\\b", "i").test(
  window.navigator.userAgent
);
let wrapProps;
if (isIPhone) {
  wrapProps = {
    onTouchStart: e => e.preventDefault()
  };
}

class Keno extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aAmountText: "10,000đ",
      aAmount: 10000,
      aNumber: ["", "", "", "", "", "", "", "", "", ""],
      aIsCheck: false,
      bAmountText: "10,000đ",
      bAmount: 10000,
      bNumber: ["", "", "", "", "", "", "", "", "", ""],
      bIsCheck: false,
      cAmountText: "10,000đ",
      cAmount: 10000,
      cNumber: ["", "", "", "", "", "", "", "", "", ""],
      cIsCheck: false,
      totalAmount: 0,
      totalAmountParity: 0,
      price: 10000,
      modal: false,
      modalType: "",
      modalSystem: false,
      system: [],
      systemInit: [],
      productID: 6,
      animating: true,
      amtPower: 0,
      systemKeno: 1,
      systemKenoParity: 1,
      bagitem: 10,
      closeTime: 0,
      tutorialKeno: "",
      tabIndex: 1,
      isEvenNumberA: false,
      isOddNumberA: false,
      isEvenNumberB: false,
      isOddNumberB: false,
      isEvenNumberC: false,
      isOddNumberC: false,
      isBigNumberA: false,
      isSmallNumberA: false,
      isBigNumberB: false,
      isSmallNumberB: false,
      isBigNumberC: false,
      isSmallNumberC: false,
      aAmountTextO: "20,000đ",
      aAmountO: 20000,
      aIsCheckO: false,
      bAmountTextO: "20,000đ",
      bAmountO: 20000,
      bIsCheckO: false,
      cAmountTextO: "20,000đ",
      cAmountO: 20000,
      cIsCheckO: false,
      dAmountTextO: "20,000đ",
      dAmountO: 20000,
      dIsCheckO: false,
      eAmountTextO: "20,000đ",
      eAmountO: 20000,
      eIsCheckO: false,
      fAmountTextO: "20,000đ",
      fAmountO: 20000,
      fIsCheckO: false,
      systemParity: [
        { value: 1, text: "1 kỳ", active: true },
        { value: 3, text: "3 kỳ", active: false },
        { value: 5, text: "5 kỳ", active: false },
        { value: 10, text: "10 kỳ", active: false }
      ]
    };
  }

  componentWillMount() {
    if (
      this.props.location.payload !== undefined &&
      this.props.location.payload !== null
    ) {
      this.setState(this.props.location.payload);
      this.setState({ closeTime: 0 });
      this.props.onGetDrawCode();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.drawCodeKeno !== undefined &&
      nextProps.drawCodeKeno.data !== undefined
    ) {
      // console.log(nextProps.drawCodeKeno);
      if (nextProps.drawCodeKeno.data.Code === "00") {
        this.setState({
          closeTime: nextProps.drawCodeKeno.data.Value.CloseTime,
          drawCodeKeno: nextProps.drawCodeKeno.data.Value.DrawCode
        });
        localStorage.setItem("drawCodeKeno", nextProps.drawCodeKeno.data.Value.DrawCode)
        // this.startCountDown();
      }
    }
    if (
      nextProps.tutorialKeno !== undefined &&
      nextProps.tutorialKeno.data !== undefined
    ) {
      if (nextProps.tutorialKeno.data.Code === "00") {
        this.setState({
          tutorialKeno: nextProps.tutorialKeno.data.Value
        });
      }
    }
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

  randomNumber = (except = []) => {
    let num = Math.floor(Math.random() * 80) + 1;
    return except.some(x => x === num) ? this.randomNumber(except) : num;
  };

  randomLength = () => {
    return Math.floor(Math.random() * 10);
  };

  randomFast() {
    let number = [];
    let numbertmp = [];
    let length = this.state.bagitem;
    if (length === 0) {
      length = length + 1;
    }
    if (!this.state.aIsCheck) {
      number = this.state.aNumber.map((item, index, data) => {
        let rannumber = this.randomNumber(numbertmp);
        numbertmp.push(rannumber);
        return rannumber;
      });
      const _totalAmount =
        this.state.totalAmount + this.state.aAmount * this.state.systemKeno;
      this.setState({
        totalAmount: _totalAmount,
        aNumber: number.sort((a, b) => a - b).splice(0, length),
        aIsCheck: true
      });
    } else if (!this.state.bIsCheck) {
      number = this.state.bNumber.map((item, index, data) => {
        let rannumber = this.randomNumber(numbertmp);
        numbertmp.push(rannumber);
        return rannumber;
      });
      const _totalAmount =
        this.state.totalAmount + this.state.bAmount * this.state.systemKeno;
      this.setState({
        totalAmount: _totalAmount,
        bNumber: number.sort((a, b) => a - b).splice(0, length),
        bIsCheck: true
      });
    } else if (!this.state.cIsCheck) {
      number = this.state.cNumber.map((item, index, data) => {
        let rannumber = this.randomNumber(numbertmp);
        numbertmp.push(rannumber);
        return rannumber;
      });
      const _totalAmount =
        this.state.totalAmount + this.state.cAmount * this.state.systemKeno;
      this.setState({
        totalAmount: _totalAmount,
        cNumber: number.sort((a, b) => a - b).splice(0, length),
        cIsCheck: true
      });
    }
    //  else if (!this.state.dIsCheck) {
    //   number = this.state.dNumber.map((item, index, data) => {
    //     let rannumber = this.randomNumber(numbertmp);
    //     numbertmp.push(rannumber);
    //     return rannumber;
    //   });
    //   const _totalAmount =
    //     this.state.totalAmount + this.state.dAmount * this.state.systemKeno;
    //   this.setState({
    //     totalAmount: _totalAmount,
    //     dNumber: number.sort((a, b) => a - b).splice(0, length),
    //     dIsCheck: true
    //   });
    // } else if (!this.state.eIsCheck) {
    //   number = this.state.eNumber.map((item, index, data) => {
    //     let rannumber = this.randomNumber(numbertmp);
    //     numbertmp.push(rannumber);
    //     return rannumber;
    //   });
    //   const _totalAmount =
    //     this.state.totalAmount + this.state.eAmount * this.state.systemKeno;
    //   this.setState({
    //     totalAmount: _totalAmount,
    //     eNumber: number.sort((a, b) => a - b).splice(0, length),
    //     eIsCheck: true
    //   });
    // } else if (!this.state.fIsCheck) {
    //   number = this.state.fNumber.map((item, index, data) => {
    //     let rannumber = this.randomNumber(numbertmp);
    //     numbertmp.push(rannumber);
    //     return rannumber;
    //   });
    //   const _totalAmount =
    //     this.state.totalAmount + this.state.fAmount * this.state.systemKeno;
    //   this.setState({
    //     totalAmount: _totalAmount,
    //     fNumber: number.sort((a, b) => a - b).splice(0, length),
    //     fIsCheck: true
    //   });
    // }
  }

  randomAll() {
    let number = [];
    let numbertmp = [];
    let _totalAmount = this.state.totalAmount;
    let length1 = this.state.bagitem;
    let length2 = this.state.bagitem;
    let length3 = this.state.bagitem;
    // let length4 = this.randomLength();
    // if (length4 === 0) {
    //   length4 = length4 + 1;
    // }
    // let length5 = this.randomLength();
    // if (length5 === 0) {
    //   length5 = length5 + 1;
    // }
    // let length6 = this.randomLength();
    // if (length6 === 0) {
    //   length6 = length6 + 1;
    // }
    if (!this.state.aIsCheck) {
      number = this.state.aNumber.map((item, index, data) => {
        let rannumber = this.randomNumber(numbertmp);
        numbertmp.push(rannumber);
        return rannumber;
      });
      this.setState({
        aNumber: number.sort((a, b) => a - b).splice(0, length1),
        aIsCheck: true
      });
    }
    if (!this.state.bIsCheck) {
      number = this.state.bNumber.map((item, index, data) => {
        let rannumber = this.randomNumber(numbertmp);
        numbertmp.push(rannumber);
        return rannumber;
      });
      this.setState({
        bNumber: number.sort((a, b) => a - b).splice(0, length2),
        bIsCheck: true
      });
    }
    if (!this.state.cIsCheck) {
      number = this.state.cNumber.map((item, index, data) => {
        let rannumber = this.randomNumber(numbertmp);
        numbertmp.push(rannumber);
        return rannumber;
      });
      this.setState({
        cNumber: number.sort((a, b) => a - b).splice(0, length3),
        cIsCheck: true
      });
    }
    // if (!this.state.dIsCheck) {
    //   number = this.state.dNumber.map((item, index, data) => {
    //     let rannumber = this.randomNumber(numbertmp);
    //     numbertmp.push(rannumber);
    //     return rannumber;
    //   });
    //   this.setState({
    //     dNumber: number.sort((a, b) => a - b).splice(0, length4),
    //     dIsCheck: true
    //   });
    // }
    // if (!this.state.eIsCheck) {
    //   number = this.state.eNumber.map((item, index, data) => {
    //     let rannumber = this.randomNumber(numbertmp);
    //     numbertmp.push(rannumber);
    //     return rannumber;
    //   });
    //   this.setState({
    //     eNumber: number.sort((a, b) => a - b).splice(0, length5),
    //     eIsCheck: true
    //   });
    // }
    // if (!this.state.fIsCheck) {
    //   number = this.state.fNumber.map((item, index, data) => {
    //     let rannumber = this.randomNumber(numbertmp);
    //     numbertmp.push(rannumber);
    //     return rannumber;
    //   });
    //   this.setState({
    //     fNumber: number.sort((a, b) => a - b).splice(0, length6),
    //     fIsCheck: true
    //   });
    // }
    // const _totalAmount = 10000 * this.state.systemKeno * 3;
    this.setState({ totalAmount: _totalAmount });
    // aNumber: number.sort((a, b) => a - b), aIsCheck: true , bNumber: number.sort((a, b) => a - b), bIsCheck: true , cNumber: number.sort((a, b) => a - b), cIsCheck: true ,dNumber: number.sort((a, b) => a - b), dIsCheck: true, eNumber: number.sort((a, b) => a - b), eIsCheck: true , fNumber: number.sort((a, b) => a - b), fIsCheck: true
  }

  randomKeno = type => {
    let number = [];
    let numbertmp = [];
    let length = this.state.bagitem;
    if (length === 0) {
      length = length + 1;
    }
    switch (type) {
      case "A":
        number = this.state.aNumber.map((item, index, data) => {
          let rannumber = this.randomNumber(numbertmp);
          numbertmp.push(rannumber);
          return rannumber;
        });
        this.setState({
          aNumber: number.sort((a, b) => a - b).splice(0, length),
          aIsCheck: true,
          totalAmount:
            this.state.totalAmount + this.state.aAmount * this.state.systemKeno
        });
        break;
      case "B":
        number = this.state.bNumber.map(() => {
          let rannumber = this.randomNumber(numbertmp);
          numbertmp.push(rannumber);
          return rannumber;
        });
        this.setState({
          bNumber: number.sort((a, b) => a - b).splice(0, length),
          bIsCheck: true,
          totalAmount:
            this.state.totalAmount + this.state.bAmount * this.state.systemKeno
        });
        break;
      case "C":
        number = this.state.aNumber.map(() => {
          let rannumber = this.randomNumber(numbertmp);
          numbertmp.push(rannumber);
          return rannumber;
        });
        this.setState({
          cNumber: number.sort((a, b) => a - b).splice(0, length),
          cIsCheck: true,
          totalAmount:
            this.state.totalAmount + this.state.cAmount * this.state.systemKeno
        });
        break;
      // case "D":
      //   number = this.state.dNumber.map(() => {
      //     let rannumber = this.randomNumber(numbertmp);
      //     numbertmp.push(rannumber);
      //     return rannumber;
      //   });
      //   this.setState({
      //     dNumber: number.sort((a, b) => a - b).splice(0, length),
      //     dIsCheck: true,
      //     totalAmount:
      //       this.state.totalAmount + this.state.dAmount * this.state.systemKeno
      //   });
      //   break;
      // case "E":
      //   number = this.state.eNumber.map(() => {
      //     let rannumber = this.randomNumber(numbertmp);
      //     numbertmp.push(rannumber);
      //     return rannumber;
      //   });
      //   this.setState({
      //     eNumber: number.sort((a, b) => a - b).splice(0, length),
      //     eIsCheck: true,
      //     totalAmount:
      //       this.state.totalAmount + this.state.eAmount * this.state.systemKeno
      //   });
      //   break;
      // case "F":
      //   number = this.state.fNumber.map(() => {
      //     let rannumber = this.randomNumber(numbertmp);
      //     numbertmp.push(rannumber);
      //     return rannumber;
      //   });
      //   this.setState({
      //     fNumber: number.sort((a, b) => a - b).splice(0, length),
      //     fIsCheck: true,
      //     totalAmount:
      //       this.state.totalAmount + this.state.fAmount * this.state.systemKeno
      //   });
      // break;
      default:
        break;
    }
  };

  randomKenoO = type => {
    switch (type) {
      case "A":
        const num = Math.floor(Math.random() * 2) + 1;
        if (num == 1) {
          this.setState({
            isEvenNumberA: true, isOddNumberA: false, aIsCheckO: true,
            totalAmountParity:
              this.state.totalAmountParity + this.state.aAmountO * this.state.systemKenoParity
          });
        }
        if (num == 2) {
          this.setState({
            isEvenNumberA: false, isOddNumberA: true, aIsCheckO: true,
            totalAmountParity:
              this.state.totalAmountParity + this.state.aAmountO * this.state.systemKenoParity
          });
        }

        break;
      case "B":
        const num1 = Math.floor(Math.random() * 2) + 1;
        if (num1 == 1) {
          this.setState({
            isEvenNumberB: true, isOddNumberB: false, bIsCheckO: true,
            totalAmountParity:
              this.state.totalAmountParity + this.state.bAmountO * this.state.systemKenoParity
          });
        }
        if (num1 == 2) {
          this.setState({
            isEvenNumberB: false, isOddNumberB: true, bIsCheckO: true,
            totalAmountParity:
              this.state.totalAmountParity + this.state.bAmountO * this.state.systemKenoParity
          });
        }
        break;
      case "C":
        const num2 = Math.floor(Math.random() * 2) + 1;
        if (num2 == 1) {
          this.setState({
            isEvenNumberC: true, isOddNumberC: false, cIsCheckO: true,
            totalAmountParity:
              this.state.totalAmountParity + this.state.cAmountO * this.state.systemKenoParity
          });
        }
        if (num2 == 2) {
          this.setState({
            isEvenNumberC: false, isOddNumberC: true, cIsCheckO: true,
            totalAmountParity:
              this.state.totalAmountParity + this.state.cAmountO * this.state.systemKenoParity
          });
        }
        break;
      case "D":
        const num3 = Math.floor(Math.random() * 2) + 1;
        if (num3 == 1) {
          this.setState({
            isBigNumberA: true, isSmallNumberA: false, dIsCheckO: true,
            totalAmountParity:
              this.state.totalAmountParity + this.state.dAmountO * this.state.systemKenoParity
          });
        }
        if (num3 == 2) {
          this.setState({
            isBigNumberA: false, isSmallNumberA: true, dIsCheckO: true,
            totalAmountParity:
              this.state.totalAmountParity + this.state.dAmountO * this.state.systemKenoParity
          });
        }
        break;
      case "E":
        const num4 = Math.floor(Math.random() * 2) + 1;
        if (num4 == 1) {
          this.setState({
            isBigNumberB: true, isSmallNumberB: false, eIsCheckO: true,
            totalAmountParity:
              this.state.totalAmountParity + this.state.eAmountO * this.state.systemKenoParity
          });
        }
        if (num4 == 2) {
          this.setState({
            isBigNumberB: false, isSmallNumberB: true, eIsCheckO: true,
            totalAmountParity:
              this.state.totalAmountParity + this.state.eAmountO * this.state.systemKenoParity
          });
        }
        break;
      case "F":
        const num5 = Math.floor(Math.random() * 2) + 1;
        if (num5 == 1) {
          this.setState({
            isBigNumberC: true, isSmallNumberC: false, fIsCheckO: true,
            totalAmountParity:
              this.state.totalAmountParity + this.state.fAmountO * this.state.systemKenoParity
          });
        }
        if (num5 == 2) {
          this.setState({
            isBigNumberC: false, isSmallNumberC: true, fIsCheckO: true,
            totalAmountParity:
              this.state.totalAmountParity + this.state.fAmountO * this.state.systemKenoParity
          });
        }
        break;
      default:
        break;
    }
  };

  clearData = type => {
    let arr = [];
    for (let i = 0; i < this.state.bagitem; i++) {
      let item = "";
      arr.push(item);
    }
    switch (type) {
      case "A":
        this.setState({
          aNumber: ["", "", "", "", "", "", "", "", "", ""],
          aIsCheck: false,
          totalAmount:
            this.state.totalAmount - this.state.aAmount * this.state.systemKeno
        });
        break;
      case "B":
        this.setState({
          bNumber: ["", "", "", "", "", "", "", "", "", ""],
          bIsCheck: false,
          totalAmount:
            this.state.totalAmount - this.state.bAmount * this.state.systemKeno
        });
        break;
      case "C":
        this.setState({
          cNumber: ["", "", "", "", "", "", "", "", "", ""],
          cIsCheck: false,
          totalAmount:
            this.state.totalAmount - this.state.cAmount * this.state.systemKeno
        });
        break;
      // case "D":
      //   this.setState({
      //     dNumber: ["", "", "", "", "", "", "", "", "", ""],
      //     dIsCheck: false,
      //     totalAmount:
      //       this.state.totalAmount - this.state.dAmount * this.state.systemKeno
      //   });
      //   break;
      // case "E":
      //   this.setState({
      //     eNumber: ["", "", "", "", "", "", "", "", "", ""],
      //     eIsCheck: false,
      //     totalAmount:
      //       this.state.totalAmount - this.state.eAmount * this.state.systemKeno
      //   });
      //   break;
      // case "F":
      //   this.setState({
      //     fNumber: ["", "", "", "", "", "", "", "", "", ""],
      //     fIsCheck: false,
      //     totalAmount:
      //       this.state.totalAmount - this.state.fAmount * this.state.systemKeno
      //   });
      //   break;
      default:
        break;
    }
    // const _totalAmount = this.state.totalAmount - (this.state.price * this.state.system.length);
    // this.setState({ totalAmount: _totalAmount })
  };

  clearDataO = type => {
    switch (type) {
      case "A":
        this.setState({
          isEvenNumberA: false, isOddNumberA: false, aIsCheckO: false,
          totalAmountParity:
            this.state.totalAmountParity - this.state.aAmountO * this.state.systemKenoParity
        });
        break;
      case "B":
        this.setState({
          isEvenNumberB: false, isOddNumberB: false, bIsCheckO: false,
          totalAmountParity:
            this.state.totalAmountParity - this.state.bAmountO * this.state.systemKenoParity
        });
        break;
      case "C":
        this.setState({
          isEvenNumberC: false, isOddNumberC: false, cIsCheckO: false,
          totalAmountParity:
            this.state.totalAmountParity - this.state.cAmountO * this.state.systemKenoParity
        });
        break;
      case "D":
        this.setState({
          isBigNumberA: false, isSmallNumberA: false, dIsCheckO: false,
          totalAmountParity:
            this.state.totalAmountParity - this.state.dAmountO * this.state.systemKenoParity
        });
        break;
      case "E":
        this.setState({
          isBigNumberB: false, isSmallNumberB: false, eIsCheckO: false,
          totalAmountParity:
            this.state.totalAmountParity - this.state.eAmountO * this.state.systemKenoParity
        });
        break;
      case "F":
        this.setState({
          isBigNumberC: false, isSmallNumberC: false, fIsCheckO: false,
          totalAmountParity:
            this.state.totalAmountParity - this.state.fAmountO * this.state.systemKenoParity
        });
        break;
      default:
        break;
    }
    // const _totalAmount = this.state.totalAmount - (this.state.price * this.state.system.length);
    // this.setState({ totalAmount: _totalAmount })
  };

  initaNumber = () => {
    const number = this.state.aNumber.map((item, index, data) => {
      if (item === "") {
        return (
          <Text
            key={index}
            className={styles.text_number_circle}
            onClick={this.showModal("modal", "A")}
          >
            {item}
          </Text>
        );
      } else {
        return (
          <Text
            key={index}
            className={styles.text_number_circle}
            onClick={this.showModal("modal", "A")}
          >
            {item.toString().padStart(2, "0")}
          </Text>
        );
      }
    });
    return (
      <div
        className={styles.row_number}
        style={{
          borderBottom: "1px",
          borderColor: "#c8cacb",
          borderBottomStyle: "solid",
          paddingBottom: 7
        }}
      >
        <Text
          className={styles.text_header}
          style={{ float: "left", width: 40 }}
        >
          A
        </Text>
        <div style={{ width: "100%" }}>{number}</div>
        {this.isCheckNumber("A")}
      </div>
    );
  };

  initbNumber = () => {
    const number = this.state.bNumber.map((item, index, data) => {
      if (item === "") {
        return (
          <Text
            key={index}
            className={styles.text_number_circle}
            onClick={this.showModal("modal", "B")}
          >
            {item}
          </Text>
        );
      } else {
        return (
          <Text
            key={index}
            className={styles.text_number_circle}
            onClick={this.showModal("modal", "B")}
          >
            {item.toString().padStart(2, "0")}
          </Text>
        );
      }
    });
    return (
      <div
        className={styles.row_number}
        style={{
          borderBottom: "1px",
          borderColor: "#c8cacb",
          borderBottomStyle: "solid",
          paddingBottom: 7
        }}
      >
        <Text
          className={styles.text_header}
          style={{ float: "left", width: 40 }}
        >
          B
        </Text>
        <div style={{ width: "100%" }}>{number}</div>
        {this.isCheckNumber("B")}
      </div>
    );
  };

  initcNumber = () => {
    const number = this.state.cNumber.map((item, index, data) => {
      if (item === "") {
        return (
          <Text
            key={index}
            className={styles.text_number_circle}
            onClick={this.showModal("modal", "C")}
          >
            {item}
          </Text>
        );
      } else {
        return (
          <Text
            key={index}
            className={styles.text_number_circle}
            onClick={this.showModal("modal", "C")}
          >
            {item.toString().padStart(2, "0")}
          </Text>
        );
      }
    });
    return (
      <div
        className={styles.row_number}
        style={{
          borderBottom: "1px",
          borderColor: "#c8cacb",
          borderBottomStyle: "solid",
          paddingBottom: 7
        }}
      >
        <Text
          className={styles.text_header}
          style={{ float: "left", width: 40 }}
        >
          C
        </Text>
        <div style={{ width: "100%" }}>{number}</div>
        {this.isCheckNumber("C")}
      </div>
    );
  };

  initdNumber = () => {
    const number = this.state.dNumber.map((item, index, data) => {
      if (item === "") {
        return (
          <Text
            key={index}
            className={styles.text_number_circle}
            onClick={this.showModal("modal", "D")}
          >
            {item}
          </Text>
        );
      } else {
        return (
          <Text
            key={index}
            className={styles.text_number_circle}
            onClick={this.showModal("modal", "D")}
          >
            {item.toString().padStart(2, "0")}
          </Text>
        );
      }
    });
    return (
      <div
        className={styles.row_number}
        style={{
          borderBottom: "1px",
          borderColor: "#c8cacb",
          borderBottomStyle: "solid",
          paddingBottom: 7
        }}
      >
        <Text
          className={styles.text_header}
          style={{ float: "left", width: 40 }}
        >
          D
        </Text>
        <div style={{ width: "100%" }}>{number}</div>
        {this.isCheckNumber("D")}
      </div>
    );
  };

  initeNumber = () => {
    const number = this.state.eNumber.map((item, index, data) => {
      if (item === "") {
        return (
          <Text
            key={index}
            className={styles.text_number_circle}
            onClick={this.showModal("modal", "E")}
          >
            {item}
          </Text>
        );
      } else {
        return (
          <Text
            key={index}
            className={styles.text_number_circle}
            onClick={this.showModal("modal", "E")}
          >
            {item.toString().padStart(2, "0")}
          </Text>
        );
      }
    });
    return (
      <div
        className={styles.row_number}
        style={{
          borderBottom: "1px",
          borderColor: "#c8cacb",
          borderBottomStyle: "solid",
          paddingBottom: 7
        }}
      >
        <Text
          className={styles.text_header}
          style={{ float: "left", width: 40 }}
        >
          E
        </Text>
        <div style={{ width: "100%" }}>{number}</div>
        {this.isCheckNumber("E")}
      </div>
    );
  };

  initfNumber = () => {
    const number = this.state.fNumber.map((item, index, data) => {
      if (item === "") {
        return (
          <Text
            key={index}
            className={styles.text_number_circle}
            onClick={this.showModal("modal", "F")}
          >
            {item}
          </Text>
        );
      } else {
        return (
          <Text
            key={index}
            className={styles.text_number_circle}
            onClick={this.showModal("modal", "F")}
          >
            {item.toString().padStart(2, "0")}
          </Text>
        );
      }
    });
    return (
      <div
        className={styles.row_number}
        style={{
          borderBottom: "1px",
          borderColor: "#c8cacb",
          borderBottomStyle: "solid",
          paddingBottom: 7
        }}
      >
        <Text
          className={styles.text_header}
          style={{ float: "left", width: 40 }}
        >
          F
        </Text>
        <div style={{ width: "100%" }}>{number}</div>
        {this.isCheckNumber("F")}
      </div>
    );
  };

  showAmount = param => {
    const BUTTONS = [
      "10,000đ",
      "20,000đ",
      "50,000đ",
      "100,000đ",
      "200,000đ",
      "500,000đ",
      "Đóng"
    ];

    ActionSheet.showActionSheetWithOptions(
      {
        className: styles2.modal_view,
        options: BUTTONS,
        destructiveButtonIndex: BUTTONS.length - 1,
        // title: 'title',
        message: "Chọn mệnh giá",
        maskClosable: true,
        "data-seed": "logId",
        wrapProps
      },
      buttonIndex => {
        if (buttonIndex !== -1 && buttonIndex !== 6) {
          switch (param) {
            case "A":
              this.fillAmount(buttonIndex, param);
              break;
            case "B":
              this.fillAmount(buttonIndex, param);
              break;
            case "C":
              this.fillAmount(buttonIndex, param);
              break;
            // case "D":
            //   this.fillAmount(buttonIndex, param);
            //   break;
            // case "E":
            //   this.fillAmount(buttonIndex, param);
            //   break;
            // case "F":
            //   this.fillAmount(buttonIndex, param);
            //   break;
            default:
              break;
          }
        }
      }
    );
  };

  fillAmount = (index, type) => {
    let amount = "";
    let iAmount = 0;
    let tempAmount = 0;
    switch (index) {
      case 0:
        amount = "10,000đ";
        iAmount = 10000;
        break;
      case 1:
        amount = "20,000đ";
        iAmount = 20000;
        break;
      case 2:
        amount = "50,000đ";
        iAmount = 50000;
        break;
      case 3:
        amount = "100,000đ";
        iAmount = 100000;
        break;
      case 4:
        amount = "200,000đ";
        iAmount = 200000;
        break;
      case 5:
        amount = "500,000đ";
        iAmount = 500000;
        break;
      default:
        break;
    }
    switch (type) {
      case "A":
        tempAmount = this.state.aAmount;
        this.setState({ aAmountText: amount });
        if (this.state.aIsCheck) {
          this.setState({
            aAmount: iAmount,
            totalAmount:
              this.state.totalAmount -
              this.state.systemKeno * tempAmount +
              iAmount * this.state.systemKeno
          });
        } else {
          this.setState({ aAmount: iAmount });
        }
        break;
      case "B":
        tempAmount = this.state.bAmount;
        this.setState({ bAmountText: amount });
        if (this.state.bIsCheck) {
          this.setState({
            bAmount: iAmount,
            totalAmount:
              this.state.totalAmount -
              this.state.systemKeno * tempAmount +
              iAmount * this.state.systemKeno
          });
        } else {
          this.setState({ bAmount: iAmount });
        }
        break;
      case "C":
        tempAmount = this.state.cAmount;
        this.setState({ cAmountText: amount });
        if (this.state.cIsCheck) {
          this.setState({
            cAmount: iAmount,
            totalAmount:
              this.state.totalAmount -
              this.state.systemKeno * tempAmount +
              iAmount * this.state.systemKeno
          });
        } else {
          this.setState({ cAmount: iAmount });
        }
        break;
      // case "D":
      //   tempAmount = this.state.dAmount;
      //   this.setState({ dAmountText: amount });
      //   if (this.state.dIsCheck) {
      //     this.setState({
      //       dAmount: iAmount,
      //       totalAmount:
      //         this.state.totalAmount -
      //         this.state.systemKeno * tempAmount +
      //         iAmount * this.state.systemKeno
      //     });
      //   } else {
      //     this.setState({ dAmount: iAmount });
      //   }
      //   break;
      // case "E":
      //   tempAmount = this.state.eAmount;
      //   this.setState({ eAmountText: amount });
      //   if (this.state.eIsCheck) {
      //     this.setState({
      //       eAmount: iAmount,
      //       totalAmount:
      //         this.state.totalAmount -
      //         this.state.systemKeno * tempAmount +
      //         iAmount * this.state.systemKeno
      //     });
      //   } else {
      //     this.setState({ eAmount: iAmount });
      //   }
      //   break;
      // case "F":
      //   tempAmount = this.state.fAmount;
      //   this.setState({ fAmountText: amount });
      //   if (this.state.fIsCheck) {
      //     this.setState({
      //       fAmount: iAmount,
      //       totalAmount:
      //         this.state.totalAmount -
      //         this.state.systemKeno * tempAmount +
      //         iAmount * this.state.systemKeno
      //     });
      //   } else {
      //     this.setState({ fAmount: iAmount });
      //   }
      //   break;
      default:
        break;
    }
  };

  ShowText = type => {
    let showType = "";
    switch (type) {
      case "A":
        showType = <Text>{this.state.aAmountText}</Text>;
        break;
      case "B":
        showType = <Text>{this.state.bAmountText}</Text>;
        break;
      case "C":
        showType = <Text>{this.state.cAmountText}</Text>;
        break;
      // case "D":
      //   showType = <Text>{this.state.dAmountText}</Text>;
      //   break;
      // case "E":
      //   showType = <Text>{this.state.eAmountText}</Text>;
      //   break;
      // case "F":
      //   showType = <Text>{this.state.fAmountText}</Text>;
      //   break;
      default:
        showType = "Mệnh giá";
        break;
    }
    return showType;
  };

  showAmountO = param => {
    const BUTTONS = [
      "10,000đ",
      "20,000đ",
      "50,000đ",
      "100,000đ",
      "200,000đ",
      "500,000đ",
      "Đóng"
    ];

    ActionSheet.showActionSheetWithOptions(
      {
        className: styles2.modal_view,
        options: BUTTONS,
        destructiveButtonIndex: BUTTONS.length - 1,
        // title: 'title',
        message: "Chọn mệnh giá",
        maskClosable: true,
        "data-seed": "logId",
        wrapProps
      },
      buttonIndex => {
        if (buttonIndex !== -1 && buttonIndex !== 6) {
          switch (param) {
            case "A":
              this.fillAmountO(buttonIndex, param);
              break;
            case "B":
              this.fillAmountO(buttonIndex, param);
              break;
            case "C":
              this.fillAmountO(buttonIndex, param);
              break;
            case "D":
              this.fillAmountO(buttonIndex, param);
              break;
            case "E":
              this.fillAmountO(buttonIndex, param);
              break;
            case "F":
              this.fillAmountO(buttonIndex, param);
              break;
            default:
              break;
          }
        }
      }
    );
  };

  fillAmountO = (index, type) => {
    let amount = "";
    let iAmount = 0;
    let tempAmount = 0;
    switch (index) {
      case 0:
        amount = "10,000đ";
        iAmount = 10000;
        break;
      case 1:
        amount = "20,000đ";
        iAmount = 20000;
        break;
      case 2:
        amount = "50,000đ";
        iAmount = 50000;
        break;
      case 3:
        amount = "100,000đ";
        iAmount = 100000;
        break;
      case 4:
        amount = "200,000đ";
        iAmount = 200000;
        break;
      case 5:
        amount = "500,000đ";
        iAmount = 500000;
        break;
      default:
        break;
    }
    switch (type) {
      case "A":
        tempAmount = this.state.aAmountO;
        this.setState({ aAmountTextO: amount });
        if (this.state.aIsCheckO || this.state.isOddNumberA || this.state.isEvenNumberA) {
          this.setState({
            aAmountO: iAmount,
            totalAmountParity:
              this.state.totalAmountParity -
              this.state.systemKenoParity * tempAmount +
              iAmount * this.state.systemKenoParity
          });
        } else {
          this.setState({ aAmountO: iAmount });
        }
        break;
      case "B":
        tempAmount = this.state.bAmountO;
        this.setState({ bAmountTextO: amount });
        if (this.state.bIsCheckO || this.state.isOddNumberB || this.state.isEvenNumberB) {
          this.setState({
            bAmountO: iAmount,
            totalAmountParity:
              this.state.totalAmountParity -
              this.state.systemKenoParity * tempAmount +
              iAmount * this.state.systemKenoParity
          });
        } else {
          this.setState({ bAmountO: iAmount });
        }
        break;
      case "C":
        tempAmount = this.state.cAmountO;
        this.setState({ cAmountTextO: amount });
        if (this.state.cIsCheckO || this.state.isOddNumberC || this.state.isEvenNumberC) {
          this.setState({
            cAmountO: iAmount,
            totalAmountParity:
              this.state.totalAmountParity -
              this.state.systemKenoParity * tempAmount +
              iAmount * this.state.systemKenoParity
          });
        } else {
          this.setState({ cAmountO: iAmount });
        }
        break;
      case "D":
        tempAmount = this.state.dAmountO;
        this.setState({ dAmountTextO: amount });
        if (this.state.dIsCheckO || this.state.isBigNumberA || this.state.isSmallNumberA) {
          this.setState({
            dAmountO: iAmount,
            totalAmountParity:
              this.state.totalAmountParity -
              this.state.systemKenoParity * tempAmount +
              iAmount * this.state.systemKenoParity
          });
        } else {
          this.setState({ dAmountO: iAmount });
        }
        break;
      case "E":
        tempAmount = this.state.eAmountO;
        this.setState({ eAmountTextO: amount });
        if (this.state.eIsCheckO || this.state.isBigNumberB || this.state.isSmallNumberB) {
          this.setState({
            eAmountO: iAmount,
            totalAmountParity:
              this.state.totalAmountParity -
              this.state.systemKenoParity * tempAmount +
              iAmount * this.state.systemKenoParity
          });
        } else {
          this.setState({ eAmountO: iAmount });
        }
        break;
      case "F":
        tempAmount = this.state.fAmountO;
        this.setState({ fAmountTextO: amount });
        if (this.state.fIsCheckO || this.state.isBigNumberC || this.state.isSmallNumberC) {
          this.setState({
            fAmountO: iAmount,
            totalAmountParity:
              this.state.totalAmountParity -
              this.state.systemKenoParity * tempAmount +
              iAmount * this.state.systemKenoParity
          });
        } else {
          this.setState({ fAmountO: iAmount });
        }
        break;
      default:
        break;
    }
  };

  ShowTextO = type => {
    let showType = "";
    switch (type) {
      case "A":
        showType = <Text>{this.state.aAmountTextO}</Text>;
        break;
      case "B":
        showType = <Text>{this.state.bAmountTextO}</Text>;
        break;
      case "C":
        showType = <Text>{this.state.cAmountTextO}</Text>;
        break;
      case "D":
        showType = <Text>{this.state.dAmountTextO}</Text>;
        break;
      case "E":
        showType = <Text>{this.state.eAmountTextO}</Text>;
        break;
      case "F":
        showType = <Text>{this.state.fAmountTextO}</Text>;
        break;
      default:
        showType = "Mệnh giá";
        break;
    }
    return showType;
  };

  buttonBeforeNumber = type => {
    return (
      <div className={styles.random}>
        <Button
          type="warning"
          size="small"
          className={button.button_tc}
          onClick={() => this.randomKeno(type)}
        >
          <Text>TC</Text>
        </Button>
        <Text
          onClick={() => this.showAmount(type)}
          className={styles.text_amount}
        >
          {this.ShowText(type)}
        </Text>
      </div>
    );
  };

  buttonAfterNumber = type => {
    return (
      <div className={styles.random}>
        <div
          className={button.button_clear}
          onClick={() => this.clearData(type)}
        >
          <CustomeTrashIcon
            type={require("../../assets/trash.svg")}
          ></CustomeTrashIcon>
        </div>
        <Text
          onClick={() => this.showAmount(type)}
          className={styles.text_amount}
        >
          {this.ShowText(type)}
        </Text>
      </div>
    );
  };

  buttonBeforeNumberO = type => {
    return (
      <div className={styles.random}>
        <Button
          type="warning"
          size="small"
          className={button.button_tc}
          onClick={() => this.randomKenoO(type)}
        >
          <Text>TC</Text>
        </Button>
        <Text
          onClick={() => this.showAmountO(type)}
          className={styles.text_amount}
        >
          {this.ShowTextO(type)}
        </Text>
      </div>
    );
  };

  buttonAfterNumberO = type => {
    return (
      <div className={styles.random}>
        <div
          className={button.button_clear}
          onClick={() => this.clearDataO(type)}
        >
          <CustomeTrashIcon
            type={require("../../assets/trash.svg")}
          ></CustomeTrashIcon>
        </div>
        <Text
          onClick={() => this.showAmountO(type)}
          className={styles.text_amount}
        >
          {this.ShowTextO(type)}
        </Text>
      </div>
    );
  };

  isCheckNumberO = type => {
    let showType = null;
    switch (type) {
      case "A":
        this.state.aIsCheckO = this.state.aIsCheckO === true || this.state.isEvenNumberA === true || this.state.isOddNumberA === true;
        showType =
          this.state.aIsCheckO === true || this.state.isEvenNumberA === true || this.state.isOddNumberA === true
            ? this.buttonAfterNumberO(type)
            : this.buttonBeforeNumberO(type);
        break;
      case "B":
        this.state.bIsCheckO = this.state.bIsCheckO === true || this.state.isEvenNumberB === true || this.state.isOddNumberB === true
        showType =
          this.state.bIsCheckO === true || this.state.isEvenNumberB === true || this.state.isOddNumberB === true
            ? this.buttonAfterNumberO(type)
            : this.buttonBeforeNumberO(type);
        break;
      case "C":
        this.state.cIsCheckO = this.state.cIsCheckO === true || this.state.isEvenNumberC === true || this.state.isOddNumberC === true
        showType =
          this.state.cIsCheckO === true || this.state.isEvenNumberC === true || this.state.isOddNumberC === true
            ? this.buttonAfterNumberO(type)
            : this.buttonBeforeNumberO(type);
        break;
      case "D":
        this.state.dIsCheckO = this.state.dIsCheckO === true || this.state.isBigNumberA === true || this.state.isSmallNumberA === true
        showType =
          this.state.dIsCheckO === true || this.state.isBigNumberA === true || this.state.isSmallNumberA === true
            ? this.buttonAfterNumberO(type)
            : this.buttonBeforeNumberO(type);
        break;
      case "E":
        this.state.eIsCheckO = this.state.eIsCheckO === true || this.state.isBigNumberB === true || this.state.isSmallNumberB === true
        showType =
          this.state.eIsCheckO === true || this.state.isBigNumberB === true || this.state.isSmallNumberB === true
            ? this.buttonAfterNumberO(type)
            : this.buttonBeforeNumberO(type);
        break;
      case "F":
        this.state.fIsCheckO = this.state.fIsCheckO === true || this.state.isBigNumberC === true || this.state.isSmallNumberC === true
        showType =
          this.state.fIsCheckO === true || this.state.isBigNumberC === true || this.state.isSmallNumberC === true
            ? this.buttonAfterNumberO(type)
            : this.buttonBeforeNumberO(type);
        break;
      default:
        showType = this.buttonBeforeNumberO(type);
        break;
    }
    return showType;
  };

  isCheckNumber = type => {
    let showType = null;
    switch (type) {
      case "A":
        showType =
          this.state.aIsCheck === true
            ? this.buttonAfterNumber(type)
            : this.buttonBeforeNumber(type);
        break;
      case "B":
        showType =
          this.state.bIsCheck === true
            ? this.buttonAfterNumber(type)
            : this.buttonBeforeNumber(type);
        break;
      case "C":
        showType =
          this.state.cIsCheck === true
            ? this.buttonAfterNumber(type)
            : this.buttonBeforeNumber(type);
        break;
      // case "D":
      //   showType =
      //     this.state.dIsCheck === true
      //       ? this.buttonAfterNumber(type)
      //       : this.buttonBeforeNumber(type);
      //   break;
      // case "E":
      //   showType =
      //     this.state.eIsCheck === true
      //       ? this.buttonAfterNumber(type)
      //       : this.buttonBeforeNumber(type);
      //   break;
      // case "F":
      //   showType =
      //     this.state.fIsCheck === true
      //       ? this.buttonAfterNumber(type)
      //       : this.buttonBeforeNumber(type);
      //   break;
      default:
        showType = this.buttonBeforeNumber(type);
        break;
    }
    return showType;
  };

  onPutValue = type => {
    let value = [];
    switch (type) {
      case "A":
        value = this.state.aNumber;
        break;
      case "B":
        value = this.state.bNumber;
        break;
      case "C":
        value = this.state.cNumber;
        break;
      // case "D":
      //   value = this.state.dNumber;
      //   break;
      // case "E":
      //   value = this.state.eNumber;
      //   break;
      // case "F":
      //   value = this.state.fNumber;
      //   break;
      default:
        break;
    }
    return value;
  };

  showModal = (key, type) => e => {
    e.preventDefault();
    this.setState({
      modalType: type,
      [key]: true
    });
  };

  //function = (param) => (event) => {...}
  onCloseModal = key => () => {
    this.setState({
      modalType: "",
      [key]: false
    });
  };

  onAcceptModal = (key, data, type) => () => {
    switch (type) {
      case "A":
        if (!this.state.aIsCheck) {
          const _totalAmount =
            this.state.totalAmount + this.state.aAmount * this.state.systemKeno;
          this.setState({ totalAmount: _totalAmount });
        }
        this.setState({ aNumber: data, aIsCheck: true });
        break;
      case "B":
        if (!this.state.bIsCheck) {
          const _totalAmount =
            this.state.totalAmount + this.state.bAmount * this.state.systemKeno;
          this.setState({ totalAmount: _totalAmount });
        }
        this.setState({ bNumber: data, bIsCheck: true });
        break;
      case "C":
        if (!this.state.cIsCheck) {
          const _totalAmount =
            this.state.totalAmount + this.state.cAmount * this.state.systemKeno;
          this.setState({ totalAmount: _totalAmount });
        }
        this.setState({ cNumber: data, cIsCheck: true });
        break;
      // case "D":
      //   if (!this.state.dIsCheck) {
      //     const _totalAmount =
      //       this.state.totalAmount + this.state.dAmount * this.state.systemKeno;
      //     this.setState({ totalAmount: _totalAmount });
      //   }
      //   this.setState({ dNumber: data, dIsCheck: true });
      //   break;
      // case "E":
      //   if (!this.state.eIsCheck) {
      //     const _totalAmount =
      //       this.state.totalAmount + this.state.eAmount * this.state.systemKeno;
      //     this.setState({ totalAmount: _totalAmount });
      //   }
      //   this.setState({ eNumber: data, eIsCheck: true });
      //   break;
      // case "F":
      //   if (!this.state.fIsCheck) {
      //     const _totalAmount =
      //       this.state.totalAmount + this.state.fAmount * this.state.systemKeno;
      //     this.setState({ totalAmount: _totalAmount });
      //   }
      //   this.setState({ fNumber: data, fIsCheck: true });
      //   break;
      default:
        break;
    }

    this.setState({
      modalType: "",
      [key]: false
    });
  };
  //Modal select number
  modalView = () => {
    return (
      <SelectNumberKeno
        value={this.state.bagitem}
        type={this.state.modalType}
        modal={this.state.modal}
        onValue={this.onPutValue}
        onClose={this.onCloseModal}
        onAccept={this.onAcceptModal}
      />
    );
  };

  renderSystemKeno() {
    if (this.state.systemKeno === 1) {
      return (
        <div style={{ paddingTop: 10, }}>
          <Text style={{ fontSize: 17, paddingTop: 5, paddingBottom: 5 }}>
            Chọn kỳ
          </Text>
          <WhiteSpace />
          <Flex>
            <Flex.Item>
              <Button
                className={styles.buttonSystemKeno}
                onClick={() => {
                  this.chose1();
                }}
              >
                1 kỳ
              </Button>
            </Flex.Item>
            <Flex.Item>
              <Button
                className={styles.buttonSystemKenoUnsec}
                onClick={() => {
                  this.chose3();
                }}
              >
                3 kỳ
              </Button>
            </Flex.Item>
            <Flex.Item>
              <Button
                className={styles.buttonSystemKenoUnsec}
                onClick={() => {
                  this.chose5();
                }}
              >
                5 kỳ
              </Button>
            </Flex.Item>
            <Flex.Item>
              <Button
                className={styles.buttonSystemKenoUnsec}
                onClick={() => {
                  this.chose10();
                }}
              >
                10 kỳ
              </Button>
            </Flex.Item>
          </Flex>
        </div>
      );
    } else if (this.state.systemKeno === 3) {
      return (
        <div style={{ paddingTop: 10, }}>
          <Text style={{ fontSize: 17, paddingTop: 5, paddingBottom: 5 }}>
            Chọn kỳ
          </Text>
          <WhiteSpace />
          <Flex>
            <Flex.Item>
              <Button
                className={styles.buttonSystemKenoUnsec}
                onClick={() => {
                  this.chose1();
                }}
              >
                1 kỳ
              </Button>
            </Flex.Item>
            <Flex.Item>
              <Button
                className={styles.buttonSystemKeno}
                onClick={() => {
                  this.chose3();
                }}
              >
                3 kỳ
              </Button>
            </Flex.Item>
            <Flex.Item>
              <Button
                className={styles.buttonSystemKenoUnsec}
                onClick={() => {
                  this.chose5();
                }}
              >
                5 kỳ
              </Button>
            </Flex.Item>
            <Flex.Item>
              <Button
                className={styles.buttonSystemKenoUnsec}
                onClick={() => {
                  this.chose10();
                }}
              >
                10 kỳ
              </Button>
            </Flex.Item>
          </Flex>
        </div>
      );
    } else if (this.state.systemKeno === 5) {
      return (
        <div style={{ paddingTop: 10, }}>
          <Text style={{ fontSize: 17, paddingTop: 5, paddingBottom: 5 }}>
            Chọn kỳ
          </Text>
          <WhiteSpace />
          <Flex>
            <Flex.Item>
              <Button
                className={styles.buttonSystemKenoUnsec}
                onClick={() => {
                  this.chose1();
                }}
              >
                1 kỳ
              </Button>
            </Flex.Item>
            <Flex.Item>
              <Button
                className={styles.buttonSystemKenoUnsec}
                onClick={() => {
                  this.chose3();
                }}
              >
                3 kỳ
              </Button>
            </Flex.Item>
            <Flex.Item>
              <Button
                className={styles.buttonSystemKeno}
                onClick={() => {
                  this.chose5();
                }}
              >
                5 kỳ
              </Button>
            </Flex.Item>
            <Flex.Item>
              <Button
                className={styles.buttonSystemKenoUnsec}
                onClick={() => {
                  this.chose10();
                }}
              >
                10 kỳ
              </Button>
            </Flex.Item>
          </Flex>
        </div>
      );
    } else if (this.state.systemKeno === 10) {
      return (
        <div style={{ paddingTop: 10, }}>
          <Text style={{ fontSize: 17, paddingTop: 5, paddingBottom: 5 }}>
            Chọn kỳ
          </Text>
          <WhiteSpace />
          <Flex>
            <Flex.Item>
              <Button
                className={styles.buttonSystemKenoUnsec}
                onClick={() => {
                  this.chose1();
                }}
              >
                1 kỳ
              </Button>
            </Flex.Item>
            <Flex.Item>
              <Button
                className={styles.buttonSystemKenoUnsec}
                onClick={() => {
                  this.chose3();
                }}
              >
                3 kỳ
              </Button>
            </Flex.Item>
            <Flex.Item>
              <Button
                className={styles.buttonSystemKenoUnsec}
                onClick={() => {
                  this.chose5();
                }}
              >
                5 kỳ
              </Button>
            </Flex.Item>
            <Flex.Item>
              <Button
                className={styles.buttonSystemKeno}
                onClick={() => {
                  this.chose10();
                }}
              >
                10 kỳ
              </Button>
            </Flex.Item>
          </Flex>
        </div>
      );
    }
  }

  chose1() {
    let amount = 0;
    if (this.state.aIsCheck) {
      amount = amount + this.state.aAmount;
    }
    if (this.state.bIsCheck) {
      amount = amount + this.state.bAmount;
    }
    if (this.state.cIsCheck) {
      amount = amount + this.state.cAmount;
    }
    // if (this.state.dIsCheck) {
    //   amount = amount + this.state.dAmount;
    // }
    // if (this.state.eIsCheck) {
    //   amount = amount + this.state.eAmount;
    // }
    // if (this.state.fIsCheck) {
    //   amount = amount + this.state.fAmount;
    // }
    this.setState({ systemKeno: 1, totalAmount: amount });
  }

  chose3() {
    let amount = 0;
    if (this.state.aIsCheck) {
      amount = amount + this.state.aAmount;
    }
    if (this.state.bIsCheck) {
      amount = amount + this.state.bAmount;
    }
    if (this.state.cIsCheck) {
      amount = amount + this.state.cAmount;
    }
    // if (this.state.dIsCheck) {
    //   amount = amount + this.state.dAmount;
    // }
    // if (this.state.eIsCheck) {
    //   amount = amount + this.state.eAmount;
    // }
    // if (this.state.fIsCheck) {
    //   amount = amount + this.state.fAmount;
    // }
    this.setState({ systemKeno: 3, totalAmount: amount * 3 });
  }

  chose5() {
    let amount = 0;
    if (this.state.aIsCheck) {
      amount = amount + this.state.aAmount;
    }
    if (this.state.bIsCheck) {
      amount = amount + this.state.bAmount;
    }
    if (this.state.cIsCheck) {
      amount = amount + this.state.cAmount;
    }
    // if (this.state.dIsCheck) {
    //   amount = amount + this.state.dAmount;
    // }
    // if (this.state.eIsCheck) {
    //   amount = amount + this.state.eAmount;
    // }
    // if (this.state.fIsCheck) {
    //   amount = amount + this.state.fAmount;
    // }
    this.setState({ systemKeno: 5, totalAmount: amount * 5 });
  }

  chose10() {
    let amount = 0;
    if (this.state.aIsCheck) {
      amount = amount + this.state.aAmount;
    }
    if (this.state.bIsCheck) {
      amount = amount + this.state.bAmount;
    }
    if (this.state.cIsCheck) {
      amount = amount + this.state.cAmount;
    }
    // if (this.state.dIsCheck) {
    //   amount = amount + this.state.dAmount;
    // }
    // if (this.state.eIsCheck) {
    //   amount = amount + this.state.eAmount;
    // }
    // if (this.state.fIsCheck) {
    //   amount = amount + this.state.fAmount;
    // }
    this.setState({ systemKeno: 10, totalAmount: amount * 10 });
  }

  RandomAllButton = () => {
    if (
      this.state.aIsCheck === true ||
      this.state.bIsCheck === true ||
      this.state.cIsCheck === true
      // this.state.dIsCheck === true ||
      // this.state.eIsCheck === true ||
      // this.state.fIsCheck === true
    ) {
      return (
        <Button
          className={styles.button_keno}
          style={{ color: "#FFFFFF" }}
          disabled={true}
        >
          <Text>CHỌN NHANH 3 DÃY</Text>
        </Button>
      );
    } else {
      return (
        <Button
          className={styles.button_keno}
          onClick={() => this.randomAll()}
        >
          <Text>CHỌN NHANH 3 DÃY</Text>
        </Button>
      );
    }
  };

  clickTab = index => {
    this.setState({ tabIndex: index });
  };

  randomParity() {
    if (!this.state.isEvenNumberA && !this.state.isOddNumberA) {
      const num = Math.floor(Math.random() * 2) + 1;
      if (num == 1) {
        this.setState({
          isEvenNumberA: true, isOddNumberA: false, aIsCheckO: true,
          totalAmountParity:
            this.state.totalAmountParity + this.state.aAmountO * this.state.systemKenoParity
        });
      }
      if (num == 2) {
        this.setState({
          isEvenNumberA: false, isOddNumberA: true, aIsCheckO: true,
          totalAmountParity:
            this.state.totalAmountParity + this.state.aAmountO * this.state.systemKenoParity
        });
      }
      this.calAmountParity(1);
    }
    else if (!this.state.isEvenNumberB && !this.state.isOddNumberB) {
      const num1 = Math.floor(Math.random() * 2) + 1;
      if (num1 == 1) {
        this.setState({
          isEvenNumberB: true, isOddNumberB: false, bIsCheckO: true,
          totalAmountParity:
            this.state.totalAmountParity + this.state.bAmountO * this.state.systemKenoParity
        });
      }
      if (num1 == 2) {
        this.setState({
          isEvenNumberB: false, isOddNumberB: true, bIsCheckO: true,
          totalAmountParity:
            this.state.totalAmountParity + this.state.bAmountO * this.state.systemKenoParity
        });
      }

      this.calAmountParity(3);
    }

    else if (!this.state.isEvenNumberC && !this.state.isOddNumberC) {
      const num2 = Math.floor(Math.random() * 2) + 1;
      if (num2 == 1) {
        this.setState({
          isEvenNumberC: true, isOddNumberC: false, cIsCheckO: true,
          totalAmountParity:
            this.state.totalAmountParity + this.state.cAmountO * this.state.systemKenoParity
        });
      }
      if (num2 == 2) {
        this.setState({
          isEvenNumberC: false, isOddNumberC: true, cIsCheckO: true,
          totalAmountParity:
            this.state.totalAmountParity + this.state.cAmountO * this.state.systemKenoParity
        });
      }

      this.calAmountParity(5);
    }

    else if (!this.state.isBigNumberA && !this.state.isSmallNumberA) {
      const num3 = Math.floor(Math.random() * 2) + 1;
      if (num3 == 1) {
        this.setState({
          isBigNumberA: true, isSmallNumberA: false, dIsCheckO: true,
          totalAmountParity:
            this.state.totalAmountParity + this.state.dAmountO * this.state.systemKenoParity
        });
      }
      if (num3 == 2) {
        this.setState({
          isBigNumberA: false, isSmallNumberA: true, dIsCheckO: true,
          totalAmountParity:
            this.state.totalAmountParity + this.state.dAmountO * this.state.systemKenoParity
        });
      }

      this.calAmountParity(2);
    }

    else if (!this.state.isBigNumberB && !this.state.isSmallNumberB) {
      const num4 = Math.floor(Math.random() * 2) + 1;
      if (num4 == 1) {
        this.setState({
          isBigNumberB: true, isSmallNumberB: false, eIsCheckO: true,
          totalAmountParity:
            this.state.totalAmountParity + this.state.eAmountO * this.state.systemKenoParity
        });
      }
      if (num4 == 2) {
        this.setState({
          isBigNumberB: false, isSmallNumberB: true, eIsCheckO: true,
          totalAmountParity:
            this.state.totalAmountParity + this.state.eAmountO * this.state.systemKenoParity
        });
      }

      this.calAmountParity(4);
    }

    else if (!this.state.isBigNumberC && !this.state.isSmallNumberC) {
      const num5 = Math.floor(Math.random() * 2) + 1;
      if (num5 == 1) {
        this.setState({
          isBigNumberC: true, isSmallNumberC: false, fIsCheckO: true,
          totalAmountParity:
            this.state.totalAmountParity + this.state.fAmountO * this.state.systemKenoParity
        });
      }
      if (num5 == 2) {
        this.setState({
          isBigNumberC: false, isSmallNumberC: true, fIsCheckO: true,
          totalAmountParity:
            this.state.totalAmountParity + this.state.fAmountO * this.state.systemKenoParity
        });
      }

      this.calAmountParity(6);
    }
  }

  calAmountParity = type => {
    let _arrAmount = [];
    let _totalAmount = this.state.totalAmountParity;
    if (type == 1 && !this.state.isEvenNumberA && !this.state.isOddNumberA) {
      _totalAmount += this.state.systemKenoParity * this.state.aAmountO;
    }
    if (type == 2 && !this.state.isBigNumberA && !this.state.isSmallNumberA) {
      _totalAmount += this.state.systemKenoParity * this.state.dAmountO;
    }
    if (type == 3 && !this.state.isEvenNumberB && !this.state.isOddNumberB) {
      _totalAmount += this.state.systemKenoParity * this.state.bAmountO;
    }
    if (type == 4 && !this.state.isBigNumberB && !this.state.isSmallNumberB) {
      _totalAmount += this.state.systemKenoParity * this.state.eAmountO;
    }
    if (type == 5 && !this.state.isEvenNumberC && !this.state.isOddNumberC) {
      _totalAmount += this.state.systemKenoParity * this.state.cAmountO;
    }
    if (type == 6 && !this.state.isBigNumberC && !this.state.isSmallNumberC) {
      _totalAmount += this.state.systemKenoParity * this.state.fAmountO;
    }
    this.setState({ totalAmountParity: _totalAmount });
  };

  renderTabs() {
    return (
      <div className={styles.tab}>
        <div
          className={
            this.state.tabIndex == 1 ? styles.tab_active : styles.tab_normal
          }
          onClick={() => this.clickTab(1)}
        >
          CƠ BẢN
        </div>
        <div
          className={
            this.state.tabIndex == 2 ? styles.tab_active : styles.tab_normal
          }
          onClick={() => this.clickTab(2)}
        >
          CHẴN LẺ, LỚN NHỎ
        </div>

      </div>
    );
  }

  renderTabsContent() {
    if (this.state.tabIndex == 2) {
      return (
        <div>
          <div>
            <div className={styles.contentParity}>
              <div style={{ display: "flex" }}>
                <div className={styles.optionType}>
                  <div
                    className={
                      this.state.isEvenNumberA
                        ? styles.btnKenoParitySelect
                        : styles.btnKenoParity
                    }
                    onClick={() => this.optionPayA(1, 1)}
                  >
                    Chẵn
                  </div>
                  <div
                    className={
                      this.state.isEvenNumberB
                        ? styles.btnKenoParitySelect
                        : styles.btnKenoParity
                    }
                    onClick={() => this.optionPayB(3, 1)}
                  >
                    Chẵn
                  </div>
                  <div
                    className={
                      this.state.isEvenNumberC
                        ? styles.btnKenoParitySelect
                        : styles.btnKenoParity
                    }
                    onClick={() => this.optionPayC(5, 1)}
                  >
                    Chẵn
                  </div>
                </div>
                <div className={styles.optionType}>
                  <div
                    className={
                      this.state.isOddNumberA
                        ? styles.btnKenoParitySelect
                        : styles.btnKenoParity
                    }
                    onClick={() => this.optionPayA(1, 2)}
                  >
                    Lẻ
                  </div>
                  <div
                    className={
                      this.state.isOddNumberB
                        ? styles.btnKenoParitySelect
                        : styles.btnKenoParity
                    }
                    onClick={() => this.optionPayB(3, 2)}
                  >
                    Lẻ
                  </div>
                  <div
                    className={
                      this.state.isOddNumberC
                        ? styles.btnKenoParitySelect
                        : styles.btnKenoParity
                    }
                    onClick={() => this.optionPayC(5, 2)}
                  >
                    Lẻ
                  </div>
                </div>
                <div className={styles.optionType1}>
                  <div>{this.isCheckNumberO("A")}</div>
                  <div
                    style={{
                      margin: "20px 9px"
                    }}
                  >
                    {this.isCheckNumberO("B")}
                  </div>
                  <div>{this.isCheckNumberO("C")}</div>
                </div>
              </div>
              <div className={styles.line}></div>
              <div style={{ display: "flex" }}>
                <div className={styles.optionType}>
                  <div
                    className={
                      this.state.isBigNumberA
                        ? styles.btnKenoParitySelect
                        : styles.btnKenoParity
                    }
                    onClick={() => this.optionPayA(2, 1)}
                  >
                    Lớn
                  </div>
                  <div
                    className={
                      this.state.isBigNumberB
                        ? styles.btnKenoParitySelect
                        : styles.btnKenoParity
                    }
                    onClick={() => this.optionPayB(4, 1)}
                  >
                    Lớn
                  </div>
                  <div
                    className={
                      this.state.isBigNumberC
                        ? styles.btnKenoParitySelect
                        : styles.btnKenoParity
                    }
                    onClick={() => this.optionPayC(6, 1)}
                  >
                    Lớn
                  </div>
                </div>
                <div className={styles.optionType}>
                  <div
                    className={
                      this.state.isSmallNumberA
                        ? styles.btnKenoParitySelect
                        : styles.btnKenoParity
                    }
                    onClick={() => this.optionPayA(2, 2)}
                  >
                    Nhỏ
                  </div>
                  <div
                    className={
                      this.state.isSmallNumberB
                        ? styles.btnKenoParitySelect
                        : styles.btnKenoParity
                    }
                    onClick={() => this.optionPayB(4, 2)}
                  >
                    Nhỏ
                  </div>
                  <div
                    className={
                      this.state.isSmallNumberC
                        ? styles.btnKenoParitySelect
                        : styles.btnKenoParity
                    }
                    onClick={() => this.optionPayC(6, 2)}
                  >
                    Nhỏ
                  </div>
                </div>
                <div className={styles.optionType1}>
                  <div>{this.isCheckNumberO("D")}</div>
                  <div
                    style={{
                      margin: "20px 9px"
                    }}
                  >
                    {this.isCheckNumberO("E")}
                  </div>
                  <div>{this.isCheckNumberO("F")}</div>
                </div>
              </div>
              <div className={styles.line}></div>
              <div className={styles.tab}>{this.renderSystemParity()}</div>
              <WhiteSpace />
              <Flex style={{ padding: 8 }}>
                <Flex.Item className={styles.amount}>
                  <Text style={{ fontSize: 15 }}>Tạm tính: </Text>
                  <Text>
                    {stringToNumberFormat(this.state.totalAmountParity)} đ
                  </Text>
                </Flex.Item>
              </Flex>
            </div>
          </div>

          <div style={{ marginBottom: 8 }}>
            <Button
              className={styles.button_keno_tab_1}
              onClick={() => this.randomParity()}
            >
              <Text>CHỌN NHANH</Text>
            </Button>
          </div>
        </div>
      );
    } else {
      return (
        <div style={{ background: "#FFF" }}>
          <div
            style={{
              paddingLeft: 8,
              paddingRight: 8,
              paddingBottom: 8,
              paddingTop: 4,
              marginTop: 8
            }}
          >
            {this.initaNumber()}
            {this.initbNumber()}
            {this.initcNumber()}
            {/* {this.initdNumber()}
                {this.initeNumber()}
                {this.initfNumber()} */}
            {this.renderSystemKeno()}
            <WhiteSpace />
            <Flex style={{ padding: 8 }}>
              <Flex.Item className={styles.amount}>
                <Text style={{ fontSize: 15 }}>Tạm tính: </Text>
                <Text>{stringToNumberFormat(this.state.totalAmount)} đ</Text>
              </Flex.Item>
            </Flex>
          </div>
          <Button
            className={styles.button_keno_tab_1}
            onClick={() => this.randomFast()}
          >
            <Text>CHỌN NHANH</Text>
          </Button>

          <Flex>{this.RandomAllButton()}</Flex>
        </div>
      );
    }
  }

  renderSystemParity = () => {
    return this.state.systemParity.map((item, index, data) => {
      return (
        <div
          key={index}
          className={item.active ? styles.tab_active : styles.tab_normal}
          onClick={() => this.onChangeActive(item.value)}
        >
          {item.text}
        </div>
      );
    });
  };

  onChangeActive = value => {
    const _systemParity = this.state.systemParity.map((item, index, data) => {
      let _item = {};
      if (item.value == value) {
        _item = item;
        _item.active = true;
      } else {
        _item = item;
        _item.active = false;
      }
      return _item;
    });

    let _totalAmount = 0;
    if (this.state.aIsCheckO || this.state.isEvenNumberA || this.state.isOddNumberA) {
      _totalAmount = this.state.aAmountO * value;
    }
    if (this.state.bIsCheckO || this.state.isEvenNumberB || this.state.isOddNumberB) {
      _totalAmount += this.state.bAmountO * value;
    }
    if (this.state.cIsCheckO || this.state.isEvenNumberC || this.state.isOddNumberC) {
      _totalAmount += this.state.cAmountO * value;
    }
    if (this.state.dIsCheckO || this.state.isBigNumberA || this.state.isSmallNumberA) {
      _totalAmount += this.state.dAmountO * value;
    }
    if (this.state.eIsCheckO || this.state.isBigNumberB || this.state.isSmallNumberB) {
      _totalAmount += this.state.eAmountO * value;
    }
    if (this.state.fIsCheckO || this.state.isBigNumberC || this.state.isSmallNumberC) {
      _totalAmount += this.state.fAmountO * value;
    }
    this.setState({
      systemParity: _systemParity,
      systemKenoParity: value,
      totalAmountParity: _totalAmount
    });
  };

  optionPayA = (type, op) => {
    if (type == 1) {
      if (op == 1) {
        this.setState({
          isEvenNumberA: true, isOddNumberA: false,
          totalAmountParity:
            this.state.totalAmountParity + this.state.aAmountO * this.state.systemKenoParity
        });
      }
      if (op == 2) {
        this.setState({
          isEvenNumberA: false, isOddNumberA: true,
          totalAmountParity:
            this.state.totalAmountParity + this.state.aAmountO * this.state.systemKenoParity
        });
      }

      this.calAmountParity(1);
    }
    if (type == 2) {
      if (op == 1) {
        this.setState({
          isBigNumberA: true, isSmallNumberA: false,
          totalAmountParity:
            this.state.totalAmountParity + this.state.dAmountO * this.state.systemKenoParity
        });
      }
      if (op == 2) {
        this.setState({
          isBigNumberA: false, isSmallNumberA: true,
          totalAmountParity:
            this.state.totalAmountParity + this.state.dAmountO * this.state.systemKenoParity
        });
      }

      this.calAmountParity(2);
    }
  };

  optionPayB = (type, op) => {
    if (type == 3) {
      if (op == 1) {
        this.setState({
          isEvenNumberB: true, isOddNumberB: false,
          totalAmountParity:
            this.state.totalAmountParity + this.state.bAmountO * this.state.systemKenoParity
        });
      }
      if (op == 2) {
        this.setState({
          isEvenNumberB: false, isOddNumberB: true,
          totalAmountParity:
            this.state.totalAmountParity + this.state.bAmountO * this.state.systemKenoParity
        });
      }

      this.calAmountParity(3);
    }
    if (type == 4) {
      if (op == 1) {
        this.setState({
          isBigNumberB: true, isSmallNumberB: false,
          totalAmountParity:
            this.state.totalAmountParity + this.state.eAmountO * this.state.systemKenoParity
        });
      }
      if (op == 2) {
        this.setState({
          isBigNumberB: false, isSmallNumberB: true,
          totalAmountParity:
            this.state.totalAmountParity + this.state.eAmountO * this.state.systemKenoParity
        });
      }

      this.calAmountParity(4);
    }
  };

  optionPayC = (type, op) => {
    if (type == 5) {
      if (op == 1) {
        this.setState({
          isEvenNumberC: true, isOddNumberC: false,
          totalAmountParity:
            this.state.totalAmountParity + this.state.cAmountO * this.state.systemKenoParity
        });
      }
      if (op == 2) {
        this.setState({
          isEvenNumberC: false, isOddNumberC: true,
          totalAmountParity:
            this.state.totalAmountParity + this.state.cAmountO * this.state.systemKenoParity
        });
      }

      this.calAmountParity(5);
    }
    if (type == 6) {
      if (op == 1) {
        this.setState({
          isBigNumberC: true, isSmallNumberC: false,
          totalAmountParity:
            this.state.totalAmountParity + this.state.fAmountO * this.state.systemKenoParity
        });
      }
      if (op == 2) {
        this.setState({
          isBigNumberC: false, isSmallNumberC: true,
          totalAmountParity:
            this.state.totalAmountParity + this.state.AmountO * this.state.systemKenoParity
        });
      }

      this.calAmountParity(6);
    }
  };

  checkPayKeno() {
    //this.props.onPayment();
    if (this.state.tabIndex == 1) {
      if (
        (this.state.aIsCheck || this.state.bIsCheck || this.state.cIsCheck) &&
        this.state.systemKeno > 0
      ) {
        const data = {};
        data.ProductID = this.state.productID;
        data.MerchantID = localStorage.getItem("merchant_id");
        data.Amount = this.state.totalAmount;
        this.props.onGetFee(data);
      }
    } else if (this.state.tabIndex == 2) {
      if (
        this.state.isEvenNumberA ||
        this.state.isOddNumberA ||
        this.state.isBigNumberA ||
        this.state.isSmallNumberA ||
        this.state.isEvenNumberB ||
        this.state.isOddNumberB ||
        this.state.isBigNumberB ||
        this.state.isSmallNumberB ||
        this.state.isEvenNumberC ||
        this.state.isOddNumberC ||
        this.state.isBigNumberC ||
        this.state.isSmallNumberC
      ) {
        const data = {};
        data.ProductID = this.state.productID;
        data.MerchantID = localStorage.getItem("merchant_id");
        data.Amount = this.state.totalAmountParity
        this.props.onGetFee(data);
      }
    }
  }

  onChangeBag = (value) => {
    let arr = [];
    for (let i = 0; i < value; i++) {
      let item = "";
      arr.push(item);
    }

    this.clearData("A");
    this.clearData("B");
    this.clearData("C");

    console.log(arr);

    this.setState({ aNumber: arr, bNumber: arr, cNumber: arr, totalAmount: 0 });
  };

  render() {
    // console.log(this.state.closeTime);
    return (
      <div className={styles2.content}>
        {/* <ActivityIndicator className={styles1.spin} animating={this.state.animating} toast>
            </ActivityIndicator> */}
        {this.modalView()}

        <div
          className={styles2.div_button}
          style={{ marginLeft: 6, marginRight: 6 }}
        >
          <div style={{ display: "flex", padding: "4px 0" }}>
            <div>
              <img
                className={styles2.div_img}
                src={require("../../assets/keno_logo.png")}
                alt=""
              />
            </div>
            <div className={styles2.div_border}></div>
            <div className={styles2.div_group_text}>
              <div className={styles2.div_text_amt}>
                <span className={styles2.span_text}>x</span>200.000
                <span className={styles2.span_text}>lần</span>
              </div>
            </div>
          </div>
        </div>

        <WingBlank
          style={{ marginLeft: 6, marginRight: 6, background: "#FFFFFF" }}
        >
          {this.renderTabs()}

          {this.state.tabIndex == 1 ? (
            <div style={{ background: "#FFFFFF", margin: "8px 0px" }}>
              <Picker
                data={kenoLevel}
                cols={1}
                className={styles2.modal_view}
                okText="Chọn"
                dismissText="Đóng"
                value={[this.state.bagitem]}
                onChange={(v) => this.onChangeBag(v[0])}
                onOk={(v) => this.setState({ bagitem: v[0] })}
              >
                <Button
                  className={styles.button_drop_down}
                  style={{ width: "100%", padding: "0px 8px" }}
                >
                  <Text> {`Bậc ${this.state.bagitem}`}</Text>
                  <CustomeIcon
                    className={styles2.drop}
                    type={require("../../assets/caret_down.svg")}
                  ></CustomeIcon>
                </Button>
              </Picker>
            </div>
          ) : (
              <div></div>
            )}

          {this.renderTabsContent()}
          <div
            className={styles2.booking_keno}
            style={{ margin: "0px 8px", padding: "5px 0px" }}
            onClick={() => {
              this.checkPayKeno();
            }}
          >
            <Text style={{ fontWeight: "bold" }}>ĐẶT VÉ</Text>
            <div className={styles2.div_img_text}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  fontSize: "11pt"
                }}
              >
                <span style={{ marginRight: 4 }}>{`Thời gian còn `}</span>
                {this.state.closeTime > 0 ? (
                  <CountDownKeno type={1} downTime={this.state.closeTime} />
                ) : (
                    <div></div>
                  )}
              </div>
            </div>
          </div>
          <div
            className={styles2.tutorial}
            onClick={() => this.props.onTutorial(this.state.tutorialKeno)}
          >
            <span style={{ borderBottom: "1px solid #0cb3ff" }}>
              Hướng dẫn cách chơi
            </span>
          </div>
        </WingBlank>
      </div>
    );
  }
}
export default Keno;
