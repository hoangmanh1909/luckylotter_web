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

import styles from "./lottery123.less";
import styles1 from "../Main.less";
import button from "../Button.less";
import CustomeTrashIcon from "../../utils/CustomeTrashIcon";
import {
  stringToNumberFormat,
  padLeft,
  getWeekdaysShort
} from "../../utils/Helper";
import SelectNumber from "./SelectNumber";

const amountFix = 20000;
const numberInit = ["", "", ""];

class Lottery123 extends React.Component {
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
      aNumber: numberInit,
      aAmountText: stringToNumberFormat(amountFix) + "đ",
      aAmount: amountFix,
      aIsCheck: false,
      bNumber: numberInit,
      bAmountText: stringToNumberFormat(amountFix) + "đ",
      bAmount: amountFix,
      bIsCheck: false,
      cNumber: numberInit,
      cAmountText: stringToNumberFormat(amountFix) + "đ",
      cAmount: amountFix,
      cIsCheck: false,
      dNumber: numberInit,
      dAmountText: stringToNumberFormat(amountFix) + "đ",
      dAmount: amountFix,
      dIsCheck: false,
      eNumber: numberInit,
      eAmountText: stringToNumberFormat(amountFix) + "đ",
      eAmount: amountFix,
      eIsCheck: false,
      fNumber: numberInit,
      fAmountText: stringToNumberFormat(amountFix) + "đ",
      fAmount: amountFix,
      modalType: "",
      modal: false,
      totalAmount: 0,
      productID: 7
    };
  }

  componentWillMount() {
    if (
      this.props.location.payload !== undefined &&
      this.props.location.payload !== null
    ) {
      this.setState(this.props.location.payload);
    }
  }

  componentWillReceiveProps(nextProps) {
    
    if (nextProps.response != undefined && nextProps.response.data != undefined) {
      if (nextProps.response.data.Code === "00") {
        const sys = nextProps.response.data.ListValue.map((item, index, data) => {
          let dataNew = {};
          dataNew.DrawCode = item.DrawCode;
          dataNew.DrawDate = item.DrawDate;
          // const dateParts = item.DrawDate.split("/");
          // const date = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
          // dataNew.label = (
          //   <Text>
          //     Kỳ: #{item.DrawCode} - {getWeekdaysShort(date.getDay())}{" "}
          //     {item.DrawDate}
          //   </Text>
          // );
          return dataNew;
        });
        console.log(sys);
        this.setState({ systemInit: sys });
      } else {
        Toast.info("Không tải được thông tin kỳ mở thưởng", 5);
        this.props.onBack();
      }
    }
    if (
      nextProps.tutorialXSDT123 !== undefined &&
      nextProps.tutorialXSDT123.data !== undefined
    ) {
      if (nextProps.tutorialXSDT123.data.Code === "00") {
        this.setState({
          tutorialXSDT123: nextProps.tutorialXSDT123.data.Value
        });
      }
    }
  }

  renderRow = type => {
    let number;
    switch (type) {
      case "A":
        number = this.state.aNumber.map((item, index, data) => {
          return (
            <Text
              key={index}
              className={
                index == 0
                  ? styles.text_number_circle
                  : index == 1
                    ? styles.text_number_circle_sc
                    : styles.text_number_circle_th
              }
              onClick={this.showModal("modal", type)}
            >
              {item}
            </Text>
          );
        });
        break;
      case "B":
        number = this.state.bNumber.map((item, index, data) => {
          return (
            <Text
              key={index}
              className={
                index == 0
                  ? styles.text_number_circle
                  : index == 1
                    ? styles.text_number_circle_sc
                    : styles.text_number_circle_th
              }
              onClick={this.showModal("modal", type)}
            >
              {item}
            </Text>
          );
        });
        break;
      case "C":
        number = this.state.cNumber.map((item, index, data) => {
          return (
            <Text
              key={index}
              className={
                index == 0
                  ? styles.text_number_circle
                  : index == 1
                    ? styles.text_number_circle_sc
                    : styles.text_number_circle_th
              }
              onClick={this.showModal("modal", type)}
            >
              {item}
            </Text>
          );
        });
        break;
      case "D":
        number = this.state.dNumber.map((item, index, data) => {
          return (
            <Text
              key={index}
              className={
                index == 0
                  ? styles.text_number_circle
                  : index == 1
                    ? styles.text_number_circle_sc
                    : styles.text_number_circle_th
              }
              onClick={this.showModal("modal", type)}
            >
              {item}
            </Text>
          );
        });
        break;
      case "E":
        number = this.state.eNumber.map((item, index, data) => {
          return (
            <Text
              key={index}
              className={
                index == 0
                  ? styles.text_number_circle
                  : index == 1
                    ? styles.text_number_circle_sc
                    : styles.text_number_circle_th
              }
              onClick={this.showModal("modal", type)}
            >
              {item}
            </Text>
          );
        });
        break;
      case "F":
        number = this.state.fNumber.map((item, index, data) => {
          return (
            <Text
              key={index}
              className={
                index == 0
                  ? styles.text_number_circle
                  : index == 1
                    ? styles.text_number_circle_sc
                    : styles.text_number_circle_th
              }
              onClick={this.showModal("modal", type)}
            >
              {item}
            </Text>
          );
        });
        break;
      default:
        break;
    }
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
          {type}
        </Text>
        <div style={{ width: "100%" }}>{number}</div>
        {this.isCheckNumber(type)}
      </div>
    );
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
      case "D":
        showType =
          this.state.dIsCheck === true
            ? this.buttonAfterNumber(type)
            : this.buttonBeforeNumber(type);
        break;
      case "E":
        showType =
          this.state.eIsCheck === true
            ? this.buttonAfterNumber(type)
            : this.buttonBeforeNumber(type);
        break;
      case "F":
        showType =
          this.state.fIsCheck === true
            ? this.buttonAfterNumber(type)
            : this.buttonBeforeNumber(type);
        break;
      default:
        showType = this.buttonBeforeNumber(type);
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
          className={styles.btnRandomRow}
          onClick={() => this.randomDT123(type)}
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
          className={button.button_clear}
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
      case "F":
        showType = <Text>{this.state.fAmountText}</Text>;
        break;
      default:
        showType = "Mệnh giá";
        break;
    }
    return showType;
  };

  showModal = (key, type) => e => {
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

  randomNumber = ordinal => {
    if (ordinal == 0) {
      return Math.floor(Math.random() * 10);
    } else if (ordinal == 1) {
      return Math.floor(Math.random() * 100);
    } else {
      return Math.floor(Math.random() * 1000);
    }
  };

  randomDT123 = type => {
    let number = [];
    switch (type) {
      case "A":
        number = this.state.aNumber.map((item, index, data) => {
          let _number = this.randomNumber(index);
          if (index != 0) _number = padLeft(_number, index + 1, "0");
          return _number;
        });
        this.setState({
          aNumber: number,
          aIsCheck: true,
          totalAmount:
            this.state.totalAmount + this.state.aAmount * this.state.system
        });
        break;
      case "B":
        number = this.state.bNumber.map((item, index, data) => {
          let _number = this.randomNumber(index);
          if (index != 0) _number = padLeft(_number, index + 1, "0");
          return _number;
        });

        this.setState({
          bNumber: number,
          bIsCheck: true,
          totalAmount:
            this.state.totalAmount + this.state.bAmount * this.state.system
        });
        break;
      case "C":
        number = this.state.cNumber.map((item, index, data) => {
          let _number = this.randomNumber(index);
          if (index != 0) _number = padLeft(_number, index + 1, "0");
          return _number;
        });

        this.setState({
          cNumber: number,
          cIsCheck: true,
          totalAmount:
            this.state.totalAmount + this.state.cAmount * this.state.system
        });
        break;
      case "D":
        number = this.state.dNumber.map((item, index, data) => {
          let _number = this.randomNumber(index);
          if (index != 0) _number = padLeft(_number, index + 1, "0");
          return _number;
        });

        this.setState({
          dNumber: number,
          dIsCheck: true,
          totalAmount:
            this.state.totalAmount + this.state.dAmount * this.state.system
        });
        break;
      case "E":
        number = this.state.eNumber.map((item, index, data) => {
          let _number = this.randomNumber(index);
          if (index != 0) _number = padLeft(_number, index + 1, "0");
          return _number;
        });
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
    if (!this.state.aIsCheck) {
      let number = this.state.aNumber.map((item, index, data) => {
        let _number = this.randomNumber(index);
        if (index != 0) _number = padLeft(_number, index + 1, "0");
        return _number;
      });

      _totalAmount =
        this.state.totalAmount + this.state.aAmount * this.state.system;
      this.setState({
        aNumber: number,
        aIsCheck: true,
        totalAmount: _totalAmount
      });
    } else if (!this.state.bIsCheck) {
      let number = this.state.bNumber.map((item, index, data) => {
        let _number = this.randomNumber(index);
        if (index != 0) _number = padLeft(_number, index + 1, "0");
        return _number;
      });
      _totalAmount =
        this.state.totalAmount + this.state.bAmount * this.state.system;
      this.setState({
        bNumber: number,
        bIsCheck: true,
        totalAmount: _totalAmount
      });
    } else if (!this.state.cIsCheck) {
      let number = this.state.cNumber.map((item, index, data) => {
        let _number = this.randomNumber(index);
        if (index != 0) _number = padLeft(_number, index + 1, "0");
        return _number;
      });
      _totalAmount =
        this.state.totalAmount + this.state.cAmount * this.state.system;
      this.setState({
        cNumber: number,
        cIsCheck: true,
        totalAmount: _totalAmount
      });
    } else if (!this.state.dIsCheck) {
      let number = this.state.dNumber.map((item, index, data) => {
        let _number = this.randomNumber(index);
        if (index != 0) _number = padLeft(_number, index + 1, "0");
        return _number;
      });
      _totalAmount =
        this.state.totalAmount + this.state.dAmount * this.state.system;
      this.setState({
        dNumber: number,
        dIsCheck: true,
        totalAmount: _totalAmount
      });
    } else if (!this.state.eIsCheck) {
      let number = this.state.eNumber.map((item, index, data) => {
        let _number = this.randomNumber(index);
        if (index != 0) _number = padLeft(_number, index + 1, "0");
        return _number;
      });
      _totalAmount =
        this.state.totalAmount + this.state.eAmount * this.state.system;
      this.setState({
        eNumber: number,
        eIsCheck: true,
        totalAmount: _totalAmount
      });
    }
  }

  randomFastAll() {
    let _totalAmount = this.state.totalAmount;

    if (!this.state.aIsCheck) {
      let number = this.state.aNumber.map((item, index, data) => {
        let _number = this.randomNumber(index);
        if (index != 0) _number = padLeft(_number, index + 1, "0");
        return _number;
      });
      _totalAmount = this.state.aAmount * this.state.system;
      this.setState({ aNumber: number, aIsCheck: true });
    }
    if (!this.state.bIsCheck) {
      let number = this.state.bNumber.map((item, index, data) => {
        let _number = this.randomNumber(index);
        if (index != 0) _number = padLeft(_number, index + 1, "0");
        return _number;
      });
      _totalAmount += this.state.bAmount * this.state.system;
      this.setState({ bNumber: number, bIsCheck: true });
    }
    if (!this.state.cIsCheck) {
      let number = this.state.cNumber.map((item, index, data) => {
        let _number = this.randomNumber(index);
        if (index != 0) _number = padLeft(_number, index + 1, "0");
        return _number;
      });
      _totalAmount += this.state.cAmount * this.state.system;
      this.setState({ cNumber: number, cIsCheck: true });
    }
    if (!this.state.dIsCheck) {
      let number = this.state.dNumber.map((item, index, data) => {
        let _number = this.randomNumber(index);
        if (index != 0) _number = padLeft(_number, index + 1, "0");
        return _number;
      });
      _totalAmount += this.state.dAmount * this.state.system;
      this.setState({ dNumber: number, dIsCheck: true });
    }
    if (!this.state.eIsCheck) {
      let number = this.state.eNumber.map((item, index, data) => {
        let _number = this.randomNumber(index);
        if (index != 0) _number = padLeft(_number, index + 1, "0");
        return _number;
      });
      _totalAmount += this.state.eAmount * this.state.system;
      this.setState({ eNumber: number, eIsCheck: true });
    }
    this.setState({ totalAmount: _totalAmount });
  }

  showAmount = param => {
    const BUTTONS = ["20,000đ", "50,000đ", "100,000đ", "Đóng"];

    ActionSheet.showActionSheetWithOptions(
      {
        className: styles1.modal_view,
        options: BUTTONS,
        destructiveButtonIndex: BUTTONS.length - 1,
        // title: 'title',
        message: "Chọn mệnh giá",
        maskClosable: true,
        "data-seed": "logId"
        // wrapProps
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
    switch (type) {
      case "A":
        this.setState({
          aNumber: numberInit,
          aIsCheck: false,
          totalAmount:
            this.state.totalAmount - this.state.aAmount * this.state.system
        });
        break;
      case "B":
        this.setState({
          bNumber: numberInit,
          bIsCheck: false,
          totalAmount:
            this.state.totalAmount - this.state.bAmount * this.state.system
        });
        break;
      case "C":
        this.setState({
          cNumber: numberInit,
          cIsCheck: false,
          totalAmount:
            this.state.totalAmount - this.state.cAmount * this.state.system
        });
        break;
      case "D":
        this.setState({
          dNumber: numberInit,
          dIsCheck: false,
          totalAmount:
            this.state.totalAmount - this.state.dAmount * this.state.system
        });
        break;
      case "E":
        this.setState({
          eNumber: numberInit,
          eIsCheck: false,
          totalAmount:
            this.state.totalAmount - this.state.eAmount * this.state.system
        });
        break;
      default:
        break;
    }
  };

  modalNumberView = () => {
    return (
      <SelectNumber
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
    // console.log(data,type)
    switch (type) {
      case "A":
        if (!this.state.aIsCheck) {
          const _totalAmount =
            this.state.totalAmount + this.state.aAmount * this.state.system;
          this.setState({ totalAmount: _totalAmount });
        }
        this.setState({ aNumber: data, aIsCheck: true });
        break;
      case "B":
        if (!this.state.bIsCheck) {
          const _totalAmount =
            this.state.totalAmount + this.state.bAmount * this.state.system;
          this.setState({ totalAmount: _totalAmount });
        }
        this.setState({ bNumber: data, bIsCheck: true });
        break;
      case "C":
        if (!this.state.cIsCheck) {
          const _totalAmount =
            this.state.totalAmount + this.state.cAmount * this.state.system;
          this.setState({ totalAmount: _totalAmount });
        }
        this.setState({ cNumber: data, cIsCheck: true });
        break;
      case "D":
        if (!this.state.dIsCheck) {
          const _totalAmount =
            this.state.totalAmount + this.state.dAmount * this.state.system;
          this.setState({ totalAmount: _totalAmount });
        }
        this.setState({ dNumber: data, dIsCheck: true });
        break;
      case "E":
        if (!this.state.eIsCheck) {
          const _totalAmount =
            this.state.totalAmount + this.state.eAmount * this.state.system;
          this.setState({ totalAmount: _totalAmount });
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
      this.props.onAccept(this.state);
      // const data = {};
      // data.ProductID = this.state.productID;
      // data.MerchantID = localStorage.getItem("merchant_id");
      // data.Amount = this.state.totalAmount;
      // this.props.onGetFee(data);
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
                src={require("../../assets/lottery_123.png")}
                alt=""
              />
            </div>
            <div className={styles1.div_border}></div>
            <div className={styles1.div_group_text}>
              <div className={styles1.div_text_amt}>
                <span className={styles1.span_text}>x</span>40.000
                <span className={styles1.span_text}>lần</span>
              </div>
            </div>
          </div>
        </div>
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
          {this.renderRow("A")}
          {this.renderRow("B")}
          {this.renderRow("C")}
          {this.renderRow("D")}
          {this.renderRow("E")}

          <div className={styles1.select_system}>Chọn kỳ</div>
          <div className={styles1.tab}>{this.renderSystem()}</div>
          <Flex style={{ padding: 8 }}>
            <Flex.Item className={styles.amount}>
              <Text style={{ fontSize: 15 }}>Tạm tính: </Text>
              <Text>{stringToNumberFormat(this.state.totalAmount)} đ</Text>
            </Flex.Item>
          </Flex>

          <Button
            style={{ marginBottom: 8 }}
            className={button.button_primary}
            onClick={() => this.randomFast()}
          >
            <Text>CHỌN NHANH</Text>
          </Button>
          <Button
            style={{ marginBottom: 8 }}
            className={button.button_primary}
            onClick={() => this.randomFastAll()}
          >
            <Text>CHỌN NHANH 5 DÃY</Text>
          </Button>
          <div
            className={styles1.primary_btn}
            style={{ margin: 8 }}
            onClick={() => this.checkPay()}
          >
            <Text>ĐẶT VÉ</Text>
          </div>
          <div
            className={styles.tutorial}
            onClick={() => this.props.onTutorial(this.state.tutorialXSDT123)}
          >
            <span style={{ borderBottom: "1px solid #0cb3ff" }}>
              Hướng dẫn cách chơi
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Lottery123;
