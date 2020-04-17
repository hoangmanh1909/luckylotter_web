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
import styles from "./max3dplus.less";
import styles1 from "../../index.css";
import styles2 from "../Main.less";
import { ColorButtonText } from "../../utils/ColorBase";
import { stringToNumberFormat } from "../../utils/Helper";
import SelectNumberMax3DPlus from "./SelectNumberMax3DPlus";
import SelectSystemMax3D from "../max3d/SelectSystemMax3D";
import CustomeIcon from "../../utils/CustomeIcon";
import CustomeTrashIcon from "../../utils/CustomeTrashIcon";
import { getTypeName, max3dType, getWeekdaysShort } from "../../utils/Helper";
import CountDownMax3D from "../../utils/countDownMax3D";
import button from "./../Button.less";

const isIPhone = new RegExp("\\biPhone\\b|\\biPod\\b", "i").test(
  window.navigator.userAgent
);
let wrapProps;
if (isIPhone) {
  wrapProps = {
    onTouchStart: e => e.preventDefault()
  };
}

const buttonpicker = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  marginRight: 6,
  padding: "0px 8px"
};

const buttonDrop = {
  width: "50%",
  display: "flex",
  alignItems: "center",
  marginLeft: 6,
  paddingLeft: 6
};

class Max3DPlus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aAmountText: "20,000đ",
      aAmount: 20000,
      aNumber: ["", "", "", "", "", ""],
      aTmpNumber: ["", "", "", "", "", ""],
      aIsNumber: false,
      aIsAmount: true,
      bAmountText: "20,000đ",
      bAmount: 20000,
      bNumber: ["", "", "", "", "", ""],
      bTmpNumber: ["", "", "", "", "", ""],
      bIsNumber: false,
      bIsAmount: true,
      cAmountText: "20,000đ",
      cAmount: 20000,
      cNumber: ["", "", "", "", "", ""],
      cTmpNumber: ["", "", "", "", "", ""],
      cIsNumber: false,
      cIsAmount: true,
      dAmountText: "20,000đ",
      dAmount: 20000,
      dNumber: ["", "", "", "", "", ""],
      dTmpNumber: ["", "", "", "", "", ""],
      dIsNumber: false,
      dIsAmount: true,
      eAmountText: "20,000đ",
      eAmount: 20000,
      eNumber: ["", "", "", "", "", ""],
      eTmpNumber: ["", "", "", "", "", ""],
      eIsNumber: false,
      eIsAmount: true,
      fAmountText: "20,000đ",
      fAmount: 20000,
      fNumber: ["", "", "", "", "", ""],
      fTmpNumber: ["", "", "", "", "", ""],
      fIsNumber: false,
      fIsAmount: true,
      totalAmount: 0,
      modalType: "",
      modal: false,
      systemMax3D: [],
      systemInit: [],
      modalSystem: false,
      productID: 5,
      type: 1,
      typeItemA: 0,
      typeItemB: 0,
      typeItemC: 0,
      typeItemD: 0,
      animating: true,
      aRan: true,
      bRan: true,
      cRan: true,
      dRan: true,
      eRan: true,
      fRan: true
    };
  }

  componentDidMount() {
    if (
      this.props.location.payload !== undefined &&
      this.props.location.payload !== null
    ) {
      this.setState(this.props.location.payload);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.response.data !== undefined) {
      this.setState({ animating: false });
      if (nextProps.response.data.Code === "00") {
        if (this.state.systemInit.length === 0) {
          const sys = nextProps.response.data.ListValue.map(
            (item, index, data) => {
              let dataNew = {};
              dataNew.value = item.DrawCode;
              dataNew.text = item.DrawDate;
              const dateParts = item.DrawDate.split("/");
              const date = new Date(
                +dateParts[2],
                dateParts[1] - 1,
                +dateParts[0]
              );
              dataNew.label = (
                <Text>
                  Kỳ: #{item.DrawCode} - {getWeekdaysShort(date.getDay())}{" "}
                  {item.DrawDate}
                </Text>
              );
              return dataNew;
            }
          );

          this.setState({ systemInit: sys, systemMax3D: [sys[0]] });
        }
      } else {
        Toast.info("Không tải được thông tin kỳ mở thưởng", 5);
        this.props.onBack();
      }
    } else if (nextProps.err !== undefined) {
      Toast.info("Không tải được thông tin kỳ mở thưởng", 5);
      this.props.onBack();
    }
    if (
      nextProps.checkNumber !== undefined &&
      nextProps.checkNumber.data !== undefined
    ) {
      if (nextProps.checkNumber.data.Code === "00") {
        this.props.onAccept(this.state);
      }
      if (nextProps.checkNumber.data.Code === "01") {
        Toast.info("Bộ số bạn chọn đã hết, vui lòng chọn bộ số khác", 2);
      }
    }
    if (
      nextProps.tutorialMax3DPlus !== undefined &&
      nextProps.tutorialMax3DPlus.data !== undefined
    ) {
      if (nextProps.tutorialMax3DPlus.data.Code === "00") {
        this.setState({
          tutorialMax3DPlus: nextProps.tutorialMax3DPlus.data.Value
        });
      }
    }
  }

  randomNumber = () => {
    return Math.floor(Math.random() * 10);
  };

  randomAll = () => {
    if (!this.state.aIsNumber) {
      const arr = this.randomA();
      this.fillAmount(1, "A", arr, 2, 2);
      this.setState({ aRan: false });
      //Last param : IsRandomAll
    }
    if (!this.state.bIsNumber) {
      const arr = this.randomB();
      this.fillAmount(1, "B", arr, 2, 2);
      this.setState({ bRan: false });
    }
    if (!this.state.cIsNumber) {
      const arr = this.randomC();
      this.fillAmount(1, "C", arr, 2, 2);
      this.setState({ cRan: false });
    }
    if (!this.state.dIsNumber) {
      const arr = this.randomD();
      this.fillAmount(1, "D", arr, 2, 2);
      this.setState({ dRan: false });
    }
    if (!this.state.eIsNumber) {
      const arr = this.randomE();
      this.fillAmount(1, "E", arr, 2, 2);
      this.setState({ eRan: false });
    }
    if (!this.state.fIsNumber) {
      const arr = this.randomF();
      this.fillAmount(1, "F", arr, 2, 2);
      this.setState({ fRan: false });
    }
  };
  random = () => {
    if (!this.state.aIsNumber) {
      const arr = this.randomA();
      this.fillAmount(1, "A", arr, 2, 1);
      this.setState({ aRan: false });
      //Last param : IsRandom
    } else if (!this.state.bIsNumber) {
      const arr = this.randomB();
      this.fillAmount(1, "B", arr, 2, 1);
      this.setState({ bRan: false });
    } else if (!this.state.cIsNumber) {
      const arr = this.randomC();
      this.fillAmount(1, "C", arr, 2, 1);
      this.setState({ cRan: false });
    } else if (!this.state.dIsNumber) {
      const arr = this.randomD();
      this.fillAmount(1, "D", arr, 2, 1);
      this.setState({ dRan: false });
    } else if (!this.state.eIsNumber) {
      const arr = this.randomE();
      this.fillAmount(1, "E", arr, 2, 1);
      this.setState({ eRan: false });
    } else if (!this.state.fIsNumber) {
      const arr = this.randomF();
      this.fillAmount(1, "F", arr, 2, 1);
      this.setState({ fRan: false });
    }
  };
  randomRow = type => {
    switch (type) {
      case "A":
        const arr1 = this.randomA();
        this.fillAmount(1, "A", arr1, 2, 1);
        this.setState({ aRan: false });
        break;
      case "B":
        const arr2 = this.randomB();
        this.fillAmount(1, "B", arr2, 2, 1);
        this.setState({ bRan: false });
        break;
      case "C":
        const arr3 = this.randomC();
        this.fillAmount(1, "C", arr3, 2, 1);
        this.setState({ cRan: false });
        break;
      case "D":
        const arr4 = this.randomD();
        this.fillAmount(1, "D", arr4, 2, 1);
        this.setState({ dRan: false });
        break;
      case "E":
        const arr5 = this.randomE();
        this.fillAmount(1, "E", arr5, 2, 1);
        this.setState({ eRan: false });
        break;
      case "F":
        const arr6 = this.randomF();
        this.fillAmount(1, "F", arr6, 2, 1);
        this.setState({ fRan: false });
        break;
      default:
        break;
    }
  };
  randomA = () => {
    let anumber = [];
    let atmp = [];

    atmp = this.state.aNumber.map(() => {
      return this.randomNumber();
    });
    anumber = [...atmp];
    this.setState({ aNumber: anumber, aTmpNumber: atmp, aIsNumber: true });

    return anumber;
  };

  randomB = () => {
    let bnumber = [];
    let btmp = [];

    btmp = this.state.bNumber.map(() => {
      return this.randomNumber();
    });
    bnumber = [...btmp];
    this.setState({ bNumber: bnumber, bTmpNumber: btmp, bIsNumber: true });

    return bnumber;
  };

  randomC = () => {
    let number = [];
    let ctmp = [];

    ctmp = this.state.cNumber.map(() => {
      return this.randomNumber();
    });
    number = [...ctmp];
    this.setState({ cNumber: number, cTmpNumber: ctmp, cIsNumber: true });

    return number;
  };

  randomD = () => {
    let number = [];
    let dtmp = [];

    dtmp = this.state.dNumber.map(() => {
      return this.randomNumber();
    });
    number = [...dtmp];
    this.setState({ dNumber: number, dTmpNumber: dtmp, dIsNumber: true });

    return number;
  };

  randomE = () => {
    let number = [];
    let etmp = [];

    etmp = this.state.eNumber.map(() => {
      return this.randomNumber();
    });
    number = [...etmp];
    this.setState({ eNumber: number, eTmpNumber: etmp, eIsNumber: true });

    return number;
  };

  randomF = () => {
    let number = [];
    let ftmp = [];

    ftmp = this.state.fNumber.map(() => {
      return this.randomNumber();
    });
    number = [...ftmp];
    this.setState({ fNumber: number, fTmpNumber: ftmp, fIsNumber: true });

    return number;
  };

  showAmount = param => {
    const BUTTONS = [
      "10,000đ",
      "20,000đ",
      "50,000đ",
      "100,000đ",
      "200,000đ",
      "Đóng"
    ];

    ActionSheet.showActionSheetWithOptions(
      {
        className : styles2.modal_view,
        options: BUTTONS,
        destructiveButtonIndex: BUTTONS.length - 1,
        // title: 'title',
        message: "Chọn mệnh giá",
        maskClosable: true,
        "data-seed": "logId",
        wrapProps
      },
      buttonIndex => {
        if (buttonIndex !== -1 && buttonIndex !== 5) {
          switch (param) {
            case "A":
              this.fillAmount(buttonIndex, param, this.state.aNumber, 1, 0);
              break;
            case "B":
              this.fillAmount(buttonIndex, param, this.state.bNumber, 1, 0);
              break;
            case "C":
              this.fillAmount(buttonIndex, param, this.state.cNumber, 1, 0);
              break;
            case "D":
              this.fillAmount(buttonIndex, param, this.state.dNumber, 1, 0);
              break;
            case "E":
              this.fillAmount(buttonIndex, param, this.state.eNumber, 1, 0);
              break;
            case "F":
              this.fillAmount(buttonIndex, param, this.state.fNumber, 1, 0);
              break;
            default:
              break;
          }
        }
      }
    );
  };

  fillAmount = (index, type, value = [], typeRan, IsRandom) => {
    let amount = "";
    let iAmount = 0;
    let EmptyArray = ["", "", "", "", "", ""];
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
      default:
        break;
    }
    switch (type) {
      case "A":
        this.setState({ aAmountText: amount });
        if (
          JSON.stringify(this.state.aNumber) === JSON.stringify(EmptyArray) &&
          IsRandom === 0
        ) {
          this.setState({ aAmount: iAmount });
        } else if (
          JSON.stringify(this.state.aNumber) === JSON.stringify(EmptyArray) &&
          IsRandom === 2
        ) {
          this.calTotalAmount(type, iAmount, value, 1);
          this.setState({ aRan: false });
        } else {
          this.calTotalAmount(type, iAmount, value);
          this.setState({ aRan: false });
        }
        break;
      case "B":
        this.setState({ bAmountText: amount });
        if (
          JSON.stringify(this.state.bNumber) === JSON.stringify(EmptyArray) &&
          IsRandom === 0
        ) {
          this.setState({ bAmount: iAmount });
        } else if (
          JSON.stringify(this.state.aNumber) === JSON.stringify(EmptyArray) &&
          IsRandom === 2
        ) {
          this.calTotalAmount(type, iAmount, value, 1);
          this.setState({ bRan: false });
        } else {
          this.calTotalAmount(type, iAmount, value);
          this.setState({ bRan: false });
        }
        break;
      case "C":
        this.setState({ cAmountText: amount });
        if (
          JSON.stringify(this.state.cNumber) === JSON.stringify(EmptyArray) &&
          IsRandom === 0
        ) {
          this.setState({ cAmount: iAmount });
        } else if (
          JSON.stringify(this.state.aNumber) === JSON.stringify(EmptyArray) &&
          IsRandom === 2
        ) {
          this.calTotalAmount(type, iAmount, value, 1);
          this.setState({ cRan: false });
        } else {
          this.calTotalAmount(type, iAmount, value);
          this.setState({ cRan: false });
        }
        break;
      case "D":
        this.setState({ dAmountText: amount });
        if (
          JSON.stringify(this.state.dNumber) === JSON.stringify(EmptyArray) &&
          IsRandom === 0
        ) {
          this.setState({ dAmount: iAmount });
        } else if (
          JSON.stringify(this.state.aNumber) === JSON.stringify(EmptyArray) &&
          IsRandom === 2
        ) {
          this.calTotalAmount(type, iAmount, value, 1);
          this.setState({ dRan: false });
        } else {
          this.calTotalAmount(type, iAmount, value);
          this.setState({ dRan: false });
        }
        break;
      case "E":
        this.setState({ eAmountText: amount });
        if (
          JSON.stringify(this.state.eNumber) === JSON.stringify(EmptyArray) &&
          IsRandom === 0
        ) {
          this.setState({ eAmount: iAmount });
        } else if (
          JSON.stringify(this.state.aNumber) === JSON.stringify(EmptyArray) &&
          IsRandom === 2
        ) {
          this.calTotalAmount(type, iAmount, value, 1);
          this.setState({ eRan: false });
        } else {
          this.calTotalAmount(type, iAmount, value);
          this.setState({ eRan: false });
        }
        break;
      case "F":
        this.setState({ fAmountText: amount });
        if (
          JSON.stringify(this.state.fNumber) === JSON.stringify(EmptyArray) &&
          IsRandom === 0
        ) {
          this.setState({ fAmount: iAmount });
        } else if (
          JSON.stringify(this.state.aNumber) === JSON.stringify(EmptyArray) &&
          IsRandom === 2
        ) {
          this.calTotalAmount(type, iAmount, value, 1);
          this.setState({ fRan: false });
        } else {
          this.calTotalAmount(type, iAmount, value);
          this.setState({ fRan: false });
        }
        break;
      default:
        break;
    }
  };

  calTotalAmount = (type, iAmount, value = [], IsRandomAll) => {
    let totalamount = 0;
    let EmptyArray = ["", "", "", "", "", ""];
    switch (type) {
      case "A":
        if (
          JSON.stringify(this.state.aNumber) === JSON.stringify(EmptyArray) &&
          IsRandomAll === 1
        ) {
          totalamount = 120000 * this.state.systemMax3D.length;
        } else if (
          JSON.stringify(this.state.aNumber) === JSON.stringify(EmptyArray)
        ) {
          totalamount =
            this.state.totalAmount + iAmount * this.state.systemMax3D.length;
        } else if (this.state.aNumber === value) {
          totalamount =
            this.state.totalAmount -
            this.state.aAmount * this.state.systemMax3D.length +
            iAmount * this.state.systemMax3D.length;
        } else if (
          value !== this.state.aNumber &&
          this.state.totalAmount > 0 &&
          this.state.aAmount > 0
        ) {
          totalamount = this.state.totalAmount;
        } else {
          totalamount =
            this.state.totalAmount + iAmount * this.state.systemMax3D.length;
        }
        this.setState({
          aAmount: iAmount,
          aIsAmount: true,
          totalAmount: totalamount
        });
        break;
      case "B":
        if (
          JSON.stringify(this.state.bNumber) === JSON.stringify(EmptyArray) &&
          IsRandomAll === 1
        ) {
          totalamount = 120000 * this.state.systemMax3D.length;
        } else if (
          JSON.stringify(this.state.bNumber) === JSON.stringify(EmptyArray)
        ) {
          totalamount =
            this.state.totalAmount + iAmount * this.state.systemMax3D.length;
        } else if (value === this.state.bNumber) {
          totalamount =
            this.state.totalAmount -
            this.state.bAmount * this.state.systemMax3D.length +
            iAmount * this.state.systemMax3D.length;
        } else if (
          value !== this.state.bNumber &&
          this.state.totalAmount > 0 &&
          this.state.bAmount > 0
        ) {
          totalamount = this.state.totalAmount;
        } else {
          totalamount =
            this.state.totalAmount + iAmount * this.state.systemMax3D.length;
        }
        this.setState({
          bAmount: iAmount,
          bIsAmount: true,
          totalAmount: totalamount
        });
        break;
      case "C":
        if (
          JSON.stringify(this.state.cNumber) === JSON.stringify(EmptyArray) &&
          IsRandomAll === 1
        ) {
          totalamount = 120000 * this.state.systemMax3D.length;
        } else if (
          JSON.stringify(this.state.cNumber) === JSON.stringify(EmptyArray)
        ) {
          totalamount =
            this.state.totalAmount + iAmount * this.state.systemMax3D.length;
        } else if (value === this.state.cNumber) {
          totalamount =
            this.state.totalAmount -
            this.state.cAmount * this.state.systemMax3D.length +
            iAmount * this.state.systemMax3D.length;
        } else if (
          value !== this.state.cNumber &&
          this.state.totalAmount > 0 &&
          this.state.cAmount > 0
        ) {
          totalamount = this.state.totalAmount;
        } else {
          totalamount =
            this.state.totalAmount + iAmount * this.state.systemMax3D.length;
        }
        this.setState({
          cAmount: iAmount,
          cIsAmount: true,
          totalAmount: totalamount
        });
        break;
      case "D":
        if (
          JSON.stringify(this.state.dNumber) === JSON.stringify(EmptyArray) &&
          IsRandomAll === 1
        ) {
          totalamount = 120000 * this.state.systemMax3D.length;
        } else if (
          JSON.stringify(this.state.dNumber) === JSON.stringify(EmptyArray)
        ) {
          totalamount =
            this.state.totalAmount + iAmount * this.state.systemMax3D.length;
        } else if (value === this.state.dNumber) {
          totalamount =
            this.state.totalAmount -
            this.state.dAmount * this.state.systemMax3D.length +
            iAmount * this.state.systemMax3D.length;
        } else if (
          value !== this.state.dNumber &&
          this.state.totalAmount > 0 &&
          this.state.dAmount > 0
        ) {
          totalamount = this.state.totalAmount;
        } else {
          totalamount =
            this.state.totalAmount + iAmount * this.state.systemMax3D.length;
        }
        this.setState({
          dAmount: iAmount,
          dIsAmount: true,
          totalAmount: totalamount
        });
        break;
      case "E":
        if (
          JSON.stringify(this.state.eNumber) === JSON.stringify(EmptyArray) &&
          IsRandomAll === 1
        ) {
          totalamount = 120000 * this.state.systemMax3D.length;
        } else if (
          JSON.stringify(this.state.eNumber) === JSON.stringify(EmptyArray)
        ) {
          totalamount =
            this.state.totalAmount + iAmount * this.state.systemMax3D.length;
        } else if (value === this.state.eNumber) {
          totalamount =
            this.state.totalAmount -
            this.state.eAmount * this.state.systemMax3D.length +
            iAmount * this.state.systemMax3D.length;
        } else if (
          value !== this.state.eNumber &&
          this.state.totalAmount > 0 &&
          this.state.eAmount > 0
        ) {
          totalamount = this.state.totalAmount;
        } else {
          totalamount =
            this.state.totalAmount + iAmount * this.state.systemMax3D.length;
        }
        this.setState({
          eAmount: iAmount,
          eIsAmount: true,
          totalAmount: totalamount
        });
        break;
      case "F":
        if (
          JSON.stringify(this.state.fNumber) === JSON.stringify(EmptyArray) &&
          IsRandomAll === 1
        ) {
          totalamount = 120000 * this.state.systemMax3D.length;
        } else if (
          JSON.stringify(this.state.fNumber) === JSON.stringify(EmptyArray)
        ) {
          totalamount =
            this.state.totalAmount + iAmount * this.state.systemMax3D.length;
        } else if (value === this.state.fNumber) {
          totalamount =
            this.state.totalAmount -
            this.state.fAmount * this.state.systemMax3D.length +
            iAmount * this.state.systemMax3D.length;
        } else if (
          value !== this.state.fNumber &&
          this.state.totalAmount > 0 &&
          this.state.fAmount > 0
        ) {
          totalamount = this.state.totalAmount;
        } else {
          totalamount =
            this.state.totalAmount + iAmount * this.state.systemMax3D.length;
        }
        this.setState({
          fAmount: iAmount,
          fIsAmount: true,
          totalAmount: totalamount
        });
        break;
      default:
        break;
    }
  };

  clearData = type => {
    let amount = this.state.totalAmount;
    let itemType = 0;
    switch (type) {
      case "A":
        if (this.state.totalAmount > 0 && this.state.aIsNumber) {
          if (this.state.type === 2 || this.state.type === 3) {
            amount =
              this.state.totalAmount -
              this.state.aAmount * this.state.systemMax3D.length * 10;
          } else if (this.state.type === 5) {
            itemType = this.getTypeItem(this.state.aNumber);
            itemType = itemType === 0 ? 1 : itemType;
            amount =
              this.state.totalAmount -
              this.state.aAmount * this.state.systemMax3D.length * itemType;
          } else {
            amount =
              this.state.totalAmount -
              this.state.aAmount * this.state.systemMax3D.length;
          }
        }

        this.setState({
          aAmountText: "20,000đ",
          aIsAmount: true,
          aAmount: 20000,
          totalAmount: amount,
          aIsNumber: false,
          aNumber: ["", "", "", "", "", ""],
          aTmpNumber: ["", "", "", "", "", ""],
          aRan: true
        });
        break;
      case "B":
        if (this.state.totalAmount > 0 && this.state.bIsNumber) {
          if (this.state.type === 2 || this.state.type === 3) {
            amount =
              this.state.totalAmount -
              this.state.bAmount * this.state.systemMax3D.length * 10;
          } else if (this.state.type === 5) {
            itemType = this.getTypeItem(this.state.bNumber);
            itemType = itemType === 0 ? 1 : itemType;
            amount =
              this.state.totalAmount -
              this.state.bAmount * this.state.systemMax3D.length * itemType;
          } else
            amount =
              this.state.totalAmount -
              this.state.bAmount * this.state.systemMax3D.length;
        }
        this.setState({
          bAmountText: "20,000đ",
          bIsAmount: true,
          bAmount: 20000,
          totalAmount: amount,
          bIsNumber: false,
          bNumber: ["", "", "", "", "", ""],
          bTmpNumber: ["", "", "", "", "", ""],
          bRan: true
        });
        break;
      case "C":
        if (this.state.totalAmount > 0 && this.state.cIsNumber) {
          if (this.state.type === 2 || this.state.type === 3) {
            amount =
              this.state.totalAmount -
              this.state.cAmount * this.state.systemMax3D.length * 10;
          } else if (this.state.type === 5) {
            itemType = this.getTypeItem(this.state.cNumber);
            itemType = itemType === 0 ? 1 : itemType;
            amount =
              this.state.totalAmount -
              this.state.cAmount * this.state.systemMax3D.length * itemType;
          } else
            amount =
              this.state.totalAmount -
              this.state.cAmount * this.state.systemMax3D.length;
        }
        this.setState({
          cAmountText: "20,000đ",
          cIsAmount: true,
          cAmount: 20000,
          totalAmount: amount,
          cIsNumber: false,
          cNumber: ["", "", "", "", "", ""],
          cTmpNumber: ["", "", "", "", "", ""],
          cRan: true
        });
        break;
      case "D":
        if (this.state.totalAmount > 0 && this.state.dIsNumber) {
          if (this.state.type === 2 || this.state.type === 3) {
            amount =
              this.state.totalAmount -
              this.state.dAmount * this.state.systemMax3D.length * 10;
          } else if (this.state.type === 5) {
            itemType = this.getTypeItem(this.state.dNumber);
            itemType = itemType === 0 ? 1 : itemType;
            amount =
              this.state.totalAmount -
              this.state.dAmount * this.state.systemMax3D.length * itemType;
          } else
            amount =
              this.state.totalAmount -
              this.state.dAmount * this.state.systemMax3D.length;
        }
        this.setState({
          dAmountText: "20,000đ",
          dIsAmount: true,
          dAmount: 20000,
          totalAmount: amount,
          dIsNumber: false,
          dNumber: ["", "", "", "", "", ""],
          dTmpNumber: ["", "", "", "", "", ""],
          dRan: true
        });
        break;
      case "E":
        if (this.state.totalAmount > 0 && this.state.eIsNumber) {
          if (this.state.type === 2 || this.state.type === 3) {
            amount =
              this.state.totalAmount -
              this.state.eAmount * this.state.systemMax3D.length * 10;
          } else if (this.state.type === 5) {
            itemType = this.getTypeItem(this.state.eNumber);
            itemType = itemType === 0 ? 1 : itemType;
            amount =
              this.state.totalAmount -
              this.state.eAmount * this.state.systemMax3D.length * itemType;
          } else
            amount =
              this.state.totalAmount -
              this.state.eAmount * this.state.systemMax3D.length;
        }
        this.setState({
          eAmountText: "20,000đ",
          eIsAmount: true,
          eAmount: 20000,
          totalAmount: amount,
          eIsNumber: false,
          eNumber: ["", "", "", "", "", ""],
          eTmpNumber: ["", "", "", "", "", ""],
          eRan: true
        });
        break;
      case "F":
        if (this.state.totalAmount > 0 && this.state.fIsNumber) {
          if (this.state.type === 2 || this.state.type === 3) {
            amount =
              this.state.totalAmount -
              this.state.fAmount * this.state.systemMax3D.length * 10;
          } else if (this.state.type === 5) {
            itemType = this.getTypeItem(this.state.fNumber);
            itemType = itemType === 0 ? 1 : itemType;
            amount =
              this.state.totalAmount -
              this.state.fAmount * this.state.systemMax3D.length * itemType;
          } else
            amount =
              this.state.totalAmount -
              this.state.fAmount * this.state.systemMax3D.length;
        }
        this.setState({
          fAmountText: "20,000đ",
          fIsAmount: true,
          fAmount: 20000,
          totalAmount: amount,
          fIsNumber: false,
          fNumber: ["", "", "", "", "", ""],
          fTmpNumber: ["", "", "", "", "", ""],
          fRan: true
        });
        break;
      default:
        break;
    }
  };

  ShowAmountText = type => {
    let showType = null;
    switch (type) {
      case "A":
        showType =
          this.state.aRan === true
            ? this.buttonBeforeNumber(type)
            : this.buttonAfterNumber(type);
        break;
      case "B":
        showType =
          this.state.bRan === true
            ? this.buttonBeforeNumber(type)
            : this.buttonAfterNumber(type);
        break;
      case "C":
        showType =
          this.state.cRan === true
            ? this.buttonBeforeNumber(type)
            : this.buttonAfterNumber(type);
        break;
      case "D":
        showType =
          this.state.dRan === true
            ? this.buttonBeforeNumber(type)
            : this.buttonAfterNumber(type);
        break;
      case "E":
        showType =
          this.state.eRan === true
            ? this.buttonBeforeNumber(type)
            : this.buttonAfterNumber(type);
        break;
      case "F":
        showType =
          this.state.fRan === true
            ? this.buttonBeforeNumber(type)
            : this.buttonAfterNumber(type);
        break;
      default:
        showType = this.buttonAfterNumber(type);
        break;
    }
    return showType;
  };

  buttonBeforeNumber = type => {
    return (
      <div className={styles.random}>
        <div className={button.button_tc} onClick={() => this.randomRow(type)}>
          <Text>TC</Text>
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

  buttonAfterNumber = type => {
    return (
      <div className={styles.random}>
        <div
          className={button.button_clear}
          onClick={() => this.clearData(type)}
        >
          <CustomeTrashIcon type={require("../../assets/trash.svg")}></CustomeTrashIcon>
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

  onPutValue = type => {
    let value = [];
    switch (type) {
      case "A":
        value = this.state.aTmpNumber;
        break;
      case "B":
        value = this.state.bTmpNumber;
        break;
      case "C":
        value = this.state.cTmpNumber;
        break;
      case "D":
        value = this.state.dTmpNumber;
        break;
      case "E":
        value = this.state.eTmpNumber;
        break;
      case "F":
        value = this.state.fTmpNumber;
        break;
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

  onCloseModal = key => () => {
    this.setState({
      modalType: "",
      [key]: false
    });
  };

  onAcceptModal = (key, data, type) => () => {
    let checkType = [...data];
    switch (type) {
      case "A":
        if (this.state.aAmount > 0)
          this.calTotalAmount(type, this.state.aAmount, data);
        this.setState({
          aNumber: checkType,
          aTmpNumber: data,
          aIsNumber: true,
          aRan: false
        });
        break;
      case "B":
        if (this.state.bAmount > 0)
          this.calTotalAmount(type, this.state.bAmount, data);
        this.setState({
          bNumber: checkType,
          bTmpNumber: data,
          bIsNumber: true,
          bRan: false
        });
        break;
      case "C":
        if (this.state.cAmount > 0)
          this.calTotalAmount(type, this.state.cAmount, data);
        this.setState({
          cNumber: checkType,
          cTmpNumber: data,
          cIsNumber: true,
          cRan: false
        });
        break;
      case "D":
        if (this.state.dAmount > 0)
          this.calTotalAmount(type, this.state.dAmount, data);
        this.setState({
          dNumber: checkType,
          dTmpNumber: data,
          dIsNumber: true,
          dRan: false
        });
        break;
      case "E":
        if (this.state.eAmount > 0)
          this.calTotalAmount(type, this.state.eAmount, data);
        this.setState({
          eNumber: checkType,
          eTmpNumber: data,
          eIsNumber: true,
          eRan: false
        });
        break;
      case "F":
        if (this.state.fAmount > 0)
          this.calTotalAmount(type, this.state.fAmount, data);
        this.setState({
          fNumber: checkType,
          fTmpNumber: data,
          fIsNumber: true,
          fRan: false
        });
        break;
      default:
        break;
    }
    this.setState({
      modalType: "",
      [key]: false
    });
  };

  modalView = () => {
    return (
      <SelectNumberMax3DPlus
        type={this.state.type}
        modalType={this.state.modalType}
        modal={this.state.modal}
        onValue={this.onPutValue}
        onClose={this.onCloseModal}
        onAccept={this.onAcceptModal}
      />
    );
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

  showSystemModal = key => e => {
    e.preventDefault();
    this.setState({
      [key]: true
    });
  };

  //function = (param) => (event) => {...}
  onCloseSystemModal = key => () => {
    this.setState({
      modalSystem: "",
      [key]: false
    });
  };

  onAcceptSystemModal = (key, data) => () => {
    if (data.length !== this.state.systemMax3D.length) {
      let _totalAmount =
        (this.state.totalAmount / this.state.systemMax3D.length) * data.length;
      this.setState({ totalAmount: _totalAmount });
    }
    this.setState({
      systemMax3D: data,
      [key]: false
    });
  };
  //Modal select number
  modalSystemView = () => {
    return (
      <SelectSystemMax3D
        system={this.state.systemInit}
        value={this.state.systemMax3D}
        modal={this.state.modalSystem}
        onClose={this.onCloseSystemModal}
        onAccept={this.onAcceptSystemModal}
      />
    );
  };

  checkPay = () => {
    if (
      (this.state.aIsAmount && this.state.aIsNumber) ||
      (this.state.bIsAmount && this.state.bIsNumber) ||
      (this.state.cIsAmount && this.state.cIsNumber) ||
      (this.state.dIsAmount && this.state.dIsNumber) ||
      (this.state.eIsAmount && this.state.eIsNumber) ||
      (this.state.fIsAmount && this.state.fIsNumber)
    ) {
      let a1 = this.state.aNumber
        .join("")
        .toString()
        .slice(0, 3);
      let a2 = this.state.aNumber
        .join("")
        .toString()
        .slice(3, 6);
      let b1 = this.state.bNumber
        .join("")
        .toString()
        .slice(0, 3);
      let b2 = this.state.bNumber
        .join("")
        .toString()
        .slice(3, 6);
      let c1 = this.state.cNumber
        .join("")
        .toString()
        .slice(0, 3);
      let c2 = this.state.cNumber
        .join("")
        .toString()
        .slice(3, 6);
      let d1 = this.state.dNumber
        .join("")
        .toString()
        .slice(0, 3);
      let d2 = this.state.dNumber
        .join("")
        .toString()
        .slice(3, 6);
      let e1 = this.state.eNumber
        .join("")
        .toString()
        .slice(0, 3);
      let e2 = this.state.eNumber
        .join("")
        .toString()
        .slice(3, 6);
      let f1 = this.state.fNumber
        .join("")
        .toString()
        .slice(0, 3);
      let f2 = this.state.fNumber
        .join("")
        .toString()
        .slice(3, 6);
      if (
        ((a1 === b1 || a1 === b2) &&
          (a2 === b1 || a2 === b2) &&
          this.state.aAmount + this.state.bAmount > 200000 &&
          this.state.aIsAmount &&
          this.state.aIsNumber) ||
        ((a1 === c1 || a1 === c2) &&
          (a2 === c1 || a2 === c2) &&
          this.state.aAmount + this.state.cAmount > 200000 &&
          this.state.aIsAmount &&
          this.state.aIsNumber) ||
        ((a1 === d1 || a1 === d2) &&
          (a2 === d1 || a2 === d2) &&
          this.state.aAmount + this.state.dAmount > 200000 &&
          this.state.aIsAmount &&
          this.state.aIsNumber) ||
        ((b1 === c1 || b1 === c2) &&
          (b2 === c1 || b2 === c2) &&
          this.state.bAmount + this.state.cAmount > 200000 &&
          this.state.bIsAmount &&
          this.state.bIsNumber) ||
        ((b1 === d1 || b1 === d2) &&
          (b2 === d1 || b2 === d2) &&
          this.state.bAmount + this.state.dAmount > 200000 &&
          this.state.bIsAmount &&
          this.state.bIsNumber) ||
        ((c1 === d1 || c1 === d2) &&
          (c2 === d1 || c2 === d2) &&
          this.state.dAmount + this.state.cAmount > 200000 &&
          this.state.dIsAmount &&
          this.state.dIsNumber) ||
        ((a1 === e1 || a1 === e2) &&
          (a2 === e1 || a2 === e2) &&
          this.state.aAmount + this.state.eAmount > 200000 &&
          this.state.aIsAmount &&
          this.state.aIsNumber) ||
        ((a1 === f1 || a1 === f2) &&
          (a2 === f1 || a2 === f2) &&
          this.state.aAmount + this.state.fAmount > 200000 &&
          this.state.aIsAmount &&
          this.state.aIsNumber) ||
        ((b1 === f1 || b1 === f2) &&
          (b2 === f1 || b2 === f2) &&
          this.state.bAmount + this.state.fAmount > 200000 &&
          this.state.bIsAmount &&
          this.state.bIsNumber) ||
        ((b1 === e1 || b1 === e2) &&
          (b2 === e1 || b2 === e2) &&
          this.state.bAmount + this.state.eAmount > 200000 &&
          this.state.bIsAmount &&
          this.state.bIsNumber) ||
        ((c1 === e1 || c1 === e2) &&
          (c2 === e1 || c2 === e2) &&
          this.state.cAmount + this.state.eAmount > 200000 &&
          this.state.cIsAmount &&
          this.state.cIsNumber) ||
        ((c1 === f1 || c1 === f2) &&
          (c2 === f1 || c2 === f2) &&
          this.state.cAmount + this.state.fAmount > 200000 &&
          this.state.cIsAmount &&
          this.state.cIsNumber) ||
        ((d1 === e1 || d1 === e2) &&
          (d2 === e1 || d2 === e2) &&
          this.state.dAmount + this.state.eAmount > 200000 &&
          this.state.dIsAmount &&
          this.state.dIsNumber) ||
        ((d1 === f1 || d1 === f2) &&
          (d2 === f1 || d2 === f2) &&
          this.state.dAmount + this.state.fAmount > 200000 &&
          this.state.dIsAmount &&
          this.state.dIsNumber) ||
        ((e1 === f1 || e1 === f2) &&
          (e2 === f1 || e2 === f2) &&
          this.state.eAmount + this.state.fAmount > 200000 &&
          this.state.eIsAmount &&
          this.state.eIsNumber) ||
        ((b1 === c1 || b1 === c2) &&
          (b2 === c1 || b2 === c2) &&
          (a1 === c1 || a1 === c2) && (a2 === c1 || a2 === c2) &&
          this.state.bAmount + this.state.cAmount + this.state.aAmount >
            200000 &&
          this.state.aIsAmount &&
          this.state.aIsNumber) ||
        ((b1 === e1 || b1 === e2) &&
          (b2 === e1 || b2 === e2) &&
          (a1 === e1 || a1 === e2) && (a2 === e1 || a2 === e2) &&
          this.state.bAmount + this.state.eAmount + this.state.aAmount >
            200000 &&
          this.state.aIsAmount &&
          this.state.aIsNumber) ||
        ((d1 === e1 || d1 === e2) &&
          (d2 === e1 || d2 === e2) &&
          (a1 === e1 || a1 === e2) && (a2 === e1 || a2 === e2) &&
          this.state.dAmount + this.state.eAmount + this.state.aAmount >
            200000 &&
          this.state.aIsAmount &&
          this.state.aIsNumber) ||
        ((b1 === f1 || b1 === f2) &&
          (b2 === f1 || b2 === f2) &&
          (a1 === f1 || a1 === f2) && (a2 === f1 || a2 === f2) &&
          this.state.bAmount + this.state.fAmount + this.state.aAmount >
            200000 &&
          this.state.aIsAmount &&
          this.state.aIsNumber) ||
        ((b1 === c1 || b1 === c2) &&
          (b2 === c1 || b2 === c2) &&
          (e1 === c1 || e1 === c2) && (e2 === c1 || e2 === c2) &&
          this.state.bAmount + this.state.cAmount + this.state.eAmount >
            200000 &&
          this.state.eIsAmount &&
          this.state.eIsNumber) ||
        ((a1 === c1 || a1 === c2) &&
          (a2 === c1 || a2 === c2) &&
          (e1 === c1 || e1 === c2) && (e2 === c1 || e2 === c2) &&
          this.state.aAmount + this.state.cAmount + this.state.eAmount >
            200000 &&
          this.state.eIsAmount &&
          this.state.eIsNumber) ||
        ((d1 === f1 || d1 === f2) &&
          (d2 === f1 || d2 === f2) &&
          (a1 === f1 || a1 === f2) && (a2 === f1 || a2 === f2) &&
          this.state.dAmount + this.state.fAmount + this.state.aAmount >
            200000 &&
          this.state.aIsAmount &&
          this.state.aIsNumber) ||
        ((f1 === c1 || f1 === c2) &&
          (f2 === c1 || f2 === c2) &&
          (a1 === c1 || a1 === c2) && (a2 === c1 || a2 === c2) &&
          this.state.fAmount + this.state.cAmount + this.state.aAmount >
            200000 &&
          this.state.aIsAmount &&
          this.state.aIsNumber) ||
        ((f1 === c1 || f1 === c2) &&
          (f2 === c1 || f2 === c2) &&
          (b1 === c1 || b1 === c2) && (b2 === c1 || b2 === c2) &&
          this.state.fAmount + this.state.cAmount + this.state.bAmount >
            200000 &&
          this.state.bIsAmount &&
          this.state.bIsNumber) ||
        ((b1 === c1 || b1 === c2) &&
          (b2 === c1 || b2 === c2) &&
          (c1 === d1 || c1 === d2) && (c2 === d1 || c2 === d2) &&
          this.state.bAmount + this.state.dAmount + this.state.cAmount >
            200000 &&
          this.state.bIsAmount &&
          this.state.bIsNumber) ||
        ((a1 === c1 || a1 === c2) &&
          (a2 === c1 || a2 === c2) &&
          (c1 === d1 || c1 === d2) && (c2 === d1 || c2 === d2) &&
          this.state.aAmount + this.state.dAmount + this.state.cAmount >
            200000 &&
          this.state.aIsAmount &&
          this.state.aIsNumber) ||
        ((e1 === c1 || e1 === c2) &&
          (e2 === c1 || e2 === c2) &&
          (c1 === d1 || c1 === d2) && (c2 === d1 || c2 === d2) &&
          this.state.eAmount + this.state.dAmount + this.state.cAmount >
            200000 &&
          this.state.eIsAmount &&
          this.state.eIsNumber) ||
        ((f1 === c1 || f1 === c2) &&
          (f2 === c1 || f2 === c2) &&
          (c1 === d1 || c1 === d2) && (c2 === d1 || c2 === d2) &&
          this.state.fAmount + this.state.dAmount + this.state.cAmount >
            200000 &&
          this.state.fIsAmount &&
          this.state.fIsNumber) ||
        ((f1 === e1 || f1 === e2) &&
          (f2 === e1 || f2 === e2) &&
          (e1 === d1 || e1 === d2) && (e2 === d1 || e2 === d2) &&
          this.state.fAmount + this.state.dAmount + this.state.eAmount >
            200000 &&
          this.state.fIsAmount &&
          this.state.fIsNumber) ||
        ((a1 === c1 || a1 === c2) &&
          (a2 === c1 || a2 === c2) &&
          (c1 === d1 || c1 === d2) && (c2 === d1 || c2 === d2) &&
          (c1 === b1 || c1 === b2) && (c2 === b1 || c2 === b2) &&
          this.state.aAmount +
            this.state.dAmount +
            this.state.cAmount +
            this.state.bAmount >
            200000 &&
          this.state.aIsAmount &&
          this.state.aIsNumber) ||
        ((a1 === c1 || a1 === c2) &&
          (a2 === c1 || a2 === c2) &&
          (c1 === e1 || c1 === e2) && (c2 === e1 || c2 === e2) &&
          (c1 === b1 || c1 === b2) && (c2 === b1 || c2 === b2) &&
          this.state.aAmount +
            this.state.eAmount +
            this.state.cAmount +
            this.state.bAmount >
            200000 &&
          this.state.aIsAmount &&
          this.state.aIsNumber) ||
        ((a1 === c1 || a1 === c2) &&
          (a2 === c1 || a2 === c2) &&
          (c1 === f1 || c1 === f2) && (c2 === f1 || c2 === f2) &&
          (c1 === b1 || c1 === b2) && (c2 === b1 || c2 === b2) &&
          this.state.aAmount +
            this.state.fAmount +
            this.state.cAmount +
            this.state.bAmount >
            200000 &&
          this.state.aIsAmount &&
          this.state.aIsNumber) ||
        ((a1 === c1 || a1 === c2) &&
          (a2 === c1 || a2 === c2) &&
          (c1 === d1 || c1 === d2) && (c2 === d1 || c2 === d2) &&
          (c1 === e1 || c1 === e2) && (c2 === e1 || c2 === e2) &&
          this.state.aAmount +
            this.state.dAmount +
            this.state.cAmount +
            this.state.eAmount >
            200000 &&
          this.state.aIsAmount &&
          this.state.aIsNumber) ||
        ((a1 === c1 || a1 === c2) &&
          (a2 === c1 || a2 === c2) &&
          (c1 === d1 || c1 === d2) && (c2 === d1 || c2 === d2) &&
          (c1 === f1 || c1 === f2) && (c2 === f1 || c2 === f2) &&
          this.state.aAmount +
            this.state.dAmount +
            this.state.cAmount +
            this.state.fAmount >
            200000 &&
          this.state.aIsAmount &&
          this.state.aIsNumber) ||
        ((b1 === c1 || b1 === c2) &&
          (b2 === c1 || b2 === c2) &&
          (c1 === d1 || c1 === d2) && (c2 === d1 || c2 === d2) &&
          (c1 === f1 || c1 === f2) && (c2 === f1 || c2 === f2) &&
          this.state.bAmount +
            this.state.dAmount +
            this.state.cAmount +
            this.state.fAmount >
            200000 &&
          this.state.bIsAmount &&
          this.state.bIsNumber) ||
        ((e1 === c1 || e1 === c2) &&
          (e2 === c1 || e2 === c2) &&
          (c1 === d1 || c1 === d2) && (c2 === d1 || c2 === d2) &&
          (c1 === f1 || c1 === f2) && (c2 === f1 || c2 === f2) &&
          this.state.eAmount +
            this.state.dAmount +
            this.state.cAmount +
            this.state.fAmount >
            200000 &&
          this.state.eIsAmount &&
          this.state.eIsNumber) ||
        ((a1 === c1 || a1 === c2) &&
          (a2 === c1 || a2 === c2) &&
          (c1 === d1 || c1 === d2) && (c2 === d1 || c2 === d2) &&
          (c1 === b1 || c1 === b2) && (c2 === b1 || c2 === b2) &&
          (c1 === e1 || c1 === e2) && (c2 === e1 || c2 === e2) &&
          this.state.aAmount +
            this.state.dAmount +
            this.state.cAmount +
            this.state.bAmount +
            this.state.eAmount >
            200000 &&
          this.state.aIsAmount &&
          this.state.aIsNumber) ||
        ((a1 === c1 || a1 === c2) &&
          (a2 === c1 || a2 === c2) &&
          (c1 === d1 || c1 === d2) && (c2 === d1 || c2 === d2) &&
          (c1 === b1 || c1 === b2) && (c2 === b1 || c2 === b2) &&
          (c1 === f1 || c1 === f2) && (c2 === f1 || c2 === f2) &&
          this.state.aAmount +
            this.state.dAmount +
            this.state.cAmount +
            this.state.bAmount +
            this.state.fAmount >
            200000 &&
          this.state.aIsAmount &&
          this.state.aIsNumber) ||
        ((f1 === c1 || f1 === c2) &&
          (f2 === c1 || f2 === c2) &&
          (c1 === d1 || c1 === d2) && (c2 === d1 || c2 === d2) &&
          (c1 === b1 || c1 === b2) && (c2 === b1 || c2 === b2) &&
          (c1 === f1 || c1 === f2) && (c2 === f1 || c2 === f2) &&
          this.state.fAmount +
            this.state.dAmount +
            this.state.cAmount +
            this.state.bAmount +
            this.state.eAmount >
            200000 &&
          this.state.bIsAmount &&
          this.state.bIsNumber) ||
        ((f1 === c1 || f1 === c2) &&
          (f2 === c1 || f2 === c2) &&
          (c1 === d1 || c1 === d2) && (c2 === d1 || c2 === d2) &&
          (c1 === b1 || c1 === b2) && (c2 === b1 || c2 === b2) &&
          (c1 === f1 || c1 === f2) && (c2 === f1 || c2 === f2) &&
          (a1 === f1 || a1 === f2) && (a2 === f1 || a2 === f2) &&
          this.state.fAmount +
            this.state.dAmount +
            this.state.cAmount +
            this.state.bAmount +
            this.state.eAmount +
            this.state.aAmount >
            200000 &&
          this.state.bIsAmount &&
          this.state.bIsNumber)
      ) {
        Toast.info(
          "Một bộ số chỉ được mua tối đa 200 nghìn VNĐ. Vui lòng lựa chọn lại",
          2
        );
      } else {
        this.props.onCheckDup(this.state);
      }
    }
  };
  RandomAllButton = () => {
    if (
      this.state.aIsNumber === true ||
      this.state.bIsNumber === true ||
      this.state.cIsNumber === true ||
      this.state.dIsNumber === true ||
      this.state.eIsNumber === true ||
      this.state.fIsNumber === true
    ) {
      return (
        <Button
          className={button.button_primary_full}
          style={{ color: "#FFFFFF" }}
          disabled={true}
        >
          <Text>CHỌN NHANH 6 DÃY</Text>
        </Button>
      );
    } else {
      return (
        <Button
          className={button.button_primary_full}
          onClick={() => this.randomAll()}
        >
          <Text>CHỌN NHANH 6 DÃY</Text>
        </Button>
      );
    }
  };
  render() {
    return (
      <div className={styles2.content}>
        <ActivityIndicator
          className={styles1.spin}
          animating={this.state.animating}
          toast
        ></ActivityIndicator>
        {this.modalSystemView()}
        {this.modalView()}
        <div
          className={styles2.div_button}
          style={{ marginLeft: 6, marginRight: 6 }}
        >
          <div style={{ display: "flex", padding: "4px 0" }}>
            <div>
              <img
                className={styles2.div_img}
                src={require("../../assets/max3dcong.png")}
                alt=""
              />
              <div className={styles2.div_img_text}>
                <CountDownMax3D />
              </div>
            </div>
            <div className={styles2.div_border}></div>
            <div
              className={styles2.div_group_text}
              style={{ letterSpacing: -1 }}
            >
              <div
                className={styles2.div_text_amt}
                style={{ fontSize: "30pt" }}
              >
                <span className={styles2.span_text}>x</span>100.000
                <span className={styles2.span_text}>lần</span>
              </div>
            </div>
          </div>
        </div>
        <WingBlank style={{ marginLeft: 6, marginRight: 6 }}>
          <div style={{ marginTop: 8 }}>
            <Flex>
              <div style={{ width: "50%" }}>
                <Picker
                  data={max3dType}
                  cols={1}
                  className="forss"
                  okText="Chọn"
                  dismissText="Đóng"
                  disabled={true}
                  value={[this.state.type]}
                  onChange={v => this.onChangeType(v[0])}
                  onOk={v => this.setState({ type: v[0] })}
                >
                  <Button style={buttonpicker}>
                    <Text> {getTypeName(this.state.type)}</Text>
                    <CustomeIcon
                      className={styles.drop}
                      type={require("../../assets/caret_down.svg")}
                    ></CustomeIcon>
                  </Button>
                </Picker>
              </div>
              <Button
                onClick={this.showSystemModal("modalSystem")}
                style={buttonDrop}
              >
                <Text>
                  {this.state.systemMax3D.length === 1
                    ? this.state.systemMax3D[0].text
                    : "..."}
                </Text>
                <CustomeIcon
                  className={styles.drop}
                  type={require("../../assets/caret_down.svg")}
                ></CustomeIcon>
              </Button>
            </Flex>
          </div>
          <div style={{ padding: 8, marginTop: 8, background: "#FFF" }}>
            <Flex>
              <Text className={styles.text_header}>A</Text>
              <Flex style={{ width: "100%" }}>
                <Flex.Item className={styles.flexItem}>
                  <Text
                    onClick={this.showModal("modal", "A")}
                    className={styles.text_number_circle}
                  >
                    {this.state.aNumber[0]} {this.state.aNumber[1]}{" "}
                    {this.state.aNumber[2]}
                  </Text>
                </Flex.Item>
                <Flex.Item className={styles.flexItem}>
                  <Text
                    onClick={this.showModal("modal", "A")}
                    className={styles.text_number_circle}
                  >
                    {this.state.aNumber[3]} {this.state.aNumber[4]}{" "}
                    {this.state.aNumber[5]}
                  </Text>
                </Flex.Item>
              </Flex>
              <span>{this.ShowAmountText("A")}</span>
            </Flex>
            <WhiteSpace />
            <Flex>
              <Text className={styles.text_header}>B</Text>
              <Flex style={{ width: "100%" }}>
                <Flex.Item className={styles.flexItem}>
                  <Text
                    onClick={this.showModal("modal", "B")}
                    className={styles.text_number_circle}
                  >
                    {this.state.bNumber[0]} {this.state.bNumber[1]}{" "}
                    {this.state.bNumber[2]}
                  </Text>
                </Flex.Item>
                <Flex.Item className={styles.flexItem}>
                  <Text
                    onClick={this.showModal("modal", "B")}
                    className={styles.text_number_circle}
                  >
                    {this.state.bNumber[3]} {this.state.bNumber[4]}{" "}
                    {this.state.bNumber[5]}
                  </Text>
                </Flex.Item>
              </Flex>
              <span>{this.ShowAmountText("B")}</span>
            </Flex>
            <WhiteSpace />
            <Flex>
              <Text className={styles.text_header}>C</Text>
              <Flex style={{ width: "100%" }}>
                <Flex.Item className={styles.flexItem}>
                  <Text
                    onClick={this.showModal("modal", "C")}
                    className={styles.text_number_circle}
                  >
                    {this.state.cNumber[0]} {this.state.cNumber[1]}{" "}
                    {this.state.cNumber[2]}
                  </Text>
                </Flex.Item>
                <Flex.Item className={styles.flexItem}>
                  <Text
                    onClick={this.showModal("modal", "C")}
                    className={styles.text_number_circle}
                  >
                    {this.state.cNumber[3]} {this.state.cNumber[4]}{" "}
                    {this.state.cNumber[5]}
                  </Text>
                </Flex.Item>
              </Flex>
              <span>{this.ShowAmountText("C")}</span>
            </Flex>
            <WhiteSpace />
            <Flex>
              <Text className={styles.text_header}>D</Text>
              <Flex style={{ width: "100%" }}>
                <Flex.Item className={styles.flexItem}>
                  <Text
                    onClick={this.showModal("modal", "D")}
                    className={styles.text_number_circle}
                  >
                    {this.state.dNumber[0]} {this.state.dNumber[1]}{" "}
                    {this.state.dNumber[2]}
                  </Text>
                </Flex.Item>
                <Flex.Item className={styles.flexItem}>
                  <Text
                    onClick={this.showModal("modal", "D")}
                    className={styles.text_number_circle}
                  >
                    {this.state.dNumber[3]} {this.state.dNumber[4]}{" "}
                    {this.state.dNumber[5]}
                  </Text>
                </Flex.Item>
              </Flex>
              <span>{this.ShowAmountText("D")}</span>
            </Flex>
            <WhiteSpace />
            <Flex>
              <Text className={styles.text_header}>E</Text>
              <Flex style={{ width: "100%" }}>
                <Flex.Item className={styles.flexItem}>
                  <Text
                    onClick={this.showModal("modal", "E")}
                    className={styles.text_number_circle}
                  >
                    {this.state.eNumber[0]} {this.state.eNumber[1]}{" "}
                    {this.state.eNumber[2]}
                  </Text>
                </Flex.Item>
                <Flex.Item className={styles.flexItem}>
                  <Text
                    onClick={this.showModal("modal", "E")}
                    className={styles.text_number_circle}
                  >
                    {this.state.eNumber[3]} {this.state.eNumber[4]}{" "}
                    {this.state.eNumber[5]}
                  </Text>
                </Flex.Item>
              </Flex>
              <span>{this.ShowAmountText("E")}</span>
            </Flex>
            <WhiteSpace />
            <Flex>
              <Text className={styles.text_header}>F</Text>
              <Flex style={{ width: "100%" }}>
                <Flex.Item className={styles.flexItem}>
                  <Text
                    onClick={this.showModal("modal", "F")}
                    className={styles.text_number_circle}
                  >
                    {this.state.fNumber[0]} {this.state.fNumber[1]}{" "}
                    {this.state.fNumber[2]}
                  </Text>
                </Flex.Item>
                <Flex.Item className={styles.flexItem}>
                  <Text
                    onClick={this.showModal("modal", "F")}
                    className={styles.text_number_circle}
                  >
                    {this.state.fNumber[3]} {this.state.fNumber[4]}{" "}
                    {this.state.fNumber[5]}
                  </Text>
                </Flex.Item>
              </Flex>
              <span>{this.ShowAmountText("F")}</span>
            </Flex>
            <WhiteSpace />

            <Flex style={{ padding: 8 }}>
              <Text style={{ fontSize: 20 }}>Tạm tính</Text>
              <Flex.Item
                style={{ fontSize: "20px", color: "red", textAlign: "right" }}
              >
                <Text>{stringToNumberFormat(this.state.totalAmount)} đ</Text>
              </Flex.Item>
            </Flex>
            <Button
              className={button.button_primary}
              onClick={() => this.random()}
            >
              <Text>CHỌN NHANH</Text>
            </Button>
      
            <Flex>{this.RandomAllButton()}</Flex>
            <div
              className={styles2.primary_btn}
              style={{ marginBottom: 8, marginLeft: 8, marginRight: 8 }}
              onClick={() => this.checkPay()}
            >
              <div>ĐẶT VÉ</div>
            </div>
            <div
              className={styles2.tutorial}
              onClick={() =>
                this.props.onTutorial(this.state.tutorialMax3DPlus)
              }
            >
              <span style={{ borderBottom: "1px solid #0cb3ff" }}>
                Hướng dẫn cách chơi
              </span>
            </div>
          </div>
        </WingBlank>
      </div>
    );
  }
}

export default Max3DPlus;
