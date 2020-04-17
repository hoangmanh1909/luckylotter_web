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

import styles from "./lottery235.less";
import styles1 from "../Main.less";
import { ColorButton, ColorButtonText } from "../../utils/ColorBase";
import CustomeTrashIcon from "../../utils/CustomeTrashIcon";
import {
  stringToNumberFormat,
  padLeft,
  getWeekdaysShort
} from "../../utils/Helper";
import SelectNumber from "./SelectNumber";
import SelectNumber2 from "./SelectNumber2";
import SelectNumber3 from "./SelectNumber3";

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


class Lottery235 extends React.Component {
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
      opSystem2: [
        { value: 1, text: "1 kỳ", active: true },
        { value: 2, text: "2 kỳ", active: false },
        { value: 5, text: "5 kỳ", active: false },
        { value: 10, text: "10 kỳ", active: false }
      ],
      opSystem3: [
        { value: 1, text: "1 kỳ", active: true },
        { value: 2, text: "2 kỳ", active: false },
        { value: 5, text: "5 kỳ", active: false },
        { value: 10, text: "10 kỳ", active: false }
      ],
      system: 1,
      system2: 1,
      system3: 1,
      aNumber: ["", "", "", "", ""],
      aAmountText: stringToNumberFormat(amountFix) + "đ",
      aAmount: amountFix,
      aIsCheck: false,
      bNumber: ["", "", "", "", ""],
      bAmountText: stringToNumberFormat(amountFix) + "đ",
      bAmount: amountFix,
      bIsCheck: false,
      cNumber: ["", "", "", "", ""],
      cAmountText: stringToNumberFormat(amountFix) + "đ",
      cAmount: amountFix,
      cIsCheck: false,
      dNumber: ["", "", "", "", ""],
      dAmountText: stringToNumberFormat(amountFix) + "đ",
      dAmount: amountFix,
      dIsCheck: false,
      eNumber: ["", "", "", "", ""],
      eAmountText: stringToNumberFormat(amountFix) + "đ",
      eAmount: amountFix,
      eIsCheck: false,
      fNumber: ["", "", "", "", ""],
      fAmountText: stringToNumberFormat(amountFix) + "đ",
      fAmount: amountFix,
      modalType: "",
      modal: false,
      totalAmount: 0,
      productID: 9,
      tabIndex: 1,
      // Loto 2
      aNumber2: ["", ""],
      aAmountText2: stringToNumberFormat(amountFix) + "đ",
      aAmount2: amountFix,
      aIsCheck2: false,
      bNumber2: ["", ""],
      bAmountText2: stringToNumberFormat(amountFix) + "đ",
      bAmount2: amountFix,
      bIsCheck2: false,
      cNumber2: ["", ""],
      cAmountText2: stringToNumberFormat(amountFix) + "đ",
      cAmount2: amountFix,
      cIsCheck2: false,
      dNumber2: ["", ""],
      dAmountText2: stringToNumberFormat(amountFix) + "đ",
      dAmount2: amountFix,
      dIsCheck2: false,
      eNumber2: ["", ""],
      eAmountText2: stringToNumberFormat(amountFix) + "đ",
      eAmount2: amountFix,
      eIsCheck2: false,
      // Loto 3
      aNumber3: ["", "", ""],
      aAmountText3: stringToNumberFormat(amountFix) + "đ",
      aAmount3: amountFix,
      aIsCheck3: false,
      bNumber3: ["", "", ""],
      bAmountText3: stringToNumberFormat(amountFix) + "đ",
      bAmount3: amountFix,
      bIsCheck3: false,
      cNumber3: ["", "", ""],
      cAmountText3: stringToNumberFormat(amountFix) + "đ",
      cAmount3: amountFix,
      cIsCheck3: false,
      dNumber3: ["", "", ""],
      dAmountText3: stringToNumberFormat(amountFix) + "đ",
      dAmount3: amountFix,
      dIsCheck3: false,
      eNumber3: ["", "", ""],
      eAmountText3: stringToNumberFormat(amountFix) + "đ",
      eAmount3: amountFix,
      eIsCheck3: false,
      totalAmount2: 0,
      totalAmount3: 0,
      tutorialLottery235: ""
    };
  }

  componentWillMount() {
    if (
      this.props.location.payload !== undefined &&
      this.props.location.payload !== null
    ) {
      console.log(this.props.location.payload)
      this.setState(this.props.location.payload);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.response !== undefined) {
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
          console.log("222",sys)
          return dataNew;
        });
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
    
    if(nextProps.tutorialLottery235 !== undefined){
      if(nextProps.tutorialLottery235.data.Code === "00" ){
        const value = nextProps.tutorialLottery235.data.Value;
        this.setState({
          tutorialLottery235: value
        });
      }
     // console.log("124",nextProps.tutorialLottery235.data.Value)
    }
  }
  // random all
  RandomAllButton = () => {
  if(this.state.tabIndex == 3){
    if (
      this.state.aIsCheck === true ||
      this.state.bIsCheck === true ||
      this.state.cIsCheck === true ||
      this.state.dIsCheck === true ||
      this.state.eIsCheck === true 
      // this.state.fIsCheck === true
    ) {
      console.log('aa',this.props.item);
      return (
        <Button
          style={{
            background: ColorButton,
            color: "white",
            width: "100%",
            marginLeft: 8,
            marginRight: 8,
            marginBottom: 8,
            height: 40,
            lineHeight: 2
          }}
          disabled={true}
        >
          <Text>CHỌN NHANH 5 DÃY</Text>
        </Button>
      );
    } else {
      return (
        <Button
          style={{
            background: ColorButton,
            color: "white",
            width: "100%",
            marginLeft: 8,
            marginRight: 8,
            marginBottom: 8,
            height: 40,
            lineHeight: 2
          }}
          onClick={() => this.randomFastAll()}
        >
          <Text>CHỌN NHANH 5 DÃY</Text>
        </Button>
      );
    }
  } else if(this.state.tabIndex == 2){
    if (
      this.state.aIsCheck3 === true ||
      this.state.bIsCheck3 === true ||
      this.state.cIsCheck3 === true ||
      this.state.dIsCheck3 === true ||
      this.state.eIsCheck3 === true 
      // this.state.fIsCheck === true
    ) {
      return (
        <Button
          style={{
            background: ColorButton,
            color: "white",
            width: "100%",
            marginLeft: 8,
            marginRight: 8,
            marginBottom: 8,
            height: 40,
            lineHeight: 2
          }}
          disabled={true}
        >
          <Text>CHỌN NHANH 5 DÃY</Text>
        </Button>
      );
    } else {
      return (
        <Button
          style={{
            background: ColorButton,
            color: "white",
            width: "100%",
            marginLeft: 8,
            marginRight: 8,
            marginBottom: 8,
            height: 40,
            lineHeight: 2
          }}
          onClick={() => this.randomFastAll3()}
        >
          <Text>CHỌN NHANH 5 DÃY</Text>
        </Button>
      );
    }
  } else if(this.state.tabIndex == 1){
    if (
      this.state.aIsCheck2 === true ||
      this.state.bIsCheck2 === true ||
      this.state.cIsCheck2 === true ||
      this.state.dIsCheck2 === true ||
      this.state.eIsCheck2 === true 
      // this.state.fIsCheck === true
    ) {
      return (
        <Button
          style={{
            background: ColorButton,
            color: "white",
            width: "100%",
            marginLeft: 8,
            marginRight: 8,
            marginBottom: 8,
            height: 40,
            lineHeight: 2
          }}
          disabled={true}
        >
          <Text>CHỌN NHANH 5 DÃY</Text>
        </Button>
      );
    } else {
      return (
        <Button
          style={{
            background: ColorButton,
            color: "white",
            width: "100%",
            marginLeft: 8,
            marginRight: 8,
            marginBottom: 8,
            height: 40,
            lineHeight: 2
          }}
          onClick={() => this.randomFastAll2()}
        >
          <Text>CHỌN NHANH 5 DÃY</Text>
        </Button>
      );
    }
  }
  
  
  
};

RandomOneButton = () => {
  if(this.state.tabIndex == 3){
        return (
          <Button
            style={{
              background: ColorButton,
              color: "white",
              width: "100%",
              marginLeft: 8,
              marginRight: 8,
              marginBottom: 8,
              height: 40,
              lineHeight: 2
            }}
            onClick={() => this.randomFast()}
          >
            <Text>CHỌN NHANH</Text>
          </Button>
        );
  } else if(this.state.tabIndex == 2){
    return (
      <Button
        style={{
          background: ColorButton,
          color: "white",
          width: "100%",
          marginLeft: 8,
          marginRight: 8,
          marginBottom: 8,
          height: 40,
          lineHeight: 2
        }}
        onClick={() => this.randomFast3()}
      >
        <Text>CHỌN NHANH</Text>
      </Button>
    );
  } else if(this.state.tabIndex == 1){
    return (
      <Button
        style={{
          background: ColorButton,
          color: "white",
          width: "100%",
          marginLeft: 8,
          marginRight: 8,
          marginBottom: 8,
          height: 40,
          lineHeight: 2
        }}
        onClick={() => this.randomFast2()}
      >
        <Text>CHỌN NHANH</Text>
      </Button>
    );
  }


}

  clickTab = index => {
    this.setState({ 
      tabIndex: index
    });
    
  };
  // end random all
  renderRow5 = type => {
    let number;
    switch (type) {
      case "A":
        number = this.state.aNumber.map((item, index, data) => {
          return (
            <Text
              key={index}
              className={
                styles.text_number_circle
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
                 styles.text_number_circle 
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
                styles.text_number_circle
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
                styles.text_number_circle
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
                styles.text_number_circle
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
                styles.text_number_circle
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
//3
renderRow3 = type => {
  let number;
  switch (type) {
    case "A":
      number = this.state.aNumber3.map((item, index, data) => {
        return (
          <Text
            key={index}
            className={
              styles.text_number_circle
            }
            onClick={this.showModal("modal", type)}
          >
            {item}
          </Text>
        );
      });
      break;
    case "B":
      number = this.state.bNumber3.map((item, index, data) => {
        return (
          <Text
            key={index}
            className={
               styles.text_number_circle 
            }
            onClick={this.showModal("modal", type)}
          >
            {item}
          </Text>
        );
      });
      break;
    case "C":
      number = this.state.cNumber3.map((item, index, data) => {
        return (
          <Text
            key={index}
            className={
              styles.text_number_circle
            }
            onClick={this.showModal("modal", type)}
          >
            {item}
          </Text>
        );
      });
      break;
    case "D":
      number = this.state.dNumber3.map((item, index, data) => {
        return (
          <Text
            key={index}
            className={
              styles.text_number_circle
            }
            onClick={this.showModal("modal", type)}
          >
            {item}
          </Text>
        );
      });
      break;
    case "E":
      number = this.state.eNumber3.map((item, index, data) => {
        return (
          <Text
            key={index}
            className={
              styles.text_number_circle
            }
            onClick={this.showModal("modal", type)}
          >
            {item}
          </Text>
        );
      });
      break;
    case "F":
      number = this.state.fNumber3.map((item, index, data) => {
        return (
          <Text
            key={index}
            className={
              styles.text_number_circle
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
      {this.isCheckNumber3(type)}
    </div>
  );
};

//renderRow2
renderRow2 = type => {
  let number;
  switch (type) {
    case "A":
      number = this.state.aNumber2.map((item, index, data) => {
        return (
          <Text
            key={index}
            className={
              styles.text_number_circle
            }
            onClick={this.showModal("modal", type)}
          >
            {item}
          </Text>
        );
      });
      break;
    case "B":
      number = this.state.bNumber2.map((item, index, data) => {
        return (
          <Text
            key={index}
            className={
               styles.text_number_circle 
            }
            onClick={this.showModal("modal", type)}
          >
            {item}
          </Text>
        );
      });
      break;
    case "C":
      number = this.state.cNumber2.map((item, index, data) => {
        return (
          <Text
            key={index}
            className={
              styles.text_number_circle
            }
            onClick={this.showModal("modal", type)}
          >
            {item}
          </Text>
        );
      });
      break;
    case "D":
      number = this.state.dNumber2.map((item, index, data) => {
        return (
          <Text
            key={index}
            className={
              styles.text_number_circle
            }
            onClick={this.showModal("modal", type)}
          >
            {item}
          </Text>
        );
      });
      break;
    case "E":
      number = this.state.eNumber2.map((item, index, data) => {
        return (
          <Text
            key={index}
            className={
              styles.text_number_circle
            }
            onClick={this.showModal("modal", type)}
          >
            {item}
          </Text>
        );
      });
      break;
    case "F":
      number = this.state.fNumber2.map((item, index, data) => {
        return (
          <Text
            key={index}
            className={
              styles.text_number_circle
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
      {this.isCheckNumber2(type)}
    </div>
  );
};


//
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

  isCheckNumber2 = type => {
    let showType = null;
    switch (type) {
      case "A":
        showType =
          this.state.aIsCheck2 === true
            ? this.buttonAfterNumber2(type)
            : this.buttonBeforeNumber2(type);
        break;
      case "B":
        showType =
          this.state.bIsCheck2 === true
            ? this.buttonAfterNumber2(type)
            : this.buttonBeforeNumber2(type);
        break;
      case "C":
        showType =
          this.state.cIsCheck2 === true
            ? this.buttonAfterNumber2(type)
            : this.buttonBeforeNumber2(type);
        break;
      case "D":
        showType =
          this.state.dIsCheck2 === true
            ? this.buttonAfterNumber2(type)
            : this.buttonBeforeNumber2(type);
        break;
      case "E":
        showType =
          this.state.eIsCheck2 === true
            ? this.buttonAfterNumber2(type)
            : this.buttonBeforeNumber2(type);
        break;
      case "F":
        showType =
          this.state.fIsCheck2 === true
            ? this.buttonAfterNumber2(type)
            : this.buttonBeforeNumber2(type);
        break;
      default:
        showType = this.buttonBeforeNumber2(type);
        break;
    }
    return showType;
  };

  isCheckNumber3 = type => {
    let showType = null;
    switch (type) {
      case "A":
        showType =
          this.state.aIsCheck3 === true
            ? this.buttonAfterNumber3(type)
            : this.buttonBeforeNumber3(type);
        break;
      case "B":
        showType =
          this.state.bIsCheck3 === true
            ? this.buttonAfterNumber3(type)
            : this.buttonBeforeNumber3(type);
        break;
      case "C":
        showType =
          this.state.cIsCheck3 === true
            ? this.buttonAfterNumber3(type)
            : this.buttonBeforeNumber3(type);
        break;
      case "D":
        showType =
          this.state.dIsCheck3 === true
            ? this.buttonAfterNumber3(type)
            : this.buttonBeforeNumber3(type);
        break;
      case "E":
        showType =
          this.state.eIsCheck3 === true
            ? this.buttonAfterNumber3(type)
            : this.buttonBeforeNumber3(type);
        break;
      case "F":
        showType =
          this.state.fIsCheck3 === true
            ? this.buttonAfterNumber3(type)
            : this.buttonBeforeNumber3(type);
        break;
      default:
        showType = this.buttonBeforeNumber3(type);
        break;
    }
    return showType;
  };
  buttonBeforeNumber3 = type => {
    return (
      <div className={styles.random}>
        <Button
          type="warning"
          size="small"
          className={styles.btnRandomRow}
          onClick={() => this.random3(type)}
        >
          <Text>TC</Text>
        </Button>
        <Text
          onClick={() => this.showAmount3(type)}
          className={styles.text_amount}
        >
          {this.showText3(type)}
        </Text>
      </div>
    );
  };
  buttonBeforeNumber2 = type => {
    return (
      <div className={styles.random}>
        <Button
          type="warning"
          size="small"
          className={styles.btnRandomRow}
          onClick={() => this.random2(type)}
        >
          <Text>TC</Text>
        </Button>
        <Text
          onClick={() => this.showAmount2(type)}
          className={styles.text_amount}
        >
          {this.showText2(type)}
        </Text>
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
          onClick={() => this.random5(type)}
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

  buttonAfterNumber2 = type => {
    return (
      <div className={styles.random}>
        <Button
          type="warning"
          size="small"
          className={styles.btnClearRow}
          onClick={() => this.clearData2(type)}
        >
          <CustomeTrashIcon
            type={require("../../assets/trash.svg")}
          ></CustomeTrashIcon>
        </Button>
        <Text
          onClick={() => this.showAmount2(type)}
          className={styles.text_amount}
        >
          {this.showText2(type)}
        </Text>
      </div>
    );
  };

  buttonAfterNumber3 = type => {
    return (
      <div className={styles.random}>
        <Button
          type="warning"
          size="small"
          className={styles.btnClearRow}
          onClick={() => this.clearData3(type)}
        >
          <CustomeTrashIcon
            type={require("../../assets/trash.svg")}
          ></CustomeTrashIcon>
        </Button>
        <Text
          onClick={() => this.showAmount3(type)}
          className={styles.text_amount}
        >
          {this.showText3(type)}
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

  showText2 = type => {
    let showType = "";
    switch (type) {
      case "A":
        showType = <Text>{this.state.aAmountText2}</Text>;
        break;
      case "B":
        showType = <Text>{this.state.bAmountText2}</Text>;
        break;
      case "C":
        showType = <Text>{this.state.cAmountText2}</Text>;
        break;
      case "D":
        showType = <Text>{this.state.dAmountText2}</Text>;
        break;
      case "E":
        showType = <Text>{this.state.eAmountText2}</Text>;
        break;
      case "F":
        showType = <Text>{this.state.fAmountText2}</Text>;
        break;
      default:
        showType = "Mệnh giá";
        break;
    }
    return showType;
  };

  showText3 = type => {
    let showType = "";
    switch (type) {
      case "A":
        showType = <Text>{this.state.aAmountText3}</Text>;
        break;
      case "B":
        showType = <Text>{this.state.bAmountText3}</Text>;
        break;
      case "C":
        showType = <Text>{this.state.cAmountText3}</Text>;
        break;
      case "D":
        showType = <Text>{this.state.dAmountText3}</Text>;
        break;
      case "E":
        showType = <Text>{this.state.eAmountText3}</Text>;
        break;
      case "F":
        showType = <Text>{this.state.fAmountText3}</Text>;
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

  renderSystem =  () => {
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

  renderSystem3 =  () => {
    return this.state.opSystem3.map((item, index, data) => {
      return (
        <div
          key={index}
          className={item.active ? styles1.tab_active : styles1.tab_normal}
          onClick={() => this.onChangeActive3(item.value)}
        >
          {item.text}
        </div>
      );
    });
  };

  onChangeActive2 = value => {
    const _opSystem2 = this.state.opSystem2.map((item, index, data) => {
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
    let totalAmount2 = 0;
    if (this.state.aIsCheck2) {
      totalAmount2 = this.state.aAmount2 * value;
    }
    if (this.state.bIsCheck2) {
      totalAmount2 += this.state.bAmount2 * value;
    }
    if (this.state.cIsCheck2) {
      totalAmount2 += this.state.cAmount2 * value;
    }
    if (this.state.dIsCheck2) {
      totalAmount2 += this.state.dAmount2 * value;
    }
    if (this.state.eIsCheck2) {
      totalAmount2 += this.state.eAmount2 * value;
    }
    this.setState({
      opSystem2: _opSystem2,
      system2: value,
      totalAmount2: totalAmount2
    });
  };

  renderSystem2 =  () => {
    return this.state.opSystem2.map((item, index, data) => {
      return (
        <div
          key={index}
          className={item.active ? styles1.tab_active : styles1.tab_normal}
          onClick={() => this.onChangeActive2(item.value)}
        >
          {item.text}
        </div>
      );
    });
  };

  onChangeActive3 = value => {
    const _opSystem3 = this.state.opSystem3.map((item, index, data) => {
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
    let totalAmount3 = 0;
    if (this.state.aIsCheck3) {
      totalAmount3 = this.state.aAmount3 * value;
    }
    if (this.state.bIsCheck3) {
      totalAmount3 += this.state.bAmount3 * value;
    }
    if (this.state.cIsCheck3) {
      totalAmount3 += this.state.cAmount3 * value;
    }
    if (this.state.dIsCheck3) {
      totalAmount3 += this.state.dAmount3 * value;
    }
    if (this.state.eIsCheck3) {
      totalAmount3 += this.state.eAmount3 * value;
    }
    this.setState({
      opSystem3: _opSystem3,
      system3: value,
      totalAmount3: totalAmount3
    });
  };

  randomNumber = ordinal => {
    return Math.floor(Math.random() * 10);
  };

  random2 = type => {
    let number = ["", ""];
    switch (type) {
      case "A":
        number = this.state.aNumber2.map((item, index, data) => {
          let _number = this.randomNumber(index);
          if (index != 0) _number = padLeft(_number, 1, "0");
          return _number;
        });
        this.setState({
          aNumber2: number,
          aIsCheck2: true,
          totalAmount2:
            this.state.totalAmount2 + this.state.aAmount2 * this.state.system2
        });
        break;
      case "B":
        number = this.state.bNumber2.map((item, index, data) => {
          let _number = this.randomNumber(index);
          if (index != 0) _number = padLeft(_number, 1, "0");
          return _number;
        });

        this.setState({
          bNumber2: number,
          bIsCheck2: true,
          totalAmount2:
            this.state.totalAmount2 + this.state.bAmount2 * this.state.system2
        });
        break;
      case "C":
        number = this.state.cNumber2.map((item, index, data) => {
          let _number = this.randomNumber(index);
          if (index != 0) _number = padLeft(_number, 1, "0");
          return _number;
        });

        this.setState({
          cNumber2: number,
          cIsCheck2: true,
          totalAmount2:
            this.state.totalAmount2 + this.state.cAmount2 * this.state.system2
        });
        break;
      case "D":
        number = this.state.dNumber2.map((item, index, data) => {
          let _number = this.randomNumber(index);
          if (index != 0) _number = padLeft(_number, 1, "0");
          return _number;
        });

        this.setState({
          dNumber2: number,
          dIsCheck2: true,
          totalAmount2:
            this.state.totalAmount2 + this.state.dAmount2 * this.state.system2
        });
        break;
      case "E":
        number = this.state.eNumber2.map((item, index, data) => {
          let _number = this.randomNumber(index);
          if (index != 0) _number = padLeft(_number, 1, "0");
          return _number;
        });
        this.setState({
          eNumber2: number,
          eIsCheck2: true,
          totalAmount2:
            this.state.totalAmount2 + this.state.eAmount2 * this.state.system2
        });
        break;
    }
  };
  random3 = type => {
    let number = ["", "", ""];
    switch (type) {
      case "A":
        number = this.state.aNumber3.map((item, index, data) => {
          let _number = this.randomNumber(index);
          if (index != 0) _number = padLeft(_number, 1, "0");
          return _number;
        });
        this.setState({
          aNumber3: number,
          aIsCheck3: true,
          totalAmount3:
            this.state.totalAmount3 + this.state.aAmount3 * this.state.system3
        });
        break;
      case "B":
        number = this.state.bNumber3.map((item, index, data) => {
          let _number = this.randomNumber(index);
          if (index != 0) _number = padLeft(_number, 1, "0");
          return _number;
        });

        this.setState({
          bNumber3: number,
          bIsCheck3: true,
          totalAmount3:
            this.state.totalAmount3 + this.state.bAmount3 * this.state.system3
        });
        break;
      case "C":
        number = this.state.cNumber3.map((item, index, data) => {
          let _number = this.randomNumber(index);
          if (index != 0) _number = padLeft(_number, 1, "0");
          return _number;
        });

        this.setState({
          cNumber3: number,
          cIsCheck3: true,
          totalAmount3:
            this.state.totalAmount3 + this.state.cAmount3 * this.state.system3
        });
        break;
      case "D":
        number = this.state.dNumber3.map((item, index, data) => {
          let _number = this.randomNumber(index);
          if (index != 0) _number = padLeft(_number, 1, "0");
          return _number;
        });

        this.setState({
          dNumber3: number,
          dIsCheck3: true,
          totalAmount3:
            this.state.totalAmount3 + this.state.dAmount3 * this.state.system3
        });
        break;
      case "E":
        number = this.state.eNumber3.map((item, index, data) => {
          let _number = this.randomNumber(index);
          if (index != 0) _number = padLeft(_number, 1, "0");
          return _number;
        });
        this.setState({
          eNumber3: number,
          eIsCheck3: true,
          totalAmount3:
            this.state.totalAmount3 + this.state.eAmount3 * this.state.system3
        });
        break;
    }
  };
  random5 = type => {
    let number = ["", "", "", "", ""];
    switch (type) {
      case "A":
        number = this.state.aNumber.map((item, index, data) => {
          let _number = this.randomNumber(index);
          if (index != 0) _number = padLeft(_number, 1, "0");
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
          if (index != 0) _number = padLeft(_number, 1, "0");
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
          if (index != 0) _number = padLeft(_number, 1, "0");
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
          if (index != 0) _number = padLeft(_number, 1, "0");
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
          if (index != 0) _number = padLeft(_number, 1, "0");
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
        if (index != 0) _number = padLeft(_number, 1,"0");
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
        if (index != 0) _number = padLeft(_number, 1, "0");
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
        if (index != 0) _number = padLeft(_number, 1, "0");
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
        if (index != 0) _number = padLeft(_number, 1, "0");
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
        if (index != 0) _number = padLeft(_number, 1, "0");
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

  randomFast2() {
    let _totalAmount2 = 0;
    if (!this.state.aIsCheck2) {
      let number = this.state.aNumber2.map((item, index, data) => {
        let _number = this.randomNumber(index);
        if (index != 0) _number = padLeft(_number, 1,"0");
        return _number;
      });

      _totalAmount2 =
        this.state.totalAmount2 + this.state.aAmount2 * this.state.system2;
      this.setState({
        aNumber2: number,
        aIsCheck2: true,
        totalAmount2: _totalAmount2
      });
    } else if (!this.state.bIsCheck2) {
      let number = this.state.bNumber2.map((item, index, data) => {
        let _number = this.randomNumber(index);
        if (index != 0) _number = padLeft(_number, 1, "0");
        return _number;
      });
      _totalAmount2 =
        this.state.totalAmount2 + this.state.bAmount2 * this.state.system2;
      this.setState({
        bNumber2: number,
        bIsCheck2: true,
        totalAmount2: _totalAmount2
      });
    } else if (!this.state.cIsCheck2) {
      let number = this.state.cNumber2.map((item, index, data) => {
        let _number = this.randomNumber(index);
        if (index != 0) _number = padLeft(_number, 1, "0");
        return _number;
      });
      _totalAmount2 =
        this.state.totalAmount2 + this.state.cAmount2 * this.state.system2;
      this.setState({
        cNumber2: number,
        cIsCheck2: true,
        totalAmount2: _totalAmount2
      });
    } else if (!this.state.dIsCheck2) {
      let number = this.state.dNumber2.map((item, index, data) => {
        let _number = this.randomNumber(index);
        if (index != 0) _number = padLeft(_number, 1, "0");
        return _number;
      });
      _totalAmount2 =
        this.state.totalAmount2 + this.state.dAmount2 * this.state.system2;
      this.setState({
        dNumber2: number,
        dIsCheck2: true,
        totalAmount2: _totalAmount2
      });
    } else if (!this.state.eIsCheck2) {
      let number = this.state.eNumber2.map((item, index, data) => {
        let _number = this.randomNumber(index);
        if (index != 0) _number = padLeft(_number, 1, "0");
        return _number;
      });
      _totalAmount2 =
        this.state.totalAmount2 + this.state.eAmount2 * this.state.system2;
      this.setState({
        eNumber2: number,
        eIsCheck2: true,
        totalAmount2: _totalAmount2
      });
    }
  }

  randomFast3() {
    let _totalAmount3 = 0;
    if (!this.state.aIsCheck3) {
      let number = this.state.aNumber3.map((item, index, data) => {
        let _number = this.randomNumber(index);
        if (index != 0) _number = padLeft(_number, 1,"0");
        return _number;
      });

      _totalAmount3 =
        this.state.totalAmount3 + this.state.aAmount3 * this.state.system3;
      this.setState({
        aNumber3: number,
        aIsCheck3: true,
        totalAmount3: _totalAmount3
      });
    } else if (!this.state.bIsCheck3) {
      let number = this.state.bNumber3.map((item, index, data) => {
        let _number = this.randomNumber(index);
        if (index != 0) _number = padLeft(_number, 1, "0");
        return _number;
      });
      _totalAmount3 =
        this.state.totalAmount3 + this.state.bAmount3 * this.state.system3;
      this.setState({
        bNumber3: number,
        bIsCheck3: true,
        totalAmount3: _totalAmount3
      });
    } else if (!this.state.cIsCheck3) {
      let number = this.state.cNumber3.map((item, index, data) => {
        let _number = this.randomNumber(index);
        if (index != 0) _number = padLeft(_number, 1, "0");
        return _number;
      });
      _totalAmount3 =
        this.state.totalAmount3 + this.state.cAmount3 * this.state.system3;
      this.setState({
        cNumber3: number,
        cIsCheck3: true,
        totalAmount3: _totalAmount3
      });
    } else if (!this.state.dIsCheck3) {
      let number = this.state.dNumber3.map((item, index, data) => {
        let _number = this.randomNumber(index);
        if (index != 0) _number = padLeft(_number, 1, "0");
        return _number;
      });
      _totalAmount3 =
        this.state.totalAmount3 + this.state.dAmount3 * this.state.system3;
      this.setState({
        dNumber3: number,
        dIsCheck3: true,
        totalAmount3: _totalAmount3
      });
    } else if (!this.state.eIsCheck3) {
      let number = this.state.eNumber3.map((item, index, data) => {
        let _number = this.randomNumber(index);
        if (index != 0) _number = padLeft(_number, 1, "0");
        return _number;
      });
      _totalAmount3 =
        this.state.totalAmount3 + this.state.eAmount3 * this.state.system3;
      this.setState({
        eNumber3: number,
        eIsCheck3: true,
        totalAmount3: _totalAmount3
      });
    }
  }

  randomFastAll3() {
    let _totalAmount3 = this.state.totalAmount3;

    if (!this.state.aIsCheck3) {
      let number = this.state.aNumber3.map((item, index, data) => {
        let _number = this.randomNumber(index);
        if (index != 0) _number = padLeft(_number, 1, "0");
        return _number;
      });
      _totalAmount3 = this.state.aAmount3 * this.state.system3;
      this.setState({ aNumber3: number, aIsCheck3: true });
    }
    if (!this.state.bIsCheck3) {
      let number = this.state.bNumber3.map((item, index, data) => {
        let _number = this.randomNumber(index);
        if (index != 0) _number = padLeft(_number, 1, "0");
        return _number;
      });
      _totalAmount3 += this.state.bAmount3 * this.state.system3;
      this.setState({ bNumber3: number, bIsCheck3: true });
    }
    if (!this.state.cIsCheck3) {
      let number = this.state.cNumber3.map((item, index, data) => {
        let _number = this.randomNumber(index);
        if (index != 0) _number = padLeft(_number, 1, "0");
        return _number;
      });
      _totalAmount3 += this.state.cAmount3 * this.state.system3;
      this.setState({ cNumber3: number, cIsCheck3: true });
    }
    if (!this.state.dIsCheck3) {
      let number = this.state.dNumber3.map((item, index, data) => {
        let _number = this.randomNumber(index);
        if (index != 0) _number = padLeft(_number, 1, "0");
        return _number;
      });
      _totalAmount3 += this.state.dAmount3 * this.state.system3;
      this.setState({ dNumber3: number, dIsCheck3: true });
    }
    if (!this.state.eIsCheck3) {
      let number = this.state.eNumber3.map((item, index, data) => {
        let _number = this.randomNumber(index);
        if (index != 0) _number = padLeft(_number, 1, "0");
        return _number;
      });
      _totalAmount3 += this.state.eAmount3 * this.state.system3;
      this.setState({ eNumber3: number, eIsCheck3: true });
    }
    this.setState({ totalAmount3: _totalAmount3 });
  }

  randomFastAll2() {
    let _totalAmount2 = this.state.totalAmount2;

    if (!this.state.aIsCheck2) {
      let number = this.state.aNumber2.map((item, index, data) => {
        let _number = this.randomNumber(index);
        if (index != 0) _number = padLeft(_number, 1, "0");
        return _number;
      });
      _totalAmount2 = this.state.aAmount2 * this.state.system2;
      this.setState({ aNumber2: number, aIsCheck2: true });
    }
    if (!this.state.bIsCheck2) {
      let number = this.state.bNumber2.map((item, index, data) => {
        let _number = this.randomNumber(index);
        if (index != 0) _number = padLeft(_number, 1, "0");
        return _number;
      });
      _totalAmount2 += this.state.bAmount2 * this.state.system2;
      this.setState({ bNumber2: number, bIsCheck2: true });
    }
    if (!this.state.cIsCheck2) {
      let number = this.state.cNumber2.map((item, index, data) => {
        let _number = this.randomNumber(index);
        if (index != 0) _number = padLeft(_number, 1, "0");
        return _number;
      });
      _totalAmount2 += this.state.cAmount2 * this.state.system2;
      this.setState({ cNumber2: number, cIsCheck2: true });
    }
    if (!this.state.dIsCheck2) {
      let number = this.state.dNumber2.map((item, index, data) => {
        let _number = this.randomNumber(index);
        if (index != 0) _number = padLeft(_number, 1, "0");
        return _number;
      });
      _totalAmount2 += this.state.dAmount2 * this.state.system2;
      this.setState({ dNumber2: number, dIsCheck2: true });
    }
    if (!this.state.eIsCheck2) {
      let number = this.state.eNumber2.map((item, index, data) => {
        let _number = this.randomNumber(index);
        if (index != 0) _number = padLeft(_number, 1, "0");
        return _number;
      });
      _totalAmount2 += this.state.eAmount2 * this.state.system2;
      this.setState({ eNumber2: number, eIsCheck2: true });
    }
    this.setState({ totalAmount2: _totalAmount2 });
  }

  randomFastAll() {
    let _totalAmount = this.state.totalAmount;

    if (!this.state.aIsCheck) {
      let number = this.state.aNumber.map((item, index, data) => {
        let _number = this.randomNumber(index);
        if (index != 0) _number = padLeft(_number, 1, "0");
        return _number;
      });
      _totalAmount = this.state.aAmount * this.state.system;
      this.setState({ aNumber: number, aIsCheck: true });
    }
    if (!this.state.bIsCheck) {
      let number = this.state.bNumber.map((item, index, data) => {
        let _number = this.randomNumber(index);
        if (index != 0) _number = padLeft(_number, 1, "0");
        return _number;
      });
      _totalAmount += this.state.bAmount * this.state.system;
      this.setState({ bNumber: number, bIsCheck: true });
    }
    if (!this.state.cIsCheck) {
      let number = this.state.cNumber.map((item, index, data) => {
        let _number = this.randomNumber(index);
        if (index != 0) _number = padLeft(_number, 1, "0");
        return _number;
      });
      _totalAmount += this.state.cAmount * this.state.system;
      this.setState({ cNumber: number, cIsCheck: true });
    }
    if (!this.state.dIsCheck) {
      let number = this.state.dNumber.map((item, index, data) => {
        let _number = this.randomNumber(index);
        if (index != 0) _number = padLeft(_number, 1, "0");
        return _number;
      });
      _totalAmount += this.state.dAmount * this.state.system;
      this.setState({ dNumber: number, dIsCheck: true });
    }
    if (!this.state.eIsCheck) {
      let number = this.state.eNumber.map((item, index, data) => {
        let _number = this.randomNumber(index);
        if (index != 0) _number = padLeft(_number, 1, "0");
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

  showAmount2 = param => {
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
              this.fillAmount2(buttonIndex, param);
              break;
            case "B":
              this.fillAmount2(buttonIndex, param);
              break;
            case "C":
              this.fillAmount2(buttonIndex, param);
              break;
            case "D":
              this.fillAmount2(buttonIndex, param);
              break;
            case "E":
              this.fillAmount2(buttonIndex, param);
              break;
            default:
              break;
          }
        }
      }
    );
  };

  showAmount3 = param => {
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
              this.fillAmount3(buttonIndex, param);
              break;
            case "B":
              this.fillAmount3(buttonIndex, param);
              break;
            case "C":
              this.fillAmount3(buttonIndex, param);
              break;
            case "D":
              this.fillAmount3(buttonIndex, param);
              break;
            case "E":
              this.fillAmount3(buttonIndex, param);
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
  fillAmount2 = (index, type) => {
    let amount2 = "";
    let iAmount = 0;
    let tempAmount = 0;
    switch (index) {
      case 0:
        amount2 = "20,000đ";
        iAmount = 20000;
        break;
      case 1:
        amount2 = "50,000đ";
        iAmount = 50000;
        break;
      case 2:
        amount2 = "100,000đ";
        iAmount = 100000;
        break;
      default:
        break;
    }
    switch (type) {
      case "A":
        tempAmount = this.state.aAmount2;
        if (this.state.aIsCheck2) {
          this.setState({
            aAmount2: iAmount,
            aAmountText2: amount2,
            totalAmount2:
              this.state.totalAmount2 -
              this.state.system2 * tempAmount +
              iAmount * this.state.system2
          });
        } else {
          this.setState({ aAmount2: iAmount, aAmountText2: amount2 });
        }
        break;
      case "B":
        tempAmount = this.state.bAmount2;
        this.setState({ bAmountText2: amount2 });
        if (this.state.bIsCheck2) {
          this.setState({
            bAmount2: iAmount,
            totalAmount2:
              this.state.totalAmount2 -
              this.state.system2 * tempAmount +
              iAmount * this.state.system2
          });
        } else {
          this.setState({ bAmount2: iAmount });
        }
        break;
      case "C":
        tempAmount = this.state.cAmount2;
        this.setState({ cAmountText2: amount2 });
        if (this.state.cIsCheck2) {
          this.setState({
            cAmount2: iAmount,
            totalAmount2:
              this.state.totalAmount2 -
              this.state.system2 * tempAmount +
              iAmount * this.state.system2
          });
        } else {
          this.setState({ cAmount2: iAmount });
        }
        break;
      case "D":
        tempAmount = this.state.dAmount2;
        this.setState({ dAmountText2: amount2 });
        if (this.state.dIsCheck2) {
          this.setState({
            dAmount2: iAmount,
            totalAmount2:
              this.state.totalAmount2 -
              this.state.system2 * tempAmount +
              iAmount * this.state.system2
          });
        } else {
          this.setState({ dAmount2: iAmount });
        }
        break;
      case "E":
        tempAmount = this.state.eAmount2;
        this.setState({ eAmountText2: amount2 });
        if (this.state.eIsCheck2) {
          this.setState({
            eAmount2: iAmount,
            totalAmount2:
              this.state.totalAmount2 -
              this.state.system2 * tempAmount +
              iAmount * this.state.system2
          });
        } else {
          this.setState({ eAmount2: iAmount });
        }
        break;
      default:
        break;
    }
  };
  fillAmount3 = (index, type) => {
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
        tempAmount = this.state.aAmount3;
        if (this.state.aIsCheck3) {
          this.setState({
            aAmount3: iAmount,
            aAmountText3: amount,
            totalAmount3:
              this.state.totalAmount3 -
              this.state.system3 * tempAmount +
              iAmount * this.state.system3
          });
        } else {
          this.setState({ aAmount3: iAmount, aAmountText3: amount });
        }
        break;
      case "B":
        tempAmount = this.state.bAmount3;
        this.setState({ bAmountText3: amount });
        if (this.state.bIsCheck3) {
          this.setState({
            bAmount3: iAmount,
            totalAmount3:
              this.state.totalAmount3 -
              this.state.system3 * tempAmount +
              iAmount * this.state.system3
          });
        } else {
          this.setState({ bAmount3: iAmount });
        }
        break;
      case "C":
        tempAmount = this.state.cAmount3;
        this.setState({ cAmountText3: amount });
        if (this.state.cIsCheck3) {
          this.setState({
            cAmount3: iAmount,
            totalAmount3:
              this.state.totalAmount3 -
              this.state.system3 * tempAmount +
              iAmount * this.state.system3
          });
        } else {
          this.setState({ cAmount3: iAmount });
        }
        break;
      case "D":
        tempAmount = this.state.dAmount3;
        this.setState({ dAmountText3: amount });
        if (this.state.dIsCheck3) {
          this.setState({
            dAmount3: iAmount,
            totalAmount3:
              this.state.totalAmount3 -
              this.state.system3 * tempAmount +
              iAmount * this.state.system3
          });
        } else {
          this.setState({ dAmount3: iAmount });
        }
        break;
      case "E":
        tempAmount = this.state.eAmount3;
        this.setState({ eAmountText3: amount });
        if (this.state.eIsCheck3) {
          this.setState({
            eAmount3: iAmount,
            totalAmount3:
              this.state.totalAmount3 -
              this.state.system3 * tempAmount +
              iAmount * this.state.system3
          });
        } else {
          this.setState({ eAmount3: iAmount });
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
          aNumber: ["", "", "", "", ""],
          aIsCheck: false,
          totalAmount:
            this.state.totalAmount - this.state.aAmount * this.state.system
        });
        break;
      case "B":
        this.setState({
          bNumber: ["", "", "", "", ""],
          bIsCheck: false,
          totalAmount:
            this.state.totalAmount - this.state.bAmount * this.state.system
        });
        break;
      case "C":
        this.setState({
          cNumber: ["", "", "", "", ""],
          cIsCheck: false,
          totalAmount:
            this.state.totalAmount - this.state.cAmount * this.state.system
        });
        break;
      case "D":
        this.setState({
          dNumber: ["", "", "", "", ""],
          dIsCheck: false,
          totalAmount:
            this.state.totalAmount - this.state.dAmount * this.state.system
        });
        break;
      case "E":
        this.setState({
          eNumber: ["", "", "", "", ""],
          eIsCheck: false,
          totalAmount:
            this.state.totalAmount - this.state.eAmount * this.state.system
        });
        break;
      default:
        break;
    }
  };

  clearData2 = type => {
    switch (type) {
      case "A":
        this.setState({
          aNumber2: ["", ""],
          aIsCheck2: false,
          totalAmount2:
            this.state.totalAmount2 - this.state.aAmount2 * this.state.system2
        });
        break;
      case "B":
        this.setState({
          bNumber2: ["", ""],
          bIsCheck2: false,
          totalAmount2:
            this.state.totalAmount2 - this.state.bAmount2 * this.state.system2
        });
        break;
      case "C":
        this.setState({
          cNumber2: ["", ""],
          cIsCheck2: false,
          totalAmount2:
            this.state.totalAmount2 - this.state.cAmount2 * this.state.system2
        });
        break;
      case "D":
        this.setState({
          dNumber2: ["", ""],
          dIsCheck2: false,
          totalAmount2:
            this.state.totalAmount2 - this.state.dAmount2 * this.state.system2
        });
        break;
      case "E":
        this.setState({
          eNumber2: ["", ""],
          eIsCheck2: false,
          totalAmount2:
            this.state.totalAmount2 - this.state.eAmount2 * this.state.system2
        });
        break;
      default:
        break;
    }
  };

  clearData3 = type => {
    switch (type) {
      case "A":
        this.setState({
          aNumber3: ["", "", ""],
          aIsCheck3: false,
          totalAmount3:
            this.state.totalAmount3 - this.state.aAmount3 * this.state.system3
        });
        break;
      case "B":
        this.setState({
          bNumber3: ["", "", ""],
          bIsCheck3: false,
          totalAmount3:
            this.state.totalAmount3 - this.state.bAmount3 * this.state.system3
        });
        break;
      case "C":
        this.setState({
          cNumber3: ["", "", ""],
          cIsCheck3: false,
          totalAmount3:
            this.state.totalAmount3 - this.state.cAmount3 * this.state.system3
        });
        break;
      case "D":
        this.setState({
          dNumber3: ["", "", ""],
          dIsCheck3: false,
          totalAmount3:
            this.state.totalAmount3 - this.state.dAmount3 * this.state.system3
        });
        break;
      case "E":
        this.setState({
          eNumber3: ["", "", ""],
          eIsCheck3: false,
          totalAmount3:
            this.state.totalAmount3 - this.state.eAmount3 * this.state.system3
        });
        break;
      default:
        break;
    }
  };

  modalNumberView = () => {
    if(this.state.tabIndex == 3){
      return (
        <SelectNumber
          tabIndex = {this.state.tabIndex}
          type={this.state.modalType}
          modal={this.state.modal}
          onValue={this.onPutValue}
          onClose={this.onCloseModal}
          onAccept={this.onAcceptModal}
        />
      );
    } else if(this.state.tabIndex == 2){
      return (
        <SelectNumber3
          tabIndex = {this.state.tabIndex}
          type={this.state.modalType}
          modal={this.state.modal}
          onValue3={this.onPutValue3}
          onClose={this.onCloseModal}
          onAccept={this.onAcceptModal3}
        />
      );
    } else if(this.state.tabIndex == 1){
      return (
        <SelectNumber2
          tabIndex = {this.state.tabIndex}
          type={this.state.modalType}
          modal={this.state.modal}
          onValue2={this.onPutValue2}
          onClose={this.onCloseModal}
          onAccept={this.onAcceptModal2}
        />
      );
    }
    
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
  onPutValue2 = type => {
    let value = [];
    switch (type) {
      case "A":
        value = this.state.aNumber2;
        break;
      case "B":
        value = this.state.bNumber2;
        break;
      case "C":
        value = this.state.cNumber2;
        break;
      case "D":
        value = this.state.dNumber2;
        break;
      case "E":
        value = this.state.eNumber2;
        break;
      default:
        break;
    }
    return value;
  };
  onPutValue3 = type => {
    let value = [];
    switch (type) {
      case "A":
        value = this.state.aNumber3;
        break;
      case "B":
        value = this.state.bNumber3;
        break;
      case "C":
        value = this.state.cNumber3;
        break;
      case "D":
        value = this.state.dNumber3;
        break;
      case "E":
        value = this.state.eNumber3;
        break;
      default:
        break;
    }
    return value;
  };


  onAcceptModal = (key, data, type) => () => {
      console.log(key,data,type)
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

  onAcceptModal2 = (key, data, type) => () => {
    console.log(key,data,type)
  switch (type) {
    case "A":
      if (!this.state.aIsCheck2) {
        const _totalAmount2 =
          this.state.totalAmount2 + this.state.aAmount2 * this.state.system2;
        this.setState({ totalAmount2: _totalAmount2 });
      }
      this.setState({ aNumber2: data, aIsCheck2: true });
      break;
    case "B":
      if (!this.state.bIsCheck2) {
        const _totalAmount2 =
          this.state.totalAmount2 + this.state.bAmount2 * this.state.system2;
        this.setState({ totalAmount2: _totalAmount2 });
      }
      this.setState({ bNumber2: data, bIsCheck2: true });
      break;
    case "C":
      if (!this.state.cIsCheck2) {
        const _totalAmount2 =
          this.state.totalAmount2 + this.state.cAmount2 * this.state.system2;
        this.setState({ totalAmount2: _totalAmount2 });
      }
      this.setState({ cNumber2: data, cIsCheck2: true });
      break;
    case "D":
      if (!this.state.dIsCheck2) {
        const _totalAmount2 =
          this.state.totalAmount2 + this.state.dAmount2 * this.state.system2;
        this.setState({ totalAmount2: _totalAmount2 });
      }
      this.setState({ dNumber2: data, dIsCheck2: true });
      break;
    case "E":
      if (!this.state.eIsCheck2) {
        const _totalAmount2 =
          this.state.totalAmount2 + this.state.eAmount2 * this.state.system2;
        this.setState({ totalAmount2: _totalAmount2 });
      }
      this.setState({ eNumber2: data, eIsCheck2: true });
      break;
    default:
      break;
  }

  this.setState({
    modalType: "",
    [key]: false
  });
};

onAcceptModal3 = (key, data, type) => () => {
  console.log(key,data,type)
switch (type) {
  case "A":
    if (!this.state.aIsCheck3) {
      const _totalAmount3 =
        this.state.totalAmount3 + this.state.aAmount3 * this.state.system3;
      this.setState({ totalAmount3: _totalAmount3 });
    }
    this.setState({ aNumber3: data, aIsCheck3: true });
    break;
  case "B":
    if (!this.state.bIsCheck3) {
      const _totalAmount3 =
        this.state.totalAmount3 + this.state.bAmount3 * this.state.system3;
      this.setState({ totalAmount3: _totalAmount3 });
    }
    this.setState({ bNumber3: data, bIsCheck3: true });
    break;
  case "C":
    if (!this.state.cIsCheck3) {
      const _totalAmount3 =
        this.state.totalAmount3 + this.state.cAmount3 * this.state.system3;
      this.setState({ totalAmount3: _totalAmount3 });
    }
    this.setState({ cNumber3: data, cIsCheck3: true });
    break;
  case "D":
    if (!this.state.dIsCheck3) {
      const _totalAmount3 =
        this.state.totalAmount3 + this.state.dAmount3 * this.state.system3;
      this.setState({ totalAmount3: _totalAmount3 });
    }
    this.setState({ dNumber3: data, dIsCheck3: true });
    break;
  case "E":
    if (!this.state.eIsCheck3) {
      const _totalAmount3 =
        this.state.totalAmount3 + this.state.eAmount3 * this.state.system3;
      this.setState({ totalAmount3: _totalAmount3 });
    }
    this.setState({ eNumber3: data, eIsCheck3: true });
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
// tabs
renderTabs() {
  return (
    <div className={styles.tab}>
      <div
        className={
          this.state.tabIndex == 1 ? styles.tab_active : styles.tab_normal
        }
        onClick={() => this.clickTab(1)}
      >
        Loto 2 số
      </div>
      <div
        className={
          this.state.tabIndex == 2 ? styles.tab_active : styles.tab_normal
        }
        onClick={() => this.clickTab(2)}
      >
        Loto 3 số
      </div>
      <div
        className={
          this.state.tabIndex == 3 ? styles.tab_active : styles.tab_normal
        }
        onClick={() => this.clickTab(3)}
      >
        Loto 5 số
      </div>
    </div>
  );
}
// end tabs

renderTabsContent() {
  if (this.state.tabIndex == 3) {
    return (
      <div>
        {this.renderRow5("A")}
        {this.renderRow5("B")}
        {this.renderRow5("C")}
        {this.renderRow5("D")}
        {this.renderRow5("E")}
        <div className={styles1.select_system}>Chọn kỳ</div>
        <div className={styles1.tab}>{this.renderSystem()}</div>
        <Flex style={{ padding: 8 }}>
            <Flex.Item className={styles.amount}>
              <Text style={{ fontSize: 15 }}>Tạm tính: </Text>
              <Text>{stringToNumberFormat(this.state.totalAmount)} đ</Text>
            </Flex.Item>
          </Flex>
      </div>
    );}
  else if(this.state.tabIndex == 2) {
    return (
      <div>
        {this.renderRow3("A")}
        {this.renderRow3("B")}
        {this.renderRow3("C")}
        {this.renderRow3("D")}
        {this.renderRow3("E")}
        <div className={styles1.select_system}>Chọn kỳ</div>
        <div className={styles1.tab}>{this.renderSystem3()}</div>
        <Flex style={{ padding: 8 }}>
            <Flex.Item className={styles.amount}>
              <Text style={{ fontSize: 15 }}>Tạm tính: </Text>
              <Text>{stringToNumberFormat(this.state.totalAmount3)} đ</Text>
            </Flex.Item>
          </Flex>
      </div>
      );}
  else if(this.state.tabIndex == 1) {
    return (
      <div>
        {this.renderRow2("A")}
        {this.renderRow2("B")}
        {this.renderRow2("C")}
        {this.renderRow2("D")}
        {this.renderRow2("E")}
        <div className={styles1.select_system}>Chọn kỳ</div>
        <div className={styles1.tab}>{this.renderSystem2()}</div>
        <Flex style={{ padding: 8 }}>
            <Flex.Item className={styles.amount}>
              <Text style={{ fontSize: 15 }}>Tạm tính: </Text>
              <Text>{stringToNumberFormat(this.state.totalAmount2)} đ</Text>
            </Flex.Item>
          </Flex>
      </div>
      );}
}
  checkPay() {
    if(this.state.tabIndex == 3){
      
      if (
        this.state.aIsCheck ||
        this.state.bIsCheck ||
        this.state.cIsCheck ||
        this.state.dIsCheck ||
        this.state.eIsCheck
      )  {
        const data = {};
        data.ProductID = this.state.productID;
        data.MerchantID = localStorage.getItem("merchant_id");
        data.Amount = this.state.totalAmount;
        this.props.onGetFee(data);
        
      }
    } else if(this.state.tabIndex == 2){
      if (
        this.state.aIsCheck3 ||
        this.state.bIsCheck3 ||
        this.state.cIsCheck3 ||
        this.state.dIsCheck3 ||
        this.state.eIsCheck3
      )  {
        const data = {};
        data.ProductID = this.state.productID;
        data.MerchantID = localStorage.getItem("merchant_id");
        data.Amount = this.state.totalAmount3;
        this.props.onGetFee(data);
        
      }
    } else if(this.state.tabIndex == 1){
      if (
        this.state.aIsCheck2 ||
        this.state.bIsCheck2 ||
        this.state.cIsCheck2 ||
        this.state.dIsCheck2 ||
        this.state.eIsCheck2
      )  {
        const data = {};
        data.ProductID = this.state.productID;
        data.MerchantID = localStorage.getItem("merchant_id");
        data.Amount = this.state.totalAmount2;
        this.props.onGetFee(data);
        
      }
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
                src={require("../../assets/lottery_235.png")}
                alt=""
              />
            </div>
            <div className={styles1.div_border}></div>
            <div className={styles1.div_group_text}>
              <div className={styles1.div_text_amt}>
                <span className={styles1.span_text}>x</span>20.000
                <span className={styles1.span_text}>lần</span>
              </div>
            </div>
          </div>
        </div>
        {this.renderTabs()}
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
          {this.renderTabsContent()}
        </div>
        <Flex>{this.RandomOneButton()}</Flex>
        <Flex>{this.RandomAllButton()}</Flex>
        <div
          className={styles1.primary_btn}
          style={{ marginBottom: 8, marginLeft: 8, marginRight: 8 }}
          onClick={() => 
           this.checkPay()
          }
        >
          <div>ĐẶT VÉ</div>
        </div>
        <div
            className={styles1.tutorial}
            onClick={() => this.props.onTutorial(this.state.tutorialLottery235)}
          >
            <span style={{ borderBottom: "1px solid #4397f7" }}>
              Hướng dẫn cách chơi
            </span>
          </div>
      </div>
    );
  }
}

export default Lottery235;
