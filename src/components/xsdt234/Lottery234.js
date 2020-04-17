import React from "react";
import {
  Text,
  WhiteSpace,
  Flex,
  ActionSheet,
  WingBlank,
  Button,
  Toast,
  ActivityIndicator
} from "antd-mobile";
import { ColorButton } from '../../utils/ColorBase';
import styles from "./lottery234.less";
import styles1 from "../Main.less";
import CustomeTrashIcon from "../../utils/CustomeTrashIcon";
import {
  stringToNumberFormat,
  padLeft,
  getWeekdaysShort
} from "../../utils/Helper";
import SelectNumber from "./SelectNumber";
const isIPhone = new RegExp("\\biPhone\\b|\\biPod\\b", "i").test(
  window.navigator.userAgent
);
let wrapProps;
if (isIPhone) {
  wrapProps = {
    onTouchStart: e => e.preventDefault()
  };
}

const amountFix = 20000;
const numberInit2 = ["", ""];
const numberInit3 = ["", "", ""];
const numberInit4 = ["", "", "", ""];
class Lottery234 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      systemInit: [],
      opSystem: [
        { value: 1, text: "1 kỳ", active: true },
        { value: 2, text: "2 kỳ", active: false },
        { value: 5, text: "5 kỳ", active: false },
        { value: 10, text: "10 kỳ", active: false }
      ],
      system: 1,
      aNumber: numberInit2,
      aAmountText: stringToNumberFormat(amountFix) + "đ",
      aAmount: amountFix,
      aIsCheck: false,
      bNumber: numberInit2,
      bAmountText: stringToNumberFormat(amountFix) + "đ",
      bAmount: amountFix,
      bIsCheck: false,
      cNumber: numberInit2,
      cAmountText: stringToNumberFormat(amountFix) + "đ",
      cAmount: amountFix,
      cIsCheck: false,
      dNumber: numberInit2,
      dAmountText: stringToNumberFormat(amountFix) + "đ",
      dAmount: amountFix,
      dIsCheck: false,
      eNumber: numberInit2,
      eAmountText: stringToNumberFormat(amountFix) + "đ",
      eAmount: amountFix,
      eIsCheck: false,
      modalType: "",
      modal: false,
      totalAmount: 0,
      productID: 8, 
      bagitem: 4,
      limititem: 2,
      tutorialLottery234: "",
      tabIndex: 2
    };
  }

  componentWillMount() {
    if (
      this.props.location.payload !== undefined &&
      this.props.location.payload !== null
    ) {
      //console.log(this.props.location.payload.aNumber);
      this.setState(this.props.location.payload);
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.response !== undefined) {
    //  console.log(nextProps.response);
      if (nextProps.response.Code === "00") {
        const sys = nextProps.response.ListValue.map((item, index, data) => {
          let dataNew = {};
          dataNew.DrawCode = item.DrawCode;
          dataNew.DrawDate = item.DrawDate;
          const dateParts = item.DrawDate.split("/");
          const date = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
          dataNew.label = (
            <Text>
              Kỳ: #{item.DrawCode} - {getWeekdaysShort(date.getDay())}{" "}
              {item.DrawDate}
            </Text>
          );
          return dataNew;
        });
       // console.log(sys);
        this.setState({ systemInit: sys });
      } else {
        Toast.info("Không tải được thông tin kỳ mở thưởng", 5);
        this.props.onBack();
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
    if(nextProps.tutorialLottery234 !== undefined){
      if(nextProps.tutorialLottery234.data.Code === "00" ){
        const value = nextProps.tutorialLottery234.data.Value;
        this.setState({
          tutorialLottery234: value
        });
      }
    }
  };
  isCheckNumber = (type) => {
    let showType = null;
    switch (type) {
      case "A":
          showType = this.state.aIsCheck === true ? this.buttonAfterNumber(type) : this.buttonBeforeNumber(type);
          break;
      case "B":
          showType = this.state.bIsCheck === true ? this.buttonAfterNumber(type) : this.buttonBeforeNumber(type);
          break;
      case "C":
          showType = this.state.cIsCheck === true ? this.buttonAfterNumber(type) : this.buttonBeforeNumber(type);
          break;
      case "D":
          showType = this.state.dIsCheck === true ? this.buttonAfterNumber(type) : this.buttonBeforeNumber(type);
          break;
      case "E":
          showType = this.state.eIsCheck === true ? this.buttonAfterNumber(type) : this.buttonBeforeNumber(type);
          break;
      default:
          showType = this.buttonBeforeNumber(type);
          break;
    }
    return (
        showType
    )
  };
  initaNumber = () => {
    const number = this.state.aNumber.map((item, index, data) => {
        return (
            <Text key={index} className={styles.text_number_circle} onClick={this.showModal("modal", "A")}>
              {item}
            </Text>
        );
    });
    return (
        <div className={styles.row_number}>
            <Text className={styles.text_header} style={{ float: "left", width: 40 }}>A</Text>
            <div style={{ width: "100%" }}>                
                {number}
            </div>
            {this.isCheckNumber('A')}
        </div>
    );
  };
  initbNumber = () => {
    const number = this.state.bNumber.map((item, index, data) => {
        return (
            <Text key={index} className={styles.text_number_circle} onClick={this.showModal("modal", "B")}>{item}</Text>
        );
    });
    return (
        <div className={styles.row_number}>
            <Text className={styles.text_header} style={{ float: "left", width: 40 }}>B</Text>
            <div style={{ width: "100%" }}>
                {number}
            </div>
            {this.isCheckNumber('B')}
        </div>
    );
  };
  initcNumber = () => {
    const number = this.state.cNumber.map((item, index, data) => {
        return (
            <Text key={index} className={styles.text_number_circle} onClick={this.showModal("modal", "C")}>{item}</Text>
        );
    });
    return (
        <div className={styles.row_number}>
            <Text className={styles.text_header} style={{ float: "left", width: 40 }} >C</Text>
            <div style={{ width: "100%" }}>
                {number}
            </div>
            {this.isCheckNumber('C')}
        </div>
    );
  };
  initdNumber = () => {
    const number = this.state.dNumber.map((item, index, data) => {
        return (
            <Text key={index} className={styles.text_number_circle} onClick={this.showModal("modal", "D")}>{item}</Text>
        );
    });
    return (
        <div className={styles.row_number}>
            <Text className={styles.text_header} style={{ float: "left", width: 40 }}>D</Text>
            <div style={{ width: "100%" }}>
                {number}
            </div>
            {this.isCheckNumber('D')}
        </div>
    );
  };
  initeNumber = () => {
    const number = this.state.eNumber.map((item, index, data) => {
        return (
            <Text key={index} className={styles.text_number_circle} onClick={this.showModal("modal", "E")}>{item}</Text>
        );
    });
    return (
        <div className={styles.row_number}>
            <Text className={styles.text_header} style={{ float: "left", width: 40 }}>E</Text>
            <div style={{ width: "100%" }}>
                {number}
            </div>
            {this.isCheckNumber('E')}
        </div>
    );
  };
  buttonBeforeNumber = type => {
    return (
      <div className={styles.random}>
        <Button
          type="warning"
          size="small"
          className={styles.btnRandomRow}
          onClick={() => this.randomDT234(type)}
        >
          <Text>TC</Text>
        </Button>
        <Text
          onClick={() => this.showAmount(type)}
          className={styles.text_amount}
        >
          {this.showText(type)}
        </Text>
      </div>
    );
  };
  buttonAfterNumber = type => {
    return (
      <div className={styles.random}>
        <Button
          type="warning"
          size="small"
          className={styles.btnClearRow}
          onClick={() => this.clearData(type)}
        >
          <CustomeTrashIcon
            type={require("../../assets/trash.svg")}
          ></CustomeTrashIcon>
        </Button>
        <Text
          onClick={() => this.showAmount(type)}
          className={styles.text_amount}
        >
          {this.showText(type)}
        </Text>
      </div>
    );
  };
  showText = type => {
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
      case "D":
        showType = <Text>{this.state.dAmountText}</Text>;
        break;
      case "E":
        showType = <Text>{this.state.eAmountText}</Text>;
        break;
      default:
        showType = "Mệnh giá";
        break;
    }
    return showType;
  };
  showModal = (key, type) => (e) => {
    e.preventDefault();
    this.setState({
        modalType: type,
        [key]: true
    });
  };
  renderSystem = () => {
    return this.state.opSystem.map((item, index, data) => {
      return (
        <div
          key={index}
          className={item.active ? styles1.tab_active : styles1.tab_normal}
          onClick={() => this.onChangeActive(item.value)}
        >
          {item.text}
        </div>
      );
    });
  };

  onChangeActive = value => {
    const _opSystem = this.state.opSystem.map((item, index, data) => {
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
    let totalAmount = 0;
    if (this.state.aIsCheck) {
      totalAmount = this.state.aAmount * value;
    }
    if (this.state.bIsCheck) {
      totalAmount += this.state.bAmount * value;
    }
    if (this.state.cIsCheck) {
      totalAmount += this.state.cAmount * value;
    }
    if (this.state.dIsCheck) {
      totalAmount += this.state.dAmount * value;
    }
    if (this.state.eIsCheck) {
      totalAmount += this.state.eAmount * value;
    }
    this.setState({
      opSystem: _opSystem,
      system: value,
      totalAmount: totalAmount
    });
  };

  randomNumber = (except = []) => {
    let num = (Math.floor(Math.random() * 99) + 1);
    return except.some(x => x === num) ? this.randomNumber(except) : padLeft(num,2,"0");
  };

  randomDT234 = (type) => {
    let number = [];
    let numbertmp = [];
    let _totalAmount = 0;
    switch (type) {
      case "A":
        number = this.state.aNumber.map((item, index, data) => {
            let rannumber = this.randomNumber(numbertmp);
            numbertmp.push(rannumber);
            return rannumber;
            // let _number = this.randomNumber(index);
            // if (index != 0) _number = padLeft(_number, index + 1, "0");
            // return _number;
        });
        // this.setState({ aNumber: number.sort((a, b) => a - b), aIsCheck: true })
        this.setState({
          aNumber: number,
          aIsCheck: true,
          totalAmount:
            this.state.totalAmount + this.state.aAmount * this.state.system
        }); 
        break;
      case "B":
        number = this.state.bNumber.map(() => {
            let rannumber = this.randomNumber(numbertmp);
            numbertmp.push(rannumber);
            return rannumber;
        });
        // this.setState({ bNumber: number.sort((a, b) => a - b), bIsCheck: true })
        this.setState({
          bNumber: number,
          bIsCheck: true,
          totalAmount:
            this.state.totalAmount + this.state.bAmount * this.state.system
        });
        break;
      case "C":
        number = this.state.aNumber.map(() => {
            let rannumber = this.randomNumber(numbertmp);
            numbertmp.push(rannumber);
            return rannumber;
        });
        // this.setState({ cNumber: number.sort((a, b) => a - b), cIsCheck: true })
        this.setState({
          cNumber: number,
          cIsCheck: true,
          totalAmount:
            this.state.totalAmount + this.state.cAmount * this.state.system
        });
        break;
      case "D":
        number = this.state.dNumber.map(() => {
            let rannumber = this.randomNumber(numbertmp);
            numbertmp.push(rannumber);
            return rannumber;
        });
        // this.setState({ dNumber: number.sort((a, b) => a - b), dIsCheck: true })
        this.setState({
          dNumber: number,
          dIsCheck: true,
          totalAmount:
            this.state.totalAmount + this.state.dAmount * this.state.system
        });
        break;
      case "E":
        number = this.state.eNumber.map(() => {
            let rannumber = this.randomNumber(numbertmp);
            numbertmp.push(rannumber);
            return rannumber;
        });
        // this.setState({ eNumber: number.sort((a, b) => a - b), eIsCheck: true })
        this.setState({
          eNumber: number,
          eIsCheck: true,
          totalAmount:
            this.state.totalAmount + this.state.eAmount * this.state.system
        });
        break;
    }
  };
  randomFast() {
    let _totalAmount = 0;
    let number = [];
    let numbertmp = [];
    if (!this.state.aIsCheck) {
        number = this.state.aNumber.map((item, index, data) => {
            let rannumber = this.randomNumber(numbertmp);
            numbertmp.push(rannumber);
            return rannumber;
        });
        // _totalAmount = this.state.totalAmount + (this.state.price * this.state.system.length);
        // this.setState({ totalAmount: _totalAmount, aNumber: number.sort((a, b) => a - b), aIsCheck: true })
        _totalAmount = this.state.totalAmount + this.state.aAmount * this.state.system;
        this.setState({
          aNumber: number,
          aIsCheck: true,
          totalAmount: _totalAmount
        });
    }
    else if (!this.state.bIsCheck) {
        number = this.state.bNumber.map((item, index, data) => {
            let rannumber = this.randomNumber(numbertmp);
            numbertmp.push(rannumber);
            return rannumber;
        });
        // const _totalAmount = this.state.totalAmount + (this.state.price * this.state.system.length);
        // this.setState({ totalAmount: _totalAmount, bNumber: number.sort((a, b) => a - b), bIsCheck: true })
        _totalAmount = this.state.totalAmount + this.state.bAmount * this.state.system;
        this.setState({
          bNumber: number,
          bIsCheck: true,
          totalAmount: _totalAmount
        });
    }
    else if (!this.state.cIsCheck) {
        number = this.state.cNumber.map((item, index, data) => {
            let rannumber = this.randomNumber(numbertmp);
            numbertmp.push(rannumber);
            return rannumber;
        });
        // const _totalAmount = this.state.totalAmount + (this.state.price * this.state.system.length);
        // this.setState({ totalAmount: _totalAmount, cNumber: number.sort((a, b) => a - b), cIsCheck: true })
        _totalAmount = this.state.totalAmount + this.state.cAmount * this.state.system;
        this.setState({
          cNumber: number,
          cIsCheck: true,
          totalAmount: _totalAmount
        });
    }
    else if (!this.state.dIsCheck) {
        number = this.state.dNumber.map((item, index, data) => {
            let rannumber = this.randomNumber(numbertmp);
            numbertmp.push(rannumber);
            return rannumber;
        });
        // const _totalAmount = this.state.totalAmount + (this.state.price * this.state.system.length);
        // this.setState({ totalAmount: _totalAmount, dNumber: number.sort((a, b) => a - b), dIsCheck: true })
        _totalAmount = this.state.totalAmount + this.state.dAmount * this.state.system;
        this.setState({
          dNumber: number,
          dIsCheck: true,
          totalAmount: _totalAmount
        });
    }
    else if (!this.state.eIsCheck) {
        number = this.state.eNumber.map((item, index, data) => {
            let rannumber = this.randomNumber(numbertmp);
            numbertmp.push(rannumber);
            return rannumber;
        });
        // const _totalAmount = this.state.totalAmount + (this.state.price * this.state.system.length);
        // this.setState({ totalAmount: _totalAmount, eNumber: number.sort((a, b) => a - b), eIsCheck: true })
        _totalAmount = this.state.totalAmount + this.state.eAmount * this.state.system;
        this.setState({
          eNumber: number,
          eIsCheck: true,
          totalAmount: _totalAmount
        });
    }
  };

  randomAll() {
    let number = [];
    let numbertmp = [];
    let _totalAmount = this.state.totalAmount;
    if (!this.state.aIsCheck) {
        number = this.state.aNumber.map((item, index, data) => {
            let rannumber = this.randomNumber(numbertmp);
            numbertmp.push(rannumber);
            return rannumber;
        });
        // this.setState({ aNumber: number.sort((a, b) => a - b), aIsCheck: true })
        _totalAmount = this.state.aAmount * this.state.system;
        this.setState({ aNumber: number, aIsCheck: true });
    }
    if (!this.state.bIsCheck) {
        number = this.state.bNumber.map((item, index, data) => {
            let rannumber = this.randomNumber(numbertmp);
            numbertmp.push(rannumber);
            return rannumber;
        });
        // this.setState({ bNumber: number.sort((a, b) => a - b), bIsCheck: true })
        _totalAmount += this.state.bAmount * this.state.system;
        this.setState({ bNumber: number, bIsCheck: true });
    }
    if (!this.state.cIsCheck) {
        number = this.state.cNumber.map((item, index, data) => {
            let rannumber = this.randomNumber(numbertmp);
            numbertmp.push(rannumber);
            return rannumber;
        });
        // this.setState({ cNumber: number.sort((a, b) => a - b), cIsCheck: true })
        _totalAmount += this.state.cAmount * this.state.system;
        this.setState({ cNumber: number, cIsCheck: true });
    }
    if (!this.state.dIsCheck) {
        number = this.state.dNumber.map((item, index, data) => {
            let rannumber = this.randomNumber(numbertmp);
            numbertmp.push(rannumber);
            return rannumber;
        });
        // this.setState({ dNumber: number.sort((a, b) => a - b), dIsCheck: true })
        _totalAmount += this.state.dAmount * this.state.system;
        this.setState({ dNumber: number, dIsCheck: true });
    }
    if (!this.state.eIsCheck) {
        number = this.state.eNumber.map((item, index, data) => {
            let rannumber = this.randomNumber(numbertmp);
            numbertmp.push(rannumber);
            return rannumber;
        });
        // this.setState({ eNumber: number.sort((a, b) => a - b), eIsCheck: true })
        _totalAmount += this.state.eAmount * this.state.system;
        this.setState({ eNumber: number, eIsCheck: true });
    }
    // const _totalAmount = this.state.totalAmount + (this.state.price * this.state.system.length) * 6;
    this.setState({ totalAmount: _totalAmount })
    // aNumber: number.sort((a, b) => a - b), aIsCheck: true , bNumber: number.sort((a, b) => a - b), bIsCheck: true , cNumber: number.sort((a, b) => a - b), cIsCheck: true ,dNumber: number.sort((a, b) => a - b), dIsCheck: true, eNumber: number.sort((a, b) => a - b), eIsCheck: true , fNumber: number.sort((a, b) => a - b), fIsCheck: true 
  };

  showAmount = param => {
    const BUTTONS = ["20,000đ", "50,000đ", "100,000đ", "Đóng"];

    ActionSheet.showActionSheetWithOptions(
      {
        options: BUTTONS,
        destructiveButtonIndex: BUTTONS.length - 1,
        // title: 'title',
        message: "Chọn mệnh giá",
        maskClosable: true,
        "data-seed": "logId",
        wrapProps
      },
      buttonIndex => {
        if (buttonIndex !== -1 && buttonIndex !== 3) {
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
            case "D":
              this.fillAmount(buttonIndex, param);
              break;
            case "E":
              this.fillAmount(buttonIndex, param);
              break;
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
        amount = "20,000đ";
        iAmount = 20000;
        break;
      case 1:
        amount = "50,000đ";
        iAmount = 50000;
        break;
      case 2:
        amount = "100,000đ";
        iAmount = 100000;
        break;
      default:
        break;
    }
    switch (type) {
      case "A":
        tempAmount = this.state.aAmount;
        if (this.state.aIsCheck) {
          this.setState({
            aAmount: iAmount,
            aAmountText: amount,
            totalAmount:
              this.state.totalAmount -
              this.state.system * tempAmount +
              iAmount * this.state.system
          });
        } else {
          this.setState({ aAmount: iAmount, aAmountText: amount });
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
              this.state.system * tempAmount +
              iAmount * this.state.system
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
              this.state.system * tempAmount +
              iAmount * this.state.system
          });
        } else {
          this.setState({ cAmount: iAmount });
        }
        break;
      case "D":
        tempAmount = this.state.dAmount;
        this.setState({ dAmountText: amount });
        if (this.state.dIsCheck) {
          this.setState({
            dAmount: iAmount,
            totalAmount:
              this.state.totalAmount -
              this.state.system * tempAmount +
              iAmount * this.state.system
          });
        } else {
          this.setState({ dAmount: iAmount });
        }
        break;
      case "E":
        tempAmount = this.state.eAmount;
        this.setState({ eAmountText: amount });
        if (this.state.eIsCheck) {
          this.setState({
            eAmount: iAmount,
            totalAmount:
              this.state.totalAmount -
              this.state.system * tempAmount +
              iAmount * this.state.system
          });
        } else {
          this.setState({ eAmount: iAmount });
        }
        break;
      default:
        break;
    }
  };

  clearData = type => {
    if(this.state.tabIndex == 2){
      switch (type) {
        case "A":
          this.setState({
            aNumber: ["", ""],
            aIsCheck: false,
            totalAmount:
              this.state.totalAmount - this.state.aAmount * this.state.system
          });
          break;
        case "B":
          this.setState({
            bNumber: ["", ""],
            bIsCheck: false,
            totalAmount:
              this.state.totalAmount - this.state.bAmount * this.state.system
          });
          break;
        case "C":
          this.setState({
            cNumber: ["", ""],
            cIsCheck: false,
            totalAmount:
              this.state.totalAmount - this.state.cAmount * this.state.system
          });
          break;
        case "D":
          this.setState({
            dNumber: ["", ""],
            dIsCheck: false,
            totalAmount:
              this.state.totalAmount - this.state.dAmount * this.state.system
          });
          break;
        case "E":
          this.setState({
            eNumber: ["", ""],
            eIsCheck: false,
            totalAmount:
              this.state.totalAmount - this.state.eAmount * this.state.system
          });
          break;
        default:
          break;
      }
    }else if(this.state.tabIndex == 3){
      switch (type) {
        case "A":
          this.setState({
            aNumber: ["", "", ""],
            aIsCheck: false,
            totalAmount:
              this.state.totalAmount - this.state.aAmount * this.state.system
          });
          break;
        case "B":
          this.setState({
            bNumber: ["", "", ""],
            bIsCheck: false,
            totalAmount:
              this.state.totalAmount - this.state.bAmount * this.state.system
          });
          break;
        case "C":
          this.setState({
            cNumber: ["", "", ""],
            cIsCheck: false,
            totalAmount:
              this.state.totalAmount - this.state.cAmount * this.state.system
          });
          break;
        case "D":
          this.setState({
            dNumber: ["", "", ""],
            dIsCheck: false,
            totalAmount:
              this.state.totalAmount - this.state.dAmount * this.state.system
          });
          break;
        case "E":
          this.setState({
            eNumber: ["", "", ""],
            eIsCheck: false,
            totalAmount:
              this.state.totalAmount - this.state.eAmount * this.state.system
          });
          break;
        default:
          break;
      }
    }else{
      switch (type) {
        case "A":
          this.setState({
            aNumber: ["", "", "", ""],
            aIsCheck: false,
            totalAmount:
              this.state.totalAmount - this.state.aAmount * this.state.system
          });
          break;
        case "B":
          this.setState({
            bNumber: ["", "", "", ""],
            bIsCheck: false,
            totalAmount:
              this.state.totalAmount - this.state.bAmount * this.state.system
          });
          break;
        case "C":
          this.setState({
            cNumber: ["", "", "", ""],
            cIsCheck: false,
            totalAmount:
              this.state.totalAmount - this.state.cAmount * this.state.system
          });
          break;
        case "D":
          this.setState({
            dNumber: ["", "", "", ""],
            dIsCheck: false,
            totalAmount:
              this.state.totalAmount - this.state.dAmount * this.state.system
          });
          break;
        case "E":
          this.setState({
            eNumber: ["", "", "", ""],
            eIsCheck: false,
            totalAmount:
              this.state.totalAmount - this.state.eAmount * this.state.system
          });
          break;
        default:
          break;
      }
    }
    
  };
  modalNumberView = () => {
    return (
      <SelectNumber
        // type={this.state.modalType}
        // modal={this.state.modal}
        // onValue={this.onPutValue}
        // onClose={this.onCloseModal}
        // onAccept={this.onAcceptModal}
        value={this.state.limititem}
        type={this.state.modalType}
        modal={this.state.modal}
        onValue={this.onPutValue}
        onClose={this.onCloseModal}
        onAccept={this.onAcceptModal}
      />
    );
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
      case "D":
        value = this.state.dNumber;
        break;
      case "E":
        value = this.state.eNumber;
        break;
      default:
        break;
    }
    return value;
  };

  onAcceptModal = (key, data, type) => () => {
    let i = 0;
    switch (type) {
      case "A":
        if (!this.state.aIsCheck) {
          const _totalAmount =
            this.state.totalAmount + this.state.aAmount * this.state.system;
          this.setState({ totalAmount: _totalAmount });
        } 
        for(i=0;i<this.state.tabIndex;i++){
          data[i] = padLeft (data[i],2,"0");
        }
        this.setState({ aNumber: data, aIsCheck: true });
        break;
      case "B":
        if (!this.state.bIsCheck) {
          const _totalAmount =
            this.state.totalAmount + this.state.bAmount * this.state.system;
          this.setState({ totalAmount: _totalAmount });
        }
        for(i; i<this.state.tabIndex; i++){
          data[i] = padLeft (data[i],2,"0");
        }
        this.setState({ bNumber: data, bIsCheck: true });
        break;
      case "C":
        if (!this.state.cIsCheck) {
          const _totalAmount =
            this.state.totalAmount + this.state.cAmount * this.state.system;
          this.setState({ totalAmount: _totalAmount });
        }
        for(i=0;i<this.state.tabIndex;i++){
          data[i] = padLeft (data[i],2,"0");
        }
        this.setState({ cNumber: data, cIsCheck: true });
        break;
      case "D":
        if (!this.state.dIsCheck) {
          const _totalAmount =
            this.state.totalAmount + this.state.dAmount * this.state.system;
          this.setState({ totalAmount: _totalAmount });
        }
        for(i=0;i<this.state.tabIndex;i++){
          data[i] = padLeft (data[i],2,"0");
        }
        this.setState({ dNumber: data, dIsCheck: true });
        break;
      case "E":
        if (!this.state.eIsCheck) {
          const _totalAmount =
            this.state.totalAmount + this.state.eAmount * this.state.system;
          this.setState({ totalAmount: _totalAmount });
        }
        for(i=0;i<this.state.tabIndex;i++){
          data[i] = padLeft (data[i],2,"0");
        }
        this.setState({ eNumber: data, eIsCheck: true });
        break;
      default:
        break;
    }
    this.setState({
      modalType: "",
      [key]: false
    });
  };

  onCloseModal = key => () => {
    this.setState({
      modalType: "",
      [key]: false
    });
  };
  checkPay() {
    if (
      this.state.aIsCheck ||
      this.state.bIsCheck ||
      this.state.cIsCheck ||
      this.state.dIsCheck ||
      this.state.eIsCheck
    ) {
      const data = {};
      data.ProductID = this.state.productID;
      data.MerchantID = localStorage.getItem("merchant_id");
      data.Amount = this.state.totalAmount;
      this.props.onGetFee(data);
    }
  };
  RandomAllButton = () => {
    if (this.state.bagitem !== 4) {
        return (<div style={{ display: "none" }}></div>);
    }
    else if (this.state.aIsCheck === true || this.state.bIsCheck === true || this.state.cIsCheck === true || this.state.dIsCheck === true || this.state.eIsCheck === true) {
        return (<Button style={{ background: ColorButton, color: "white", width: "100%", marginLeft: 8, marginRight: 8, marginBottom: 8, height: 40, lineHeight: 2 }} disabled={true}>
            <Text>Chọn nhanh 5 dãy</Text>
        </Button>);
    }
    else {
        return (<Button style={{ background: ColorButton, color: "white", width: "100%", marginLeft: 8, marginRight: 8, marginBottom: 8, height: 40, lineHeight: 2 }} onClick={() => this.randomAll()}>
            <Text>Chọn nhanh 5 dãy</Text>
        </Button>);
    }
  };
  clickTab = index => {
    // this.setState({ tabIndex: index });
    if(index == 3){
      this.setState({
        aNumber: numberInit3,
        bNumber: numberInit3,
        cNumber: numberInit3,
        dNumber: numberInit3,
        eNumber: numberInit3,
        aIsCheck: false,
        bIsCheck: false,
        cIsCheck: false,
        dIsCheck: false,
        eIsCheck: false,
        tabIndex: index,
        limititem: 3,
        totalAmount: 0,
        check: false
      });
    }else if(index == 4){
      this.setState({
        aNumber: numberInit4,
        bNumber: numberInit4,
        cNumber: numberInit4,
        dNumber: numberInit4,
        eNumber: numberInit4,
        aIsCheck: false,
        bIsCheck: false,
        cIsCheck: false,
        dIsCheck: false,
        eIsCheck: false,
        tabIndex: index,
        limititem: 4,
        totalAmount: 0,
        check: false
      });
    }else{
      this.setState({
        aNumber: numberInit2,
        bNumber: numberInit2,
        cNumber: numberInit2,
        dNumber: numberInit2,
        eNumber: numberInit2,
        aIsCheck: false,
        bIsCheck: false,
        cIsCheck: false,
        dIsCheck: false,
        eIsCheck: false,
        tabIndex: index,
        limititem: 2,
        totalAmount: 0,
        check: false
      });
    }
  };
  renderTabs() {
    return (
      <div className={styles1.tab}>
        <div
          className={
            this.state.tabIndex == 2 ? styles1.tab_active : styles1.tab_normal
          }
          onClick={() => this.clickTab(2)}
        >
          2 cặp số
        </div>
        <div
          className={
            this.state.tabIndex == 3 ? styles1.tab_active : styles1.tab_normal
          }
          onClick={() => this.clickTab(3)}
        >
          3 cặp số
        </div>
        <div
          className={
            this.state.tabIndex == 4 ? styles1.tab_active : styles1.tab_normal
          }
          onClick={() => this.clickTab(4)}
        >
          4 cặp số
        </div>
      </div>
    );
  };
  renderTabsContent() {
    if (this.state.tabIndex == 2) {
      return (
        <div>
          <div
            style={{
              paddingLeft: 8,
              paddingRight: 8,
              paddingBottom: 8,
              paddingTop: 4,
              marginTop: 8,
              background: "#FFF"
            }}
          >
            {this.initaNumber()}
            {this.initbNumber()}
            {this.initcNumber()}
            {this.initdNumber()}
            {this.initeNumber()}
          </div>
        </div>
        
      );
    } else if(this.state.tabIndex == 3){
      return (
        <div>
          <div
            style={{
              paddingLeft: 8,
              paddingRight: 8,
              paddingBottom: 8,
              paddingTop: 4,
              marginTop: 8,
              background: "#FFF"
            }}
          >
            {this.initaNumber()}
            {this.initbNumber()}
            {this.initcNumber()}
            {this.initdNumber()}
            {this.initeNumber()}
          </div>
        </div>
      );
    }else{
      return (
        <div>
          <div
            style={{
              paddingLeft: 8,
              paddingRight: 8,
              paddingBottom: 8,
              paddingTop: 4,
              marginTop: 8,
              background: "#FFF"
            }}
          >
            {this.initaNumber()}
            {this.initbNumber()}
            {this.initcNumber()}
            {this.initdNumber()}
            {this.initeNumber()}
          </div>
        </div>
      );
    }
  }
  render() {
    return (
      <div className={styles1.content}>
        {this.modalNumberView()}
        <div
          className={styles1.div_button}
          style={{ marginLeft: 6, marginRight: 6 }}
        >
          <div style={{ display: "flex", padding: "4px 0" }}>
            <div>
              <img
                className={styles1.div_img}
                src={require("../../assets/lottery_234.png")}
                alt=""
              />
            </div>
            <div className={styles1.div_border}></div>
            <div className={styles1.div_group_text}>
              <div className={styles1.div_text_amt}>
                <span className={styles1.span_text}>x</span>1.000
                <span className={styles1.span_text}>lần</span>
              </div>
            </div>
          </div>
        </div>
        <WingBlank style={{ marginLeft: 6, marginRight: 6 }}>
          {this.renderTabs()}
          {this.renderTabsContent()}
        </WingBlank>
          <div
            style={{
              marginLeft: 8,
              marginRight: 8,
              paddingLeft: 8,
              paddingRight: 8,
              paddingBottom: 8,
              paddingTop: 4,
              marginTop: 8,
              background: "#FFF"
            }}
          >
          {/* {this.initaNumber()}
          {this.initbNumber()}
          {this.initcNumber()}
          {this.initdNumber()}
          {this.initeNumber()} */}
          <div className={styles1.select_system}>Chọn kỳ</div>
          <div className={styles1.tab}>{this.renderSystem()}</div>
          <Flex style={{ padding: 8 }}>
            <Flex.Item className={styles.amount}>
              <Text style={{ fontSize: 15}}>Tạm tính: </Text>
              <Text>{stringToNumberFormat(this.state.totalAmount)} đ</Text>
            </Flex.Item>
          </Flex>
        </div>
        <Flex>
          <Button style={{ background: ColorButton, color: "#FFFFFF", width: "100%", marginLeft: 8, marginRight: 8, height: 40, lineHeight: 2 }} onClick={() => this.randomFast()}>
              <Text>Chọn nhanh</Text>
          </Button>
        </Flex>
        {/* <div className={styles1.buttonRandom} onClick={() => this.randomFast()}>
          <div>CHỌN NHANH</div>
        </div> */}
        <WhiteSpace />
        <Flex>
          {this.RandomAllButton()}
        </Flex>
        <div
          className={styles1.primary_btn}
          style={{ marginBottom: 8, marginLeft: 8, marginRight: 8 }}
          onClick={() => {
            this.checkPay();
          }}
        >
          <Text style={{ fontWeight: "bold" }}>ĐẶT VÉ</Text>
        </div>
        <div
            className={styles1.tutorial}
            onClick={() => this.props.onTutorial(this.state.tutorialLottery234)}
          >
            <span style={{ borderBottom: "1px solid #4397f7" }}>
              Hướng dẫn cách chơi
            </span>
        </div>
      </div>
    );
  }
}

export default Lottery234;
